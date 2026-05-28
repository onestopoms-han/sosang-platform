# 🎨 BDS PM 대시보드 UI 컴포넌트 라이브러리 명세 (V1.0)

## 🎯 목표 및 원칙
이 문서는 개발팀과 디자이너가 공유하는 단일 진실 공급원(Single Source of Truth)입니다. 모든 PM 대시보드의 시각화 요소는 여기에 정의된 컴포넌트와 Props를 기반으로 구축되어야 합니다.
**디자인 시스템 핵심:** 일관성, 접근성 (WCAG AA 이상), 반응형 웹 대응.

---

## 1. KPI Card Component (`<KPI_Card>`)
가장 중요한 지표를 한눈에 보여주는 카드 형태의 컴포넌트입니다. 대시보드 상단 Hero Section에 필수적으로 사용됩니다.

*   **구현 역할:** 단일 숫자 값 표시, 전 기간 대비 변화율 표시.
*   **Props (Input Schema):**
    *   `title`: string (지표명) - 예: "월간 매출액"
    *   `value`: number (현재 지표값) - 필수
    *   `comparisonValue`: number (비교 기준값, 예: 전월 대비)
    *   `changeType`: 'up' | 'down' | 'none' (변화 방향)
    *   `timePeriod`: string (기준 시간 범위) - 예: "vs. Last Month"
*   **디자인 규칙:**
    1.  **레이아웃:** `[제목] / [핵심 값]` 형태를 유지하며, 하단에 비교 텍스트와 아이콘이 배치됩니다.
    2.  **색상:** 기본 배경은 `#FFFFFF`. 변화 방향에 따라 보조 색상이 적용됩니다.
        *   `up`: Primary Color (`#007bff`) - 상승 시 강한 신뢰감 부여
        *   `down`: Warning Color (`#dc3545`) - 하락 리스크 경고
    3.  **폰트:** 핵심 값(`value`)은 `Bold`, 28px 크기를 유지합니다.

## 2. Line Graph Component (`<Trend_LineGraph>`)
시간에 따른 추이(Trend)를 보여주는 가장 일반적인 차트 컴포넌트입니다. (R01, R03 등)

*   **구현 역할:** 연속적인 데이터 포인트의 변화를 시각화합니다.
*   **Props (Input Schema):**
    *   `title`: string
    *   `dataPoints`: Array<{ x: Date | string, y: number }> - 시간(x축)과 값(y축) 쌍 배열
    *   `colorPalette`: string[] (사용할 라인 색상 목록)
    *   `isDualAxis`: boolean (Y축을 두 개 사용해야 하는지 여부)
    *   `tooltipFormat`: function (호버 시 표시 포맷 지정)
*   **디자인 규칙:**
    1.  **축 레이블:** X축은 날짜/시간 단위로, Y축은 소수점 첫째 자리까지 표기합니다.
    2.  **상호작용:** 호버(Hover) 시 해당 지점의 좌표와 툴팁이 즉시 떠야 하며, 마우스가 지나간 구간만 강조(Highlight)되어야 합니다.
    3.  **Dual Axis 처리:** `isDualAxis`가 참일 경우, 보조 Y축은 메인 축과 다른 색상 계열을 사용하고 명확히 분리해야 합니다 (예: Primary Blue vs Secondary Teal).

## 3. Bar Chart Component (`<Comparison_BarChart>`)
범주별 비교나 특정 기간의 성과를 직관적으로 보여줄 때 사용합니다. (R02 등)

*   **구현 역할:** 이산적인 범주(Category) 간의 값 크기 비교.
*   **Props (Input Schema):**
    *   `title`: string
    *   `categories`: Array<string> - X축에 표시될 항목 이름들 (예: '전년', '작년', '이번 달')
    *   `values`: Array<number> - 각 카테고리에 대응하는 값 배열
    *   `orientation`: 'vertical' | 'horizontal' (차트 방향)
    *   `comparisonType`: 'absolute' | 'ratio' (비교 방식)
*   **디자인 규칙:**
    1.  **직관성:** 막대의 너비(수직) 또는 길이(수평)가 값의 크기를 즉각적으로 나타내야 합니다.
    2.  **색상 사용:** 비교 대상 간에 그룹화된 색상을 사용하여, 어떤 항목들이 같은 성격인지 시각적으로 묶어주는 것이 중요합니다 (예: 'A 그룹'은 항상 #AAAAAA 계열).
    3.  **Tooltip:** 막대 위에 마우스를 올리면 정확한 숫자와 함께 비율(%)이 표시되어야 합니다.

## 4. Gauge Chart Component (`<Progress_Gauge>`)
목표 대비 현재 달성도를 백분율로 보여주는 게이지 컴포넌트입니다. (S01 등)

*   **구현 역할:** 목표치(Target)와 실제 값(Actual) 간의 Gap을 시각화합니다.
*   **Props (Input Schema):**
    *   `title`: string
    *   `currentValue`: number (현재 달성률, 0~100)
    *   `targetValue`: number (목표치, 100%)
    *   `unit`: string (%)
*   **디자인 규칙:**
    1.  **색상 구간:** 게이지 바는 세 가지 색상으로 명확히 구분되어야 합니다.
        *   `Danger Zone (<60%)`: Warning Color (`#ffc107`) - 즉각적인 주의 필요
        *   `Warning Zone (60%~90%)`: Neutral Color (`#28a745`) - 개선 노력 필요
        *   `Success Zone (>90%)`: Primary Color (`#007bff`) - 목표 달성 임박/달성
    2.  **표시:** 게이지 바의 현재 위치와 함께, *남은 거리 (Gap)*를 숫자로 명확히 표시하여 사용자에게 행동 유도를 해야 합니다.