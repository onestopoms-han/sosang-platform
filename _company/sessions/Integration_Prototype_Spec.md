# 🚀 Trust Widget & PainGauge 통합 프로토타입 상세 사양 (V2.0)

## 🎯 목표 및 범위
본 문서는 Trust Widget과 PainGauge 컴포넌트가 독립적으로 존재하는 것이 아니라, **[소상공인 플렛폼 대시보드]**의 핵심 영역에 유기적으로 통합되어 작동하는 것을 전제로 한다. 개발팀은 이 사양을 바탕으로 최종 데이터 연동 및 UI 구현을 진행해야 한다.

## 👤 페르소나 기반 사용자 시나리오 (User Flow)
*   **사용자:** 온라인 마케팅 정보 접근성이 낮은 소상공인 A씨.
*   **시나리오:** A씨가 플렛폼에 처음 로그인하여 대시보드에 진입한다. → **(Initial Load)** 시스템은 즉시 A씨의 가명화된 데이터를 로드하고, 현재 상태와 가장 시급한 위협 요소를 동시에 보여준다.

## 🖥️ 통합 와이어프레임 구조 (Layout & Component Placement)
*   **컨테이너:** `[Platform Dashboard Container]` (12-column grid 기반)
*   **위치:** 대시보드 상단, 가장 눈에 잘 띄는 위치 (Primary Viewport).

| 영역 | 컴포넌트 | 너비(%) | 높이(%) | 역할 및 중요도 |
| :--- | :--- | :--- | :--- | :--- |
| **A** | Trust Widget | 60% | 15% | 핵심 신뢰 지수 (Overall Health Score) 시각화. 가장 먼저 로드되어야 함. |
| **B** | PainGauge | 40% | 15% | 현재 느끼는 고통(Pain Point)의 상대적 심각도 비교. A와 함께 배치하여 '현재 상태'를 즉시 인지시킴. |

---

## 🔄 핵심 컴포넌트 사양 및 통합 데이터 플로우 (State Machine Definition)

### 1. Trust Widget Component Specification
**데이터 소스:** 사용자 로그인 정보, 산업군 평균 지수(Benchmark), 플랫폼 활동 기록.
**상태 관리 (State Flow):**

| State | Trigger | 로딩/표시 내용 | 액션 필요성 | 개발 가이드라인 |
| :--- | :--- | :--- | :--- | :--- |
| **Initial_Load** | Component Mount | 스피너(Skeleton) 표시. "데이터를 불러오는 중..." 메시지와 함께 Trust Score가 0으로 시작하는 애니메이션 효과 필수. | Low (사용자 대기) | 지연 시간(Latency)을 감안하여, 로딩 화면에서 '신뢰성' 관련 부가 정보(예: 인증 마크)를 배치하여 공백 최소화. |
| **Data_Update** | API Success / Time Interval Update (e.g., 1시간 간격) | 업데이트된 Trust Score (색상 변화 포함). **핵심:** '어떤 데이터' 때문에 점수가 변했는지에 대한 요약 레이블(예: "최근 지역 커뮤니티 활동 증가로 +5점"). | Medium (사용자 인지/행동 유도) | 이전 값과 현재 값을 비교하는 `delta` 표시를 필수 구현. |
| **Error** | API Failure | 명확한 에러 메시지 및 재시도 버튼 제공. "데이터 로딩 실패: 관리자에게 문의하세요." | High (개발팀 디버깅 필요) | 백엔드 예외 처리와 연동되어야 함. |

### 2. PainGauge Component Specification
**데이터 소스:** 사용자가 자체 보고한 페인 포인트 데이터(PainPoint A, B, C), 산업별 평균 고통 지수.
**상태 관리 (State Flow):**

| State | Trigger | 로딩/표시 내용 | 액션 필요성 | 개발 가이드라인 |
| :--- | :--- | :--- | :--- | :--- |
| **Initial_Load** | Component Mount | 스피너(Skeleton) 표시. 데이터가 불러와지면서 'Pain Point' 항목들이 순차적으로 채워지는 애니메이션 효과 필수. | Low (사용자 대기) | 가중치 계산 로직을 명시해야 함. Pain A의 심각도 > Pain B의 심각도 등 비교 관계를 직관적으로 보여줄 것. |
| **Data_Update** | API Success / 사용자 활동 기반 재측정 | 항목별 게이지 바(Gauge Bar)가 업데이트됨. **핵심:** 가장 높은 고통 지수(Max Pain Point)에 대해 플렛폼이 제공할 수 있는 *구체적인 솔루션*을 하단에 배치해야 함. | High (즉각적 해결책 제시 필요) | 단순히 점수를 보여주는 것을 넘어, "Pain A가 높으니 → 이 기능을 이용하세요"라는 Call-to-Action(CTA)으로 연결되어야 함. |

## 💡 결론: 통합 로직 흐름
1.  **[System Boot]**: `Trust Widget`와 `PainGauge` 컴포넌트가 동시에 마운트된다. (동시 로드 필수).
2.  **[Data Fetching]**: 두 위젯은 병렬로 데이터를 요청한다.
3.  **[State Check]**: 만약 어느 하나라도 데이터 로딩에 실패하면, 전체 대시보드의 해당 영역이 비활성화되고 통합 에러 메시지(`Error` State)가 표시된다.
4.  **[Success]**: 두 컴포넌트 모두 데이터를 성공적으로 수신하고, **같은 시점(Time Sync)**에 점수 및 상태 변화 애니메이션을 보여준다.