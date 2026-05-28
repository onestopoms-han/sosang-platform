# 📡 Dashboard_API_Response_Schema_v1.0 — 백엔드 API 응답 스키마 및 KPI 로직 명세서

## 1. 개요
- **목적**: 프론트엔드 컴포넌트 (`KPI-Card`, `TrendGraph`) 가 백엔드에서 받은 데이터를 기반으로 시각화하고 상태 (Critical, Warning) 를 정확히 표현할 수 있도록 스키마를 정의합니다.
- **주요 참조**:
  - `PM_Dashboard_Status_Variables_v1.md` (데이터 모델)
  - `PM_Dashboard_DesignToken_KPI_Status.md` (디자인 토큰)
  - `DesignSystem_ComponentLibrary_Spec_v1.0.md` (컴포넌트 명세)

## 2. API 응답 구조 (JSON)
```json
{
  "status": "success",
  "timestamp": "2026-05-30T14:20:00Z",
  "data": {
    "kpi_status": {
      "code": "CRITICAL" | "WARNING" | "NORMAL", 
      "message": "재정 불안 임계값 도달", 
      "target_value": 70, 
      "current_value": 65 
    },
    "trend_data": {
      "period": "month", 
      "series": [
        {"date": "2026-04-01", "value": 85},
        {"date": "2026-05-01", "value": 75}
      ]
    },
  }
}
```

## 3. KPI 임계값 로직 (Business Logic)
| 상태 코드 | `current_value` vs `target_value` | 색상 | UI 행동 |
|----------|----------------------------------|------|---------|
| **NORMAL** | ≥ target_value | Green (`#00C853`) | 차트 정상 표시, 경고 없음 |
| **WARNING** | 60 ≤ current_value < target_value | Yellow (`#FFB400`) | 차트 색상 변경, tooltip 에 주의 메시지 |
| **CRITICAL** | < 60 | Red (`#D50000`) | 차트 빨간색 표시, 대시보드 최상단에 Critical Badge 표시 |

## 4. 프론트엔드 연동 가이드 (코다리용)
1. **데이터 수신**: JSON 파싱 후 `data.kpi_status.code` 로 상태 판단.
2. **상태 표현**: `TrendGraph` 의 `strokeColor` 를 `status.color` 와 매핑.
3. **임계값 시각화**: `KPI-Card` 에 현재 값과 목표 값을 표시하고, 차트 축에 임계값 선 (`target_value`) 을 그리세요.
4. **Tooltip 로직**: 마우스 오버 시 `"현재: {current_value}, 목표: {target_value}"` 형식으로 메시지 출력.

> 💡 **주의**: 이 스키마는 프론트엔드 컴포넌트의 `KPI-Card`, `TrendGraph` 와 완벽하게 호환되어야 합니다. 코다리는 반드시 이 규격을 따르세요.