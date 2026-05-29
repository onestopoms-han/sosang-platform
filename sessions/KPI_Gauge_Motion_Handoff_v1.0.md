# 🎨 KPI Gauge Motion Design System Handoff (V1.0)
## 🎯 목표: 소상공인의 'Pain $\rightarrow$ Solution' 감정적 전환 시각화
본 모션 가이드는 `KPI_Gauge_Final_DevSpec_v1.0.md`에 정의된 로직을 기반으로, 단순 상태 변화를 넘어 사용자에게 **감성적인 안도감과 행동 유도**를 주는 애니메이션 구현을 목표로 합니다.

---

### 🧩 1. 디자인 토큰 & 상태 정의
| State | KPI 범위 (Data Contract) | 색상 코드 (Hex/Name) | 감정적 의미 (Emotion) | 모션 목적 (Goal) |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | 0% ~ 30% (경고 임계치 하회) | `#D9534F` (Pain Red) | 불안, 위기감 (Anxiety) | 즉각적인 주의 환기 및 문제 인식 유도. 강한 시각적 충격 필요. |
| **Warning** | 31% ~ 70% (주의 임계치 내) | `#F0AD4E` (Caution Orange) | 우려, 고민 (Concern) | 행동 변화의 필요성을 느끼게 함. 점진적인 상승 기대감 조성. |
| **Stable** | 71% ~ 100% (안정/성장 영역) | `#5CB85C` (Solution Green) | 안도, 성공 (Relief) | 안정감을 제공하며 '이것이 목표'임을 시각적으로 확인시켜줌. |

### 🚀 2. 핵심 모션 스펙: 상태 전환 (Transition Animation)
가장 중요한 것은 **상태 변화 자체**입니다. Gauge의 움직임은 다음 세 가지 애니메이션 패턴을 따릅니다.

#### A. Critical $\rightarrow$ Warning (Pain 완화 단계)
*   **트리거:** KPI 값이 30%를 넘어 45%로 상승하는 순간.
*   **애니메이션:** '위기감'이 '관심'으로 전환됨을 표현합니다.
    1.  **Initial Jolt (충격):** Gauge가 Critical 상태에 머물 때, 미세한 떨림(Oscillation) 효과를 0.5초 동안 적용하여 위기감을 유지합니다.
    2.  **Transition Motion:** KPI 값 상승 시, 단순히 선이 그려지는 것이 아니라 **'압력이 풀리듯 부드럽게 수평적으로 확장되는 느낌'**으로 구현합니다.
*   **파라미터:**
    *   `Duration`: 1.5초
    *   `Easing`: `easeOutQuint` (빠르게 시작하여 느려지며 안정화)

#### B. Warning $\rightarrow$ Stable (성장 및 안도 단계)
*   **트리거:** KPI 값이 70%를 넘어 85%로 상승하는 순간.
*   **애니메이션:** '고민'이 '안정'으로 바뀌는 경험을 표현합니다.
    1.  **Momentum Shift:** Gauge의 색상 변화와 함께, 마치 **'물리학적 경계(Physical Barrier)'를 넘어 목표 지점에 도달하는 듯한 묵직함**을 부여합니다.
    2.  **Target Lock:** 최종 Stable 값에 도달할 때, 애니메이션이 갑작스럽게 멈추는 것이 아니라, Green 색상의 **'미세하고 잔잔한 진동(Subtle Pulse)'** 효과를 1초간 주어 '지속 가능한 안정성'을 강조합니다.
*   **파라미터:**
    *   `Duration`: 2.0초 (가장 길게 설정하여 중요도를 높임)
    *   `Easing`: `easeInOutCubic` (부드럽고 예측 가능한 움직임)

#### C. Stable $\rightarrow$ Critical/Warning (경고 발생 단계 - Fallback)
*   **트리거:** KPI 값이 하락할 때.
*   **애니메이션:** '안정'함이 깨지는 순간의 충격과 경각심을 표현합니다.
    1.  **Decay Effect:** Green 색상에서 Red/Orange로 떨어질 때는, 마치 **'에너지가 급격히 새어 나가는(Energy Leakage)' 듯한 부드러우면서도 급박한 모션**이 필요합니다.
*   **파라미터:**
    *   `Duration`: 1.0초 (빠르게 진행되나, 급하진 않은 느낌)
    *   `Easing`: `easeInQuad` (느리게 시작하여 빠르게 하락)

### 💻 3. 코다리 개발팀 핸드오프 가이드라인
**대상:** 프론트엔드 개발팀 (코다리)
**요청 사항:** 아래의 파라미터 값을 기준으로 애니메이션 컴포넌트를 구현해야 합니다. 단순 CSS Transition이 아닌, Framer Motion 또는 유사한 라이브러리의 커스텀 타이밍 로직을 사용해 주세요.

1.  **[Must-Have] 데이터 기반 트리거:** 모든 모션은 반드시 API/데이터 스트림의 KPI 값 변화에 의해 시작되어야 합니다.
2.  **[Motion Logic] State Listener 구현:** 컴포넌트가 마운트될 때 초기값(Critical)부터 현재 값까지 도달하는 과정을 한 번의 'Initial Load Motion'으로 처리할 수 있도록 설계해주세요. (이 모션은 전체 전환 로직보다 약간 짧고 부드럽게 설정합니다.)
3.  **[Performance] 성능 최적화:** 모든 애니메이션은 `will-change: transform, opacity`를 적용하여 GPU 가속을 최대한 활용해야 합니다.

---