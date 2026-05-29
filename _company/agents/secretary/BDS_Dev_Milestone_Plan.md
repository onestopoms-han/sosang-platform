# 📋 BDS 개발 마일스톤 및 리소스 배분 계획 (V1.1)

**📌 목표:** P0 핵심 컴포넌트(MetricCard, AlertBadge)의 안정적인 개발 착수 환경 마련 및 통합 로드맵 제시.

---

## 🚀 1. 현황 요약
*   **디자인 자산:** `Dev_Asset_Priority_List.xlsx` (V1.0) - 핵심 컴포넌트의 상태(State), 크기, 데이터 바인딩 포인트 정의 완료.
*   **개발 명세:** P0 기능에 대한 코어 로직 설계 및 아키텍처 초안 작성 진행 중.
*   **Gap:** 디자인 스펙과 기술 구현 방식 간의 **상호작용/애니메이션 상세 사양(Interaction Spec)**이 통합되어야 함.

## ⏳ 2. 마일스톤 로드맵 (Next 2 Weeks)
### 📅 Week 1: 컴포넌트 기반 구축 및 설계 확정
*   **[Designer]** `Dev_Asset_Priority_List.xlsx`를 V2.0으로 업데이트. 모든 State(예: Good -> Warning 전환 시 애니메이션)에 대한 구체적인 상호작용 사양 추가.
*   **[Kodari]** Designer의 V2.0 스펙을 기반으로, 독립적이고 재사용 가능한 컴포넌트 코어 로직 개발 착수. 기술 구현 가이드 초안(`Tech_Implementation_Guide.md`) 작성 시작.

### 📅 Week 2: 통합 및 테스트 준비
*   **[통합]** P0 컴포넌트를 실제 사용자 여정(User Journey)에 맞춰 배치하고, 데이터 흐름을 검증하는 Mockup 화면 구현.
*   **[CEO/Secretary]** 최종적인 비즈니스 리스크 점검 (A/B 테스트 시나리오 적용 가능성 등).

## 🧑‍💻 3. 실행 과제 및 담당자
| 에이전트 | 액션 아이템 | 기대 산출물 | 중요도 | 마감 목표 |
| :--- | :--- | :--- | :--- | :--- |
| **🎨 Designer** | `Dev_Asset_Priority_List.xlsx`의 상호작용 상세 사양화 (V2.0) | V2.0 Asset List + Interaction Spec | 최상 | D-Day 3일 전 |
| **💻 Kodari** | 기술 구현 매뉴얼 작성 및 코딩 구조 설계 | `Tech_Implementation_Guide.md` | 최상 | D-Day 5일 전 |

---
*본 문서는 BDS소상공인플렛폼의 개발팀 협업을 위한 통합 가이드라인입니다.*