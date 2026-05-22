# 🚀 BDS 소상공인플렛폼 V1.0 통합 기능 사양서 (Master Spec)

## 🎯 개요 및 목표
*   **핵심 목표:** 소상공인의 Pain Point 진단 결과를 바탕으로, Basic/Premium Action Plan을 비교 제시하고 Premium 플랜 가치를 극대화하여 구매를 유도하는 랜딩 페이지 구현.
*   **개발 범위:** Comparison Modal 컴포넌트 개발 및 API 연동 완료.

## 🖼️ 섹션 1: UI/UX 및 디자인 명세 (Designer Input)
**(Designer님 결과물 통합)**

### 1.1. 컴포넌트 구조 정의
*   **컴포넌트명:** ComparisonModal (`<ComparisonModal />`)
*   **필수 Props:** `comparisonData` (JSON 형태의 비교 데이터), `currentPlan`, `onUpgradeClick` (클릭 핸들러)

### 1.2. 시각적 가이드라인 요약
*   **Premium 강조점:** Premium Plan 카드에 브랜드 포인트 컬러를 적용하고, '추가 가치 (Value Added)' 섹션을 별도 박스로 분리하여 **정량적 이득**을 명확히 제시해야 함.
*   **인터랙션:** 호버 효과 및 선택 모달 전환 애니메이션 구현 필요.

## 📝 섹션 2: 콘텐츠 자산 및 카피 정의 (Writer Input)
**(Writer님 결과물 통합)**

### 2.1. 랜딩 페이지 핵심 메시지 (Hero Section / Value Prop)
*   **H1 (메인 헤드라인):** `{{Headline_A}}` 또는 `{{Headline_B}}` 중 선택 후 사용. *예: "막연한 희망 대신, 데이터로 증명하는 소상공인 성장 공식."*
*   **서브 카피:** `{{SubCopy_Problem}}` (문제 정의)와 `{{SubCopy_Solution}}` (해결책 제시)를 조합하여 사용.

### 2.2. 비교 모달 내부 카피 변수화
| 위치 | 목적 | 필수 카피 변수 | 예시 값 |
| :--- | :--- | :--- | :--- |
| Basic 설명 | 기능 한계 명시 | `{{Basic_Limitation}}` | "기본적인 진단 보고서 제공" |
| Premium 추가 가치 | 독점적 이득 강조 | `{{Premium_AddedValue}}` | **"시간/시행착오 절감 (AI 기반 로드맵)"** |

## ⚙️ 섹션 3: 개발 및 API 연동 로직 (Kodari Input)
**(개발팀 참고)**

### 3.1. 데이터 흐름
1.  (Frontend) 사용자 진단 결과 $\rightarrow$ ComparisonModal 표시.
2.  (Backend) `action_plan_service` 호출 시, `currentPlan`에 따라 다른 응답 스키마를 반환해야 함. (Basic vs Premium 로직 분기).

### 3.2. 최종 확인 및 다음 단계 액션
*   **진행 상태:** 디자인 사양서 기반으로 프론트엔드 컴포넌트 구현 완료 후, API 테스트가 필요함.
*   **다음 행동:** 코다리님은 위 `{{...}}` 변수들을 받아서 데이터 스키마와 연동하는 백엔드 로직을 최종 검증해야 합니다.