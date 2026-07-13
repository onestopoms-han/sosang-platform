# E2E Test Plan: PLRI Risk Recovery Journey Flow Validation

## 🎯 목표
`/api/plri_score` 엔드포인트의 리스크 시뮬레이션 결과 및 '위기 극복 여정' 단계별 데이터 흐름(`flow_steps`)이 백엔드 로직과 프론트엔드 상태 변화에 완벽하게 일치하는지 검증한다.

## ⚙️ 테스트 환경
- **Endpoint:** `/api/plri_score` (Mocked Environment)
- **Test Suite:** Integration Test & State Transition Validation

## 📝 테스트 시나리오 및 케이스 (Test Cases)

### Scenario 1: Successful High-Risk Flow Completion (Success Path)
**목표:** 시스템이 정상적인 리스크 분석부터 최종 실행 단계까지의 모든 단계를 성공적으로 처리하는지 확인한다.
**입력 데이터:** 고위험(High Risk)으로 설정된 초기 진단 입력 데이터를 사용한다.
**검증 항목:**
1.  **API 응답 검증:** `/api/plri_score` 응답에 `flow_steps` 배열이 정확히 4단계로 반환되는지 확인한다.
2.  **상태 전환 검증:** 각 `step_id` (1, 2, 3, 4)가 순차적으로 논리적인 상태 변화(Action Required)를 반영하는지 확인한다.
3.  **비용/효과 연동 검증:** `solution_package` 내의 비용(`cost_estimate`) 및 기대 효과(`expected_benefit_metric`)가 입력된 리스크 레벨에 따라 적절하게 계산되어 반환되는지 확인한다.
4.  **시각적 경고 검증:** `risk_visualization` 섹션의 상태 색상(`status_color`)이 'High Risk'에 해당하는 빨간색 계열로 정확히 설정되었는지 확인한다.

### Scenario 2: Low-Risk Flow Completion (Success Path)
**목표:** 낮은 리스크 상황에서도 동일한 흐름이 논리적으로 작동하고, 결과가 적절하게 반영되는지 확인한다.
**입력 데이터:** 저위험(Low Risk)으로 설정된 초기 진단 입력 데이터를 사용한다.
**검증 항목:**
1.  **API 응답 검증:** `flow_steps`의 구조는 동일하며, 최종 단계(`step_id: 4`)에서 'Solution Recommendation'이 낮은 비용/효과를 제시하는지 확인한다.
2.  **UI/UX 일관성 검증:** 결과 시각화 메시지가 경고(Warning) 또는 정보 제공(Info) 수준으로 변경되었는지 확인한다.

### Scenario 3: Negative Testing - Invalid Input (Failure Path)
**목표:** 유효하지 않거나 비논리적인 입력이 들어왔을 때 시스템의 오류 처리 로직이 안전하게 작동하는지 검증한다.
**입력 데이터:** `risk_score` 필드에 숫자가 아닌 문자열 또는 정의되지 않은 값(예: 'Error' 또는 10000)을 입력한다.
**검증 항목:**
1.  **Schema Validation Check:** JSON Schema 기반 유효성 검사(`JSON Schema`의 제약 조건)가 실패하고, API는 명확한 오류 응답 코드와 메시지(예: `400 Bad Request`, `"risk_score" must be an integer`)를 반환하는지 확인한다.
2.  **Flow Halt Check:** 입력 유효성 검사 실패 시, `flow_steps` 배열은 반환되지 않거나, 'Error' 상태의 특정 메시지를 반환하여 후속 처리(Solution Recommendation)가 중단되는지 확인한다.

### Scenario 4: Cost/Benefit Logic Integrity (Data Integrity Check)
**목표:** 비용 및 기대 효과 계산 로직(`roiCalculator.ts` 연동 부분)이 정확한 수학적 결과를 도출하는지 검증한다.
**입력 데이터:** 특정 리스크 레벨(예: High Risk)과 가상의 투자 금액을 입력한다.
**검증 항목:**
1.  **ROI 계산 검증:** `cost_estimate`와 `expected_benefit_metric`이 PLRI 모델의 내부 공식에 따라 정확하게 산출되었는지 수동으로 교차 검증한다. (예: 35% 위험 감소가 실제로 비용 절감액과 비례하는지 확인)
2.  **데이터 흐름 추적:** 입력 데이터 $\to$ `roiCalculator` $\to$ 최종 응답의 경로를 로그 또는 중간 변수를 통해 추적하여 데이터 누락이 없는지 검증한다.

## 🚀 실행 명령어 제안
이 테스트 계획을 기반으로, Mock API 서버(예: JSON Server 또는 Mock Service Worker)를 설정하고, Postman/Insomnia 또는 자체 테스트 스크립트를 사용하여 각 시나리오를 자동화하는 코드를 작성할 것을 권장합니다.

**권장 다음 액션:**
1.  `sessions/plri_e2e_test_plan.md`에 명시된 모든 검증 항목을 포함하는 **Python 기반 통합 테스트 스크립트**(`test_plri_flow.py`)를 작성하여, Mock API 환경에서 실제 데이터 흐름과 로직의 정확성을 자동화합니다.
2.  이 테스트 스크립트를 Git에 커밋하고 공유합니다.