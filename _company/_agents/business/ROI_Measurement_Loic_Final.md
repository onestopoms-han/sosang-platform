# Trust Widget & PainGauge ROI 정량화 논리 및 테스트 기준 (Final)

## 1. 개요 및 목적
- **목적**: Trust Widget(신뢰도 지표)과 PainGauge(불편도 지표)이 단순 UI 요소를 넘어, 소상공인의 실제 매출 성장(AOV↑, 재구매율↑)과 손실 감소(이탈 방지)로 이어지는 경제적 가치를 입증한다.
- **적용 대상**: 개발팀 (Backend/Frontend), 기획팀 (Product Manager)
- **일치성 기준**: 기존 `Trust_Widget_Technical_Spec_V1.0.md` 의 API 명세와 데이터 흐름을 참조하여 논리적 연결 고리를 완성함.

---

## 2. 정량화 로직 (Quantification Logic)

### 2.1 Trust Widget: 신뢰도 점수 → 매출 증대
- **입력**: `trust_score` (0~100), `transaction_count`, `user_engagement_time`
- **가설**: 높은 신뢰도가 구매 전환율(CVR)과 평균 주문 금액(AOV) 상승에 기여.
- **연산 로직**:
  - `ROI_Trust = f(trust_score, CVR_base, AOV_base)`
  - 예시 함수: `CVR_increase = base_CVR * (1 + 0.05 * trust_score / 100)`
  - 개발팀 구현 시점: API 응답 헤더에 `X-Trust-Score` 를 포함하고, 프론트엔드에서 점수에 따라 UI 가시성(예: 신뢰 배지)과 구매 유도 문구를 동적으로 조절하는 로직과 연결.
- **데이터 파이프라인**:
  - Backend: `user_engagement_service` 에서 점수 계산 → Redis 캐싱 → API 호출 시 헤더에 포함.
  - Frontend: React/Vue 컴포넌트에서 `trust_score` 값을 받아 구매 버튼의 색상/텍스트를 변경.

### 2.2 PainGauge: 불편도 점수 → 손실 감소 (이탈 방지)
- **입력**: `pain_level` (0~10), `error_frequency`, `support_ticket_count`
- **가설**: 낮은 불편도가 사용자 이탈률(Churn Rate)을 줄이고, 문제 해결 후의 재방문율을 높임.
- **연산 로직**:
  - `ROI_Pain = g(pain_level, churn_rate_base, retention_cost)`
  - 예시 함수: `churn_reduction = base_churn * (1 - 0.3 * pain_level / 10)` (pain_level 낮을수록 감소 효과 큼)
- **개발팀 연동**:
  - API 명세 참조: `get_pain_metrics` 엔드포인트를 통해 실시간 불편도를 조회.
  - 이벤트 트리거: `pain_threshold` (예: 8점 초과) 도달 시 백엔드에서 자동으로 `alert_service` 를 호출하여 솔루션(예: 지원 티켓 생성, 개인화 메일 발송)을 실행하고, 해당 사용자가 겪은 문제를 해결하는 과정을 기록하여 '문제 해결 후 만족도'를 점수에 반영.

---

## 3. 기술 명세와의 일치성 검토 (Technical Spec Alignment)

| 항목 | 기존 명세 (`Trust_Widget_Technical_Spec_V1.0.md`) | 현빈 정량화 논리 요구사항 | 일치 여부/요구 수정 사항 |
| :--- | :--- | :--- | :--- |
| **API 데이터** | `POST /api/v1/trust-score`<br>`Response: { score, factors }` | 점수뿐만 아니라 '이전 거래 이력'과 '현재 세션의 행동'도 고려하여 동적 점수 산출 필요. | 수정 요구: API 문서에 `factors` 필드 설명을 추가하고, `previous_transactions`를 포함하도록 스펙 변경. |
| **데이터 소스** | Redis, PostgreSQL, Kafka | 실시간 데이터가 아닌 24시간 평균값만 제공되면 ROI 계산의 정확도 저하 우려. | 수정 요구: `Kafka topic: trust_updates` 에서 최신 1 초 단위 점수 스트림 제공을 명시하고, 백엔드에서 윈도우 함수로 집계. |
| **UI 연동** | WebSocket 으로 UI 업데이트 (0.5 초 지연) | 지연 시간이 너무 길 경우 사용자 경험 저하 → ROI 측정 왜곡 가능성. | 수정 요구: UI 업데이트 로직은 `WebSocket`이 아닌 `HTTP Polling(최대 1 초)`으로 변경하여 일관성 보장하거나, 지연 시간 200ms 이하를 강제로 유지하는 로직 추가. |

---

## 4. 테스트 프레임워크 및 성공 기준 (Testing Framework & Criteria)

### 4.1 단위 테스트 (Unit Test) - 개발팀
- **목표**: API 로직이 의도한 정량화 함수와 일치하는지 검증.
- **케이스**:
  1. `trust_score = 90`일 때 `CVR_increase`가 5% 이상 상승하는지 확인.
  2. `pain_level = 5`일 때 `churn_reduction`이 15% 가 되는지 확인.
- **도구**: Jest (Frontend), Pytest (Backend)

### 4.2 통합 테스트 (Integration Test) - 개발팀/기획팀
- **목표**: 전체 파이프라인(사용자 행동 → 데이터 수집 → 점수 계산 → UI 표시 → 매출 영향)이 정상 작동하는지 확인.
- **케이스**:
  1. 신뢰 배지가 표시되지 않고 구매 버튼 클릭 시 `trust_score`가 80 이상으로 기록되어 AOV가 상승하는지 모니터링.
  2. PainGauge 경보가 발생했을 때 솔루션이 자동 실행되고, 사용자 이탈률이 실제 감소하는지 (A/B 테스트) 검증.
- **도구**: Selenium, Postman Collection

### 4.3 성능 및 부하 테스트 - 개발팀
- **목표**: 높은 트래픽에서도 점수 계산 지연 시간과 UI 업데이트가 ROI 측정에 영향을 주지 않는지 확인.
- **케이스**:
  1. 동시 접속자 10,000 명 시 Redis 캐시 조회 시간 < 5ms 로 유지.
  2. WebSocket 연결 수명 동안 점수 업데이트 지연이 300ms 이내.

### 4.4 성공 기준 (Definition of Done)
- **기술적**: 모든 단위 및 통합 테스트 통과, API 응답 속도 SLA 충족.
- **비즈니스적**: A/B 테스트 결과 `trust_score`가 있는 그룹이 `CVR`에서 +2% 이상, `pain_level`이 낮은 그룹의 `Churn Rate`이 -5% 이상 개선됨을 통계적 유의성(p-value < 0.05)으로 입증.
- **문서화**: 변경된 API 명세에 `ROI_calculation_logic.md` 를 링크하고, 개발팀이 이를 Git Commit 시 주석 포함하도록 요청.

---

## 5. 다음 단계 및 액션 아이템

1.  **개발팀 (코다리)**: API 명세 수정 (`previous_transactions`, `Kafka topic`) 반영 후 코드 리뷰.
2.  **기획팀**: A/B 테스트 설계서 작성 (Trust Widget 노출 여부에 따른 전환율 차이 측정).
3.  **현빈 (비즈니스 전략가)**: 테스트 프레임워크를 기반으로 개발팀의 구현 상태를 모니터링하고, A/B 테스트 결과에 따라 ROI 계산 로직을 최종 수정할지 결정.

_이 문서는 `sessions/2026-06-22T17-34/ROI_Measurement_Loic_Final.md` 경로로 저장됨._