# 🎨 BDS 소상공인 플랫폼: 통합 비주얼 에셋 구현 가이드 (V1.0)

## 🎯 목표 및 목적
본 문서는 'BDS_Integrated_Design_System_v3.0.md'에 정의된 디자인 원칙을 기반으로, 개발팀(코다리), 마케팅팀(Instagram/YouTube), 그리고 모든 콘텐츠 제작자가 일관성을 유지하며 에셋을 구현할 수 있도록 하는 최종 행동 매뉴얼입니다.

**핵심 가이드라인:** Pain $\rightarrow$ Solution의 감정적 전환은 *모든* 시각 요소에 공통적으로 적용되어야 합니다.

---

## 🌐 1. 컬러 시스템 및 사용 원칙 (Color Palette & Usage)
| 역할 | 색상 코드 | HEX | 용도 정의 | 필수 준수 사항 |
| :--- | :--- | :--- | :--- | :--- |
| **Pain** (문제/불안) | Danger Red | #FF4D4D | 결제 실패, 오류 메시지, 문제점 강조. **경고와 불안을 시각화.** | 🚨 *배경색 사용 지양.* 주로 경계선, 아이콘, CTA의 보조 색상으로 제한하여 긴급성만 전달한다. |
| **Solution** (해결/기회) | Growth Green | #2ECC71 | 성공 메시지, 주요 가치 제안(CTA), 성장 로드맵 강조. **희망과 가능성을 시각화.** | ✅ *가장 적극적으로 사용해야 할 컬러.* 긍정적 액션 버튼 및 핵심 성과 영역에 집중 배치한다. |
| **Primary** (신뢰/브랜드) | Deep Blue | #004D66 | 헤더, 메인 타이포그래피, 브랜드 아이덴티티 확립. **전문성과 신뢰성을 제공.** | 📘 *메인 배경색이나 큰 영역의 기본 색상으로 활용.* |
| Neutral (텍스트/배경) | Gray Scale | #333 / #F9F9F9 | 본문 텍스트, 구분선, 일반적 배경. | 명도 대비(Contrast Ratio)를 항상 WCAG AA 이상으로 유지한다. |

## ✍️ 2. 타이포그래피 시스템 (Typography Hierarchy)
| 용도 | 폰트 지정 | 크기 (Web 기준) | 두께 (Weight) | 예시 카피 | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** (핵심 헤드라인) | Pretendard Bold | 48px~64px | Bold(700) | 데이터 기반 성장의 로드맵을 제시합니다. | 랜딩 페이지의 가장 강력한 메시지 영역에만 사용. |
| **H2** (섹션 제목) | Pretendard SemiBold | 32px~38px | SemiBold(600) | 왜 소상공인에게 BDS가 필요한가요? | 섹션 구분을 명확히 하고, Pain $\rightarrow$ Solution의 전환을 알리는 문구에 적용. |
| **Body** (본문/설명) | Pretendard Regular | 16px~18px | Regular(400) | BDS 플랫폼은 소상공인의 안정적 성장을 지원합니다. | 가독성을 최우선으로 하며, 충분한 줄 간격(Line-height: 1.6)을 확보한다. |
| **CTA Text** (버튼 내부) | Pretendard Medium | 18px~20px | Medium(500) | 지금 바로 컨설팅 받아보기 | CTA 문구는 항상 *행동 유도*와 직결된 명확한 동사로 작성한다. |

## 🚀 3. 핵심 컴포넌트 디자인 가이드 (Component Specs)

### A. Call-to-Action (CTA) 버튼
*   **Primary Action (Solution):**
    *   `background-color`: Growth Green (#2ECC71)
    *   `text-color`: #FFFFFF
    *   `border-radius`: 8px
    *   **사용 규칙:** 사용자가 다음 단계로 나아가게 하는 '긍정적 행동'에만 적용한다. (예: 신청하기, 시작하기)
*   **Secondary Action (Pain/경고):**
    *   `background-color`: #FFFFFF (White)
    *   `text-color`: Danger Red (#FF4D4D)
    *   `border`: 1px solid Danger Red (#FF4D4D)
    *   **사용 규칙:** 사용자가 주의해야 하거나, 실패한 상황에서 '재도전'을 유도할 때 보조적으로 사용한다. (예: 재시도하기, 오류 확인)

### B. 데이터 시각화 (KPI/ROI Dashboard - 현빈 반영 영역)
현빈이 제시한 KPI 대시보드와 ROI 결과는 단순 숫자가 아닌 **'성장 과정의 증거'**로 보여야 합니다.
*   **구조:** 반드시 'Before (Pain)' $\rightarrow$ 'Process (Solution)' $\rightarrow$ 'After (Growth)' 3단계 플로우를 시각화한다.
*   **시각적 요소:** 파이 차트, 막대 그래프 등은 Deep Blue(#004D66)와 Growth Green(#2ECC71)의 조합을 사용하고, Pain 단계는 붉은 계열로 은유적으로 표현하여 대비를 극대화한다.

### C. 실패 복구 플로우 (Failure Recovery Funnel - FailureRecoveryFunnel_Design_Spec_v3.md 반영 영역)
결제 실패나 시스템 오류 화면은 사용자 이탈을 막는 **'심리적 재진입 게이트(Psychological Re-entry Gate)'**로 기능해야 합니다.
*   **흐름:** [오류 발생] $\rightarrow$ (공감 메시지 - Deep Blue/Neutral) $\rightarrow$ [원인 분석 및 대안 제시] $\rightarrow$ **[재도전 CTA (Growth Green)]** 순서가 반드시 지켜져야 한다.
*   **필수 문구:** "괜찮습니다. 다시 한번 시도해 보세요.", "혹시 다음 옵션은 어떠신가요?" 등 공감적이고 행동을 유도하는 멘트를 최우선 배치한다.

## 📱 4. 플랫폼별 비주얼 가이드라인 (Marketing Asset Guidelines)
마케팅 에셋(Instagram, YouTube)은 웹사이트의 디자인 시스템을 *따라가는* 것이 아니라, **핵심 메시지를 증폭**시키는 역할을 해야 합니다.

| 채널 | 주요 특징 및 제약 사항 | 필수 준수 요소 | 적용 예시 |
| :--- | :--- | :--- | :--- |
| **Instagram (릴스/피드)** | 짧고 즉각적인 후킹(Hooking)에 집중. 텍스트가 너무 많으면 실패함. | 1. Pain $\rightarrow$ Solution 스토리텔링 구조화. <br> 2. Deep Blue와 Growth Green의 대비를 통해 메시지 전환을 시각적으로 명확히 한다. | 첫 3초 내에 소상공인의 '불안한 순간(Pain)'을 제시하고, 해결책이 되는 BDS 로고/컬러가 터져 나오며 안도감을 준다. |
| **YouTube (영상)** | 스토리텔링과 신뢰 구축에 초점. 영상 전반의 톤앤매너 확립. | 1. 공식적인 폰트 계층 구조(H1, H2)를 자막 및 그래픽 타이틀로 통일 적용한다. <br> 2. 데이터 시각화는 **움직이는 애니메이션**으로 보여주어 '성장'의 과정을 드라마틱하게 연출한다. | 그래프가 Pain Red에서 Solution Green으로 *변하는* 모션을 반드시 구현하여 감정적 전환을 극대화한다. |

---