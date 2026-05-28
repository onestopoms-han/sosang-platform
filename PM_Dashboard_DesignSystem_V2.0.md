# 📐 PM Dashboard 디자인 시스템 & 컴포넌트 구현 가이드 (V2.0)
## 🎯 개요 및 목표

본 문서는 BDS 소상공인 플랫폼의 핵심 기능인 '재정 안정성 지표 대시보드(PM Dashboard)'에 사용될 모든 UI 컴포넌트와 시각적 요소들의 기술적 일관성을 확립하는 최종 가이드라인입니다. 개발팀은 이 문서를 최우선 기준으로 삼아 코드를 구현해야 합니다.

**목표:**
1.  모든 디자인 결정에 대한 단일 출처(Single Source of Truth) 제공.
2.  컴포넌트의 사용법, Props, 상태(State), 그리고 토큰 기반의 규칙을 명확히 정의.
3.  개발 초기 단계에서 발생하는 디자인/구현 오류를 최소화.

---

## 🎨 I. 시각적 기본 요소 (Visual Primitives & Tokens)

### 1. 컬러 시스템 (Color Palette Tokens)
모든 색상은 아래 토큰(Token)을 사용합니다. 하드코딩된 HEX 코드는 금지됩니다.

| 토큰명 | 용도 | Primary/Secondary | 예시 코드 (HEX) | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| `--color-primary` | 핵심 액션, 긍정 지표 강조 | Primary | `#1E90FF` | 신규 기회 발굴, 성공적 전환 |
| `--color-secondary` | 보조 정보, 중립 요소 | Secondary | `#4682B4` | 기본 라인, 그래프 배경 등 |
| `--color-text-default` | 일반 텍스트 본문 | Text | `#333333` | 가장 높은 대비율 유지 |
| `--color-background-surface` | 컴포넌트 카드 및 표면 | Background | `#FFFFFF` | 메인 콘텐츠 배경 (화이트) |
| `--color-background-base` | 전체 페이지 배경 | Background | `#F4F7FC` | 섹션 간 분리 효과를 주는 미세한 그레이 |
| `--color-alert-success` | 목표 달성, 긍정적 변화 | Status | `#28A745` | (예: 재정 개선) |
| `--color-alert-warning` | 주의 필요, 경계선 | Status | `#FFC107` | (예: 유동성 감소 임계값 근접) |
| `--color-alert-danger` | 심각한 문제, 위험 상태 | Status | `#DC3545` | (예: 재정 악화, 부채 초과) |

### 2. 타이포그래피 시스템 (Typography Scale Tokens)
폰트: Inter (또는 국내 적합 상업용 산세리프체)를 사용합니다. 모든 크기(Size)와 자간/행간은 일관된 스케일을 따릅니다.

| 역할 | 토큰명 | Size (px) | Line Height (rem) | Weight | 용도 및 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | `--font-h1` | 32px | 1.2rem | Bold | 대시보드 섹션 제목 (최대) |
| **H2** | `--font-h2` | 24px | 1.3rem | SemiBold | 핵심 지표 그룹 제목 |
| **Body Large** | `--font-body-lg` | 18px | 1.5rem | Regular | 중요한 설명, 카드 내 메인 카피 |
| **Body Base** | `--font-body-base` | 16px | 1.5rem | Regular | 일반적인 데이터 레이블 및 본문 |
| **Label/Caption** | `--font-label` | 12px | 1.4rem | Medium | 차트의 축 라벨, 날짜 표시 등 보조 정보 |

### 3. 간격 및 그리드 시스템 (Spacing & Grid Tokens)
*   **기본 스케일:** 8pt 기반(Grid Unit: 8px). 모든 패딩, 마진, 컴포넌트 너비는 $N \times 8\text{px}$ 배수로 정의합니다.
    *   `--space-sm`: 8px (Small Padding)
    *   `--space-md`: 16px (Standard Gap)
    *   `--space-lg`: 24px (Section Margin)
    *   `--space-xl`: 32px (Major Container Gap)

---

## ✨ II. 컴포넌트별 구현 규칙 (Component Implementation Rules)

### 1. Card Component (`<Card>`)
*   **규칙:** 모든 핵심 지표는 개별 `<Card>` 컴포넌트로 감싸야 합니다. 이는 배경(`--color-background-surface`), 그림자(Shadow), 그리고 마진을 통일하여 '정보의 단위'를 시각적으로 분리합니다.
*   **Props 예시:** `title`, `content` (children), `isElevated` (boolean: 높으면 Shadow 추가).

### 2. KPI Card Component (`<KPI-Card>`) - 핵심 지표 표시 카드
*   **위치:** 대시보드 최상단, 주요 재무 안정성 지표(R01, S01 등) 배치 영역.
*   **레이아웃:**
    *   최상단: Label (`--font-body-lg`, `--color-text-default`)
    *   중앙: Value (가장 크게, `--font-h2` 사용). **필수:** 값 옆에 변화 추이 화살표/퍼센트(`Δ 5.2% ▲`)를 배치하고, 이 방향성에 따라 색상 토큰을 적용합니다.
    *   하단: 설명 및 비교 정보 (`--font-label`, `--color-secondary`).
*   **상태 관리:** 지표 값이 임계치를 벗어날 경우, 해당 카드의 **배경(`background`)이나 테두리(`border`)**에 `--color-alert-warning` 또는 `--color-alert-danger`를 적용해야 합니다.

### 3. Trend Graph Component (`<TrendGraph>`) - 추이 그래프
*   **규칙:** 반드시 시간 축(X축)과 값 축(Y축)을 명확히 분리합니다.
*   **데이터 처리:** API에서 받은 데이터는 항상 **`[ {date: 'YYYY-MM-DD', value: number}, ... ]`** 배열 형태를 예상하고, 그래프 렌더링 로직은 이 구조에 종속되어야 합니다.
*   **색상 사용:** 추이선의 기본 색상은 `--color-secondary`를 사용하며, 상승 구간에서는 `--color-primary`, 하락 구간에서는 `--color-alert-danger`로 자동 전환되도록 구현합니다 (Conditional Coloring).

### 4. Table Component (`<DataTable>`)
*   **규칙:** 데이터 테이블은 최소한의 정보만 보여주고, 가독성이 가장 중요합니다.
*   **스타일:** Stripe 효과(줄무늬 배경)를 적용하여 행 간 구분을 명확히 합니다. (짝수/홀수 행에 미세하게 다른 배경색 사용).
*   **헤더:** 헤더는 `--color-background-surface`와 `border: 1px solid var(--color-secondary)`로 구분합니다.

---

## ✅ III. 개발 체크리스트 및 액션 플랜 (Developer Checklist)

1.  [ ] **반응형 설계(Responsiveness):** 모든 컴포넌트는 모바일, 태블릿, 데스크톱 환경에서 뷰포트 크기에 맞춰 유연하게 축소/확대되도록 구현되어야 합니다. (Breakpoint: 768px, 1200px)
2.  [ ] **접근성(Accessibility):** 모든 컴포넌트는 ARIA 속성을 포함하여 스크린 리더를 사용하는 사용자도 내용을 이해할 수 있도록 설계해야 합니다. (특히 색상 대비율 WCAG AA 이상 준수).
3.  [ ] **코드 구조:** 각 컴포넌트(`<KPI-Card>`, `<TrendGraph>`)는 독립적이며, 명확한 Props 인터페이스(TypeScript)를 정의하고 테스트 코드를 동반하여 작성해야 합니다.