# 🎨 BDS 플랫폼 - 애니메이션 및 Fallback 최종 명세서 (V4.0)

**작성 목적:** TrustWidget, PainGauge 등 핵심 컴포넌트 로딩 시 발생 가능한 모든 백엔드 상태(로딩, 성공, 오류, 지연)에 대한 통일된 사용자 경험(UX)과 개발 구현 스펙을 확정한다. 본 사양은 최종 디자인 핸드오프 자료이다.

---

## 1. 핵심 원칙 (Core Principles)

| 항목 | 내용 | 기술적 요구사항 |
| :--- | :--- | :--- |
| **일관성** | 모든 로딩 상태는 동일한 시각 언어(Color, Motion Curve)를 사용한다. | 전역 CSS 변수(`--bds-primary`, `--bds-secondary`) 기반으로 구현되어야 한다. |
| **안전마진 (PainGauge)** | 로딩/오류 상태에서도 사용자에게 불안감을 주지 않도록 명확하고 부드러운 애니메이션이 필수이다. | 모든 전환(Transition)은 최소 200ms 이상을 보장한다. |
| **가시성** | 데이터 유무와 상관없이, 컴포넌트의 영역(Container) 자체는 항상 존재감을 유지해야 한다. | `min-height` 및 `padding`을 통해 레이아웃 흔들림(Layout Shift)을 방지한다. |

---

## 2. 애니메이션 스펙: Skeleton Loader (기본 로딩 상태)

Skeleton Loader는 데이터를 불러오는 동안 **'곧 콘텐츠가 나타날 것임'** 을 암시하는 목적의 UI이다.

### 2.1. 구현 사양

*   **Duration:** 300ms ~ 500ms 사이클 반복 (느낌만 주는 것이 중요)
*   **Color:** `--bds-secondary` (옅은 회색, #EAEAEA). 배경과 명확히 분리되나 너무 부자연스럽지 않아야 한다.
*   **Shape:** 콘텐츠의 형태를 추론하여 직사각형(Rectangle)을 사용한다.
    *   `Header:` 16px 높이의 단일 사각형 (가장 넓은 너비)
    *   `Body:` 가로 길이 비율에 따라 2~3개의 사각형 블록 조합
*   **Animation:** `Pulse Effect` 또는 `Shimmer Effect`를 사용한다.
    *   **권장 스펙:** **Shimmer Effect (좌측에서 우측으로 부드럽게 빛이 번지는 효과)**
        *   CSS Keyframe: `transform: translateX(-100%)` 에서 `translateX(100%)` 로 이동하며, 불투명도와 배경색을 동적으로 변화시킨다.
        *   Easing Function: `ease-out` (가장 자연스러운 시작/끝 느낌)

### 2.2. 상태별 전환 타이밍 (Critical Path Timing)

| 상태 | 트리거 이벤트 | 애니메이션 종류 | 지속 시간 (Total) | 시각적 피드백 |
| :--- | :--- | :--- | :--- | :--- |
| **Initial Load** | 컴포넌트 마운트 (`componentDidMount`) | Skeleton Loader 활성화 | 500ms | 부드럽게 진입하는 느낌으로 애니메이션 시작. |
| **Loading Start** | API 호출 요청 직후 | Skeleton Loader 유지 | N/A (데이터가 올 때까지) | 로딩 스피너와 함께 작동하며, 지연 시간 감지. |
| **Success** | 데이터 수신 완료 | Transition Out -> Data In | 300ms | Skeleton이 부드럽게 투명해지면서(Opacity 0) 실제 콘텐츠가 나타나야 한다. (Fade-in 효과 적용) |
| **Error/Fallback** | API 호출 실패 응답 (`4xx`, `5xx`) | Transition Out -> Error UI In | 400ms | Skeleton이 즉시 사라지고, Error 메시지 블록이 부드럽게 나타난다. |

---

## 3. Fallback 시나리오 명세 (State Machine)

모든 핵심 컴포넌트(TrustWidget, PainGauge 등)는 이 상태 전이를 반드시 준수해야 한다.

### 3.1. 상태 정의 및 Flowchart (Conceptual)

`[Initial Mount] -> [Loading State] -> (Success / Error / Timeout)`

### 3.2. 상세 Fallback 시나리오 명세 (Implementation Details)

#### Scenario A: Success (성공적인 데이터 수신)
*   **Trigger:** 백엔드로부터 유효한 JSON 데이터를 받음.
*   **Action:**
    1.  Skeleton Loader의 애니메이션을 400ms에 걸쳐 부드럽게 감소(Decay).
    2.  실제 콘텐츠 레이아웃이 Skeleton 영역 내에서 **Fade-in (opacity: 0 to 1)** 효과와 함께 나타난다.
*   **개발 가이드:** `onSuccess` 콜백에서 이 트랜지션 로직을 트리거한다.

#### Scenario B: API Error (서버 오류 또는 클라이언트 요청 실패)
*   **Trigger:** HTTP Status Code 4xx, 5xx 응답 수신 (예: Rate Limiting 초과).
*   **Action:**
    1.  Skeleton Loader를 즉시 종료하고(Hard Stop), 애니메이션을 중단시킨다.
    2.  Error Component 블록이 **Fade-in** 하며 나타난다.
    3.  사용자에게 '왜' 실패했는지 (예: "요청 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.")를 명확히 안내한다.
*   **개발 가이드:** 에러 코드에 따라 메시지를 동적으로 변경할 수 있는 `ErrorComponent` 컴포넌트를 사용해야 한다.

#### Scenario C: Timeout/Stale Data (지연 또는 데이터 무효화)
*   **Trigger:** API 응답이 설정된 최대 시간(예: 4초) 이상 지연되거나, 최신 데이터를 가져오지 못한 경우.
*   **Action:**
    1.  Skeleton Loader를 유지하되, 로딩 스피너가 **'점점 빨라지는'** 느낌을 주어 (시간이 흐르고 있음) 사용자 이탈을 방지한다.
    2.  최대 대기 시간 초과 시, Scenario B (API Error)와 동일하게 Fallback 처리하며 "데이터를 가져오는 데 시간이 너무 오래 걸립니다." 메시지를 띄운다.

---
**[개발팀 참고 사항]**
*   CSS Transition/Animation은 반드시 하드웨어 가속(Hardware Acceleration)을 사용하여 부드러움을 극대화해야 합니다. (e.g., `transform: translateZ(0);`)
*   모든 컴포넌트의 Fallback 상태는 사용자가 **직접 액션을 취할 수 있는 옵션** (예: 재시도 버튼, 설정 변경 안내)을 포함해야 합니다.