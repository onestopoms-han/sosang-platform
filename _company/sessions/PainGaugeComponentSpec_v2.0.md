# PainGauge Component Specification (V2.0)
## 🎯 목적
이 문서는 소상공인의 심리적 고통 지표(Pain Point)를 시각화하고, 이를 데이터 기반으로 측정하는 'PainGauge' 컴포넌트의 개발 구현 사양을 정의합니다.

## 📐 Component Overview
*   **Component Name:** `PainGauge`
*   **Purpose:** 사용자의 현재 Pain Level과 Worry Level을 색상(Red/Yellow) 및 수치로 시각화하여 경고 신호를 제공합니다.
*   **Dependencies:** `Deep Blue (#004D66)`, `Growth Green (#3CB371)`
*   **Key Props (Required):**

| Prop Name | Type | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `initialScore` | Number | 초기 측정 점수 (0~100). 이 값이 메인 게이지에 반영됩니다. | `45` |
| `painLevel` | String | 현재 Pain Point 레벨 ('Low', 'Medium', 'High'). | `'Medium'` |
| `worryLevel` | String | 현재 Worry Level ('Low', 'Medium', 'High'). | `'Medium'` |
| `unitName` | String | 측정 단위를 나타내는 문자열. (예: "점", "%") | `"점"` |

## 🖥️ State Machine Definition (상태 정의)
PainGauge는 다음 4가지 핵심 상태를 가집니다.

1.  **INITIAL\_LOAD:** 컴포넌트가 마운트된 초기 상태. 로딩 스피너와 함께 '데이터 불러오는 중...' 메시지를 표시해야 합니다. (API 호출 전)
2.  **DATA\_FETCHING:** 백엔드에서 데이터(`initialScore`, `painLevel`, `worryLevel`)를 가져오는 비동기 상태. 로딩 애니메이션이 핵심입니다.
3.  **ACTIVE:** 데이터가 성공적으로 로드되어 게이지가 활성화된 최종 상태. 모든 계산과 시각화가 이 상태에서 이루어집니다.
4.  **ERROR\_STATE:** API 호출 실패 또는 데이터 유효성 검사 실패 시 진입합니다. 사용자에게 명확한 에러 메시지(`Error: 데이터를 가져올 수 없습니다.`)와 재시도 버튼을 제공해야 합니다.

## 🎨 Visual & Logic Specification (구체적 로직)
### 1. 색상 매핑 로직 (Color Mapping)
| Level | Pain/Worry Score Range | Color Code | Background Color |
| :--- | :--- | :--- | :--- |
| Low | 0 - 30 | `#3CB371` (Growth Green) | `rgba(60, 179, 113, 0.1)` |
| Medium | 31 - 70 | `#FFD700` (Gold/Yellow) | `rgba(255, 215, 0, 0.1)` |
| High | 71 - 100 | `#DC143C` (Deep Red) | `rgba(220, 20, 60, 0.1)` |

### 2. 게이지 시각화 로직 (Gauge Visualization)
*   **Progress:** `initialScore` 값에 따라 원형/바 형태의 게이지가 채워져야 합니다.
*   **Labeling:** 현재 스코어와 레벨(Medium/High 등)을 명확히 표시합니다.

## 🔗 Data Flow Requirement (API Endpoint)
*   **Endpoint:** `/api/v1/user/pain-gauge`
*   **Method:** GET
*   **Success Response Body Schema (JSON):**
    ```json
    {
      "status": "success",
      "data": {
        "initialScore": 45, // Number: 현재 점수
        "painLevel": "Medium", // String: 레벨 ('Low', 'Medium', 'High')
        "worryLevel": "Medium", // String: 레벨 ('Low', 'Medium', 'High')
        "unitName": "점"
      }
    }
    ```