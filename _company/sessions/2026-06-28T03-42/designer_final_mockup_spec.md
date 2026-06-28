# Trust Widget & PainGauge 최종 디자인 시스템 사양 (Figma Blueprint)

## 1. 브랜드 컬러 시스템 적용

| 요소 | 색상 명칭 | HEX 코드 | 용도 및 의미 |
| :--- | :--- | :--- | :--- |
| **주요 신뢰/기본** | Deep Blue (신뢰 기반) | `#004D66` | Widget 배경, 주요 텍스트, CTA 버튼. 플랫폼의 신뢰도를 나타냄. |
| **성장/긍정** | Growth Green (성장 지표) | `#3CB371` | PainGauge의 'Good' 또는 'Optimal' 상태 표시. 성과 및 긍정적 변화를 나타냄. |
| **위기/경고** | Red (위기 지표) | `#DC3545` | PainGauge의 'Bad' 또는 'Critical' 상태 표시. 즉각적인 주의가 필요한 위기 상황을 나타냄. |

## 2. Trust Widget 디자인 사양

*   **레이아웃:** 카드 형태 (Card Layout).
*   **배경:** Deep Blue (`#004D66`).
*   **구성 요소:**
    *   **Title:** "플랫폼 신뢰 지표" (Deep Blue 텍스트).
    *   **Score Display:** 중앙에 가장 큰 글씨로 현재 Trust Score를 표시. (Growth Green 또는 Red 동적 색상 적용).
    *   **Data Visualization:** 아래에 세부 항목(예: 데이터 정확도, 시스템 안정성 등)을 작은 아이콘과 함께 나열하고, 각 항목 옆에는 해당 지표의 상태를 녹색/노란색/빨간색으로 표시.
    *   **Footer:** "데이터 기반 성장 컨설팅" 문구를 작게 배치하여 신뢰감을 강화.

## 3. PainGauge 디자인 사양

*   **레이아웃:** 게이지 바(Gauge Bar) 형태의 시각화.
*   **기본 구조:** 원형 또는 가로 막대 형태의 진행률 표시.
*   **색상 기반 상태 정의 (동적 반응):**
    *   **Green (성장):** 70% 이상 충족 시, 게이지 바 전체가 Growth Green (`#3CB371`)으로 채워짐.
    *   **Yellow (주의):** 40% ~ 69% 충족 시, 게이지 바가 혼합된 색상(Deep Blue와 Growth Green의 중간 톤) 또는 Yellow로 표시됨.
    *   **Red (위기):** 39% 이하 충족 시, 게이지 바 전체가 Red (`#DC3545`)로 채워짐.
*   **텍스트 오버레이:** 게이지 바 중앙에 현재 Pain Level (예: "Pain Level: Medium")을 명확하게 표시하며, 색상은 해당 레벨(Green/Yellow/Red)과 일치시킴.

## 4. API 스키마 요구사항 반영 (데이터 필드)

이 디자인은 다음의 데이터 필드를 기반으로 동적으로 렌더링되어야 합니다.

| 컴포넌트 | 필수 데이터 필드 | 설명 | UI 매핑 |
| :--- | :--- | :--- | :--- |
| **Trust Widget** | `platform_trust_score` (0-100) | 플랫폼 전반의 신뢰 점수. | 중앙 Score 표시 |
| | `data_reliability_index` (0-100) | 데이터 확보 및 처리의 신뢰 지표. | 세부 항목 표시 |
| **PainGauge** | `pain_level` (String: 'Low', 'Medium', 'High') | 현재 사용자가 느끼는 고통/어려움 수준. | 게이지 색상 결정 |
| | `data_quality_score` (0-100) | 데이터 품질에 대한 사용자 만족도. | Pain Gauge의 핵심 값으로 활용