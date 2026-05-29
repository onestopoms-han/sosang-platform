# 🎨 BDS 소상공인 플랫폼 비주얼 컴포넌트 시스템 가이드라인 V1.0 (Designer Lead)

## 💡 목표
Pitch Deck Master Design System V3.0을 기반으로, 모든 마케팅 및 교육 콘텐츠 제작에 활용될 재사용 가능한 시각적 컴포넌트와 디자인 원칙을 표준화합니다. 일관성과 신뢰도 확보가 핵심입니다.

---

### 🎨 1. 브랜드 기본 사양 (Brand Foundation)
**[색상 팔레트]**
*   **Primary Color (신뢰):** Deep Blue (`#004D66`) - 전문성, 안정감
*   **Secondary Color (성장/긍정):** Growth Green (`#3CB371`) - 성장, 해결책 제시
*   **Accent 1 (위험/경고):** Warning Red (`#CC3333`) - Pain Point, 위기 상황
*   **Neutral:** Light Gray (`#F4F6F8`), Dark Text (`#333333`)

**[타이포그래피]**
*   **Primary Font:** Pretendard (또는 시스템 기본 산세리프)
*   **H1/Major Headline:** 32pt Bold | Deep Blue 적용. 핵심 가치를 강력하게 전달할 때 사용.
*   **Body Text:** 16pt Regular | Dark Text 적용. 가독성이 최우선.

---

### 📊 2. 데이터 시각화 컴포넌트 (Data Visualization Components)

#### A. KPI Gauge 컴포넌트 [Critical/Warning/Safe]
*   **용도:** 현재 소상공인의 상태(Pain)와 목표 달성률을 직관적으로 표현합니다.
*   **레이아웃 사양:** 원형 게이지 차트 (Radial Progress Bar).
    *   **Critical State (빨강):** 경고색(`Warning Red`)의 70% 이상 구간이 차지하며, 애니메이션 시 깜빡임 효과(Pulse)를 적용합니다.
    *   **Warning State (노랑/주황):** 중간 위험도를 나타내며, 점진적인 상승 곡선과 함께 표현됩니다.
    *   **Safe State (초록):** 성장색(`Growth Green`)의 80% 이상을 차지하며, 안정적 성장을 암시합니다.
*   **데이터 흐름 강조:** 게이지 바 옆에 'Current Value $\rightarrow$ Target Value'를 화살표와 함께 명확히 제시해야 합니다.

#### B. Growth Curve (성장 곡선) 컴포넌트
*   **용도:** 시간 경과에 따른 비즈니스 성장 예측 및 개선 효과(ROI)를 보여줍니다.
*   **사양:** 꺾은선 그래프 사용을 원칙으로 합니다.
    *   **Before Line:** Pain 시점의 흐름 (Deep Blue 또는 Gray). 완만한 하강 곡선을 주로 활용하여 어려움을 암시합니다.
    *   **After Line:** 솔루션 적용 후의 흐름 (Growth Green). 가파르고 꾸준한 상승 곡선(Exponential Growth)을 강조하며, 이 간격차를 '성장 폭'으로 시각화해야 합니다.

#### C. Before & After 비교 컴포넌트
*   **용도:** 소상공인의 고통스러운 상황(Before)과 플랫폼 사용 후의 개선된 모습(After)을 극명하게 대비시킵니다. (가장 높은 CTR 유발 요소)
*   **레이아웃:** 2분할 레이아웃 필수.
    *   **[좌측: BEFORE]** 배경색/톤 다운 처리 및 Warning Red 계열 아이콘 사용. 카피는 '막연한 불안감', '노력해도 안 되는 상황' 등 감정적 언어를 사용합니다.
    *   **[우측: AFTER]** 밝고 깨끗한 톤(Light Gray)을 사용하며, Growth Green 및 Deep Blue 계열의 성공 아이콘/그래프를 배치합니다. 카피는 '데이터 기반', '구체적인 해결책' 등 객관적 가치를 강조합니다.

---

### 🖼️ 3. 콘텐츠 전용 컴포넌트 (Marketing Asset Template)
*   **Thumbnail/Carousel Slide:** 모든 슬라이드는 위에서 정의한 **Before & After 비교 구조**를 핵심 레이아웃으로 사용해야 합니다.
    1.  **Hook Frame (Pain):** 충격적인 질문 또는 경고색 배경 + 문제 제기 카피.
    2.  **Solution Frame (Bridge):** 플랫폼/데이터의 존재 언급(Deep Blue 강조).
    3.  **Result Frame (Gain):** Growth Curve와 KPI Gauge를 활용한 명확한 수치적 성과 제시 (Growth Green 극대화).