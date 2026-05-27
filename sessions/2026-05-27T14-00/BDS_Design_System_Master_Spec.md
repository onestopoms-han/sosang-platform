# BDS 소상공인 플랫폼: 최종 디자인 시스템 마스터 명세서 V2.0

## 📄 개요 및 목표
본 문서는 BDS소상공인플렛폼의 모든 UI/UX 요소에 대한 **단일 진실 공급원(Single Source of Truth)** 역할을 합니다. Pitch Deck, 웹 시뮬레이터, 랜딩 페이지 등 모든 플랫폼에서 일관성을 유지하며 개발자가 즉시 구현 가능한 컴포넌트 명세 및 인터랙션 로직을 정의합니다.

## 🎨 글로벌 스타일 가이드라인 (Global Style Guide)
*   **컬러 시스템:**
    *   Primary Blue (신뢰/기본): `#004D66` (Deep Blue). *사용처: 헤더, 배경(Problem), 버튼 기본 상태.*
    *   Secondary Green (성장/해결): `#3CB371` (Growth Green). *사용처: 성공 메시지, CTA, 해결 결과 표시.*
    *   Alert Red (위험/문제): `#D9534F`. *사용처: 불안정 지표 경고(PRSR < X), 에러 발생 시.*
    *   Neutral Gray: `#F0F0F0` (배경), `#666666` (텍스트).
*   **타이포그래피:** Pretendard (산세리프, 가독성 최우선)
    *   Header (H1-H3): Bold, 28px ~ 32px. Deep Blue 사용 권장.
    *   Body: Regular, 16px. Dark Gray 사용 권장.
*   **아이콘:** Fluent UI Style (단색 아이콘셋 활용)

## ✨ 핵심 컴포넌트 상세 명세 (Component Detail Spec)

### 1. 시스템 지표 카드 (System Index Card - PRSR/ERT)
*   **목적:** 기술 지표를 감성적 가치로 변환하여 보여주는 핵심 요소.
*   **레이아웃:** Flex Box, 좌우 분할 구조.
    *   **[좌측: 현재 상태]**: 큰 숫자와 텍스트 (`Current PRSR Score: [XX].`) 배치. **(🚨 위험 경고 시 Red 배경 오버레이)**
    *   **[우측: 가치 해석]**: '이 수치가 의미하는 것'을 명확히 설명하는 카피 영역. (예: "현재 시장 상황에 대한 통제감 하락")
*   **인터랙션:** 마우스 오버 시, 지표 변동 그래프(Line Chart)가 간결하게 애니메이션으로 나타나며, 지난 7일 대비 변화율을 표시해야 함.

### 2. '안전망' 메시지 컴포넌트 (Safety Net Message Card)
*   **목적:** BDS의 가치를 감성적으로 전달하며, 사용자에게 안도감을 주는 시각적 장치.
*   **레이아웃:** Deep Blue 배경과 Growth Green의 조합 사용. 중앙에 핵심 문구 배치.
*   **인터랙션 (가장 중요):** 이 컴포넌트는 단순한 섹션이 아니라 **'변화 과정(Transition)'**을 시각화해야 합니다.
    1.  **[Start State]**: Red/Gray 배경 + 불안정 카피 제시.
    2.  **[Action Trigger]**: 사용자가 BDS 기능(예: AI 대시보드)를 활용하는 순간, 화면이 부드럽게 **Deep Blue 톤으로 전환 (Cross-fade)**.
    3.  **[End State]**: Growth Green 배경 + '안전망 확보' 메시지 제시.

### 3. CTA 버튼 (Call To Action Button)
*   **상태 정의:**
    *   `Default`: Solid Deep Blue (`#004D66`).
    *   `Hover`: Deep Blue에서 약간 밝은 톤으로 미묘하게 변화(Transition Effect).
    *   `Disabled`: Light Gray 배경, 투명도 감소.
    *   **핵심**: 모든 CTA는 사용자가 얻을 '혜택'을 명확한 문구로 포함해야 합니다 (예: "데이터 기반 성장 로드맵 확인하기").

## 🛠️ 컴포넌트 구현 체크리스트 (Developer Checklist) - 코다리 검토 요청
*   [ ] PRSR/ERT 데이터 연동 시, 실시간 경고색(`Alert Red`) 처리 로직 명확화.
*   [ ] '안전망' 트랜지션 애니메이션(State 1 $\rightarrow$ State 2)의 CSS/JS 구현 가이드라인 제공 필요.
*   [ ] 모든 컴포넌트가 반응형 웹 디자인(Responsive Web Design, RWD)에 적합하도록 모바일 우선(Mobile-First) 구조를 유지해야 함.