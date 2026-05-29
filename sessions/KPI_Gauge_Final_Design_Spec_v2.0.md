# 📐 KPI Gauge 컴포넌트 상세 사양서 (V2.0)
**작성 목적:** 프로토타입을 기반으로, 개발팀(코다리)이 구현할 수 있도록 모든 상태 변화(State Change), 애니메이션 토큰(Motion Tokens), 그리고 시각적 에셋(Visual Assets)을 확정합니다.

---

## 1. 컴포넌트 개요 및 목표
*   **컴포넌트 명:** KPI Gauge (핵심 성과 지표 게이지)
*   **역할:** 소상공인이 현재 처한 비즈니스 상태를 시각적, 감성적으로 즉시 인지하게 하는 핵심 모니터링 위젯.
*   **가장 중요한 원칙:** **Pain $\to$ Solution의 감정적 여정(Emotional Journey)을 애니메이션으로 극대화한다.**

## 2. 시스템 상태 정의 및 색상 토큰 (Color Tokens)
| 상태 | 의미/상황 | 디자인 목표 | 배경색 (Background) | 게이지 바 색상 (Gauge Bar Color) | 경고 아이콘/텍스트 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **🟢 Solution** (안정) | 정상 범위, 성장 중. 목표 달성 가능성이 높음. | 신뢰감, 긍정적 안정감 | `#E8F5E9` (Light Green) | `#4CAF50` (Stable Green) | ✅ OK / '준비 완료' |
| **🟡 Warning** (주의/경고) | 주의 필요, 관리가 필요한 구간. 행동 변화가 요구됨. | 경계심 유발, 집중 요구 | `#FFF3E0` (Light Orange) | `#FFC107` (Warning Yellow) | ⚠️ WARNING / '점검 필요' |
| **🔴 Critical** (위험) | 심각한 위험 구간, 즉각적인 조치 필요. | 긴급함, 위협 감지 | `#FFEBEE` (Light Red) | `#F44336` (Danger Red) | 🚨 CRITICAL / '즉시 대응' |
| **🔵 N/A** (정보 없음) | 데이터 미수집 또는 측정 불가. | 중립적, 정보 요청 | `#E0F7FA` (Light Blue) | `#03A9F4` (Info Blue) | ❓ NO DATA / '데이터 입력 필요' |

## 3. Motion Tokens 및 애니메이션 사양 (핵심 개발 가이드)
**개발자는 모든 상태 변화(Transition)에 아래의 Motion Token을 적용해야 합니다.**

### A. 데이터 로딩/초기화 애니메이션 (Initial Load Animation)
*   **요소:** 게이지 바 전체
*   **동작:** 0% $\to$ 현재 값까지 부드럽게 채워지며(Fill), 값이 커지는 느낌을 주는 것이 중요함.
*   **규격:** `Duration: 800ms`, `Timing Function: cubic-bezier(0.25, 1, 0.5, 1)` (ease-out)

### B. 상태 변화 애니메이션 (State Transition Animation) - **가장 중요!**
*   **상황:** 예시로 'Solution $\to$ Warning'으로 변경될 때
*   **동작:** 단순히 색상이 바뀌는 것이 아니라, 게이지 바의 *위치/색조(Hue)*가 부드럽게 이동하는 느낌을 주어야 함.
*   **규격:** `Duration: 400ms`, `Timing Function: ease-in-out` (부드러운 감속)
    1.  *(Step 1: Color Shift)* 현재 색상(Solution Green) $\to$ 목표 색상(Warning Yellow)으로 **색상이 부드럽게 전환**된다.
    2.  *(Step 2: Position/Size)* 게이지 바가 해당 상태에 맞는 위치로 이동하며, 이 과정에서 시각적인 '떨림'이나 '점프'가 없도록 **선형적(Linear)** 움직임을 유지한다.

### C. 경고 발생 애니메이션 (Error/Warning Trigger)
*   **상황:** Critical 상태로 진입하거나, Warning 팝업이 나타날 때.
*   **동작:** 시각적 강렬함을 주어 사용자의 주의를 즉시 집중시킨다.
*   **규격:** `Duration: N/A` (즉각적) + **Red Flicker (빨간색 깜빡임)** 효과 적용 (CSS `animation: flash 1s infinite alternate;`).

## 4. 핵심 컴포넌트 구조화 및 레이아웃 가이드라인
*   **레이아웃:** 전체를 하나의 카드(Card) 형태로 구성합니다.
    *   [상단] **메인 게이지 바 (Gauge Bar):** 가장 큰 시각적 요소. 색상 변화가 최우선.
    *   [중앙] **수치 표시 영역 (Value Display):** 현재 측정된 수치를 굵고 크게 표시 (`h1`급). 상태에 따라 텍스트 색상을 변경합니다.
    *   [하단] **추세 설명/액션 버튼:** 'Warning'나 'Critical'일 경우, 해당 상태의 의미와 함께 *구체적인 해결책(Action Item)*을 담은 CTA 영역이 자동 활성화됩니다.

## 5. 에셋 및 토큰 목록 (Assets & Tokens)
| 토큰 종류 | 이름/값 | 사용처 | 비고 |
| :---: | :---: | :---: | :---: |
| **Color Token** | `--color-solution` (`#4CAF50`) | 게이지 바, 텍스트 강조 | 안정적인 성공의 색상. |
| **Color Token** | `--color-critical` (`#F44336`) | 게이지 바, 알림창 배경 | 긴급성을 나타내는 강렬한 빨간색. |
| **Typography** | `Gauge Value` | 수치 표시 영역 (중앙) | 폰트: Pretendard Bold, Size: 2.5rem |
| **Motion Token** | `Transition-State` | 모든 상태 전환 시 | Duration: 400ms, Ease: ease-in-out |

---