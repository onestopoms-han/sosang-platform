# Universal Content Module Specification (BDS Style Guide v1.0)

## 🎯 목적
모든 콘텐츠 유형(보고서, 가이드, 웹페이지 섹션 등)에 일관성을 부여하는 재사용 가능한 핵심 UI 컴포넌트 세트를 정의한다. 이 라이브러리는 Deep Blue (#004D66)와 Growth Green (#3CB371)을 기반으로 한다.

## 🧱 Core Components List
| Component Name | Function / Description | Figma Properties (Example) | Code Implementation Notes | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **[Module_Header]** | 콘텐츠의 주제와 핵심 메시지 전달. 페이지 시작점 역할을 한다. | Font: Pretendard Bold, Size: 36px. Color: Deep Blue (#004D66). Subtitle: Light Gray. | `<h1>` tag with specific CSS styling and max-width constraint. | High |
| **[Key_Metric_Card]** | 보고서의 핵심 수치(KPI)를 강조한다. 데이터 시각화의 중심 요소. | Shape: Rounded rectangle, Shadow: Subtle lift effect. Background: White/Light Gray. Color Accent: Growth Green (#3CB371). | Flexbox layout with clear data labeling (Label + Value). Must support animation hooks (e.g., count-up). | High |
| **[Process_Step]** | 가이드나 로드맵의 단계별 흐름을 설명한다. 순서와 연결성을 강조. | Icon: Step number circle (Deep Blue). Text flow: Horizontal or vertical arrow connection. | Sequence layout component (`<div class="process-step">`). Must handle directional variants (->, ↓). | Medium |
| **[Callout_Box]** | 독자의 주의를 집중시키거나 핵심 가치(Why BDS)를 강조하는 박스. | Background: Very light blue tint (#E6F0F5). Border: Deep Blue solid line. Icon: 💡 (Info/Tip). | Generic block element. Must be easily dismissible or expandable based on content type. | High |
| **[Data_Chart_Placeholder]** | 모든 통계 데이터 시각화가 들어가는 자리 표시자. 실제 차트 컴포넌트로 대체됨을 명시. | Dimensions: 1200px wide, 450px high. Placeholder Text: "Interactive Chart Area". | Wrapper component (`<div class="data-chart">`). Must reserve space for future charting libraries (e.g., D3.js). | High |

## 📐 Implementation Details (Example: [Key_Metric_Card])
*   **레이아웃:** 수평(Horizontal) 또는 수직(Vertical) 배치 가능해야 함.
*   **상태 관리:** 데이터가 로드되는 과정과 성공적으로 표시될 때의 애니메이션 상태를 분리하여 정의함.