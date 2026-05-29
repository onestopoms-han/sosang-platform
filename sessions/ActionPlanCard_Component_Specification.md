# [BDS] Action Plan Card 컴포넌트 명세서 (v1.0)

## 🎯 목적
KPI Gauge를 통해 도출된 소상공인의 현재 상태(Pain Point)에 대한 즉각적이고 실행 가능한 대안을 제시하는 UI/UX 핵심 요소이다. 개발팀이 재사용 가능한 원자적 컴포넌트(`Atomic Component`)로 구현할 수 있도록 모든 사양을 확정한다.

## 📐 레이아웃 구조 (Grid System: 12 Column)
*   **전체 크기:** 360px (가로) x [가변] px (세로)
*   **레이아웃 원칙:** '경고'에서 '실행'으로의 시선 이동을 유도하며, 정보 밀도를 높게 가져간다.

| 영역 | 가로 비중 (12 Col.) | 상세 규격 | 주요 역할 |
| :--- | :--- | :--- | :--- |
| **A. Status Tag** | 3/12 | Height: 40px, Font Size: 14px | 현재 상태 요약 (예: '자금 순환 개선 필요') |
| **B. Title** | 6/12 | Font Size: 18px, Weight: SemiBold | 문제에 대한 가장 핵심적인 해결책 제시. (헤드라인 역할) |
| **C. Description** | 9/12 | Font Size: 14px, Line Height: 1.5em | 실행의 필요성 및 이점 설명. 간결하게 작성. |
| **D. Action Button** | 3/12 | Padding: 12px, Text: Medium (Primary Token) | 다음 액션으로 유도하는 Call-to-Action 버튼. |

## ✨ 디자인 토큰 적용 사양
*   **Color:**
    *   `--color-bg-card`: `#FFFFFF` (Clean White)
    *   `--color-border`: `hsl(20, 10%, 85%)` (Light Gray - 경계를 부드럽게 함)
    *   `--color-status-warning`: `hsl(35, 80%, 50%)` (Amber/Yellow 계열 – 주의 필요 상태 시 사용)
    *   `--color-primary-button`: `#BDS_Primary_Color` (브랜드 메인 색상)
*   **Typography:**
    *   **Title (H3):** `Pretendard`, 18px, SemiBold.
    *   **Body Text:** `Pretendard`, 14px, Regular.

## 🔄 컴포넌트 상태(State)별 사양
### 1. Default State (기본 노출 상태)
*   `A` 영역에 현재 진단된 핵심 문제점을 명시한다.
*   전체 카드 배경은 `--color-bg-card`를 사용하며, 경계선(`border`)을 사용하여 독립적인 정보 블록임을 강조한다.

### 2. Hover State (마우스 오버)
*   **효과:** 전체 카드가 부드럽게 위로 떠오르는 듯한 애니메이션 (`translateY(-3px)`).
*   **색상 변화:** 배경에 미세한 그림자(`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);`)를 추가하여 깊이감을 부여한다.
*   **Transition:** `transition: all 0.3s ease-out;`을 적용한다.

### 3. Active/Click State (버튼 클릭 시)
*   버튼(`D` 영역) 클릭 시, 카드 전체가 **Micro-Interaction**을 통해 다음 페이지(설정/신청 페이지)로 자연스럽게 전환되는 효과를 구현한다. 이는 단순한 버튼 동작 이상의 *흐름 경험*이어야 한다.

## 💡 개발팀 참고 사항 (Motion Design System 연동)
1.  **진입 애니메이션:** 해당 컴포넌트는 KPI Gauge 데이터가 로드되면서 **Fade-In & Slide-Up** 효과로 진입해야 한다. (Refer to: `BDS_MotionDesignSystem_v1.md`의 'Card Reveal' 모션 적용)
2.  **데이터 매핑:** 모든 텍스트 필드는 API를 통해 실시간으로 주입되는 동적 데이터임을 명시한다. 하드코딩된 카피는 존재하지 않아야 한다.