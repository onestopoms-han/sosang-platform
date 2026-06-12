# ✨ BDS소상공인플렛폼: 개발 마일스톤 및 QA 관리 계획 (V1.0)

## 💡 목적
*   **최종 목표:** 베타 출시 전, 모든 핵심 컴포넌트의 기능적 완성도와 사용자 감성 안전마진(PainGauge < 0.3) 확보.
*   **활용 범위:** 디자인팀, 개발팀 간의 협업 및 최종 QA 진행 기준 확립.

## 🛠️ 주요 참고 산출물
1.  🎨 **디자인 스펙:** `BDS_Final_Design_Spec_v1.0.md` (최종 UI/UX 가이드라인)
2.  💻 **개발 명세서:** Skeleton Loader & Fallback 로직 명세서 (기술 구현 범위 정의)

---

## 🗓️ 개발 마일스톤 및 역할 분담 (RACI Matrix)

| 단계 (Milestone) | 주요 목표 | 핵심 작업 항목 (Tasks) | Responsible (담당/실행) | Accountable (책임/최종 승인) | Consulted (자문/검토) | Informed (보고/참조) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Phase 1: 통합 컴포넌트 구축** (D-Day - 2주) | 핵심 페이지의 기능적 안정성 확보. 디자인 명세서 기반으로 모든 UI 구현 완료. | ① 메인 섹션(Hero/Feature) 개발 및 통합<br>② Trust Widget API 연동 및 초기 로직 테스트<br>③ Skeleton Loader/Fallback 기본 애니메이션 적용 | 💻 Developer | 👩‍💻 Dev Lead | 🎨 Designer | 👤 PM (사장님) |
| **Phase 2: 안전마진 검증** (D-Day - 1주) | API 오류, 지연 등 비정상 상황에 대한 사용자 경험(UX) 최적화. PainGauge 로직 최종 테스트. | ① 모든 에러/지연 시나리오별 Fallback UI 구현 및 QA<br>② 애니메이션 타이밍 검증 (Latency Test)<br>③ 디자인-기술 명세서 간의 불일치점 수정 완료 | 💻 Developer & 🎨 Designer | 🧑‍🔬 Tech Lead / 👤 PM | 👨‍🏫 UX Specialist | 👥 모든 팀원 |
| **Phase 3: 최종 QA 및 배포 준비** (D-Day) | 베타 버전을 위한 최종 점검. 온보딩 콘텐츠와 연동 테스트 완료. | ① 통합 기능 QA 체크리스트(별첨) 기반 전수 검사<br>② 성능 최적화(Lighthouse 등)<br>③ Onboarding 콘텐츠 셋업 및 최종 스토리라인 확인 | 🧑‍🔬 Tech Lead / 👤 PM | 👤 PM (사장님) | 🎨 Designer, 💻 Developer | - |

---

## ✅ 상세 QA 체크리스트 (QA Final Check List)
*(Phase 2 & 3에서 집중 검증)*

**1. 기능적 완성도 (Functional)**
*   [ ] 모든 핵심 컴포넌트(CTA, 버튼 등)가 반응형으로 정상 동작하는가? (디자인 스펙 기준 확인)
*   [ ] Trust Widget이 API 응답에 따라 세 가지 리스크 등급(A/B/C)을 정확히 반영하는가?
*   [ ] 데이터 로딩 및 오류 발생 시, 명세된 Fallback UI와 애니메이션이 정상 작동하며 사용자에게 혼란을 주지 않는가?

**2. 디자인 일관성 (Visual Consistency)**
*   [ ] 모든 화면에서 폰트 크기, 여백(Padding/Margin), 색상 코드가 `BDS_Final_Design_Spec`과 일치하는가?
*   [ ] 애니메이션의 트랜지션 타이밍이 명세된 값(`--state-color-warning` 전환 등)을 초과하거나 부족하지 않은가?

**3. 사용자 경험 (UX/Safety Margin)**
*   [ ] **PainGauge 지표:** 사용자가 플랫폼의 가치와 위기감을 직관적으로 이해할 수 있는가? (KPI 연동 확인)
*   [ ] 로딩 상태(Loading State)에서 사용자가 '무엇을 기다리는지' 명확히 인지하는가?

---

## 📌 참고 사항 및 다음 액션 플랜
1.  **QA 책임:** 모든 테스트 케이스는 `통합 QA 최종 검토 보고서 초안 (V1.0).md`를 기준으로 진행합니다. 이 문서를 개발팀의 초기 테스트 베이스로 사용해야 합니다.
2.  **병목 관리:** Phase 2에서 발견되는 기술적/디자인적 불일치는 반드시 사장님(PM)에게 우선 보고하여 의사결정을 거쳐야 합니다.