<header># 🚨 실행 실패 원인 분석 및 API 스키마 매핑 재설계 명세서 (v2.0)</header>

## 1. 실패 원인 보고서 (Previous Failure Analysis)

| 항목 | 내용 |
| :--- | :--- |
| **발생 시기** | `DiagnosisOutputSchema v2` 초기 구현 및 시각 컴포넌트 연동 단계 |
| **주요 증상** | - API 응답 데이터가 예상치 못한 타입 (예: `string` 대신 `number`) 을 포함하면 UI 렌더링이 깨짐<br>- 빈 값 (`null`, `undefined`) 에 대한 graceful degradation 로직 부재로 콘솔 오류 발생<br>- 조건부 렌더링 로직이 스키마의 필드명 변경에 취약함 |
| **근본 원인** | 1. **타입 안전성 미비**: 프론트엔드 컴포넌트가 API 응답을 타입 없이 raw 데이터로 처리하여 유효성 검증 실패<br>2. **명세 불일치**: Designer 의 시각 사양 (예: `pain_level >= 7`) 과 실제 API 응답 필드명 (`risk_index`) 이 일치하지 않음<br>3. **에러 핸들링 부재**: API 에서 에러가 발생하거나 비정상적인 데이터가 돌아올 때 UI 를 보호하는 방어적 프로그래밍 로직이 없음 |
| **해결 방안** | - 모든 API 응답은 TypeScript 인터페이스 또는 Pydantic 모델로 타입 정의하고, 컴포넌트에서 유효성 검증<br>- 시각 사양 (Designer) 과 API 명세 (Developer) 를 단일 문서에 통합하여 변경 시 양자 모두 업데이트<br>- 에러 핸들링을 위한 fallback 렌더링 로직 (예: "데이터 로드 중..." 또는 기본 UI) 구현 |

## 2. API 스키마 (`DiagnosisOutputSchema v2`) 및 시각 사양 매핑 명세

### 2.1 API 응답 구조 정의 (TypeScript/Pydantic 기준)

```typescript
// TypeScript 인터페이스 예시 (백엔드 로직과 동기화 필요)
interface DiagnosisOutputSchemaV2 {
    patient_id: string;           // 고유 식별자
    diagnosis_timestamp: number;  // ISO 8601 타임스탬프
    risk_profile: {
        level: 'LOW' | 'MEDIUM' | 'HIGH';
        score: number;            // 0 ~ 100 범위 (Designer 의 `pain_level` 매핑 필요)
        factors: string[];        // 위험 요인 목록 (예: ["고령", "소상공인"])
    };
    trust_metrics: {              // 신뢰도 지표 (Designer 의 `trust_score` 매핑)
        overall_score: number;     // 0 ~ 100 범위
        consistency: boolean;      // 데이터 일관성 플래그
    };
    recommendations: {            // 코칭/대안 제안
        plan_id: string;          // 추천 플랜 ID (예: "L1_FREE", "L3_CONSULTING")
        steps: string[];          // 단계별 액션 아이템
    };
}
```

### 2.2 시각 사양 (`Designer`) 과 API 응답 매핑 규칙

| API 필드명 | 시각 컴포넌트 | 렌더링 로직 | 비고 |
| :--- | :--- | :--- | :--- |
| `risk_profile.level` | `RiskBadge` (위험 배지) | - HIGH: 🔴 빨간색<br>- MEDIUM: 🟠 주황색<br>- LOW: 🟢 초록색 | 타입 안전성을 위해 union type 사용 |
| `risk_profile.score` | `PainGauge` (위험 게이지) | `score >= 70`: 🔥 "고위험"<br>`30 <= score < 70`: ⚠️ "중위험"<br>`score < 30`: ✅ "안전" | Designer 의 색상 가이드라인 적용 |
| `trust_metrics.overall_score` | `TrustWidget` (신뢰도 위젯) | `overall_score >= 80`: 💙 "높은 신뢰"<br>`50 <= overall_score < 80`: 🤍 "보통 신뢰"<br>`< 50`: ⚫ "낮은 신뢰" | 신뢰도 데이터와 색상 매핑 정확히 일치 |
| `recommendations.plan_id` | `PlanCard` (플랜 카드) | - L1_FREE: 무료<br>- L3_CONSULTING: 유료 컨설팅<br>- 다른 값: "맞춤형 제안" 요청 | 플랜별 CTA 버튼 렌더링 로직 적용 |

### 2.3 방어적 프로그래밍 패턴 (Graceful Degradation)

- **API 응답 유효성 검증**: 컴포넌트 mounted 시 `try/catch` 또는 Pydantic 모델로 데이터를 파싱하여 타입 오류를 즉시 잡아냅니다.
- **에러 핸들링**: API 가 에러를 반환하거나 데이터가 부재할 경우, 기본 UI (예: "데이터 로딩 중...") 를 렌더링하고 콘솔에 상세 로그를 기록합니다.
- **낙수 효과 방지**: `risk_profile.level` 이 예상치 못한 값 (예: `"UNKNOWN"`) 을 포함하면, `RiskBadge` 컴포넌트가 "알 수 없는 위험도" 텍스트와 노란색 경고를 표시하여 UI 가 깨지지 않습니다.

## 3. 다음 단계 및 액션 아이템

- **코다리**: 명세서 (`api_visual_mapping_spec_v2.md`) 를 최종 검토하고, Designer 와의 협의를 위해 `designer.md` 파일에 정리된 내용을 참조할 수 있도록 링크를 추가합니다.
- **Designer**: 해당 명세서를 바탕으로 실제 목업 (Trust Widget, PainGauge) 의 렌더링 로직을 수정하고, API 응답 데이터를 기반으로 조건부 렌더링이 정확한지 최종 테스트합니다.

---

**자가검증:** 2026. 6. 24. 오후 3:37 — 실패 원인 분석과 매핑 명세 작성 완료. Designer 와의 협업 및 실제 코딩으로 이어짐.