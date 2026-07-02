# TrustWidget_PainGauge_V3.0_Design_Specification
## 🎨 브랜드 컬러 시스템 (Trust & Pain)
- Primary Blue: #2196F3 (신뢰 및 플랫폼 아이덴티티)
- Success Green (Trust): #4CAF50 (성공, 안정, 성장)
- Error Red (Pain): #F44336 (위험, 긴급성, 경고)
- Neutral Light: #E6F7F7 (신뢰 패널 배경)
- Warning Light: #FFF3F3 (고통 패널 배경)

## 📐 레이아웃 및 구조 (Dual Panel Dashboard)
- Layout Type: Split Screen (50% Trust / 50% Pain)
- Font Family: Pretendard (모든 텍스트에 적용)
- Primary Layout: Flexbox 기반의 듀얼 패널.

## ✨ 컴포넌트 명세
### 1. Trust Widget (신뢰 지표)
- Visualization: Circular Progress Bar
- Color Mapping: Green Gradient (Low -> High Trust)
- Animation: Data Increase 시, 미세한 입자(Particle) 애니메이션 추가.

### 2. PainGauge (고통 지표)
- Visualization: Linear Gauge Meter
- Color Mapping: Red Gradient (Low Risk -> Critical Risk)
- Interaction: 임계치 도달 시, 게이지 자체에 경고 깜빡임 효과 적용.

## 🚀 최종 실행 가이드
이 명세를 기반으로 HTML/CSS 코드를 재작성하여 실제 프로토타입을 구현합니다.