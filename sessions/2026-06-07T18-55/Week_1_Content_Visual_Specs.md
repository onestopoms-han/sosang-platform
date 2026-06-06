<file># Week 1 콘텐츠 시각적 사양서 (Visual Specs)

## 🎯 목표
초기 4 주 마케팅 캘린더의 첫 주 (Week 1) 콘텐츠를 **Safety Margin Design System V2.0**에 완벽하게 적용하여, 'PainGauge' 컴포넌트의 핵심 메시지('안전마진')와 성장 시각화를 전달하는 일관된 디자인을 확보합니다.

## 🎨 디자인 시스템 요약 (Designer 산출물 기준)
- **Primary Colors:** Deep Blue (#0A1F3D), Safety Orange (#FF8C00), Growth Green (#2ECC71)
- **Typography:** Noto Sans KR (Body: 16px, Headline: 48px Bold)
- **Spacing:** 24px 패딩 통일 (CTA 버튼 등 핵심 요소)
- **Animation:** Growth Green 성장 애니메이션 (SVG path + CSS keyframes)

## 📐 Week 1 콘텐츠 사양

### 1. YouTube 썸네일 (Video Thumbnail)
**컨셉:** PainGauge 결과 표시 시 성장하는 그래프와 Safety Orange CTA 버튼이 강조됨
- **배경:** Deep Blue (#0A1F3D) 그라데이션
- **메인 그래픽:** SVG 기반 성장 곡선 (Growth Green #2ECC71)
    - `d="M10,50 C20,40 30,60 40,30"` (초기 스펙 예시)
    - `stroke-width: 4; stroke-linecap: round`
- **CTA 버튼:** Safety Orange (#FF8C00) 배경, 흰색 텍스트 "안전마진 확인하기"
    - 패딩: 24px (모든 핵심 요소 통일)
    - 글꼴: Noto Sans KR Bold 16px
- **여백:** 상하좌우 각각 30px (Safe Area 준수)

### 2. Instagram 릴스/이미지 (Reel/Image)
**컨셉:** PainGauge 컴포넌트의 애니메이션을 정지된 이미지로 표현하여 '성장'을 강조
- **배경:** Deep Blue (#0A1F3D) 그라데이션 + Growth Green 포인트
- **메인 그래픽:** 성장하는 그래프 (SVG path, 200x200px)
    - `d="M0,80 C40,60 80,90 120,40"` (초기 스펙 예시)
- **CTA 버튼:** Safety Orange (#FF8C00) 배경, 흰색 텍스트 "안전마진 확인하기"
    - 패딩: 24px
- **여백:** 상하좌우 각각 50px (Safe Area 준수)

### 3. 인스타그램 캡션 (Caption) 및 유튜브 설명 (Description)
**컨셉:** PainGauge 컴포넌트의 핵심 메시지('안전마진')를 강조하는 스토리텔링 기반 카피

**인스타그램 캡션 초안:**
- **후크:** "당신의 소상공인은 안전한 성장의 길을 걷고 있나요?"
- **본문:** PainGauge 를 활용하면 '안전마진'을 실시간으로 확인하며, 성장 기회를 놓치지 않습니다. #소상공인플렛폼 #안전마진 #성장
- **CTA:** "PainGauge 결과 확인하기" (안전마진 확인하기)

**유튜브 설명 초안:**
- **Title:** PainGauge 로 '안전마진'을 실시간 확인하세요!
- **본문:** 초기 4 주 마케팅 캘린더의 Week 1 콘텐츠입니다. Safety Margin Design System V2.0 에 완벽하게 적용된 디자인을 만나보세요.
- **Tags:** #PainGauge #안전마진 #소상공인플렛폼

## 🚀 다음 단계 (Designer/Writer 협업)
1.  **Designer** 가 위 사양서를 바탕으로 실제 이미지 및 썸네일 디자인을 생성합니다.
2.  **Writer** 가 Designer 의 시각적 요소를 반영하여 최적화된 콘텐츠 내 텍스트 (카피, 해시태그, 설명문) 를 작성합니다.
3.  **코다리** 가 PainGauge 컴포넌트의 코드 기반 시각적 요소 (SVG path 데이터, 애니메이션 타이밍) 를 정리하여 두 에이전트에게 기술 가이드를 제공합니다.