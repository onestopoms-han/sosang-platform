# Trust Widget 최종 핸드오프 매뉴얼 (Designer & Developer 통합 가이드)

## 🎯 1. 개요 및 목적
*   **목적:** Pitch Deck, Landing Page 등 모든 마케팅 접점에서 Trust Widget의 시각적 일관성(Consistency)과 기술적 구현 가능성(Feasibility)을 100% 확보하기 위한 최종 매뉴얼입니다.
*   **대상:** 개발팀 (Frontend/Backend), 기획팀, 디자인팀.

## 🎨 2. 디자인 토큰 및 컴포넌트 스펙 (Designer 주도)
### A. 기본 위젯 정의
*   **컴포넌트 명:** Trust_Metric_Widget
*   **필수 요소:** [지표 레이블] - [현재 값] - [전환 방향성 화살표/색상]
*   **🎨 컬러 스펙:**
    *   기본 배경: #FFFFFF (Primary White)
    *   강조 색상 (Deep Blue): #004A99 (신뢰, 안정감)
    *   주의 경고 (Warning Orange): #FF8C00 (개선 필요 영역)
    *   성공/긍정: [Green Code] (Success Rate 95% 이상 등)
*   **✒️ 타이포그래피:** 본문은 'Noto Sans KR'의 Regular Weight를 사용하며, 지표 값(%)은 Bold Weight를 적용하여 가시성을 확보합니다.

### B. 위젯 유형별 스펙 정의 (Usage Case 기반)
| 위젯 유형 | 목적/사용 시나리오 | 강조해야 할 요소 | 디자인 규칙 |
| :--- | :--- | :--- | :--- |
| **성공률 지표** (Success Rate) | 플랫폼의 신뢰도 증명. (LP 최상단 배치 적합) | [현재 값]을 가장 크게, Deep Blue로 강조. | 3자리 수(XXX%) 형식 유지. 상승 곡선 그래픽 필수. |
| **재시도율 지표** (Retry Rate) | 사용자의 문제 해결 능력 간접 증명. (Pitch Deck 중반부 적합) | [수치]와 함께 '문제 발생률 대비 개선'이라는 카피를 병기. | 위험도가 높을수록 Warning Orange 톤의 배경 처리 고려. |
| **성장 추이 지표** (Growth Trend) | 시간 흐름에 따른 플랫폼의 발전 제시. (모든 곳에서 사용 가능) | 기간별 비교 그래프(Line Chart 또는 Bar Chart). | Y축과 X축 레이블을 명확히 하고, 변화 폭을 시각적으로 과장하지 않음. |

## 💻 3. 기술 구현 상세 명세 및 API 연동 (Developer 협업 필요)
**[코다리에게 요청]** 아래 지표들이 프론트엔드에서 정상적으로 렌더링되기 위해 필요한 백엔드 데이터 포맷과 호출 구조를 설계해주세요.

### A. 필수 지표 정의 (Backend/Data Flow Checkpoint)
1.  **지표명:** `success_rate`
    *   **요구 데이터 타입:** Float / Percentage (%)
    *   **예상 API Endpoint:** `/api/v1/stats/success-rate`
    *   **예시 JSON Payload:** `{ "timestamp": "2024-06-05", "value": 0.95, "unit": "%" }`
    *   **기술 검증 포인트:** 이 데이터가 실시간(Realtime)으로 반영 가능한지? 지연 시간이 허용 범위 내인지?

2.  **지표명:** `retry_rate`
    *   **요구 데이터 타입:** Float / Percentage (%)
    *   **예상 API Endpoint:** `/api/v1/stats/retry-rate`
    *   **기술 검증 포인트:** 재시도 횟수 집계의 '누적성'과 '정확한 범위(Scope)' 정의가 필요함.

### B. 인터랙션 및 상태 관리 (Interaction & State Management)
*   **Hover Effect:** 위젯 위에 마우스 오버 시, 간단한 애니메이션 효과(예: 수치 카운트업 또는 은은한 빛 번짐)를 적용하여 '생동감'을 부여해야 합니다.
*   **데이터 로딩 상태:** 데이터가 불러와지는 동안에는 단순한 스켈레톤 UI(Skeleton UI)를 표시하고, 로딩 메시지를 노출해서는 안 됩니다.

---