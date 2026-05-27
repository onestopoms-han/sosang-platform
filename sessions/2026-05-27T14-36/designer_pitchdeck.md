# 🎨 투자자 피치 덱 디자인 가이드 & 시각화 계획 (Draft)

**작성일:** 2026-05-27  
**작성자:** 📷 Designer Agent (수행 예정)  
**상태:** [준비] - Writer 에이전트에서 전달받은 스토리라인 및 데이터 구조를 기반으로 시각화 계획을 수립합니다.

## 1. 피치 덱 레이아웃 & 흐름 (Storyboard)
- **슬라이드 1: 오픈서 (Hook)**  
  - 시각적 요소: 어두운 배경에 작은 불빛 하나 → PRSR 점수 상승과 함께 불빛이 퍼져나감.  
  - 텍스트 배치: 중앙 하단에 "기술은 차갑지만, 결과는 따뜻합니다."

- **슬라이드 2~3: 데이터와 감정의 교차 (PRSR ↔ Anxiety)**  
  - 시각적 요소: PRSR 점수 그래프 + 심리적 안정도 평점 애니메이션.  
  - 텍스트 배치: 좌측 그래프, 우측에는 '안심' → '평화' 키워드가 떠오르는 효과.

- **슬라이드 4~5: 비즈니스 가치 연결 (Stability Premium)**  
  - 시각적 요소: PRSR 점수 구간별 가격 인상을 나타내는 원형 차트.  
  - 텍스트 배치: 중앙에 "10% 이상의 프리미엄 가격을 지불할 의사가 있습니다."

- **슬라이드 6: 클로징 & CTA**  
  - 시각적 요소: BDS 로고 + 투자자 피칭용 QR 코드.  
  - 텍스트 배치: 하단에 "기술 지표와 인간 심리를 연결하는 첫 번째 플랫폼이 되는 지금, 함께 하지 않으시겠습니까?"

## 2. 데이터 시각화 계획 (Data Viz)
- **PRSR Score → Emotional Tone:** 점수 구간별 색상 매핑 (90+: 따뜻한 연두색, 70~89: 중성 회색, <70: 경고 주황색).  
- **ERT Response Time → 신뢰도:** 응답 시간이 짧을수록 '신뢰' 아이콘이 커지는 효과.  
- **Stability Premium ROI:** 투자 수익률을 나타내는 성장 곡선 + 심리적 안정도를 나타내는 파형 그래프 병렬 표시.

## 3. 디자인 톤앤매너 가이드 (Tone & Style)
- **주요 색상:** 연한 회색 배경 + 따뜻한 노란색 포인트 (심리적 안정감 강조).  
- **타이포그래피:** 가독성 높은 산세리프 폰트 (Noto Sans KR) + 등각 스타일 아이콘.  
- **이미지 스타일:** 실제 소상공인 얼굴 대신 '안정된 손' 또는 '기술적 구조물' 이미지를 활용하여 기술과 인간의 연결을 강조.

<create_file path="sessions/2026-05-27T14-36/designer_visualization_plan.json">
{
  "pitch_deck_structure": [
    {
      "slide_id": 1,
      "visual_theme": "dark_with_warm_light",
      "animation_sequence": "fade_in_prsr_score → expand_light_effect"
    },
    {
      "slide_id": 2,
      "data_visualization_type": "correlation_chart",
      "x_axis": "PRSR_Score",
      "y_axis": "Psychological_Stability_Index",
      "color_scheme": "warm_to_cool_gradient"
    },
    {
      "slide_id": 3,
      "data_visualization_type": "roi_curve",
      "x_axis": "Time(Month)",
      "y_axis": "Revenue_Increase%",
      "annotation_style": "highlight_premium_price_points"
    }
  ],
  "tone_guide": {
    "background_color": "#F5F5F7",
    "accent_color": "#FFD700",
    "font_family_primary": "Noto Sans KR",
    "icon_style": "isometric_technical"
  }
}