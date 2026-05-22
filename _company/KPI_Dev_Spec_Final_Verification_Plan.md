# 🚀 최종 KPI 검증 계획서 (Development Sign-off Required)
**작성자:** 현빈 (Head of Business, 비즈니스 전략가)
**목표:** `KPI_Dev_Spec.md`에 정의된 모든 핵심 성과 지표(KPI)의 계산 로직이 실제 데이터 플로우를 거쳐 정상적으로 작동하는지 최종 검증 및 승인 확보.

---

## 🎯 1. 테스트 범위 개요 및 목표
**현재 상황:** `test_e2e_funnel.py`에서 구문 오류 발생으로 전체 통합 테스트 불가. (👉 개발팀: 코다리 에이전트가 먼저 SyntaxError 수정 후 재시도 필요)
**검증 목적:** 코드 실행 여부를 떠나, **비즈니스 관점**에서 모든 KPI 산출 값이 예상 로직을 따르는지 검증하는 것이 핵심입니다.

## 🛠️ 2. 세부 모듈별 최종 검증 체크리스트 (Checklist for QA)
개발팀은 다음의 [Input 데이터]가 들어왔을 때, [Output 값]이 정확히 계산되는지 단위 테스트(Unit Test)를 진행해야 합니다.

### A. Pain Point Score (PainPointService Module) - 핵심 로직
*   **[Input 데이터]:** `current_revenue` (현재 매출), `estimated_loss_cost` (추정 손실 비용).
*   **[핵심 검증 로직]:** 손실 비용이 특정 임계값(Threshold)을 넘었을 때, Pain Point Score가 급격하게 상승하며 Action Plan의 필요성을 강제적으로 인식시키는지 확인.
*   **[검증 케이스 1 (Low Risk)]:** `estimated_loss_cost` = 0원일 때, Pain Point Score는 최소치(Min)여야 함.
*   **[검증 케이스 2 (Critical Risk)]:** `estimated_loss_cost`가 평균 매출 대비 N% 초과할 경우, Pain Point Score가 최대치에 근접하게 계산되어야 함.

### B. Action Plan Generator (ActionPlanService Module) - 결과 도출 로직
*   **[Input 데이터]:** Pain Point Score 및 소상공인 유형(업종/매장 크기).
*   **[핵심 검증 로직]:** Pain Point Score에 비례하여 '손실 최소화' 또는 '역량 강화' 초점이 명확히 분리되어 Action Plan이 제시되는지 확인.
    *   *예:* 손실 비용이 높으면 $\rightarrow$ **Action Focus: 손실 최소화 (보험료 개념 도입)**
    *   *예:* 매출액은 안정적이나 성장이 정체되면 $\rightarrow$ **Action Focus: 역량 강화 (마이크로 성공 유도)**

### C. ROI/KPI 추적 및 시각화 (DashboardModule) - 데이터 흐름 로직
*   **[Input 데이터]:** Pilot Program 참여자의 행동 로그 데이터(클릭률, AOV 등).
*   **[핵심 검증 로직]:** KPI 측정값이 **'손실 비용 절감 효과'**에 기여하는 방식으로만 계산되어야 합니다. 단순히 '매출 증가율' 같은 일반 지표는 배제하고, 최초의 Pain Point가 해소되는 과정(예: AOV 상승 $\rightarrow$ 손실 위험 감소)을 추적해야 함.
*   **[특이사항]:** 모든 데이터 시각화는 Red/Green 대비를 사용하여 **위험도와 개선 여부**를 즉각적으로 인지시키는 데 최적화되어야 합니다.

## 📝 3. 개발팀 요청 사항 (Action Items)
1.  `test_e2e_funnel.py`의 구문 오류(`SyntaxError`) 수정 및 재실행하여 기본 데이터 흐름을 확보해 주십시오.
2.  위 체크리스트에 명시된 **모든 비즈니스 로직 계산 공식(Formula)**을 Unit Test 레벨에서 100% 커버리지로 테스트 코드를 작성하고 검증 결과를 보고해 주십시오.

---