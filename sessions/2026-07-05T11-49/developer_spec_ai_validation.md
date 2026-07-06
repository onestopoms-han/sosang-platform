# ⚙️ AI 예측 및 StoryFlowSchema 기술 명세 보완 (V2.0)

## 🎯 목표
AI 예측 결과가 단순한 진단이 아닌, **사용자에게 실질적인 행동 유도 가치(Value Proposition)**를 제공하도록 API 계약과 로직을 정의한다. 이는 유튜브 콘텐츠에서 강조할 '과학적 증명'의 기술적 기반이 된다.

## 1. StoryFlowSchema 상세화 (Conditional Logic Map)
`StoryFlowSchema`는 단순 결과 전달이 아닌, 다음 단계로의 **조건부 전환(State Transition)**을 명시해야 한다. 각 상태 변화는 특정 예측 값에 의해 트리거되어야 하며, 이는 프론트엔드의 조건부 렌더링(Conditional Rendering)을 제어한다.

**추가 필드 정의:**
*   `required_next_step`: 다음 단계로 넘어가기 위한 필수 조건 (예: `{"risk_level": "High"}` $\rightarrow$ `"ActionPlan_Step_1"`).
*   `justification_code`: 해당 상태 전환이 발생한 **AI 예측의 근거가 되는 구체적인 지표 코드** (예: `LTV_Risk_Score > 0.8`). 이는 백엔드 계산 로직을 추적하는 데 사용된다.

## 2. premium_value_proposition 강화 (Value Mapping)
`premium_value_proposition` 필드는 AI 예측 결과가 사용자에게 제공하는 **정량화된 이점**으로 직접 매핑되어야 한다. 감성적 카피가 아닌, 측정 가능한 데이터 기반의 가치로 구성한다.

| 플랜 레벨 | 핵심 가치 (Value Proposition) | AI 예측 연동 지표 (Metric Link) | 백엔드 계산 로직 연결 |
| :--- | :--- | :--- | :--- |
| **Entry** | 기본적인 위험 인지 및 초기 대응 방안 제공. | `Diagnosis_Result`의 기본 점수 | 단순 임계값 비교 |
| **Premium** | **손실 최소화 예측 및 최적 경로 제시.** | `LTV_Risk_Score`, `Time_to_Recovery_Estimate` | 복잡한 회귀 분석 모델 결과 |
| **Core Value** | **경쟁 우위 확보를 위한 전략적 조언.** | `Gap_Analysis_Index`, `Competitive_Advantage_Score` | 시장 데이터 및 경쟁사 벤치마킹 연동 |

## 3. Validation Layer 명세 (Trust & Safety)
AI 예측의 신뢰도를 보장하기 위해, API 응답 시 다음 항목에 대한 검증 로직을 반드시 포함해야 한다. 이는 '손실 최소화' 디자인 가이드라인과 직결된다.

*   **`Risk_Score` Validity Check:** 계산된 위험 점수가 시스템이 정의한 최대/최소 범위 내에 있는지 검증. (예: $0 \le Risk\_Score \le 1$)
*   **`Forecast_Stability` Check:** 예측 결과의 안정성을 나타내는 지표(예: 예측 변동성)를 함께 반환하여, 사용자가 예측의 불확실성을 인지하게 한다. 이는 `PainGauge` 시각화에 직접 반영된다.
*   **Error Handling Logic:** 예측 실패 또는 데이터 부족 시, 시스템은 **'불확실성 경고(Uncertainty Warning)'** 메시지를 반환해야 하며, 단순 오류 코드(`500`) 대신 비즈니스 맥락의 에러 코드를 제공해야 한다.

## 4. 기술적 구현 요구사항 (Implementation Requirement)
백엔드 서비스 레이어는 모든 예측 결과에 대해 최소한 다음 세 가지를 기록하고 출력해야 한다.

1.  **Prediction Output:** 최종 위험 점수 및 예측 경로 (`StoryFlowSchema` 기반).
2.  **Confidence Score:** 해당 예측에 대한 모델의 신뢰도 점수 (0.0 ~ 1.0).
3.  **Traceability Log:** 예측에 사용된 주요 입력 데이터 및 가중치(Weight)의 요약 로그.

이 명세대로 백엔드 로직을 설계하고 구현해야, 유튜브에서 강조할 **'과학적 증명'**을 기술적으로 뒷받침할 수 있다.