# 📚 BDS 플랫폼: 디자인 시스템 개발자 핸드오프 키트 (SSOT v1.0)

## 🎯 목적 및 범위
본 문서는 `Design_Token_Master_Spec_v2.0.md`를 기반으로 구축된 **BDS소상공인플렛폼**의 모든 UI/UX 컴포넌트에 대한 개발자용 싱글 소스 오브 트루스(SSOT)입니다. 디자인 팀은 이 명세서를 통해 구현되어야 할 최종 상태와 로직을 확정합니다.

*   **대상:** 프론트엔드 개발팀 (React/Vue 등 컴포넌트 기반 개발 환경 가정)
*   **사용 원칙:** 모든 시각적 요소는 반드시 토큰(Design Token)에서 가져와야 합니다. 하드코딩된 색상값 사용을 금지합니다.

---

## 🎨 파트 1: 디자인 토큰 레퍼런스 (Source of Truth)
모든 컴포넌트는 아래 정의된 변수들을 사용해야 합니다.

| 토큰 그룹 | 변수명 | 값 (Value) | 용도 및 설명 |
| :--- | :--- | :--- | :--- |
| **Color** | `color-primary` | `#004D66` (Deep Blue) | 핵심 CTA, 브랜드 헤딩 배경. 신뢰감 부여. |
| | `color-secondary` | `#3CB371` (Growth Green)| 긍정적 피드백, 성공 상태, 성장 지표 강조. |
| | `color-warning` | `#FFC300` | 경고(Warning) 상태, 주의가 필요한 리스크. |
| | `color-critical` | `#D9534F` | 치명적(Critical) 리스크, 즉각적인 조치 필요. |
| | `color-background` | `#F8F9FA` | 기본 배경색. 가독성 높은 흰 계열. |
| **Typography** | `font-family-main` | 'Pretendard', sans-serif | 본문 및 인터페이스 전반 사용. |
| | `size-h1` | 32px / Bold | 메인 섹션 헤딩. |
| | `size-body` | 16px / Regular | 기본 본문 텍스트 크기. |
| **Spacing** | `spacing-sm` | 8px | 작은 간격 (Padding/Margin). |
| | `spacing-md` | 24px | 중간 섹션 구분 간격. |

---

## 💡 파트 2: 핵심 컴포넌트 명세서 (Component API)
각 컴포넌트는 Props와 State에 의해 동작합니다. 모든 상태 변경은 토큰을 따라야 합니다.

### 1. [KPI Status Gauge] - 리스크 시각화 위젯
소상공인의 재정/공급망 건강 상태를 표시하는 핵심 위젯입니다.

*   **기본 구조:** `Gauge(value: number, status: 'Safe' | 'Warning' | 'Critical')`
*   **필수 Props:**
    *   `value`: 현재 KPI 점수 (0~100).
    *   `status`: 현재 리스크 상태. 이 값에 따라 색상과 애니메이션이 결정됩니다.
*   **State 정의 및 토큰 적용:**
    *   **Safe (🟢):** `color-secondary` 사용. 목표 달성 영역. 부드러운 성장 그래프 애니메이션 (`transition: transform 0.5s ease-out`).
    *   **Warning (🟡):** `color-warning` 사용. 주의/경고 애니메이션. 리스크 증가 추세선 표시.
    *   **Critical (🔴):** `color-critical` 사용. 강렬한 경고 플래시 애니메이션 (`@keyframes blink`) 적용. **(개발팀 필수 구현)**

### 2. [Data Card] - 데이터 블록 컴포넌트
특정 데이터를 강조하여 보여주는 카드 형태의 UI입니다. (예: 예상 매출액, 리스크 항목 개수)

*   **기본 구조:** `Card({ title: string, value: number, icon: ReactComponent })`
*   **필수 Props:**
    *   `title`: 카드의 제목 (토큰 기반 텍스트).
    *   `value`: 표시할 수치.
    *   `icon`: 해당 데이터의 시각적 아이콘.
*   **Interaction Rule:** `Card` 내부의 숫자(`value`)는 항상 오른쪽 정렬하고, 최소한의 여백(spacing-sm)을 유지해야 합니다.

### 3. [CTA Button] - 행동 유도 버튼
가장 중요한 액션 영역입니다. 두 가지 상태를 명확히 구분합니다.

*   **기본 구조:** `Button({ label: string, variant: 'primary' | 'secondary', disabled?: boolean })`
*   **Variant별 토큰 적용:**
    *   **Primary (핵심 행동):** 배경색은 반드시 `color-primary`를 사용해야 합니다. 활성화 시 호버(Hover) 효과는 Dark Blue의 80% 농도(`rgba(0, 77, 102, 0.9)`)로 적용합니다.
    *   **Secondary (보조 행동):** 배경색은 `color-secondary`를 사용하되, 버튼을 누르는 동작 시에는 배경이 투명해지면서 테두리만 남는(Outline) 효과를 구현하여 깊이를 확보해야 합니다.
*   **Disabled State:** `disabled={true}`일 경우, 모든 색상은 토큰의 50% 농도로 낮추고 포인터 커서를 비활성화합니다.

---

## 🛠️ 파트 3: 통합 UX/UI 로직 체크리스트 (Developer Checklist)
개발 단계에서 놓치기 쉬운 통합적 규칙들을 정의합니다.

1.  **반응형 디자인(Responsive):** 모든 컴포넌트는 모바일(375px), 태블릿(1024px), 데스크톱(1440px) 환경을 고려하여 레이아웃이 깨지지 않도록 Flexbox/Grid 기반으로 설계합니다.
2.  **에러 메시지 처리:** API 호출 실패 시, 일반적인 `Error` 텍스트를 사용하지 않고, 정의된 토큰(`color-critical`)과 함께 "데이터 로드에 실패했습니다. 관리자에게 문의해주세요."와 같은 표준화된 문구를 출력해야 합니다.
3.  **접근성(Accessibility):** 모든 상호작용 요소(버튼, 탭 등)는 최소 WCAG AA 레벨 이상의 명도 대비를 유지하며, 스크린 리더가 인식할 수 있도록 `aria-*` 속성을 필수로 추가합니다.