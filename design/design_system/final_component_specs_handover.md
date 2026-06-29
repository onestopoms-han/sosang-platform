# 🎨 BDS 컴포넌트 최종 개발 사양: Trust Widget & PainGauge v3.0.1

**작성일:** 2026-06-11
**대상:** Development Team (코다리)
**목표:** Mockup 단계 탈피, 모든 상태 변화와 인터랙션이 코드 레벨에서 구현 가능한 최종 명세서 제공.

---

## I. 공통 원칙 및 디자인 토큰 재확인
*   **Primary Color Palette:** [HEX: #007AFF] (신뢰/안정)
*   **Risk State Colors:**
    *   🟢 **A Grade (Low Risk):** #2ECC71 (Green 계열). 안정적이고 높은 신뢰도를 시각적으로 표현.
    *   🟡 **B Grade (Medium Risk):** #FFC300 (Yellow 계열). 주의가 필요하지만 해결 가능한 단계.
    *   🔴 **C Grade (High Risk):** #E74C3C (Red 계열). 즉각적인 개입과 도움이 필요한 위험 상태.

## II. ⚙️ Trust Widget 상세 사양
Trust Widget은 '안전마진(Safety Margin)'을 시각적으로 표현하는 핵심 컴포넌트입니다.

### 1. 기본 구조 및 좌표 명세
*   **Overall Container:** `[360px] x [200px]` (고정 크기).
*   **Key Element 1: Trust Score Display:** 중앙 상단에 위치하며, 실시간으로 점수(%)가 업데이트되는 그래프 영역.
    *   *좌표:* X: 80px ~ 280px / Y: 40px ~ 120px
    *   *높이:* 데이터 바인딩에 따라 동적 변경 (Min Height: 30px, Max Height: 70px)
*   **Key Element 2: Risk Label:** 점수 아래, 현재 리스크 등급(A/B/C)을 텍스트와 아이콘으로 표시.

### 2. 상태별 인터랙션 및 애니메이션 (State-by-State Rule)

| State | `risk_score` 범위 | 시각적 규칙 (CSS / JS Logic) | 애니메이션 명세 (Timeline) |
| :---: | :--- | :--- | :--- |
| **A Grade** | 0.8 이상 | **Color:** 배경 및 그래프가 #2ECC71 계열의 부드러운 그라데이션 적용. <br> **Iconography:** ✅ (체크마크) + "안전마진 확보" 텍스트 활성화. | **Graph Build-up:** 페이지 로드 시, 점수 바(Bar)가 좌측 하단에서 우측 상단으로 `EaseOutQuad` 함수를 따라 부드럽게 상승하며 채워짐 (Duration: 1s). |
| **B Grade** | 0.4 ~ 0.8 | **Color:** 배경 및 그래프가 #FFC300 계열의 경고색 적용. <br> **Iconography:** ⚠️ (경고) + "점검 필요" 텍스트 활성화. | **Graph Update:** 점수가 변경될 경우, 이전 값에서 새 값으로 `Spring` 애니메이션을 사용하여 역동적으로 변화함 (Duration: 0.5s). |
| **C Grade** | 0.4 미만 | **Color:** 배경 및 그래프가 #E74C3C 계열의 위험색 적용. <br> **Iconography:** 🚨 (경고) + "즉각적 개입 필요" 텍스트 활성화. | **Graph Flash & Shake:** 점수가 변경될 때, 위젯 전체가 짧은 `Pulse` 애니메이션과 함께 미세하게 좌우로 흔들리는(Shake) 효과를 부여하여 위험을 즉각적으로 알림 (Duration: 0.3s). |

---

## III. 🔥 PainGauge 상세 사양
PainGauge는 소상공인이 느끼는 고통 지점을 측정하며, 위젯과 연동되어야 합니다.

### 1. 기본 구조 및 좌표 명세
*   **Overall Container:** `[360px] x [250px]` (고정 크기).
*   **Key Element 1: Gauge Arc:** 원형 게이지 바 (진행률 표시).
    *   *좌표:* 중앙 X: 180px, Y: 170px. 반지름(R): 120px.
    *   *색상:* 리스크 등급에 따라 아크의 채움 색상이 동적으로 변경됨 (A/B/C).
*   **Key Element 2: Pain Level Indicator:** 현재 측정된 고통 레벨을 점수와 키워드로 표시.

### 2. 상태별 인터랙션 및 애니메이션

| State | `pain_score` 범위 | 시각적 규칙 (CSS / JS Logic) | 애니메이션 명세 (Timeline) |
| :---: | :--- | :--- | :--- |
| **Low Pain** | 0 ~ 30점 | **Color:** 아크 채움 색상 #2ECC71. 배경에 '안정화' 관련 부드러운 패턴 오버레이. <br> **Text:** "만족도 높음" 키워드가 텍스트가 아닌, 심볼(😊)로 표시됨. | **Loading:** 로딩 시 아크가 중앙에서 바깥으로 자연스럽게 채워지는 `Spiral-fill` 효과 (Duration: 1s). |
| **Medium Pain** | 31 ~ 70점 | **Color:** 아크 채움 색상 #FFC300. 배경에 '고민' 또는 '질문 부호' 패턴 오버레이. <br> **Text:** "어떤 어려움을 느끼시나요?" 질문 유도 문구 활성화. | **Update:** 점수 변화 시, 게이지 바가 튕기듯(Bouncy) 즉각적으로 업데이트됨 (Duration: 0.4s). |
| **High Pain** | 71 ~ 100점 | **Color:** 아크 채움 색상 #E74C3C. 배경 전체에 미세한 '위험 경고' 깜빡임(Blinking) 효과 적용. <br> **Text:** "도움이 필요합니다" (Call-to-Action 강조). | **Impact:** 점수가 갱신될 때마다, 게이지 중앙의 포커스 포인트가 강렬하게 커지며(`Scale` up), 사용자의 시선을 사로잡음 (Duration: 0.2s) - *강력한 CTA 유도*. |

---