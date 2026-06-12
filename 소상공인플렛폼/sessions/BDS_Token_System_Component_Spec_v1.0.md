# 🏗️ BDS Design System Component Specification: Trust & Pain Gauge (Developer Handoff)

## 🎯 목표
본 문서는 'Trust Widget' 및 'PainGauge' 컴포넌트가 **디자인 시스템 토큰 기반**으로 모든 상태(A, B, C 등)에서 일관성을 유지하도록 코딩을 위한 최종 사양서입니다. 시각적 요소는 반드시 아래 정의된 디자인 토큰과 로직 흐름에 따라 구현되어야 합니다.

## ⚙️ 핵심 원칙 (Design Token First)
1.  **토큰 우선:** 모든 색상(Color), 간격(Spacing), 타이포그래피(Typography) 값은 하드코딩을 금지하고, 정의된 토큰 변수($token-key)를 사용해야 합니다.
2.  **상태 매핑:** 각 컴포넌트의 상태 변화(State Change)는 로직에 의해 관리되며, 시각적 변경은 해당 상태별 전용 토큰 셋을 활성화하여 구현합니다.

---

## I. Trust Gauge Component Specification (신뢰도 위젯)

**1. 기본 구조 및 레이아웃:**
*   **레이아웃 기준:** `$spacing-xl` 너비, `$spacing-md` 높이의 컨테이너 내부에 배치.
*   **요소 구성:** [Title] - [Gauge Visualization Area] - [Confidence Score Text]

**2. 상태별 토큰 및 로직 매핑 (A/B/C):**

| 상태 | 시각적 의미 (Value) | 주요 색상 토큰 ($token-key) | 경계선(Border) 토큰 | 텍스트 스타일 (Typography Token) | 구현 로직 검증 포인트 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A (높음)** | 신뢰도 높음 / 최적화됨 | `$color-success` (주요 색상) | `$border-radius-lg` | `$font-size-xl`, `$color-text-primary` | 가우지(Gauge) 영역이 80% 이상 채워져야 하며, 애니메이션은 `ease-out` 곡선 적용. |
| **B (중간)** | 신뢰도 보통 / 개선 필요 | `$color-warning` (주의 색상) | `$border-radius-md` | `$font-size-lg`, `$color-text-secondary` | 가우지(Gauge) 영역이 40~80% 사이에 위치해야 하며, `progress-bar`의 애니메이션 속도 제어 필수. |
| **C (낮음)** | 신뢰도 낮음 / 위험 감지 | `$color-danger` (위험 색상) | `$border-radius-sm` | `$font-size-md`, `$color-text-danger` | 가우지(Gauge) 영역이 20% 이하일 경우, 경고 아이콘(`⚠️`)을 함께 표시하는 로직 구현. |

**3. 토큰 예시 (개발팀 참고):**
*   *Background Color:* `background: $token-color-bg-default;`
*   *Success Background:* `background-color: var(--color-success);`
*   *Gradient Effect:* `$gradient-linear-primary` (토큰에 정의된 그라디언트 사용)

---

## II. Pain Gauge Component Specification (어려움 측정 위젯)

**1. 기본 구조 및 레이아웃:**
*   **레이아웃 기준:** Trust Gauge와 동일한 그리드 시스템 적용.
*   **요소 구성:** [Question Prompt] - [Slider/Input Area] - [Pain Level Text]

**2. 상태별 토큰 및 로직 매핑 (A/B/C):**

| 상태 | 시각적 의미 (Value) | 주요 색상 토큰 ($token-key) | 입력 인터랙션 토큰 | 텍스트 스타일 (Typography Token) | 구현 로직 검증 포인트 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A (낮음)** | 어려움 낮음 / 문제 없음 | `$color-success` | `$input-ring-success` | `$font-size-xl`, `[✅]` 아이콘 사용 | 슬라이더가 좌측에 치우쳐야 하며, 마우스 오버(Hover) 시 부드러운 색상 변화 애니메이션 적용. |
| **B (중간)** | 어려움 보통 / 주의 필요 | `$color-warning` | `$input-ring-warning` | `$font-size-lg`, `[⚠️]` 아이콘 사용 | 슬라이더의 값 범위(Range)를 명확히 표시하는 시각적 가이드 라인이 필요. |
| **C (높음)** | 어려움 높음 / 심각한 문제 감지 | `$color-danger` | `$input-ring-danger` | `$font-size-md`, `[🚨]` 아이콘 사용 | 슬라이더가 우측에 치우쳐야 하며, 사용자에게 팝업 경고(Modal Trigger)를 유도하는 로직 연결. |

---
**[핸드오프 검토 체크리스트]**
*   ✅ 모든 컴포넌트의 상태별 색상 코드는 `$color-*` 토큰을 사용했는가? (O/X: [ ])
*   ✅ 간격 및 여백은 `$spacing-*` 토큰을 사용하여 일관성을 유지하는가? (O/X: [ ])
*   ✅ 애니메이션(Transition) 속도와 곡선(`ease-out`, `cubic-bezier`)이 사양서에 정의되었는가? (O/X: [ ])