# 🚀 BDS 플랫폼 개발 스프린트 계획 (V1.0) - 마일스톤 정의서

## 🎯 목표
KPI Gauge 및 핵심 콘텐츠 플로우를 기반으로, 소상공인의 Pain $\rightarrow$ Solution 경험을 가장 먼저 구현하고 검증하는 것.

## 🛠️ 전제 조건 (Prerequisites)
*   **필수 참조 자료:** `Developer_Handover_Package_v2.0.md` (디자인 토큰/API 스키마), `BDS_Final_Storyboard_and_Design_Guide_v1.0.md` (콘텐츠 스토리보드).
*   **핵심 원칙:** 모든 컴포넌트는 **Pain(경고색)**에서 **Solution(성장색)**으로의 감정적 전환을 최우선 목표로 합니다.

---

## 🗓️ 개발 스프린트 마일스톤 (3단계)

### ✨ Step 1: 핵심 MVP 구현 및 검증 (Focus: Pain Point & Data Flow)
*   **기간:** [예상] N주차
*   **목표:** 플랫폼의 '핵심 가치'를 가장 명확하게 보여주는 단일 컴포넌트(KPI Gauge)와 최소한의 데이터 연동을 완성.
*   **담당:** 코다리 (개발팀)
*   **주요 작업/산출물:**
    1.  **[High Priority] KPI Dashboard v1.0:** `PM_Dashboard_Status_Variables` API 스키마를 기반으로 KPI Gauge 컴포넌트 구현 완료 및 데이터 연동 검증.
    2.  **[Critical Path] Pain Point 시각화 모듈:** 대시보드에 경고색(`#CC0000`)을 사용하여 '문제가 발생한 영역'을 직관적으로 표시하는 기능 구현 (가장 먼저 사용자에게 문제를 인지시키는 부분).

### 💎 Step 2: 콘텐츠 흐름 및 경험 확장 (Focus: Transition & Utility)
*   **기간:** [예상] N+1주차
*   **목표:** 사용자가 문제(Pain)를 인식한 후, 해결책(Solution)을 찾아가는 여정을 완성.
*   **담당:** 코다리 (개발팀) + 레오/Instagram (콘텐츠 검토)
*   **주요 작업/산출물:**
    1.  **[Medium Priority] 솔루션 섹션 구현:** 'BDS AI가 해결합니다'와 같은 턴어링 포인트(Turning Point)에 맞는 UI 섹션을 구축하고, `#3CB371` (성장색)을 활용하여 기대감을 조성하는 애니메이션 로직 추가.
    2.  **[Medium Priority] 콘텐츠 위젯 구현:** 스토리보드에서 정의된 'AI 기능 팁' 등의 가벼운 정보 제공 위젯(Card Component) 개발 및 배치.

### ✨ Step 3: 사용자 접점 최적화 및 완성 (Focus: Polish & Scale)
*   **기간:** [예상] N+2주차 이후
*   **목표:** 전체적인 UX/UI를 다듬고, 실제 서비스에 필요한 부가 기능(로그인, 설정 등)을 통합.
*   **담당:** 코다리 (개발팀) + Designer (최종 검토)
*   **주요 작업/산출물:**
    1.  **[Low Priority] 사용자 온보딩 플로우 구현:** 신규 사용자가 접속했을 때의 안내 페이지 및 핵심 기능 가이드 애니메이션 완성.
    2.  **[Maintenance] 반응형 웹 최적화:** 모든 컴포넌트가 모바일 환경(특히 소상공인들이 많이 사용할 예상 경로)에서 완벽하게 작동하도록 검증 및 수정.

---

## 📝 코다리님께 요청사항 (Call to Action)
1.  **Task Breakdown:** 위 Step 1의 작업 목록을 기반으로, 구체적인 태스크와 예상 소요 시간을 상세히 분할하여 공유 부탁드립니다.
2.  **API 연동 시점 확정:** 가장 먼저 구현해야 할 `PM_Dashboard_Status_Variables`의 실제 데이터 제공 일정을 최종적으로 확인해 주세요.