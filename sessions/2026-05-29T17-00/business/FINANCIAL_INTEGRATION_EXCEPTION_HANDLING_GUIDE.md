# 🛡️ 금융 제휴 연동 예외 처리 및 데이터 무결성 가이드 (v1.0)

**작성자**: 코다리 (시니어 풀스택 엔지니어)  
**작성일**: 2026-05-29T17:00  
**버전**: v1.0  
**연관 명세서**: `DESIGN_HANDOFF_V1.0_DEV_SPEC.md`, `FINANCIAL_PARTNERSHIP_SPECS_V1.0`

---

## 1. 개요 및 목표
본 가이드는 SME-AlertBadge 및 MetricCard 컴포넌트가 금융 제휴 API(예: PayPal, Stripe, KCP 등) 와 연동되는 과정에서 발생할 수 있는 **예외 상황**(API 오류, 네트워크 분실, 데이터 누락, 타입 불일치) 을 체계적으로 처리하고, **데이터 무결성**을 확보하는 기술적 로직을 명세화합니다.  
MVP 성공의 핵심은 기술 완성도보다 'Pain → Solution' 구조 시각화와 신뢰감 형성에 있으므로, 모든 예외 상황에서도 사용자가 혼란스럽지 않고 시스템이 안정적으로 작동하도록 설계해야 합니다.

## 2. 적용 범위
- **대상 API**: 금융 제휴 SDK (PayPal, KCP 등)  
- **적용 컴포넌트**: `SME-AlertBadge`, `MetricCard`  
- **예외 유형**: 네트워크 오류 (TIMEOUT, CONNECTION RESET), API 응답 오류 (4xx/5xx), 데이터 누락 (Null, Empty Object), 타입 불일치

## 3. 예외 상황별 대응 전략 및 로직

### 3.1 API 호출 실패 (Network Timeout / Connection Reset)
**상황**: 금융 제휴 API 호출이 타임아웃되거나 연결이 끊김.  
**대응 전략**: **Exponential Backoff + Circuit Breaker**  
- **재시도 로직**: 1 초, 2 초, 4 초로 재시도 후 최대 3 회 시도.  
- **회로 차단기**: 5 분 내에 500 오류가 누적되면, 해당 API 호출을 일시 중단하고 `fallback-ui-state`(예: "데이터 연동 중") 로 전환.  
- **카데트 로그**: 모든 재시도 및 실패 시점에 `error_log_id`, `timestamp`, `retry_count` 를 기록하여 추후 분석용 데이터 저장소 전송.

```typescript
// 예시: Fetch API with retry & circuit breaker
async function fetchFinancialData(url: string, options: RequestInit): Promise<any> {
  const maxRetries = 3;
  let delay = 1000;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Retry ${i + 1}:`, error.message);
      
      // Circuit breaker check
      if (circuitBreaker.isOpen()) break;
      
      delay *= 2;
      if (delay > 5000) delay = 5000; // 최대 지연 시간
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
}
```

### 3.2 API 응답 오류 (4xx / 5xx)
**상황**: API 가 비정상 응답을 반환하거나 에러 코드를 포함.  
**대응 전략**: **Error Code Mapping + Graceful Degradation**  

| HTTP 코드 | 의미 | 대응 로직 | 사용자 UI 메시지 |
|-----------|------|------------|------------------|
| 400 | Bad Request | 입력 데이터 유효성 검사 실패 → `validateInput()` 호출 | "요청 데이터가 올바르지 않습니다." |
| 401/403 | Unauthorized / Forbidden | 인증 토큰 만료 또는 권한 없음 → `refreshToken()` 재시도 후 2 회 실패 시 Fallback | "권한을 위해 다시 연결 중입니다." |
| 500 | Internal Server Error | 백엔드 서버 오류 → 3 초 대기 후 재시도, 최대 3 회 시도 후 Fallback | "시스템 점검 중입니다. 잠시 후 다시 확인해주세요." |
| 502/504 | Bad Gateway / Gateway Timeout | 프론트엔드 게이트웨이 오류 → `fallback-ui-state` 로 전환 | "연결이 불안정합니다. 다시 시도합니다." |

**Error Code Mapping 예시**:
```typescript
const ERROR_CODE_MAP: Record<string, { message: string; fallbackUI: boolean }> = {
  'VALIDATION_ERROR': { 
    message: '요청 데이터가 올바르지 않습니다.', 
    fallbackUI: false 
  },
  'AUTH_EXPIRED': { 
    message: '권한을 위해 다시 연결 중입니다.', 
    fallbackUI: true 
  },
  'SYSTEM_MAINTENANCE': { 
    message: '시스템 점검 중입니다. 잠시 후 다시 확인해주세요.', 
    fallbackUI: true 
  }
};
```

### 3.3 데이터 누락 (Null, Empty Object)
**상황**: API 에서 빈 객체 (`{}`) 나 `null` 을 반환.  
**대응 전략**: **Type Validation + Default Value Injection**  
- **유효성 검사**: Pydantic 또는 Zod 를 사용하여 JSON 스키마 검증.  
- **기본값 주입**: 누락된 필드에는 `default_value`(예: `0`, `false`, `undefined`) 을 자동으로 할당.  
- **감사 로그**: 데이터 변조 이력을 기록하여 추후 감사 추적 가능하게 함.

```typescript
import { z } from 'zod';

const FinancialDataSchema = z.object({
  amount: z.number().default(0), // 기본값 주입
  currency: z.string().default('KRW'), // 기본값 주입
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(), // null 허용
});

// 실행 시 누락 필드 자동 처리
const data = FinancialDataSchema.parse({ amount: undefined }); // { amount: 0 }
```

### 3.4 타입 불일치 (Type Mismatch)
**상황**: API 응답이 스키마와 맞지 않음 (예: 숫자 대신 문자열, 배열 대신 객체).  
**대응 전략**: **Strict Type Coercion + Fallback Parsing**  

1. **Zod Validator 사용**: `z.coerce.number()` 와 같이 타입 강제 변환 지원 옵션 사용.
2. **Fallback 로직**: 변환 실패 시 `try-catch` 블록에서 예외를 처리하고, 오류 로그에 포함 후 `fallbackUIState`(예: "데이터 형식이 잘못되었습니다.") 로 전환.

```typescript
const coerceSchema = z.object({
  price: z.coerce.number().default(0), // 문자열도 숫자로 변환 시도
});

try {
  const data = coerceSchema.parse(apiResponse);
} catch (error) {
  console.error('Type coercion failed:', error.errors);
  // Fallback 로직 실행
}
```

## 4. 데이터 무결성 확보 로직

### 4.1 트랜잭션 로그 및 감사 추적
모든 API 호출, 데이터 변경, 예외 처리 시에는 다음 정보를 기록:
- **Transaction ID**: 고유한 식별자 생성 (UUID).
- **Timestamp**: 작업 시작 및 완료 시간.
- **User Agent**: 클라이언트 정보.
- **Error Context**: 예외 타입, 스택 트레이스.

```typescript
const transactionLog = {
  id: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  eventType: 'API_CALL',
  data: apiResponse,
  status: 'SUCCESS' | 'FAILURE',
  errorMessage: null // 실패 시에만 채움
};

// 데이터베이스 또는 파일 시스템에 저장
fs.writeFileSync('transaction_logs.json', JSON.stringify(transactionLog, null, 2));
```

### 4.2 동기화 전략 (Real-time vs Batch)
- **Real-time**: 사용자 UI 를 즉시 업데이트하는 경우 (예: `MetricCard`).  
  - **전략**: WebSockets 또는 Polling(5 초 간격) 을 사용하여 최신 데이터를 가져오되, API 에러 시 이전 상태를 유지(`optimistic updates` 방지).
- **Batch**: 대시보드 통계 등을 위해 수집되는 경우.  
  - **전략**: 배치 처리를 통해 데이터 일관성을 확보하고, 동기화 실패 시 재시도 로직 적용.

### 4.3 감사 추적 및 복구 메커니즘
- **감사 로그**: 모든 API 호출의 입력/출력 데이터를 기록하여 추후 문제 발생 시 원인 분석 가능하게 함.  
- **복구 메커니즘**: 데이터 불일치 발견 시, 이전 버전의 데이터를 백업에서 복원하거나, API 재호출로 최신 데이터를 가져옴.

## 5. QA 테스트 케이스 (Negative Testing)
아래 시나리오를 기반으로 단위/통합 테스트 코드를 작성:

| 테스트 ID | 시나리오 | 예상 결과 | 실행 방법 |
|-----------|----------|------------|-------------|
| `NEG-01` | API 호출 타임아웃 발생 | 재시도 3 회 후 Fallback UI 표시, 로그 기록 | Mock 서버로 TIMEOUT 응답 전달 |
| `NEG-02` | API 가 빈 객체 (`{}`) 반환 | 타입 불일치 처리 로직 실행, 기본값 주입 | 테스트 데이터 `{ amount: undefined }` 사용 |
| `NEG-03` | 인증 토큰 만료 (401) | 토큰 갱신 시도 후 2 회 실패 시 Fallback UI 표시 | Mock 서버로 401 응답 전달 |
| `NEG-04` | API 가 숫자 대신 문자열 (`"1000"`) 반환 | `z.coerce.number()` 로 변환 성공 또는 에러 처리 | 테스트 데이터 `{ amount: "1000" }` 사용 |

## 6. 결론 및 권장 사항
- **MVP 핵심**: 기술적 완성도보다 'Pain → Solution' 구조 시각화와 신뢰감 형성에 집중하세요.  
- **무결성 확보**: 모든 예외 상황에서 시스템이 안정적으로 작동하고, 사용자가 혼란스럽지 않도록 설계되어야 합니다.  
- **QA 테스트**: Negative Testing 시나리오를 기반으로 테스트 코드를 작성하여 데이터 무결성을 최종 검증하세요.

---
자가검증: 사실 2 개 / 추측 0 개