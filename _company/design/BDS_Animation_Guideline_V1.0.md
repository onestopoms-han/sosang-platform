# 📐 BDS 디자인 시스템: 애니메이션 가이드라인 (V1.0)

## 🎯 목표
본 가이드라인은 Trust Widget 및 PainGauge 컴포넌트가 사용자에게 '신뢰'와 '위험도 변화'를 시각적, 감성적으로 효과적으로 전달하기 위해 정의된 모든 동적 상호작용(Interaction)의 표준을 확립한다. 모든 애니메이션은 다음 디자인 토큰을 기반으로 일관성을 유지해야 한다.

*   **Primary Color:** `--color-primary` (신뢰/긍정 변화)
*   **Danger Color:** `--color-danger` (경고/위험 상태)
*   **Success Color:** `--color-success` (안정화/성공 상태)
*   **Spacing:** `--spacing-unit-*x`

---

## ⏱️ 공통 애니메이션 원칙 (Global Principles)

1.  **지속 시간 (Duration):** 모든 주요 데이터 변화는 짧고 부드러워 사용자가 인지하기 어려울 정도로 빠르게 진행되어야 한다. 기본 지속 시간은 **200ms**를 표준으로 채택한다.
2.  **가속도 곡선 (Easing Curve):** '부드럽게 시작하여 자연스럽게 멈추는' 느낌을 주기 위해 `ease-out` 또는 `cubic-bezier(0.4, 0, 0.2, 1)` 계열의 커브를 기본으로 사용한다.
3.  **Scroll Trigger:** 데이터 변화에 따른 애니메이션은 반드시 사용자 액션이나 스크롤 위치와 연관되어 발생해야 한다. (단순 페이지 로드 시점에는 최소한의 '페이드인'만 적용)

---

## 🟢 컴포넌트별 상세 명세 (Component-Specific Specs)

### 1. Trust Widget 애니메이션 가이드라인

**A. 초기 로딩 및 데이터 표시 (Initial Load & Data Display)**
*   **상태:** Skeleton Loader -> 실제 값 (e.g., '92점')으로 전환될 때
*   **액션:** Placeholder가 마치 채워지듯이 부드럽게 나타나야 한다.
*   **명세:**
    *   `opacity`: 0에서 1로 **Fade In** (Duration: 300ms, Easing: ease-out).
    *   `scale`: 0.98에서 1.0으로 **Pop Up** 효과를 주어 생동감을 더한다. (Duration: 250ms).
    *   **애니메이션 원리:** '점진적 채움(Progressive Fill)' 애니메이션을 활용하여 점수 숫자가 자석처럼 튀어나오며 완성되는 느낌을 준다.

**B. 실시간 값 변화 감지 (Real-Time Value Change)**
*   **상태:** 기존 점수 (e.g., '80점') $\to$ 새 점수 (e.g., '92점')로 변화할 때
*   **액션:** 숫자가 튕기듯(Snapping) 증가하거나 감소하며 시선을 사로잡는다.
*   **명세:**
    *   `Number Animation`: 단순한 `transition: transform` 대신, **카운터 애니메이션 (Counter Animation)**을 사용하여 점수가 '0'부터 목표 값까지 빠르게 계산되어 채워지는 듯한 효과를 구현한다.
    *   `Duration`: 300ms.
    *   `Color Highlight`: 값이 임계점(Threshold)을 넘어 변화할 경우, 해당 숫자에 `--color-primary`의 **펄스 효과 (Pulse Effect)**를 2회 적용하여 강조한다.

**C. 위험 경고 상태 전환 (Risk Alert Transition: Green $\to$ Red)**
*   **상태:** 점수가 안정적인 구간(Green)에서 위험 임계점(Red)으로 급격히 하락할 때
*   **액션:** 시각적 충격을 주어 사용자에게 즉시 주의를 환기시킨다. (가장 중요한 애니메이션)
*   **명세:**
    *   `Color Flash`: 배경색이나 테두리 색상이 Green에서 Red로 전환될 때, **Flash 효과** (100ms 동안 짙은 어두운 계열의 오버레이를 주고 즉시 Red로 복귀)를 적용한다.
    *   `Shake Effect`: 점수가 급락하는 순간(Critical Drop), 위젯 전체가 축소/확대되는 미세한 **진동 (Subtle Shake)** 애니메이션을 2~3회 반복하여 경고의 심각성을 높인다.
    *   **사운드 디자인 연계:** 이 전환 시점에 낮은 주파수의 '경고음(Warning Tone)' 사운드를 동기화한다.

---

### 2. PainGauge (진단 게이지) 애니메이션 가이드라인

**A. 초기 로딩 및 데이터 채움 (Initial Load & Gauge Filling)**
*   **상태:** 빈 게이지 $\to$ 실제 진단 결과 값으로 차오를 때
*   **액션:** 마치 물이 담기듯(Liquid Fill) 부드럽게 가득 찬다.
*   **명세:**
    *   `Fill Animation`: 게이지 바의 시작점부터 끝점까지 값이 채워지는 애니메이션을 구현한다. (Duration: 400ms, Easing: ease-out).
    *   `Gradient Transition`: 게이지가 차오르는 과정에서 단순히 색이 변하는 것이 아니라, `--color-primary`에서 점진적으로 위험도에 따른 컬러 팔레트(Yellow $\to$ Red)로 **그라디언트 전환**되는 효과를 추가한다.

**B. 값 변화 감지 (Value Change)**
*   **상태:** 게이지 값이 조정되거나 재측정될 때
*   **액션:** 게이지 바의 끝점(Pointer/Indicator)이 부드럽게 이동하며 이전 위치와 새로운 위치를 연결하는 궤적을 그린다.
*   **명세:**
    *   `Smooth Trajectory`: 포인터가 움직이는 궤적은 단순 선형 이동이 아닌, **곡선형 경로(Curved Path)**로 부드럽게 움직인다. (Duration: 350ms).

---

## ✅ 요약 및 개발 지침 (Handoff Summary)

| 컴포넌트 | 상태 변화 | 핵심 애니메이션 효과 | Duration / Easing |
| :--- | :--- | :--- | :--- |
| **Trust Widget** | 초기 로딩 | Fade In + Pop Up (점진적 채움) | 300ms / ease-out |
| **Trust Widget** | 값 변화 | 카운터 애니메이션 + Pulse Highlight | 300ms / N/A |
| **Trust Widget** | 위험 경고 (Green $\to$ Red) | Flash Effect + Subtle Shake | 100ms (Flash) + 반복 |
| **PainGauge** | 초기 로딩 | Liquid Fill Gradient Transition | 400ms / ease-out |
| **PainGauge** | 값 변화 | Curved Path Trajectory | 350ms / ease-in-out |