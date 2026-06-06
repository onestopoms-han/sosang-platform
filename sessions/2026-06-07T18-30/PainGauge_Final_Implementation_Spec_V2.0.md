# 🛠️ PainGauge 컴포넌트 최종 구현 명세서 (Design Implementation Spec V2.0)

## 🎯 목적
본 문서는 '베타 출시 스토리라인'에 따른 소상공인의 경험 변화(Pain → Safety Margin)를 담는 핵심 컴포넌트, **PainGauge**의 시각적/기술적 완결성을 확정하고, 개발팀이 오류 없이 코딩할 수 있는 최종 기준점 역할을 합니다.

## 1. 시스템 개요 및 목표 상태 (Goal State)
*   **컴포넌트명:** PainGauge (Pain to Safety Margin Indicator)
*   **핵심 가치 반영:** '안전마진(Safety Margin)'을 시각적, 인터랙티브하게 정의함.
*   **작동 원리:** 사용자가 자신의 비즈니스 어려움(Pain)을 입력하면, 시스템이 이를 분석하여 현재 위험 수준(Pain Score)과 개선 가능 지표(Potential Safety Margin)를 실시간으로 계산하고 시각화합니다.

## 2. 컴포넌트 구조 및 상태 정의 (States & Structure)
### A. 단계별 인터랙션 플로우 (User Journey Flow)
| # | 사용자 액션 (Trigger) | 시스템 피드백 (Visual State Change) | 목표 UX 경험 | 담당 에이전트 검토 |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **[Initial]** 컴포넌트 진입 | 대기 상태. 'PainGauge 측정 시작' CTA 활성화 (Deep Blue). | 호기심 유발, 참여 유도. | Designer/Writer |
| 2 | **[Input]** Pain 질문에 응답 및 제출 | 입력된 어려움 키워드(Text)가 리스트업되며 애니메이션으로 표시됨. 게이지가 초기 위험 지점(Warning Orange)을 가리킴. | 문제의 명확한 인지, 공감대 형성. | Designer/Writer |
| 3 | **[Processing]** 데이터 분석 및 API 호출 시뮬레이션 | 로딩 상태 (Deep Blue 배경에 미세한 진동 효과). "데이터 기반 안전마진 측정 중..." 메시지 표시. *(*기술적 안정성 체크 포인트*) | 기다림의 지루함 최소화, 신뢰도 확보. | Designer/Codari |
| 4 | **[Output]** 최종 결과 제시 (Safety Margin) | 게이지가 폭발적으로 상승하며 목표 안전마진(Growth Green) 영역을 표시. 그래프와 함께 핵심 수치가 명확히 강조됨. | 희망 부여, 행동 변화 동기 유발. | Designer/Codari |

### B. 시각적 상태 정의 (Visual States Definition)
| State Name | 색상 코드 (HEX) | Primary Visual Element | 애니메이션 스펙 | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Deep Blue** (기본/CTA) | `#004D66` | 배경, 기본 텍스트. | 부드러운 페이드 인/아웃. | 신뢰성, 안정감 강조. |
| **Warning Orange** (Pain Zone) | `#FF9800` | 초기 게이지 영역. 위험 경고 메시지. | 느리고 불규칙한 떨림(Jitter Effect). | 문제의 심각성을 체감하게 함. |
| **Safety Green** (Success/Goal) | `#3CB371` | 최종 안전마진 목표 영역. 성장 그래프. | 강력하고 부드러운 상승 곡선 애니메이션(Spring effect). | 성공적 해결, 희망 제시. |

## 3. 기술 구현 명세 (Codari Handover Spec)
### A. API 연동 요구사항 (Backend/Schema Check)
*   **Endpoint:** `/api/v1/pain-gauge/calculate` (GET/POST 방식 협의 필요)
*   **Input Schema (요청):** `{"pain_keywords": ["재고관리", "인력부족"], "business_sector": "F&B"}`
*   **Output Schema (응답):** `{"risk_score": 0.75, "safety_margin": {"value": 0.88, "unit": "점"}, "recommendations": ["A", "B"]}`
    *   *Note:* `risk_score`는 Warning Orange와 연동되고, `safety_margin`은 Safety Green과 연동되어야 함.

### B. 프론트엔드 구현 가이드 (Front-End Logic)
1.  **Pain Score 계산 로직:** 사용자가 3가지 이상의 키워드를 입력하면 `risk_score`를 높게 책정하고, 게이지는 Warning Orange 구간에 머물러야 함.
2.  **애니메이션 타이밍:** State 4 (결과 제시)의 **Safety Green 상승 애니메이션은 반드시 API 응답이 성공한 직후(딜레이 없이)** 시작되어야 합니다. 이 전환 과정에서 기술적 지연이 발생하면 안 됩니다.
3.  **컴포넌트 구현 원칙:** 모든 수치 변화(`score`, `margin`)는 CSS Transitions와 JavaScript 라이브러리 기반의 부드러운 **곡선(Easing Curve)** 애니메이션을 사용해야 합니다. (딱딱한 점프/변화 금지).

## 4. 마케팅 및 콘텐츠 연계 지침 (Instagram/Leo Guidance)
*   **썸네일 활용:** PainGauge가 측정되기 직전의 '위험한 상황'과, 안전마진이 확정된 후의 '안도감/성장 그래프'를 대비시키는 이원적 구도를 썸네일 메인 비주얼로 적극 활용할 것.
*   **카피라이팅 포인트:** "막연한 걱정" $\rightarrow$ **[PainGauge]** $\rightarrow$ "측정 가능한 해결책". 감성적인 접근에서 데이터 중심의 신뢰 구축으로 전환되는 흐름을 강조합니다.

***