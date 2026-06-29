# 🚀 BDS소상공인플렛폼 통합 리뷰 블루프린트 v1.0: 개발 최종 검증 명세서

## 🎯 목적
이 문서는 `KPI-Card`와 `TrendGraph` 컴포넌트를 구현하는 프론트엔드 팀(코다리), 백엔드 로직을 구축하는 팀(현빈), 그리고 UI/UX 표준을 정의한 디자인팀 간의 **최종 통합 검증 체크리스트**입니다. 이 명세서에 정의된 모든 흐름은 예외 없이 동작해야 합니다.

## 🔗 참조 문서
*   [Design System Component Library Spec v1.0](c:\Users\PJH\소상공인플렛폼\DesignSystem_ComponentLibrary_Spec_v1.0.md) (시각적/UX 기준)
*   [Dashboard API Response Schema v1.0](Dashboard_API_Response_Schema_v1.0.md) (데이터/로직 계약)
*   [PM Dashboard Status Variables v1.0](PM_Dashboard_Status_Variables_v1.md) (핵심 데이터 구조)

## 🟢 섹션 I: KPI 상태별 통합 매핑 테이블 (Critical Path)

| **비즈니스 시나리오 (Pain Point)** | **KPI 지표** (`data.kpi_status`) | **API 조건/로직** (현빈 검토) | **데이터 값 범위** (`current_value` vs `target_value`) | **UI 상태 토큰** (Designer 검증) | **컴포넌트 구현 가이드라인** (코다리) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🔴 **심각한 재정 불안** | `code`: CRITICAL | $< 60$ (임계값 미달) | $current\_value < 60$ | Red (`#D50000`) / Critical Badge | **KPI-Card:** 배경 및 아이콘이 강렬하게 빨간색. 최상단에 알림 배지 필수. |
| 🟡 **주의 필요 (경고)** | `code`: WARNING | $60 \le current\_value < target\_value$ | $60 \le current\_value < 70$ | Yellow (`#FFB400`) / Warning Label | **KPI-Card:** 색상 변경, Tooltip에 '주의' 메시지 필수. 경고 배지는 선택적. |
| 🟢 **정상 운영** | `code`: NORMAL | $\ge target\_value$ | $current\_value \ge 70$ | Green (`#00C853`) / Normal State | **KPI-Card:** 표준 녹색 사용, 별도 알림 없음. |

---

## 📈 섹션 II: TrendGraph 시각화 로직 통합 검증 (시간 흐름)

TrendGraph는 단순히 현재 값을 보여주는 것이 아니라 '추세'를 보여주므로, 다음 세 가지 요소가 결합되어야 합니다.

### 1. 데이터 스키마 연동 확인
*   **API 필드:** `data.trend_data.series` (Date: String, Value: Number)
*   **요구 사항:** 최소한 최근 N개월(예: 6개월)의 시계열 데이터를 반드시 받아야 함.

### 2. 위젯 동작 로직 및 색상 매핑
| **추세 상태** | **데이터 패턴/변화율** (로직 정의 필요) | **시각적 표현 방식** (Designer) | **기술 구현 필수 체크리스트** (코다리) |
| :--- | :--- | :--- | :--- |
| ⬆️ **긍정적 추세** | 지난 N개월 평균 대비 증가율 $\ge X\%$ | 선 그래프의 기울기(Slope)가 가파른 녹색 계열. | 데이터 포인트마다 Smooth Curve 적용 여부 확인. |
| ⬇️ **위험 추세 (Critical)** | 최근 3개월간 지속적인 하락 패턴 ($Y$ 지표 미달). | 기준선(`target_value`) 아래에서 빨간색 음영 처리. | `KPI-Card`의 Critical 상태와 연동되어야 함. **(핵심!)** |
| ↔️ **정체/보합** | 변동폭이 작고 안정적인 패턴. | 표준화된 회색 또는 파란색 계열 라인 사용. | 축(Axis) 레이블 명확성 및 가독성 확보. |

---

## ✅ 섹션 III: 최종 개발팀 체크리스트 (QA/Dev Handover)

| 항목 | 검증 내용 | 담당 에이전트 | 완료 여부 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **[A] 데이터 스키마** | 모든 KPI 상태(Normal, Warning, Critical)에 대한 백엔드 응답 JSON 필드가 완벽히 정의되었는가? | 현빈 | [ ] | `data.kpi_status` 구조 최종 확인. |
| **[B] 컴포넌트 명세** | 각 시각적 요소 (색상 코드, 폰트 크기, 간격)가 Design System Spec에 따라 구현되었는가? | Designer/코다리 | [ ] | `KPI-Card`와 `TrendGraph`의 토큰 적용 확인. |
| **[C] 통합 흐름** | Critical 상태일 때 (API $\rightarrow$ UI), 대시보드 최상단 알림 배지까지 연동되는가? | 전원 협업 | [ ] | 가장 중요한 End-to-End 테스트 지점. |