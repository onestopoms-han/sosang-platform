# 📐 BDS 플랫폼 디자인 시스템 최종 스펙 (V1.0)
## 🗓️ Version Control & Handover Info
*   **작성일:** YYYY-MM-DD
*   **버전:** 1.0 (개발팀 핸드오프 최종본)
*   **목표:** 모든 컴포넌트의 크기, 간격, 색상을 확정하여 개발 착수 준비 완료. '감성적 안전마진'을 시각적으로 구현하는 것을 최우선 목표로 함.
*   **참조 원본 파일:** `copywriting_v1.md` (최종 카피라이팅 스펙)

---
## 🎨 I. 글로벌 디자인 시스템 (Global Design System)
### 1. 컬러 팔레트 (Color Palette - HEX / Usage)
| 역할 | 이름 | 색상 코드 (HEX) | 사용 범위 및 가이드라인 |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Blue | `#004D66` | 브랜드의 신뢰도, 헤더 배경, 핵심 타이틀. (안정성 상징) |
| **Secondary** | Growth Green | `#3CB371` | 성장, 긍정적 변화, CTA 버튼, 성공 지표 강조. (희망 상징) |
| **Accent Warning** | Amber Alert | `var(--state-color-warning)` | 로딩 실패, API 지연, 경고 메시지 등 안전마진이 필요한 경우 사용. (⚠️ 명세서에 따라 타이밍 정의 필요) |
| **Background** | Light Gray | `#F8F9FA` | 일반 콘텐츠 배경. 가독성 확보. |
| **Text Primary** | Dark Gray | `#333333` | 본문 텍스트. 높음 대비(Contrast) 유지 필수. |

### 2. 타이포그래피 시스템 (Typography Scale)
*   **폰트:** Noto Sans KR 또는 Inter (가독성이 높은 산세리프 계열 권장)
*   **Scale 정의:** 모든 크기는 `rem` 단위를 기준으로 하며, 반응형 가이드를 적용한다.

| 요소 | Desktop (1440px 기준) | Tablet (768px 기준) | Mobile (375px 기준) | Weight | 사용 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | 2.8rem (45px) | 2.0rem (32px) | 1.8rem (28px) | Bold(700) | 페이지의 메인 메시지. 가장 강력한 후크를 담을 섹션에 사용. |
| **H2** | 2.2rem (35px) | 1.8rem (28px) | 1.6rem (25px) | SemiBold(600) | 주요 섹션 제목. 내용 구분을 명확히 한다. |
| **Body Large** | 1.125rem (18px) | 1rem (16px) | 0.9375rem (15px) | Regular(400) | 핵심 요약, 데이터 강조 문구 등 중요한 설명. |
| **Body Base** | 1rem (16px) | 0.9375rem (15px) | 1rem (16px) | Regular(400) | 일반적인 본문 내용. 가독성에 집중한다. |
| **Caption** | 0.875rem (14px) | 0.875rem (14px) | 0.9375rem (15px) | Regular(400) | 날짜, 출처, 보조 정보 등. |

### 3. 간격 시스템 (Spacing System - Spacing Scale)
*   **기준:** 8pt Grid System 사용 (최소 단위는 `8px`를 기준으로 함).
*   **가이드라인:** 섹션과 컴포넌트 사이의 간격은 다음 스케일 중 하나를 선택해야 한다.

| 크기 | 값 (Pixel) | CSS Unit | 용도 |
| :--- | :--- | :--- | :--- |
| **S** | 16px | `1rem` | 패딩, 작은 여백, 인라인 간격. |
| **M** | 32px | `2rem` | 컴포넌트 내부의 수직/수평 패딩 (버튼 등). |
| **L** | 64px | `4rem` | 섹션 구분자(Section Separator)의 최소 여백. |
| **XL** | 128px | `8rem` | 페이지 레벨의 큰 간격, 시선 분산을 유도하는 구간. |

---
## 🖥️ II. 핵심 컴포넌트별 스펙 (Component Specifications)

### 1. 히어로 섹션 (Hero Section - First Fold)
*   **목표:** 사용자에게 플랫폼의 존재 이유(PainGauge, 안전마진 확보)와 가장 강력한 가치 제안을 즉각적으로 전달한다.
*   **레이아웃:** 중앙 정렬 기반의 비대칭 그리드 또는 텍스트-비주얼 분리형 구조 (좌: 카피/CTA | 우: 시뮬레이션 그래프).
*   **[Design Spec]**
    *   **Container Padding:** Top: `128px` (XL) / Bottom: `128px` (XL)
    *   **Headline H1:** 2.8rem, Deep Blue 배경에 흰색 텍스트로 배치하여 시선 집중.
    *   **Sub-Text Body Large:** 1.2rem, Dark Gray. 핵심 문장을 강조하기 위해 `Growth Green`으로 하이라이트 처리.
    *   **CTA Button (Primary):** W: `300px`, H: `64px` (M), Background: `Growth Green`. 마우스 오버 시 약간의 크기 확대 애니메이션 (`scale(1.05)`) 필수.

### 2. 핵심 기능 그리드 (Feature Grid - 3 Columns)
*   **목표:** 플랫폼이 제공하는 핵심 기능을 간결하게 나열하고, 사용자가 쉽게 이해하도록 한다.
*   **레이아웃:** Flex 또는 CSS Grid 기반의 반응형 3단 구조. 모바일에서는 1단(Stacking)으로 자동 변환되어야 함.
*   **[Design Spec]**
    *   **Container Padding:** Top: `96px` (L) / Bottom: `96px` (L).
    *   **각 Feature Card 내부 여백:** 좌/우 패딩: `32px` (M), 상하 패딩: `32px` (M).
    *   **아이콘 (Icon):** 크기 48px, 색상 Deep Blue. 아이콘 클릭 시 해당 기능 상세 페이지로의 부드러운 전환 애니메이션(transition) 구현 필수.
    *   **제목 (H3 - 가상):** 1.2rem, Dark Gray.

### 3. ROI/가치 증명 섹션 (Value Proof Section)
*   **목표:** 데이터 기반의 설득력을 제공하는 곳. 시각적 그래프와 수치를 가장 강하게 강조해야 한다.
*   **레이아웃:** 반전형 구조(Alternating Pattern). 배경 색상에 변화를 주어 다음 콘텐츠와의 구분을 명확히 한다 (예: 섹션 A는 Light Gray, 섹션 B는 White).
*   **[Design Spec]**
    *   **그래프 시각화:** 그래프의 선과 지표 값은 무조건 `Growth Green`을 사용한다.
    *   **KPI 수치 강조:** 숫자는 폰트 크기를 최대화하고, 애니메이션으로 카운트업(Count-up) 효과를 적용하여 역동성을 부여한다. (기술 명세 필수)
    *   **패딩/마진:** 섹션 간의 구분은 `128px` (XL) 마진을 유지하여 콘텐츠가 답답해 보이지 않게 한다.

### 4. CTA 최종 액션 영역 (Final Call-to-Action Block)
*   **목표:** 사용자가 고민을 끝내고 즉시 행동(가입/컨설팅 신청)하게 만드는 최종 문턱.
*   **레이아웃:** 배경색 대비를 가장 극적으로 주는 섹션. 전체 폭에 걸쳐 배치한다 (Full Width).
*   **[Design Spec]**
    *   **배경 처리:** `Deep Blue` 또는 미묘한 그라데이션 적용으로 시선을 묶는다.
    *   **헤드라인 H2:** 흰색 텍스트를 사용하고, 메시지를 가장 간결하게 요약한다 (예: "성장, 이제 데이터가 답입니다.").
    *   **CTA 버튼 (Secondary):** W: `400px` (더 크고 강조된 사이즈), H: `64px`. 배경색은 `Growth Green`을 사용하며, 일반적인 버튼보다 약간 더 입체감 있는 그림자 효과를 적용한다.

---
## 🔍 III. 개발팀 핸드오프 체크리스트 (Developer Handover Checklist)
이 항목들은 반드시 QA 및 구현 단계에서 검증되어야 합니다.

✅ **[Responsive Check]**
*   모든 컴포넌트가 Mobile(375px), Tablet(768px), Desktop(1440px) 환경에서 깨짐 없이, 의도된 간격과 타이포그래피 스케일을 유지하는지 확인한다.

✅ **[Interaction & Animation]**
*   **Fallback Logic:** API 응답 지연 또는 오류 시, `Amber Alert` 색상과 함께 Skeleton Loader가 정의된 애니메이션(Understated Transition)을 정확히 보여주는지 테스트한다. (Critical Path).
*   **Hover State:** 모든 인터랙티브 요소(버튼, 카드, 아이콘)는 마우스 오버 시 명확하고 부드러운 피드백(색상 변화 또는 크기 변화)을 제공하는가?

✅ **[Accessibility & Tone]**
*   **Color Contrast:** 텍스트와 배경 간의 명암 대비 비율(Contrast Ratio)이 WCAG AA 레벨 이상인지 확인한다. (특히 Deep Blue/White 조합).
*   **Pain Gauge Integration:** 시스템 전반에 걸쳐 '안전마진' 개념을 시각적으로 암시하는 요소가 빠지지 않았는지 최종 점검한다.