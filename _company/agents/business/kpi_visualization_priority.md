# 💼 KPI 시각화 우선순위 및 데이터 가설 — 현빈의 전략 보고서

_작성일: 2026-06-30 | 버전: V1.0 | 작성자: 현빈 (Head of Business)_

## 🎯 1. 핵심 목표 (CEO 지시 기반)
> **가장 가치 있는 단일 작업:** AOV, CAC, LTV 데이터의 초기 가설과 플랫폼 목표 달성 관점에서 가장 중요한 지표(KPI) 3 가지 선정 및 시각화 우선순위 설정.

## 📊 2. KPI 선정 근거 (손실(Loss) 중심 전략 적용)
소상공인은 단순한 '이익 증가'가 아닌 **'지금 이대로 두면 잃을 것이 무엇인가'**에 민감합니다. 따라서 KPI 는 잠재적 손실을 수치화하여 보여주고, 플랫폼 사용이 그 손실을 막아주는 보험처럼 느껴져야 합니다.

### **Top 3 핵심 KPI 선정**
1.  **순현금흐름 (Cash Flow per Transaction)**
    -   **정의:** `(AOV - CAC) * (LTV / AOV)` → 실제 한 거래당 플랫폼 사용으로 인한 순이익의 현재 가치
    -   **손실 연결:** "이 거래를 하지 않으면 손실을 보는 것은 아니다. 하지만 이 플랫폼을 쓰지 않으면 미래에 더 큰 손해를 입는다."
2.  **고객생명가치 성장률 (LTV Growth Rate)**
    -   **정의:** `(本期 LTV - 上期 LTV) / 上期 LTV` → 고객 한 명의 가치 증가율
    -   **손실 연결:** "고객을 유지하지 않으면 LTV 가 감소하여 장기적으로 수익이 감소합니다."
3.  **유출율 감소 효과 (Churn Rate Reduction Impact)**
    -   **정의:** `(사용 플랫폼 전 유출율 - 사용 후 유출율) * 고객수` → 플랫폼 사용으로 인한 이탈 방지 효과
    -   **손실 연결:** "고객이 떠나면 매출이 줄고, 플랫폼 사용은 그 손실을 막아줍니다."

## 🎨 3. 시각화 우선순위 (Design Spec V3.0 기반)
### **우선순위 1: Cash Flow per Transaction 대시보드**
-   **시각화 요소:** 실시간 거래별 순이익 흐름, CAC 대비 AOV 효율도
-   **사용자 행동 유도:** "이 거래는 당신을 위한 것입니다." → 즉각적인 수익성 확인
-   **Design Spec 적용:** 신뢰도 (Trust Widget) 와 위기감 (Pain Gauge) 을 결합하여 시각화

### **우선순위 2: LTV Growth Rate 트렌드 차트**
-   **시각화 요소:** 고객별 LTV 증가 추세, 경쟁사 대비 성장률
-   **사용자 행동 유도:** "고객을 더 오래 유지하면 수익이 늘어납니다." → 장기적 관점 제시
-   **Design Spec 적용:** 미래 예측 (Forecast) 과 실제 데이터 비교

### **우선순위 3: Churn Rate Reduction Impact 열 지도**
-   **시각화 요소:** 지역별 유출율 감소 효과, 고객 유지 기여도
-   **사용자 행동 유도:** "이 지역은 플랫폼 사용이 필수적입니다." → 지역 기반 마케팅 강화
-   **Design Spec 적용:** 위기감 (Pain Gauge) 과 신뢰도 (Trust Widget) 의 결합

## 🛠️ 4. 실행 계획 (Agent Assignment)

### **👨‍💻 Developer (코다리)**
-   **작업:** Mock API 서버에서 AOV, CAC, LTV 데이터를 생성하고, `kpi_visualization_priority.md` 에 정의된 KPI 를 포함하도록 데이터 스키마 업데이트.
    -   `C:\Users\PJH\소상공인플렛폼\_company\agents\business\tools\mock_api.py` 파일 수정 및 실행.
-   **산출물:** `mock_data.csv`, `kpi_definition.md` (업데이트)

### **🎨 Designer**
-   **작업:** `kpi_visualization_priority.md` 에 정의된 시각화 우선순위에 따른 대시보드 와이어프레임 제작 및 Trust Widget/Pain Gauge 통합.
    -   Design Spec V3.0 적용하여 신뢰도 및 위기감 시각화 강조.
-   **산출물:** `dashboard_wireframe_v1.fig`, `trust_pain_gauge_component.fig`

### **📺 레오 (YouTube)**
-   **작업:** Cash Flow per Transaction 대시보드를 활용한 숏폼 영상 스토리보드 제작 (후크: "이 거래는 당신을 위한 것입니다.").
    -   Trust Widget/Pain Gauge 시각화 강조.
-   **산출물:** `youtube_cashflow_hook_storyboard.md`

## 📝 5. 다음 단계
1.  Developer 에게 Mock API 서버 실행 지시 (`mock_api.py` 수정 및 실행).
2.  Designer 에게 대시보드 와이어프레임 제작 지시.
3.  레오에게 숏폼 영상 스토리보드 제작 지시.

_현빈 (비즈니스 전략가) _