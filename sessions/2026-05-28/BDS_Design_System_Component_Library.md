# 🎨 BDS 소상공인 플랫폼 디자인 시스템 컴포넌트 라이브러리 (v1.0)

## 🎯 목표
모든 콘텐츠(영상, 웹 UI, 마케팅 소재 등)에 일관된 경험을 제공하는 핵심 시각 요소 및 레이아웃 표준화. 이를 통해 제작 효율성을 극대화하고 브랜드 통일성을 확보한다.

---

## 🌈 1. 컬러 팔레트 & 타입 시스템 (Color & Typography System)

### A. 메인 컬러 정의
*   **Primary Color:** Deep Blue (`#0A2B6D`) - 신뢰, 안정성, 전문성 (Trust, Stability, Professionalism). 핵심 브랜드 색상으로 사용하며, CTA(Call to Action), 헤더 배경 등 중요 메시지에 활용한다.
*   **Secondary Color:** Growth Green (`#4CAF50`) - 성장, 활력, 기회 (Growth, Vitality, Opportunity). 성과 지표, 성공 케이스, 긍정적 변화를 나타내는 포인트 색상으로 사용한다.
*   **Neutral Palette:**
    *   Background: `#F7F9FC` (미세하게 블루가 가미된 밝은 회색)
    *   Text/Dark: `#333333`
    *   Border/Light: `#E0E0E0`

### B. 타이포그래피 정의
*   **Primary Font:** Pretendard (웹 및 디지털 환경 표준).
*   **Headline (H1):** Pretendard Bold, 48px (Deep Blue 사용)
*   **Subhead (H2):** Pretendard SemiBold, 30px (Dark Gray 사용)
*   **Body Text:** Pretendard Regular, 16px

---

## 📐 2. 핵심 UI 컴포넌트 가이드라인 (The 3 Core Components)

### Component #1: Hero Section / Key Message Banner (랜딩 페이지/영상 도입부 표준)
가장 중요한 메시지를 전달하는 영역의 구조적 정의. 시각적으로 강력한 인상을 남겨야 한다.

*   **레이아웃:** 좌측에 핵심 문구(Copy), 우측에 서비스 데모 또는 CTA 블록을 배치하는 2단 분할 구조를 기본으로 한다.
*   **Deep Blue 활용:** 배경색이나 가장 중요한 카피 박스의 배경색으로 사용한다. (신뢰감 부여)
*   **Growth Green 활용:** Call to Action(CTA) 버튼의 배경색 및 성공 지표 아이콘에만 한정적으로 사용한다.
*   **Typography:** H1은 딥블루를 적용하며, 문장 구조는 '문제 정의 $\rightarrow$ 해결책 제시' 흐름을 따른다.
*   **예시 구조 (Wireframe):**
    ```
    [배경: #F7F9FC] [좌측: H1(Deep Blue) - 핵심 메시지] | [우측: 서비스 이미지/데모 & CTA 버튼 (Growth Green)]
    ```

### Component #2: Feature Card / Value Proposition Block (기능 설명 및 장점 나열 표준)
플랫폼의 여러 기능을 개별적으로, 하지만 일관되게 보여주는 블록. 지루하지 않도록 여백과 아이콘을 활용한다.

*   **레이아웃:** 3~4개의 카드가 가로 또는 세로 그리드 형태로 배치된다. 각 카드에는 명확한 제목/아이콘이 필수다.
*   **Deep Blue 활용:** 컴포넌트 전체의 경계선(Border)이나 아이콘 색상에 미묘하게 사용하여 통일성을 유지한다.
*   **Growth Green 활용:** 해당 기능이 소상공인에게 가져다줄 '긍정적 결과'를 나타내는 강조 포인트 (예: "매출 증가", "시간 절약")의 뱃지나 수치 표시 영역에 사용한다.
*   **Typography:** 제목(H3)은 딥블루, 설명 문구는 기본 블랙을 유지한다.

### Component #3: Call to Action Button (CTA Button Standard)
사용자가 반드시 취해야 할 행동을 유도하는 가장 중요한 요소. 디자인의 통일성이 생명이다.

*   **기본 상태 (Default):**
    *   배경색: Growth Green (`#4CAF50`)
    *   텍스트: White
    *   호버(Hover): Deep Blue (`#1A3D82`, Deep Blue를 사용해 Hover 시 '신뢰'의 느낌 강화)
    *   모서리: 8px Radius (약간의 부드러움 부여)
*   **보조 CTA (Secondary/Ghost Button):**
    *   배경색: Transparent
    *   테두리: Deep Blue (`#0A2B6D`)
    *   텍스트: Deep Blue (`#0A2B6D`)

---

## 🖥️ 3. 통합 적용 가이드 (Integration Rule)

1.  **깊이(Depth):** 모든 섹션은 배경색이나 카드 그림자를 통해 명확한 깊이감을 주어 단조로움을 피한다.
2.  **흐름(Flow):** 콘텐츠의 흐름은 항상 '문제 제기 $\rightarrow$ 해결책 제시(Deep Blue) $\rightarrow$ 기대 효과 증명(Growth Green)' 순서로 진행되어야 한다.