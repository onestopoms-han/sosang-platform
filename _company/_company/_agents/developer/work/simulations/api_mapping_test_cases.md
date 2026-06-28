<file>
# API 상태 전이 및 매핑 통합 검증 테스트 케이스 (V1.0)

**작성자**: 코다리 (Developer Agent)  
**작성일**: 2026-06-28  
**목적**: 백엔드 로직과 프론트엔드 UI 의 일관성, 신뢰도 시각화 정확도 검증

## 1. 테스트 개요
백엔드가 반환하는 `StatusResponse` 데이터가 프론트엔드 컴포넌트 (`TrustWidget`, `PainGauge`) 에서 올바르게 처리되는지 확인합니다. 특히 상태 전이 (Trust → Warning → Critical) 로직의 경계가 명확히 작동하는지 검증합니다.

## 2. 테스트 시나리오 및 예상 결과

### T1: 정상 상태 (Trust) - 백엔드 응답
- **입력**: API 응답 `riskScore = 95`, `latency = 200ms`
- **백엔드 로직**: 현재 상태는 TRUST 유지
- **프론트엔드 예상**: 신뢰도 95% 표시, 녹색 파스텔 톤 UI
```json
{
  "id": "evt_123",
  "timestamp": 1719648000000,
  "status": "trust",
  "riskScore": 95,
  ...
}
```

### T2: 경계 조건 (Warning) - 신뢰도 임계값
- **입력**: API 응답 `riskScore = 70` (임계값), `latency = 1500ms`
- **백엔드 로직**: 상태 전이 규칙 `TRUST_TO_WARNING` 적용 → 상태 변경
- **프론트엔드 예상**: 신뢰도 70% 표시, 주황색 경고 아이콘 등장, `transitionHistory` 에 기록됨
```json
{
  "id": "evt_124",
  ...
  "status": "warning",
  "riskScore": 70,
  "transitionHistory": [
    {
      "fromStatus": "trust",
      "toStatus": "warning",
      "triggerEvent": "risk_score_threshold"
    }
  ]
}
```

### T3: 위기 상태 (Critical) - 연속 실패 조건
- **입력**: API 응답 `failureCount = 4`, `riskScore = 35`
- **백엔드 로직**: 규칙 `WARNING_TO_CRITICAL` 적용 → Critical 상태 전이
- **프론트엔드 예상**: 빨간색 긴급 경고, PainGauge 가 최대 위험도 (Critical) 표시, CTA 버튼 활성화됨

## 3. 백엔드 API 스펙 (요청/응답 예시)
```http
GET /api/v1/risk/status?region=seoul_main_market
Authorization: Bearer <token>
Accept: application/json
```

**Response 200 OK**:
```json
{
  "data": {
    "currentStatus": {
      "status": "warning",
      "riskScore": 68,
      "latencyMs": 4500
    },
    "nextTransitionThresholds": {
      "criticalTrigger": 30,     // 이하로 떨어지면 Critical 상태 전이
      "recoveryPoint": 90        // Trust 로 복구 가능 점수 (회복 경로 정의)
    }
  }
}
```

## 4. 프론트엔드 컴포넌트 연동 가이드
`TrustWidget.tsx` 와 `PainGauge.tsx` 는 다음 규칙을 따라야 합니다:
- **상태 표시**: `status === 'critical'` 일 때에만 Critical 색상 (빨강) 과 아이콘 렌더링.
- **히스토리 시각화**: `transitionHistory` 배열을 타임라인으로 그리며, 각 전이 사건 (`triggerEvent`) 을 Tooltip 로 설명.
- **응답 처리**: 백엔드가 5 초 이상 응답하지 않으면 UI 가 로딩 상태 (Skeleton) 로 전환하고, 이후 30 초 이내에 응답이 오지 않으면 `critical` 상태로 강제로 표시.

## 5. 테스트 도구 및 환경 설정
```bash
# 백엔드 시뮬레이터 설치 (Mock Server)
npm install -D openapi-typescript axios jest @types/jest

# 테스트 파일 생성
touch __tests__/status_transition.test.ts
```

**테스트 코드 예시 (Jest)**:
```typescript
import { StateTransitionRules } from '@/spec/status_transition_spec';

describe('State Transition Rules', () => {
  it('TRUST -> WARNING when riskScore <= 70', () => {
    expect(StateTransitionRules.TRUST_TO_WARNING(TrustLevel.TRUST, 65, 200)).toBe(true);
  });
  it('WARNING -> CRITICAL when failureCount >= 3', () => {
    expect(StateTransitionRules.WARNING_TO_CRITICAL(TrustLevel.WARNING, 50, 4)).toBe(true);
  });
});
```

## 6. 다음 작업 (Action Items)
- [ ] 백엔드 API 엔드포인트 `/api/v1/risk/status` 구현 완료 및 문서화.
- [ ] 프론트엔드 컴포넌트 `TrustWidget`, `PainGauge` 로직을 위 스펙에 따라 작성.
- [ ] 상태 전이 로직의 경계 조건 (Edge Case) 을 위한 추가 테스트 케이스 작성 (예: 점수 70 과 69 의 차이).

**검증 완료 후**: Designer 와 협업하여 시각적 일관성 (색상, 아이콘) 을 최종 점검합니다.