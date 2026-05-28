# 🛠️ PM 대시보드 컴포넌트 구현 청사진 (Blueprint v1.0)

**[목표]**
확정된 데이터 모델(`PM_Dashboard_Data_Model_Spec_v1.0`)과 시스템 가이드라인을 기반으로, 핵심 지표(KPI: R01~R05, S01~S03 등)를 시각화하는 재사용 가능한 컴포넌트의 기술적 구조 및 초기 템플릿을 정의한다.

**[대상 컴포넌트]**
*   `KpiCard`: 단일 핵심 지표 값 표시 (가장 중요)
*   `TrendGraph`: 시간 경과에 따른 변화 추이 그래프
*   `GaugeMeter`: 목표 달성률 또는 위험도 시각화 (원형 게이지)

---

## 1. 컴포넌트별 상세 명세 및 Props 정의

### A. `KpiCard` (핵심 지표 카드)
**기능:** 특정 시점의 핵심 수치를 가장 크게 보여주며, 전월/전년 대비 변화율을 표시한다.
**필수 데이터 연동:** `KPI_VALUE`, `COMPARE_PERIOD_VALUE`, `DELTA_PERCENTAGE`

**Props 정의 (TypeScript/React 기준):**
| Prop명 | 타입 | 필수 여부 | 설명 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | O | 지표의 명칭 (e.g., '매출 성장률') | "월간 순 매출액" |
| `currentValue` | `number` | O | 현재 시점의 핵심 값 | 1500 |
| `unit` | `string` | O | 단위 표시자 (e.g., '만 원', '%') | "만 원" |
| `comparisonType` | `'period' \| 'absolute'` | O | 비교 기준 ('기간 대비' 또는 '절대치') | 'period' |
| `deltaPercentage` | `number` | R | 변화율 (%) (선택적) | 12.5 |
| `isPositiveTrend` | `boolean` | R | 긍정적 추세 여부 (색상 결정) | true |

**구조적 구현 가이드:**
```tsx
// KpiCard.tsx 구조 예시
const KpiCard = ({ title, currentValue, unit, comparisonType, deltaPercentage, isPositiveTrend }: KpiProps) => {
  // 1. 메인 값 (H2/H3 레벨로 크게 표시)
  return <div className="kpi-card">
    <h4 className="kpi-title">{title}</h4>
    <div className={`kpi-value ${deltaPercentage >= 0 ? 'positive' : 'negative'}`}>
      {currentValue.toLocaleString()} {unit}
    </div>

    // 2. 비교 정보 섹션
    <div className="kpi-comparison">
        <span>vs 전월:</span>
        <span style={{ color: isPositiveTrend ? 'green' : 'red' }}>
            {deltaPercentage >= 0 ? '+' : ''}{deltaPercentage}%
        </span>
    </div>
  </div>;
}
```

### B. `TrendGraph` (추이 그래프)
**기능:** 시간 흐름에 따른 여러 지표의 변화를 시계열로 보여준다. (Line Chart 또는 Area Chart 권장)
**필수 데이터 연동:** `TIME_SERIES_DATA` (날짜 배열과 해당 날짜의 값 쌍으로 구성된 JSON Array)

**Props 정의:**
| Prop명 | 타입 | 필수 여부 | 설명 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | O | 그래프 제목 (e.g., '최근 6개월 매출 추이') | "매출 변화" |
| `dataPoints` | `Array<{ date: string, value: number }>` | O | 시계열 데이터 배열 | [{date: '2024-01', value: 100}, ...] |
| `yAxisLabel` | `string` | O | Y축 단위 (e.g., '백만 원') | "백만 원" |
| `comparisonLineData` | `Array<{ date: string, value: number }>` | R | 비교 대상 데이터 라인 (선택적) | [...] |

**구조적 구현 가이드:**
```tsx
// TrendGraph.tsx 구조 예시
const TrendGraph = ({ title, dataPoints, yAxisLabel }: GraphProps) => {
  return <div className="trend-graph">
    <h5 className="chart-title">{title}</h5>
    {/* Chart.js 또는 Recharts 등 라이브러리 기반 구현 영역 */}
    <svg width={600} height={300}>...</svg> 
    <p className="y-axis-label">Y축: {yAxisLabel}</p>
  </div>;
};
```

### C. `GaugeMeter` (위험/달성도 게이지)
**기능:** 특정 목표 대비 현재 상태의 달성률 또는 위험도를 직관적으로 원형 그래프로 표시한다.
**필수 데이터 연동:** `TARGET_VALUE`, `CURRENT_VALUE`

**Props 정의:**
| Prop명 | 타입 | 필수 여부 | 설명 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | O | 게이지 제목 (e.g., '재정 안정성 지수') | "리스크 점수" |
| `targetValue` | `number` | O | 목표치 또는 최대 기준값 (100) | 80 |
| `currentScore` | `number` | O | 현재 계산된 점수/수치 | 72 |
| `unit` | `string` | R | 단위 표시자 | "" |

**구조적 구현 가이드:**
```tsx
// GaugeMeter.tsx 구조 예시 (원형 차트)
const GaugeMeter = ({ title, targetValue, currentScore }: GaugeProps) => {
  const percentage = Math.min(100, (currentScore / targetValue) * 100);

  return <div className="gauge-container">
    <h5 className="gauge-title">{title}</h5>
    {/* SVG를 이용한 원형 게이지 구현 영역 */}
    <svg width="150" height="150">...</svg>
    <p className="score-display">{currentScore}/{targetValue} {unit}</p>
  </div>;
};
```

---
**[디자인 검토 및 개발 가이드라인]**

1.  **데이터 연동 우선순위:** 모든 컴포넌트는 **`PM_Dashboard_Data_Model_Spec_v1.0.md`** 에 정의된 필드를 최우선으로 사용해야 합니다. 데이터 구조가 변경되면 해당 Props의 타입 정의를 즉시 수정해야 합니다.
2.  **반응형 디자인:** 모든 컴포넌트는 최소 375px 폭부터 1440px 폭까지 완벽하게 작동하는 반응형(Responsive)을 기본으로 합니다. (특히 `TrendGraph`는 스케일링 로직이 중요함).
3.  **상태 관리:** 데이터가 변경될 때마다 컴포넌트 전체를 리렌더링하기보다, Props 레벨에서 상태 변화만 감지하고 필요한 부분(예: `KpiCard`의 숫자 값)만 업데이트하는 최적화된 패턴을 적용해야 합니다.