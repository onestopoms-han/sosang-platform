# 🎨 BDS 소상공인 플랫폼 - 최종 디자인 시스템 가이드북 V1.0

## 💡 1. 개요 및 목표 (Goal & Purpose)
*   **목표:** 모든 마케팅 자산(웹사이트, SNS 콘텐츠, 광고 배너 등)의 시각적 일관성을 100% 확보하고, 콘텐츠 제작 시간을 단축하며, 브랜드 신뢰도를 극대화한다.
*   **핵심 가치 (Core Value):** 데이터 기반 안전마진(Safety Margin)을 통해 소상공인의 불안감을 해소하는 '성장 컨설턴트' 포지셔닝 유지.

## 🎨 2. 컬러 시스템 (Color System)
| 역할 | 색상명 | HEX Code | 사용 지침 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Deep Blue (신뢰, 안정성) | `#004D66` | 메인 배경, 헤더, 브랜드 로고 등 주된 신뢰를 줄 때 사용. | 전체 디자인의 기본 톤앤매너 확립. |
| **Secondary** | Safety Orange (행동 유도, 주의) | `#FF8C00` | CTA 버튼, 핵심 후크(Hook) 강조, 경고/주의 지점 표시. | 가장 높은 주목도를 가지며 클릭을 유도해야 함. |
| **Accent 1** | Growth Green (성장, 성공) | `#3CB371` | 성장 애니메이션, 긍정적인 데이터 변화 시각화, 성과 강조 부분. | '안전마진' 확보 및 긍정적 미래 예측에 활용. |
| **Neutral** | Light Gray | `#F5F5F5` | 섹션 구분, 배경 분리 등 가독성 향상에 사용. | 본문 배경으로 지양. |

## 🔡 3. 타이포그래피 시스템 (Typography System)
*   **폰트 선택:** Pretendard (가장 높은 범용성과 모바일 최적화 고려).
*   **Hierarchy 및 역할:**
    *   `H1 (최대 강조)`: Headline, 가장 강력한 후크 카피. (Weight: Bold, Size: 32pt)
    *   `H2 (섹션 제목)`: 주요 기능 또는 장점 소개 시 사용. (Weight: Semi-Bold, Size: 24pt)
    *   `Body Text (본문)`: 설명 및 상세 내용을 담는 부분. (Weight: Regular, Size: 16pt)
    *   `Caption/Small`: 부가 정보나 작은 주의사항 안내용. (Weight: Regular, Size: 12pt)

## 📐 4. 컴포넌트 가이드라인 (Component Guidelines)

### A. CTA 버튼 (Call-to-Action Button)
*   **기본 상태:** 배경 `#FF8C00` / 텍스트 `White`.
*   **호버(Hover) 상태:** 배경을 약간 더 진한 주황색(`#E67A00`)으로 변경하여 상호작용 유도.
*   **사용 원칙:** 콘텐츠 내에서 '다음 행동'이 필요한 지점에는 반드시 CTA를 배치해야 함 (Safety Margin 적용).

### B. 데이터 시각화 블록 (Data Visualization Block)
*   **성장 그래프 (Growth Graph):** 항상 `Growth Green`을 사용하여 상승 곡선을 표현하며, 애니메이션 효과(상승 트렌드)가 필수적임.
*   **PainGauge 결과:** 결과를 숫자로 표시할 경우, 반드시 **'기존 대비 안전마진 확보율: X%'** 포맷으로 재해석하여 전달해야 함.

### C. 카드 및 레이아웃 (Card & Layout)
*   모든 콘텐츠 블록은 최소 16px의 간격(Spacing)을 유지하며, 섹션 구분을 위해 연한 회색 배경(`Light Gray`)을 활용할 수 있음.
*   **여백 원칙:** 여백은 단순한 비어있음이 아닌, 사용자가 호흡하고 핵심 메시지에 집중하도록 돕는 '시각적 안전마진'으로 간주함.

## 🎬 5. 콘텐츠 에셋 제작 가이드 (Content Asset Guide)
*   **Reels/Carousel 공통:**
    1.  **후크(Hook) 배치:** 첫 3초 또는 첫 슬라이드에 가장 자극적이고 강력한 질문을 던져 시청자의 이탈을 방지한다. (`H1` 사용).
    2.  **문제 제시 (Pain):** Deep Blue 계열의 어둡고 답답한 톤으로 소상공인의 어려움을 극대화하여 보여준다.
    3.  **해결책 제시 (Solution):** Growth Green과 Safety Orange를 활용하며, 데이터 기반의 구체적인 해결 과정(Process Flow)을 시각적으로 명확히 보여준다.
*   **템플릿 사용:** 제작된 Reels/Carousel 템플릿(`Reels_Template_v1.figma.json`, `Carousel_Template_v1.figma.json`)은 본 가이드북의 지침(특히 컬러와 타이포)을 벗어나지 않도록 수정한다.