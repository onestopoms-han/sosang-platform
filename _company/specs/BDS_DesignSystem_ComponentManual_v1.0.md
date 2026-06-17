# 🎨 BDS소상공인플렛폼 디자인 시스템 컴포넌트 매뉴얼 v1.0

## 📄 개요
본 문서는 Trust Widget 및 PainGauge 컴포넌트를 개발팀이 React/Vue 환경에서 즉시 구현할 수 있도록, 확정된 Deep Blue(#004D66)와 Growth Green(#3CB371) 시스템을 기반으로 한 **상태별 (Stateful)** 디자인 명세서입니다.

## 📐 공통 원칙
*   **Grid:** 8pt 격자 시스템 준수. 모든 패딩, 마진, 크기는 8의 배수로 설정.
*   **Typography:** Heading (Deep Blue), Body (Dark Gray #333). Font: Pretendard 또는 Noto Sans KR (가독성 최우선).
*   **Color Coding:**
    *   신뢰도/기회(Growth): `#3CB371` (Growth Green)
    *   위험/경고(Worry): `#FF6B6B` (Red, Pain Gauge에 사용)
    *   정보(Info): Deep Blue (`#004D66`)

## 🧩 컴포넌트 상세 사양: Trust Widget (신뢰 지표)

**목적:** 소상공인의 비즈니스 신뢰도를 데이터 기반으로 직관적으로 시각화.
**핵심 요소:** 트랙(Track), 현재 값(Value), 추이 그래프(Trend).

### 1. Default State (Standard Reliability Score: 75/100)
*   **구조:** 가로형 게이지 바 + 수치 표시 + 설명 카피.
*   **디자인:** 배경 트랙은 Deep Blue의 연한 그라데이션을 사용하고, 현재 신뢰 값(75%)은 Growth Green으로 채움.
*   **API 매핑:** `current_score` (Number), `max_score` (Number).

### 2. Loading State (Data Fetching)
*   **구조:** 스켈레톤 UI 적용. 게이지 바는 낮은 불규칙성(Low Irregularity)을 가진 애니메이션 라인으로 표현.
*   **애니메이션:** 트랙 전체가 Deep Blue의 은은한 점진적 색상 변화를 보이도록 설계. (점멸 X, 부드러운 흐름 O).

### 3. Error State (API Failure)
*   **구조:** 게이지 바 자체가 비활성화되며, 그 아래에 에러 메시지 컴포넌트가 표시됨.
*   **디자인:** 경고 색상(Pain Red: `#FF6B6B`)을 사용하여 트랙 전체를 감싸고, 텍스트로 "데이터 연결 오류: 30초 후 재시도해주세요." 명시.

### 4. Success State (Major Improvement Detected)
*   **조건:** 이전 측정 대비 신뢰도가 특정 임계치(예: 15점 이상) 상승했을 경우.
*   **디자인:** 게이지 바의 Growth Green 채움 영역 옆에 반짝이는 애니메이션 요소와 함께 "✨신뢰도 대폭 향상!"이라는 뱃지 컴포넌트가 오버레이됨.

### 5. Empty State (No Data History)
*   **조건:** 첫 데이터 수집을 시도하는 경우.
*   **디자인:** 게이지 바를 비활성화하고, 대신 "첫 신뢰 지표를 측정해 보세요. AI 컨설팅을 통해 시작할 수 있습니다."라는 액션 유도형 카피와 함께 CTA 버튼(`측정 시작`)을 배치.

---

## 🧩 컴포넌트 상세 사양: Pain Gauge (위기 감지)

**목적:** 소상공인이 느끼는 고통(Pain Point)의 심각성을 수치 및 색상으로 경고.
**핵심 요소:** 위험 레벨 게이지, 핵심 요인 목록(Factor List).

### 1. Default State (Critical Risk Level: High Worry)
*   **구조:** 세 가지 전이적 위험 지표를 표시하는 그래프와 그 아래 구체적인 원인을 나열하는 리스트 구조.
*   **디자인:** 현재 레벨에 따라 게이지 바의 색상이 결정됨.
    *   Low: `#3CB371` (Growth Green)
    *   Medium: Deep Blue (`#004D66`)
    *   High/Critical: Pain Red (`#FF6B6B`)
*   **API 매핑:** `worry_level` (Enum), `pain_factors` (Array of Objects).

### 2. Loading State & Empty State
*(Trust Widget과 동일한 스켈레톤 및 안내 문구 컴포넌트 재사용)*

### 3. Error State (Data Mismatch)
*   **디자인:** "위기 지표 데이터가 시스템에 누락되었습니다." 메시지와 함께, 어떤 요인이 부족한지 구체적으로 리스트업하여 사용자에게 피드백 제공.

## 🏷️ 개발팀 참고 사항 및 다음 액션
1.  **재사용성:** 위에 정의된 모든 상태별 컴포넌트는 하나의 유니버설 컴포넌트(`<TrustWidget />`, `<PainGauge />`)로 구현되어야 하며, props를 통해 `state` (e.g., 'loading', 'error')와 `data`가 제어되어야 합니다.
2.  **애니메이션:** 상태 전환 시 애니메이션은 반드시 부드럽고(Smooth) 명확해야 하며, Deep Blue/Growth Green 톤을 유지하며 불안감을 증폭시키지 않도록 세심하게 설계할 것.