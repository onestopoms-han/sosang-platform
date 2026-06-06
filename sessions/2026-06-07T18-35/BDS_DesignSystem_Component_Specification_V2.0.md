# 🎨 BDS 디자인 시스템 컴포넌트 라이브러리 명세서 (V2.0)

## 📌 목표 및 적용 범위
본 문서는 'Safety Margin' 핵심 가치를 시각적으로 구현하고, PainGauge 컴포넌트를 포함한 모든 사용자 인터페이스(UI) 요소의 최종적인 디자인 일관성을 확보하기 위해 작성되었다. 개발팀은 이 명세서에 따라 프론트엔드 코딩 및 QA를 진행해야 하며, 추상적 해석이나 재정의는 금지된다.

## 🌈 1. 컬러 시스템 (Color Palette)
시스템 전반의 통일된 시각 언어를 위한 핵심 색상 정의. 모든 색상은 HEX 코드와 사용 용도를 명시한다.

| 역할 | 이름/용도 | HEX Code | CMYK / RGB | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** (주색) | Deep Blue | `#004D66` | C100 M50 Y20 K70 / R0 G77 B102 | 메인 브랜드 컬러. 신뢰, 안정감 상징. CTA 배경 및 주요 헤더에 사용. |
| **Secondary** (보조색) | Growth Green | `#3CB371` | C85 M0 Y65 K0 / R60 G179 B113 | 성장, 긍정적 변화를 상징. 성공 메시지, 획득 가치(Earned Value), CTA 보조 강조에 사용. |
| **Warning** (경고색) | Safety Orange | `#FF8C00` | C20 M100 Y100 K0 / R255 G140 B0 | 위험 감지, 주의가 필요한 영역(PainPoint) 표시. 경고 메시지, 강한 CTA 유도에 사용. |
| **Neutral** (중립색) | Light Grey | `#F5F5F5` | C3 M3 Y3 K0 / R245 G245 B245 | 배경 및 섹션 분리용. 주 콘텐츠 영역의 바탕색으로 활용. |
| **Text** (텍스트 기본) | Dark Charcoal | `#333333` | C70 M60 Y60 K80 / R51 G51 B51 | 본문 텍스트 및 주요 레이블. #000은 지나치게 강하므로 사용 금지. |
| **Accent** (강조색) | Deep Indigo | `#4B0082` | C70 M90 Y30 K60 / R75 G0 B130 | '안전마진' 개념을 시각적으로 차별화할 때 사용. Secondary와 대비되는 톤으로 활용 가능. |

## ✒️ 2. 타이포그래피 시스템 (Typography System)
폰트 스택은 가독성이 높은 산세리프 계열로 통일한다. 모든 요소는 다음 비율을 따른다.

*   **기본 폰트 스택:** `Pretendard, 'Apple SD Gothic Neo', sans-serif`
*   **H1 (페이지 제목):** 크기: 48px / 무게: Bold(700) / Line Height: 1.2 / 색상: Primary Blue (`#004D66`)
*   **H2 (섹션 제목):** 크기: 32px / 무게: SemiBold(600) / Line Height: 1.3 / 색상: Dark Charcoal (`#333333`)
*   **H3 (컴포넌트 소제목):** 크기: 24px / 무게: Medium(500) / Line Height: 1.4 / 색상: Primary Blue 또는 Dark Charcoal
*   **Body Text (본문):** 크기: 16px / 무게: Regular(400) / Line Height: 1.6 / 색상: Dark Charcoal (`#333333`)
*   **Caption/Label (보조 텍스트):** 크기: 12px / 무게: Regular(400) / Line Height: 1.5 / 색상: Mid Grey (`#777777`)

## ✨ 3. 핵심 컴포넌트 명세 (Core Component Specs)

### A. 버튼 (Button - `<Button>`)
*   **기본 상태 (Default):** 배경색: Primary Blue (`#004D66`), 텍스트 색상: White, Corner Radius: 8px, 패딩: 12px 30px.
*   **마우스 오버 (Hover):** 배경색을 어둡게 조정 (e.g., `#003A50`).
*   **클릭 시 (Active):** 미세한 그림자 효과(Shadow)를 적용하여 눌리는 느낌 구현.
*   **비활성화 (Disabled):** 배경색: Light Grey (`#F5F5F5`), 텍스트 색상: Mid Grey (`#777777`).

### B. PainGauge 컴포넌트 통합 규격
PainGauge는 핵심 데이터 시각화 요소이므로, 다른 모든 섹션 디자인에 영향을 미치는 최우선 순위 컴포넌트로 간주한다.

*   **데이터 시각화 원칙:** 감지된 문제점(Pain Point)은 **Safety Orange**로, 개선된 가치(Solution/Margin)는 **Growth Green**으로 명확히 구분하여 색상 코딩해야 한다.
*   **애니메이션 스펙 (Interaction):** 데이터가 로드될 때, 단순히 값이 나타나는 것이 아니라, `[PainGauge_EdgeCase_Interaction_Guidebook_V1.0.md]`에 정의된 **'데이터 흐름 애니메이션(Data Flow Animation)'**을 반드시 적용해야 한다. (예: 바 차트의 막대가 0에서 시작하여 최종 값까지 부드럽게 증가하는 트랜지션).
*   **상태 변화:** 데이터가 '안정화됨' 상태에 도달하면, 해당 섹션의 배경색이 Light Grey에서 아주 연한 Green 계열로 미묘하게 변하며 사용자에게 심리적 안정을 전달해야 한다.

### C. 폼 입력 필드 (Input Field)
*   **기본:** 테두리: 1px solid `#CCCCCC`, 내부 패딩: 10px, Corner Radius: 6px.
*   **포커스 시 (Focus):** 테두리 색상을 Primary Blue (`#004D66`)로 변경하고, 포커스링(Outline)을 추가하여 사용자의 액션 포인트를 명확히 한다.

---