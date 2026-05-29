# 🚨 KPI Gauge Motion & Emotional Logic Specification v3.0
## 문서 목적 및 범위
KPI Gauge 컴포넌트의 상태 변화(Score Change)에 따른 동적 애니메이션과 사용자 경험(UX) 흐름을 개발팀이 즉시 구현할 수 있도록 기술 사양을 제공합니다. 이 명세는 '감정적 여정'을 물리적인 움직임으로 치환하는 핵심 지침입니다.

## 1. 감성 단계별 로직 매핑
| 상태 | Score Range | 감정 (Emotion) | Color Palette | 목표 애니메이션 효과 |
| :--- | :--- | :--- | :--- | :--- |
| **위기/불안 (Pain)** | $0 \sim 40$점 | 불안, 경고, 위험 인지 | `#DC2626` (Red) $\rightarrow$ `#EF4444` | 급격한 하강, 과도한 진동(Overshoot), 강렬한 시각적 자극. |
| **탐색/고민 (Reflection)** | $41 \sim 70$점 | 주저함, 고민, 정보 필요성 | `#F59E0B` (Amber) $\rightarrow$ `#FBBF24` | 느린 변화(Drift), 수평적 흔들림(Wobble), 일시 정지 효과. |
| **안정/희망 (Solution)** | $71 \sim 100$점 | 안정, 성장, 확신 | `#10B981` (Green) $\rightarrow$ `#34D399` | 부드러운 상승(Ascent), 꾸준한 가속도(Momentum), 완만한 곡선. |

## 2. 애니메이션 상세 사양 (Technical Spec)
### A. KPI Gauge 변화 로직 (`Gauge_Value_Change`)
*   **Duration:** 상태 전환에 따라 **최소 350ms ~ 최대 600ms**를 사용합니다.
*   **Low Score Transition:**
    *   Transition Time: 400ms
    *   Easing Curve: `cubic-bezier(0.6, -0.2, 0.2, 1.5)` (Spring Effect)
    *   Behavior: 값의 변화 폭에 비례하여 진폭이 커지는 진동 (`Shaking` effect)을 적용합니다.
*   **Mid Score Transition:**
    *   Transition Time: 600ms
    *   Easing Curve: `ease-out(t)` (Slow Start)
    *   Behavior: 값 변화 중간에 **150ms의 의도적 정지(Hold)** 구간을 넣어 '고민하는' 듯한 사용자 경험을 구현합니다.
*   **High Score Transition:**
    *   Transition Time: 350ms
    *   Easing Curve: `cubic-bezier(0.2, 1, 0.2, 1)` (Smooth Ascent)
    *   Behavior: 목표값에 도달할 때까지 꾸준한 가속도를 유지하여 안정적인 상승감을 제공합니다.

### B. Action Plan Card 등장 로직 (`ActionPlan_Entrance`)
| 상태 | 애니메이션 유형 | 지연 시간(Delay) | 효과 |
| :--- | :--- | :--- | :--- |
| **Low Score** (경고 발생 시) | `slide-down` + `pop` | 100ms | 게이지와 동시에 강렬하게 등장하며, 사용자의 즉각적 주의를 환기시킵니다. |
| **Mid Score** (정보 탐색 시) | `fade-up` (클릭 기반) | 50ms | 사용자 입력(Click)에 반응하여 부드럽게 올라오며 '선택지'의 느낌을 부여합니다. |
| **High Score** (해결책 제시 시) | `soft-expand` + `fade-in` | 200ms | 게이지가 안정화된 후, 가장 부드럽고 우아하게 등장하여 해결책으로서의 신뢰도를 높입니다. |

## 3. 최종 개발 체크리스트 (Developer Checklist for Kodari)
1.  **[필수] State Machine 구현:** KPI Gauge 컴포넌트를 단순한 값 표시기가 아닌, `STATE_LOW` $\rightarrow$ `STATE_MID` $\rightarrow$ `STATE_HIGH`의 상태 머신(State Machine)으로 설계합니다.
2.  **[기술 요구사항] CSS/SVG Transition 활용:** 모든 애니메이션은 JavaScript 기반의 직접 조작 대신, 브라우저 네이티브 트랜지션 및 키프레임(`@keyframes`)을 사용하여 부드러움과 성능을 최적화해야 합니다.
3.  **[UX 강화] 사운드 연동:** Low Score 상태 진입 시 **`SOUND_WARNING_LOW` (경고음)** 토큰과 애니메이션이 동시에 발동되도록 이벤트를 연결합니다.