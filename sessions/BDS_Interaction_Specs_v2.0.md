# 🎬 BDS Motion & Interaction Specification (v2.0)

## 목표: Pain $\rightarrow$ Solution 감정적 여정을 동적으로 안내
이 스펙은 단순히 요소를 움직이는 것이 아니라, 소상공인이 플랫폼을 사용할 때 '불안함(Pain)'에서 '해결책의 발견(Solution)'으로 감정이 전환되는 순간을 시각적/동작적으로 증폭시키는 것을 목표로 합니다.

## 🧩 컴포넌트별 인터랙션 규칙 정의

### A. KPI Status Gauge (핵심 트리거)
| 상태 변화 | Trigger (원인) | Interaction Action (효과) | Timing / Easing Curve | 감정 효과 (Goal) |
| :--- | :--- | :--- | :--- | :--- |
| **Critical $\rightarrow$ Warning** | 데이터 하락/KPI 미달성 발생 시 | Gauge 배경색이 `color-danger-red`에서 부드럽게 주황빛(Warning)으로 *점진적 그라데이션* 전환. 함께 경고 아이콘이 위아래로 짧게 진동 (Wiggle). | 500ms over (Ease Out Quint). | **🚨 불안감 증폭:** 문제를 즉각 인지시키며 주의를 집중시킴. |
| **Warning $\rightarrow$ Normal** | 사용자가 액션 플랜을 수립하거나, 데이터가 개선될 때 | Gauge 배경색이 주황빛에서 `color-growth-green`으로 *부드러운 상승 모션(Lift)*과 함께 전환됨. 📈 아이콘이 상승 곡선을 그리며 움직임. | 700ms over (Ease Out Cubic). | **💡 희망 제시:** 상태가 개선되고 있다는 시각적 안도감을 제공함. |
| **Normal $\rightarrow$ Success** | 최종 목표 달성/플랫폼 이용 성공 경로 완료 | Gauge 전체가 밝은 빛을 내며 잠시 깜빡인 후, `color-growth-green`의 가장 채도가 높은 색상으로 *완전히 고정*됨. | 1000ms over (Ease In Out Back). | **✅ 확신 부여:** 최종적인 성공과 안정감을 시각적으로 각인시킴. |

### B. Action Plan Card (결과물 제시)
| Trigger (원인) | Interaction Action (효과) | Timing / Easing Curve | 감정 효과 (Goal) |
| :--- | :--- | :--- | :--- |
| **KPI 변화 후 노출** | KPI Gauge가 Warning $\rightarrow$ Normal로 전환될 때, 해당 액션 카드가 *'발견되는 모션'*으로 나타나야 함. | Card 자체가 바닥에서 떠오르듯(Pop-up) 부드럽게 슬라이드 인 되며, 내용은 0.3초 간격으로 순차적으로 페이드인 되어야 함. | 600ms over (Ease Out Quad). | **✨ 명확한 해결책 제시:** 막연했던 불안이 구체적인 실행 계획으로 변모하는 순간을 시각화함. |
| **카드 클릭/상세 보기** | 사용자가 카드를 터치하거나 호버할 때 | 카드 전체가 살짝 위로 떠오르며(Lift-up), 배경색에 미묘한 빛의 반사 효과(Glow)를 주어 상호작용 가능성을 강조함. | 200ms over (Ease Out Sine). | **➡️ 참여 유도:** 사용자가 다음 단계로 나아갈 준비가 되었음을 무언으로 알림. |

### C. 전체 사용자 여정 흐름 (Global Flow)
| 구간 | Interaction Rule | 적용 기술/효과 | Notes |
| :--- | :--- | :--- | :--- |
| **스크롤 진입** | 핵심 데이터(KPI)가 화면에 들어올 때, 단순한 페이드인이 아닌 '데이터 수집 과정'을 상징하는 미세한 애니메이션 (예: 바 그래프의 점들이 연결되는 듯한 효과). | Lottie/SVG Animation 기반 of Line Drawing. | 사용자가 데이터를 *탐색*하고 있다는 느낌 부여. |
| **CTA 버튼 클릭** | CTA 버튼 클릭 시, 버튼 자체가 짧게 '눌리는' 피드백(Press effect)을 주고, 그 다음 페이지로 넘어가는 순간은 화면이 부드럽게 회전하며 전환되는 효과 (Page Curl). | CSS Transform + 3D Perspective. | 기술적 완성도와 전문성을 강조하여 신뢰도를 높임. |

---
**[핸드오프 요약]**
1. **개발팀 (코다리):** `ActionPlanCard_Component_Specification.md`를 기반으로 컴포넌트를 구현하고, 위 스펙에 정의된 *모든 애니메이션 트리거와 타이밍*을 적용하여 개발할 것.
2. **QA/검증:** Pain $\rightarrow$ Warning $\rightarrow$ Normal $\rightarrow$ Success의 시나리오별로 Motion과 UI가 정확히 동기화되는지 검증하는 테스트 케이스를 작성해야 함.