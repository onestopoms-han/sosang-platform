# 🛠️ BDS 플랫폼 개발 핸드오프 패키지 (V2.0)

## 🎯 목적
코다리(개발팀)가 KPI Gauge 및 전체 UI/UX의 동적 애니메이션 로직을 구현하는 데 필요한 모든 시각적, 구조적 명세를 통합 제공합니다. 이 문서는 Motion Design System(`designer.md`)과 데이터 스키마(`PM_Dashboard_Status_Variables_v1.md`)를 최종적으로 하나로 합친 '개발진행용 단일 원점'입니다.

---

## 🎨 섹션 1: 디자인 토큰 및 스타일 가이드 (Design Tokens & Style Guide)

### 1. 컬러 시스템 (Color Palette - Semantic Mapping)
| 토큰명 | HEX Code | 용도 | 설명 |
| :--- | :--- | :--- | :--- |
| **Primary/Deep Blue** | `#004D66` | 브랜드 강조, 배경 섹션 | 신뢰성, 전문성 (BDS의 핵심 가치) |
| **Secondary/Growth Green** | `#3CB371` | 성공, 성장, CTA 버튼 | 긍정적 변화, 목표 달성(Solution) |
| **Danger/Alert Red** | `#CC0000` | 위험, 경고, KPI 하락 | 즉각적인 주의 필요 (Pain Point) |
| **Neutral/Gray Scale** | `#F5F5F5` | 배경, 카드 분리 | 시각적 휴식 공간 제공 |
| **Text/Dark Blue** | `#333333` | 본문 텍스트 | 가독성 극대화 |

### 2. 타이포그래피 (Typography Scale)
*   **폰트:** Noto Sans KR (가장 높은 가독성을 가진 시스템 폰트로 지정)
*   **Headline (H1):** 48px / Bold / Deep Blue (`#004D66`) - 가장 중요한 메시지 강조.
*   **Sub-Headline (H2):** 32px / SemiBold / Text/Dark Blue
*   **Body Copy:** 16px / Regular / Text/Dark Blue

---

## 📈 섹션 2: KPI Gauge Motion Design System Spec

### 1. 기본 원리 (Emotional Journey Mapping)
시스템의 모든 애니메이션은 **'Pain $\to$ Solution'** 의 감정적 여정을 따라야 합니다.
*   **상태 정의:** `CRITICAL` $\to$ `WARNING` $\to$ `NORMAL` $\to$ `GROWTH`
*   **색상 매핑 (Color Interpolation):** Red (Critical) $\to$ Orange/Yellow (Warning) $\to$ Green (Growth).

### 2. 상태별 모션 파라미터 (State-based Animation Logic)
| KPI State | 색상 토큰 | 시각적 변화 (Animation Effect) | 데이터 로직 트리거 | 사용자 경험(UX) 피드백 |
| :--- | :--- | :--- | :--- | :--- |
| **CRITICAL** | `Danger/Alert Red` | **Pulse & Drop:** 게이지 바가 미세하게 떨리며 (0.5s 반복), 수치 숫자가 크게 축소되었다가(Shrink) 튀어 오르는(Bounce) 효과 발생. | `KPI_Value < Threshold_Low` | 경고 아이콘 + "긴급 조치 필요" 액션 카드 노출. |
| **WARNING** | Orange/Yellow | **Slow Fade & Fluctuation:** 게이지가 천천히 변색하며, 수치 주변에 잔물결 효과(Ripple Effect) 발생. | `Threshold_Low <= KPI_Value < Threshold_Mid` | "주목 필요"와 같은 톤앤매너의 조언 제시. |
| **NORMAL** | Deep Blue/Gray | **Smooth Transition:** 안정적이고 부드러운 선형 변화 (Linear Interpolation). 모션이 가장 절제됨. | `Threshold_Mid <= KPI_Value < Threshold_High` | "현재 상태 유지" 메시지 및 기본 데이터 제공. |
| **GROWTH** | `Growth Green` | **Accelerate & Bloom:** 게이지가 빠르게 상승하며, 목표 지점에 도달할 때 마치 꽃이 피어나듯(Bloom) 시각적 만족감 극대화. | `KPI_Value >= Threshold_High` | 축하 메시지 + "성장 로드맵" 제시 및 다음 단계 액션 유도. |

---

## 📊 섹션 3: API 데이터 스키마 정의 (Data Schema - JSON Format)
이 구조는 프론트엔드 컴포넌트에 필요한 최소한의 데이터 필드를 정의합니다.

**API Endpoint:** `/api/v1/dashboard/kpi_status`
**Response Type:** JSON Object

```json
{
  "success": true,
  "data": {
    "reportDate": "2026-05-29", 
    "overallScore": {
      "value": 78.5, // 현재 KPI 값 (Float)
      "unit": "%",   // 단위
      "status": "GROWTH", // 필수: 시스템 상태 토큰 (CRITICAL/WARNING/NORMAL/GROWTH)
      "trend": "UP"    // 비교 추이 (UP/DOWN/FLAT)
    },
    "kpis": [
      {
        "name": "매출액 증가율",
        "value": 12.3,
        "unit": "%",
        "status": "GROWTH", // 이 KPI의 개별 상태
        "trend": "UP",
        "gauge_level": 0.9 // 게이지 채움 정도 (0.0 ~ 1.0)
      },
      {
        "name": "고객 재방문율",
        "value": 45,
        "unit": "%",
        "status": "WARNING",
        "trend": "DOWN",
        "gauge_level": 0.6 // 게이지 채움 정도 (0.0 ~ 1.0)
      }
    ]
  },
  "metadata": {
    "errorMessage": null,
    "requestTime": "2026-05-29T10:30:00Z"
  }
}
```

---

## 📌 요약 및 개발 가이드라인 (Developer Summary)

1.  **개발 우선순위:** KPI Gauge 컴포넌트의 상태 변화에 따른 **모션(Motion)** 로직 구현이 최우선입니다. 단순 색상 변경을 넘어, 정의된 `Pulse & Drop`나 `Bloom` 효과가 데이터 스키마(`status`: CRITICAL/GROWTH)와 정확히 연동되어야 합니다.
2.  **핸드오프 준비 완료:** 위 파일은 Motion Design System의 사양(파라미터), 시각적 토큰, 그리고 데이터 구조까지 완벽하게 결합한 최종 결과물입니다. 이대로 개발팀에 전달하여 즉시 작업을 재개할 수 있습니다.