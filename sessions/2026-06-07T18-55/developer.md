<file># 💻 코다리 (Developer) — Week 1 콘텐츠 시각적 사양 기술 가이드

## 🎯 목표
Designer 와 Writer 가 생성한 Week 1 콘텐츠를 **Safety Margin Design System V2.0**에 완벽하게 적용하여, 'PainGauge' 컴포넌트의 핵심 메시지('안전마진')와 성장 시각화를 전달하는 일관된 디자인을 확보합니다.

## 📐 기술 가이드 (Designer/Writer 협업)
- **YouTube 썸네일:** PainGauge 결과 표시 시 성장하는 그래프와 Safety Orange CTA 버튼이 강조됨
    - 배경: Deep Blue (#0A1F3D) 그라데이션
    - 메인 그래픽: SVG 기반 성장 곡선 (Growth Green #2ECC71)
        - `d="M10,50 C20,40 30,60 40,30"` (초기 스펙 예시)
        - `stroke-width: 4; stroke-linecap: round`
    - CTA 버튼: Safety Orange (#FF8C00) 배경, 흰색 텍스트 "안전마진 확인하기"
        - 패딩: 24px (모든 핵심 요소 통일)
        - 글꼴: Noto Sans KR Bold 16px
- **Instagram 릴스/이미지:** PainGauge 컴포넌트의 애니메이션을 정지된 이미지로 표현하여 '성장'을 강조
    - 배경: Deep Blue (#0A1F3D) 그라데이션 + Growth Green 포인트
    - 메인 그래픽: 성장하는 그래프 (SVG path, 200x200px)
        - `d="M0,80 C40,60 80,90 120,40"` (초기 스펙 예시)
    - CTA 버튼: Safety Orange (#FF8C00) 배경, 흰색 텍스트 "안전마진 확인하기"
        - 패딩: 24px

## 🚀 다음 단계 (Designer/Writer 협업)
1.  **Designer** 가 위 사양서를 바탕으로 실제 이미지 및 썸네일 디자인을 생성합니다.
2.  **Writer** 가 Designer 의 시각적 요소를 반영하여 최적화된 콘텐츠 내 텍스트 (카피, 해시태그, 설명문) 를 작성합니다.
3.  **코다리** 가 PainGauge 컴포넌트의 코드 기반 시각적 요소 (SVG path 데이터, 애니메이션 타이밍) 를 정리하여 두 에이전트에게 기술 가이드를 제공합니다.