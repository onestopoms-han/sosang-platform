# 🎨 BDS 플랫폼 - 데이터 기반 UX/UI 시스템 가이드라인 V2.0

## I. 개요 및 목표
본 가이드는 'PAIN 지표(위험) 측정'과 '안전 마진 확보(기회)'라는 두 가지 핵심 비즈니스 로직을 소상공인에게 가장 직관적이고 신뢰성 있게 전달하기 위한 모든 UI/UX의 표준 규칙을 정의합니다.

**🎯 목표:** 데이터 수치와 시각적 감정(Emotional Signal) 간의 완벽한 일치성 확보.
**✨ 핵심 원칙:** 숫자가 위험하거나 개선이 필요할 때, 디자인 요소가 이를 '느끼게' 만들어야 한다. (직관적 경고 시스템 구축)

## II. 색상 팔레트 시스템 (The Emotional Color Code)

| 역할 | 이름 | Hex Code | 용도 및 의미 (데이터 해석) |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Blue (신뢰/기본 UI) | `#004D66` | 플랫폼의 기본 톤, 배경 섹션 구분선, 헤드라인. *'우리가 믿을 수 있는 정보'*를 의미. |
| **Success** | Growth Green (안전마진/성장) | `#3CB371` | 목표 달성, KPI 개선, 안전 마진 확보 상태. *긍정적인 행동 유도.* |
| **Warning** | Caution Orange (경고/주의) | `#FF9800` | 주의가 필요한 지점, 변동폭 증가, 관리 필요 PAIN 영역. *'관심을 가져야 함'.* |
| **Danger** | Critical Red (위험/위기) | `#D32F2F` | 심각한 위험 수준, 즉각적인 대응 필요 PAIN. *가장 높은 주목도.* |
| **Neutral** | Gray Scale | `#CCCCCC`~`#E0E0E0` | 보조 정보, 구분선, 비활성화 상태. (정보의 중요도를 낮추는 역할) |

## III. 타이포그래피 시스템 (Typography Hierarchy)

*   **폰트:** Pretendard (가독성 최우선, 웹 환경 표준화)
*   **주요 원칙:** 숫자는 최대한 크고 굵게 처리하여 즉각적인 가시성을 확보한다.

| 요소 | 스타일 | 예시 (텍스트/코드) | 설명 |
| :--- | :--- | :--- | :--- |
| **H1 (대제목)** | Size: 32px / Weight: Bold | `데이터 기반 성장 컨설턴트` | 섹션의 핵심 메시지. 강력한 설득력 부여. |
| **KPI Value** | Size: 48px / Weight: ExtraBold | `75%` | 대시보드에서 가장 큰 숫자로, 현재 상태를 즉각 노출. |
| **Subtitle/Label** | Size: 16px / Weight: Medium | `재정 안정성 지수 (PAIN_01)` | KPI의 이름과 측정 단위를 명확히 설명. |
| **Trend Indicator** | Size: 24px / Weight: SemiBold | $\mathbf{\uparrow}$ (+5%) | 변화 추이를 직관적인 아이콘과 함께 표시. (색상 규칙 준수) |

## IV. 핵심 컴포넌트 디자인 사양 (Component Specification)

### 1. KPI 카드 컴포넌트 (`<kpi-card>`)
*   **용도:** 개별 지표(예: PAIN\_01, PAIN\_02)의 현재 상태를 한눈에 보여주는 단위.
*   **레이아웃:** `[Label] > [Value + Trend Indicator]` 구조.
*   **상태 변화 로직 (필수):**
    *   **Good State:** 값 자체가 높거나(안전 마진), 색상이 $\text{Growth Green}$을 띠며, 추세선이 Up 화살표($\uparrow$)를 가리킬 때.
    *   **Alert State:** 값이 낮거나(위험 PAIN), 색상이 $\text{Caution Orange}$ 또는 $\text{Critical Red}$를 띨 때. (이때 배경에 은은한 패턴/그라디언트 적용 권장)

### 2. 안전 마진 지표 컴포넌트 (`<safety-margin-gauge>`)
*   **용도:** '현재 PAIN'과 '이상적인 상태(목표치)' 간의 격차를 시각화하는 게이지/미터기 형태. (Trust Widget 연동)
*   **디자인 구조:** 원형 게이지 또는 바 그래프 형태로 구현.
    1.  **배경색:** Deep Blue
    2.  **Critical Zone (위험 영역):** Critical Red로 시작하여 Warning Orange를 거쳐 Growth Green으로 점진적으로 색상이 변하도록 그라디언트 적용.
    3.  **커서(Indicator):** 현재 $\text{PAIN}$ 값을 나타내는 지점. 이 커서는 항상 **Warning Orange**의 경고성 느낌을 유지해야 한다.

## V. 데이터-디자인 일관성 가이드 (The Golden Rules)

1.  **경고 원칙:** 모든 위기(Critical PAIN)는 무조건 $\text{Critical Red}$를 사용하며, 이 색상은 텍스트의 밑줄이나 배경에 *두 번 이상* 사용해서는 안 된다.
2.  **성장 강조:** 성공적인 변화나 안전 마진 확보 시에는 반드시 $\text{Growth Green}$을 사용하여 심리적 보상을 제공해야 한다.
3.  **정보 계층 구조:** 대시보드에서 가장 중요한 것은 **'지금 무엇이 문제인가?'** 이 질문에 답할 수 있도록, Red/Orange 지표는 항상 페이지 최상단 또는 시선이 머무르는 곳(Hero Section)에 배치한다.