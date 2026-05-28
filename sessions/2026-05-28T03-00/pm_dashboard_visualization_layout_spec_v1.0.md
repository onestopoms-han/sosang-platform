# 📊 PM Dashboard 시각화 레이아웃 및 API 데이터 구조 명세 (V1.0)

## 1. 개요
Designer 가 정의한 UI 컴포넌트 시스템 (`PM_Dashboard_Component_System_Guide_v1.0.md`) 을 기반으로, 핵심 지표별 시각화를 위한 구체적인 레이아웃 요구사항과 이를 연동할 API 응답 JSON Schema 를 정의합니다.

**목표:**  
- 개발자가 UI 컴포넌트를 바로 호출하여 구현 가능한 명확한 사양 제공
- 프론트엔드와 백엔드의 데이터 계약 (Contract) 사전 확정
- 차트, 테이블 등 시각화 요소의 배치, 상호작용, 데이터 흐름 명시

## 2. 핵심 지표 및 레이아웃 요구사항

| 지표 코드 | 지표명 | 시각화 유형 | 레이아웃 위치 | 상호작용 요구사항 | 데이터 Refresh 주기 |
|-----------|----------|--------------|----------------|-------------------|--------------------|
| **R01** | 월 수익 (Revenue) | 라인 차트 + 누적 막대 (Dual Axis) | 상단 중앙 (Hero Section) | 호버 시 상세 데이터-tooltip, 기간 선택 슬라이더 | 실시간 (5 분마다) |
| **R02** | 고객 획득 비용 (CAC) | 수직 막대 차트 | 왼쪽 사이드바 | 마우스 오버 시 전년 대비 비교 표시 | 1 시간 |
| **S01** | 고객 만족도 점수 (CSAT) | 게이지 차트 + 평점 분포 히스토그램 | 오른쪽 사이드바 | 단계별 색상 전환, 평균과 목표치 강조 | 실시간 |
| **R03** | 운영 효율성 지표 (OEE) | 산형도 (Pareto Chart) | 하단 중앙 | 슬라이더로 기간 선택 시 차트 재생성 | 1 시간 |

## 3. API 응답 JSON Schema

### 3.1 시각화 데이터 전체 payload (`/api/dashboard/metrics`)
```json
{
  "meta": {
    "timestamp": "2026-05-28T03:00:00Z",
    "refreshIntervalMs": 300000,
    "version": "1.0"
  },
  "metrics": [
    {
      "code": "R01",
      "displayName": "월 수익 (Revenue)",
      "chartType": "dualAxisLineBar",
      "layoutConfig": {
        "width": 600,
        "height": 350,
        "xAxisLabel": "기간",
        "yAxisPrimaryLabel": "수익 (원)",
        "yAxisSecondaryLabel": "매출량 (개)"
      },
      "dataPoints": [
        {
          "date": "2026-05-01",
          "revenue": 1200000,
          "salesCount": 45
        },
        {
          "date": "2026-05-08",
          "revenue": 1350000,
          "salesCount": 52
        }
      ]
    },
    {
      "code": "R02",
      "displayName": "고객 획득 비용 (CAC)",
      "chartType": "verticalBar",
      "layoutConfig": {
        "width": 300,
        "height": 250,
        "yAxisLabel": "비용 (원)"
      },
      "dataPoints": [
        {
          "month": "2026-04",
          "cac": 85000,
          "previousYearCac": 92000
        }
      ]
    },
    {
      "code": "S01",
      "displayName": "고객 만족도 점수 (CSAT)",
      "chartType": "gaugeWithHistogram",
      "layoutConfig": {
        "width": 300,
        "height": 250,
        "thresholdColor": "#ff6b6b"
      },
      "dataPoints": [
        {
          "score": 4.8,
          "targetScore": 4.5,
          "distribution": [
            {"range": "1~2", "count": 2},
            {"range": "3~4", "count": 5},
            {"range": "5", "count": 93}
          ]
        }
      ]
    },
    {
      "code": "R03",
      "displayName": "운영 효율성 지표 (OEE)",
      "chartType": "paretoChart",
      "layoutConfig": {
        "width": 600,
        "height": 350,
        "xAxisLabel": "공정"
      },
      "dataPoints": [
        {
          "process": "조립선 A",
          "efficiencyScore": 92.3,
          "defectRate": 1.2
        }
      ]
    }
  ],
  "interactiveConfig": {
    "tooltipEnabled": true,
    "zoomRangeMs": 7*24*60*60*1000, // 7 일
    "dateFilterAvailable": true
  }
}
```

### 3.2 차트별 세부 데이터 타입
- **dualAxisLineBar**: `dataPoints` 배열 내 객체 반드시 `{date, revenue, salesCount}` 포함  
- **verticalBar**: `dataPoints` 배열 내 객체 `{month, cac, previousYearCac}`  
- **gaugeWithHistogram**: `distribution` 배열은 각 범위별 `{range, count}` 쌍으로 구성  
- **paretoChart**: `dataPoints` 배열 내 `{process, efficiencyScore, defectRate}`

## 4. UI 컴포넌트와의 연동 규칙
1. **LayoutConfig.width/height**는 실제 컨테이너 크기와 동일해야 하며, 반응형 디자인을 위해 최소 300px 를 보장  
2. **chartType** 값은 Designer 의 `PM_Dashboard_Component_System_Guide_v1.0.md` 에 정의된 컴포넌트 타입과 정확히 일치  
3. **dataPoints** 배열은 반드시 `{date, value}` 형식을 따르되, 차트 타입에 따라 추가 필드 포함  
4. **interactiveConfig**는 프론트엔드가 제공한 기본 상호작용을 활성화할지 여부를 정의

## 5. 개발 체크리스트
- [ ] API 응답에서 모든 필드가 유효성 검사를 통과하는지 확인 (JSON Schema validate)  
- [ ] 각 차트 타입에 대한 UI 컴포넌트가 존재하고, Props 명세가 일치하는지 검증  
- [ ] 실시간 데이터 스트림이 5 분마다 업데이트되고, 프론트엔드에서 자동 재렌더링 되는지 테스트  
- [ ] 호버, Zoom, 기간 선택 등 상호작용이 정상 작동하는지 기능 테스트  

## 6. 다음 단계
1. Designer 가 위 명세에 따라 UI 컴포넌트 가이드 (`PM_Dashboard_Component_System_Guide_v1.0.md`) 와 일관성을 검증  
2. 개발자가 API 응답을 받아 프론트엔드 구현 시작  
3. 백엔드에서 실제 데이터 파이프라인 연동 테스트  

---
**작성자:** 코다리 (시니어 풀스택 엔지니어)  
**검토:** Designer, Developer  
**버전:** 1.0  
**최종 업데이트:** 2026-05-28T03:00:00Z