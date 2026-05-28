# BDS소상공인플렛폼 - 디자인 시스템 컴포넌트 라이브러리 명세서 v1.0

**최종 출처 (Single Source of Truth)**
*   **목적:** 개발팀이 코딩하는 모든 UI/UX 요소의 기준점 및 가이드라인을 확정합니다. 이 문서에 정의된 사양은 예외 없이 따라야 합니다.
*   **참조 파일:** 
    *   디자인 토큰: [PM_Dashboard_DesignToken_KPI_Status.md] (최종 색상, 상태 코드)
    *   데이터 모델: [PM_Dashboard_Status_Variables_v1.md] (핵심 데이터 구조 정의)

## 🧱 공통 원칙 및 디자인 토큰 참조

| 영역 | 사양 | 값/규칙 | 비고 |
| :--- | :--- | :--- | :--- |
| **Primary Color** | Deep Blue | `#004D66` | 헤더, 주요 버튼 배경 등 신뢰성 강조 영역. |
| **Secondary Color** | Growth Green | `#3CB371` | 성장/긍정적 상태(Safe) 표시 및 CTA 강조. |
| **Text Default** | Neutral Gray | `#333333` | 일반 텍스트 색상. |
| **Critical State (Danger)** | Red | `#DC3545` | 임계값 미달, 심각한 리스크 상태. (예: R01 < 70) |
| **Warning State** | Yellow/Orange | `#FFC107` | 주의 필요 단계. (예: 재정 변동성 증가) |

## ⚙️ 컴포넌트별 상세 명세

### 1. KPI-Card Component (핵심 지표 요약 카드)

*   **역할:** 사용자의 현재 핵심 성과 지표를 한눈에 보여주며, 리스크 상태를 직관적으로 전달합니다.
*   **데이터 입력 (API Schema):** `KPI_ID` (string), `CURRENT_VALUE` (float), `TARGET_VALUE` (float), `TREND_CHANGE` (percentage)
*   **시각화 규칙:**
    1.  **상태 결정:** `CURRENT_VALUE`와 `TARGET_VALUE`를 비교하여 상태 토큰을 즉시 적용합니다.
        *   $State = \text{IF } (\text{Current} < 70 \text{ AND } \text{Target}) \implies \text{Critical}$ (빨간색)
        *   $\text{ELSE IF } (\text{Current} < \text{Threshold}_{warning}) \implies \text{Warning}$ (주황색)
        *   $\text{ELSE} \implies \text{Safe}$ (초록색)
    2.  **Trend 표시:** `TREND_CHANGE`는 작은 화살표 아이콘과 함께 Value 아래에 배치하며, 상승은 Green, 하락은 Red를 사용합니다.
    3.  **레이아웃:** [Icon] -> [KPI Label] / [Current Value (State Color)] -> [Change Icon + %].

### 2. TrendGraph Component (시간 흐름 변화 그래프)

*   **역할:** 시간이 지남에 따른 재정 및 운영 지표의 추이(Trend)를 시각화합니다.
*   **데이터 입력 (API Schema):** `TIME_SERIES` (JSON Array), `METRIC_NAME` (string), `DATA_POINTS` (Array of {Timestamp: Date, Value: float})
*   **시각화 규칙:**
    1.  **차트 유형:** 라인 그래프(Line Chart)를 기본으로 사용합니다. 꺾이는 지점마다 점(Dot marker)을 표시하여 데이터 포인트를 강조합니다.
    2.  **임계선 적용 (Crucial):** 전체 그래프 영역에 **기준 임계값(Threshold Line)**을 반드시 수평선(`y=T`)으로 그립니다. 이 선은 Critical/Warning 상태 경계를 시각적으로 보여주어 사용자가 위험 구간을 인지하도록 돕습니다.
    3.  **색상:** 기본 라인 색상은 Deep Blue를 유지하되, 임계값 이하의 데이터 포인트는 자동으로 Warning 또는 Critical 색상으로 변환하여 표현합니다.

### 3. RecommendationCard Component (맞춤형 대안 카드)

*   **역할:** 분석된 데이터를 기반으로 소상공인에게 즉각적인 '해결책'을 제안하는 액션 유도 컴포넌트입니다.
*   **데이터 입력 (API Schema):** `RECOMMENDATION_ID` (string), `TITLE` (string, 최대 30자), `DESCRIPTION` (text, 최대 150자), `CALL_TO_ACTION` (link/button data)
*   **시각화 규칙:**
    1.  **구조:** 헤더(제목) -> 본문(설명) -> CTA 버튼 순서로 계층적으로 배치합니다.
    2.  **강조:** 이 카드는 가장 중요한 '행동 유도' 섹션이므로, 카드 전체 배경에 미세한 Growth Green 그라데이션을 적용하여 긍정적인 느낌을 부여합니다.
    3.  **CTA 버튼:** 클릭 시 관련 서비스(예: 컨설팅 신청 페이지)로 이동하는 명확한 링크를 제공해야 합니다.

---