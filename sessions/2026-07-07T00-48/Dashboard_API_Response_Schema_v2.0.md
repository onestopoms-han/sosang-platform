## Dashboard API Response Schema v2.0: 상태 전환 및 가치 측정 명세서

**목적**: 프론트엔드 컴포넌트(`KPI-Card`, `TrendGraph`)가 백엔드에서 받은 데이터를 기반으로 시각화하고, 사용자의 '불확실성 해소 경험'을 감성적으로 표현할 수 있도록 상태 변화(Deep Blue $\rightarrow$ Gold/Amber)와 측정 지표를 명확히 정의합니다.

### 1. Core Metrics (핵심 지표)
- `risk_level`: 현재 진단된 위험 수준 (예: 'High', 'Medium', 'Low').
- `uncertainty_reduction_score`: 사용자가 경험한 불확실성 감소량 (0.0 ~ 1.0). **(핵심 성과지표)**
- `time_to_recovery_days`: 회복에 소요된 예상 시간 (사용자 설정 및 모델 기반 예측).

### 2. Value Proposition Metrics (가치 제안 지표)
- `premium_benefit_actual`: 사용자가 현재 플랜에서 경험하고 있는 실제 가치 증분 (예: 월 $49 $\rightarrow$ $79$). **(수익 모델 연동)**
- `action_blueprint_completion`: 설정된 액션 플랜의 완료율 (0.0 ~ 1.0).

### 3. State Transition Metrics (상태 전환 지표)
- `current_state`: 현재 사용자의 감성적 상태 (Enum: 'Blue\_Crisis', 'Amber\_Recovery', 'Gold\_Mastery'). **(UI/UX 애니메이션 직접 연동)**
- `transition_progress`: 현재 상태로의 전환 진행률 (0.0 ~ 1.0).
- `recovery_momentum`: 회복 동력 지표 (시스템이 다음 단계로 나아가도록 유도하는 동적 값).

### 4. Predictive Insights (예측 통찰)
- `predicted_outcome`: 현재 추세에 기반한 향후 $N$일 예측 결과 (Text 또는 Score).

---
**[참고] 데이터 흐름 설명:**
백엔드는 진단 엔진과 ROI 계산 로직(`roiCalculator.ts`)을 통해 위의 모든 지표를 산출합니다. 프론트엔드는 이 데이터를 받아 `current_state`와 `transition_progress`에 따라 Motion Spec (`designer.md` 기반)을 트리거하여 애니메이션을 구현합니다.

<edit_file path="sessions/2026-05-21T12-12/developer.md"><find>
## 4. 기술적 검증 및 리스크
...
*   **코다리는 확정된 데이터 시각화 명세서(`Growth Roadmap`, `ROI 결과`)와 ROI 계산 로직(`roiCalculator.ts`)을 기반으로, 프론트엔드 컴포넌트가 API 응답 데이터를 정확하게 받아 시각화하도록 백엔드-프론트엔드 통합 작업을 즉시 진행하고 기능 통합 테스트를 완료하라.</find><replace>## 4. 기술적 검증 및 리스크
...
*   **코다리는 확정된 데이터 시각화 명세서(`Growth Roadmap`, `ROI 결과`)와 ROI 계산 로직(`roiCalculator.ts`)을 기반으로, 프론트엔드 컴포넌트가 API 응답 데이터를 정확하게 받아 시각화하도록 백엔드-프론트엔드 통합 작업을 즉시 진행하고 기능 통합 테스트를 완료하라.</replace></edit_file>