# BDS 소상공인 플랫픔 - 안전 마진 KPI 대시보드 디자인 시스템 가이드라인 (V1.0 FINAL)

## 🎯 1. 목적 및 원칙 (Source of Truth)
본 문서는 '안전 마진(Safety Margin)' 핵심 지표를 시각화하는 모든 UI/UX 요소의 최종 기준점이다. 개발팀은 이 가이드를 기반으로 컴포넌트를 구축해야 하며, 디자인 변경 요청은 반드시 이 시스템을 통해 승인되어야 한다.

**[핵심 원칙] 데이터-디자인 일관성 확보:**
1.  모든 색상(Color)과 경고 레벨(Alert Level)은 **PAIN 지표의 계산 결과($A$, $B$)에 직접 연동**된다. (예: PAIN이 높으면, 시스템 전체가 빨간색 계열을 사용해야 한다.)
2.  정보는 '요약 → 상세 → 행동 유도' 순서로 위계화한다.

## 🎨 2. 브랜드 디자인 가이드라인 요약
*   **Primary Color (신뢰/안정):** Deep Blue (#0D47A1) - 기본 배경, 성공 상태의 메인 CTA에 사용.
*   **Secondary Color (경고/위험):** Warning Orange (#FF9800) - 주의 단계 및 개선 필요 영역 강조.
*   **Danger Color (심각):** Red (#D32F2F) - PAIN Level 3 이상, 즉시 조치가 필요한 경우에만 사용.
*   **Typography:** Pretendard (가독성 최우선).

## 📊 3. 핵심 컴포넌트 명세 및 데이터 매핑 규칙

### A. Safety Margin KPI Gauge Component (핵심 지표)
| 요소 | 정의/기능 | 데이터 출처 (API) | 시각적 가이드라인 | 개발 참고 사항 |
| :--- | :--- | :--- | :--- | :--- |
| **Gauge Value** | 최종 안전 마진 점수 ($SM$) | `GET /kpi/sm-score` | 1.0 ~ 5.0 범위로 시각화 (원형 게이지). | 배경색(Background)과 포인터 색상(Pointer)의 명도 변화가 필수. |
| **Color Mapping** | PAIN 레벨에 따른 경고 색상 매핑 | $SM$ 계산 로직 | - 4.0 이상: Deep Blue (#2E7D32, 안정 초록) / 5.0: #0D47A1 (최적의 신뢰) <br> - 2.5 ~ 4.0: Warning Orange (#FF9800) <br> - 2.5 미만: Danger Red (#D32F2F) | 경고 색상 변경 시, 해당 컴포넌트의 **테두리(Border)**와 **텍스트 하단 바**가 모두 영향을 받아야 함. |
| **Tooltip/Hover** | $SM$ 점수 계산에 사용된 핵심 지표 팝업 제공 (A, B) | `GET /kpi/pain-variables` | Deep Blue 배경의 미니 카드를 오버레이. | 사용자에게 "왜 이 점수가 나왔는지"를 직관적으로 설명하는 것이 목표. |

### B. PAIN Variable Cards (진단 지표)
*   **구성:** 2개 카드 (A: Revenue Volatility, B: Cash Flow Error Rate).
*   **레이아웃:** 각 카드는 제목-현재 값(KPI)-상태(Badge)-설명 순서로 구성.
*   **[필수 로직] 상태 배지(Status Badge):**
    *   `PASS`: Deep Blue 배경 / White 텍스트 (안정)
    *   `WARNING`: Warning Orange 배경 / Black 텍스트 (주의/개선 필요)
    *   `CRITICAL`: Danger Red 배경 / White 텍스트 (위험/즉시 조치 필요)

### C. Action Card (행동 유도 시스템)
*   **목표:** KPI를 개선하기 위한 다음 단계(Next Step)를 제안.
*   **조건부 표시 로직:** $SM$ 점수가 **2.5 미만일 때만** 활성화되어야 함.
*   **내용 구성:** "현재 PAIN 레벨이 높습니다. [특정 솔루션/콘텐츠]를 통해 개선할 수 있습니다."와 같은 구체적인 메시지 포함.

## 📐 4. 최종 와이어프레임 레이아웃 구조 (Mockup)
*   **Container Width:** 1200px 기준 (반응형 디자인 필수).
*   **Top Section (KPI 요약):** [Safety Margin Gauge]가 가장 크게 위치하며, 그 옆에 [Action Card]를 배치.
*   **Mid Section (진단 영역):** 두 개의 [PAIN Variable Cards]가 수평으로 나란히 배치됨. 각 카드 아래에는 해당 지표의 원인(Root Cause)을 파악하는 버튼(클릭 시 상세 분석 모달 호출)이 위치해야 함.
*   **Bottom Section (Next Steps):** 플랫픔에서 제공할 수 있는 실질적인 컨설팅/교육 콘텐츠 목록을 배치. 이 영역은 Depth Blue 배경으로 처리하여 안정감을 부여하고, 핵심 서비스로의 트래픽을 유도함.

---