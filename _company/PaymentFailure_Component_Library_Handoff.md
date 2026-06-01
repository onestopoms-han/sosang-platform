# 🛠️ BDS Payment Failure Screen Component Library Handoff Guide v1.0
## 🎯 목적
본 문서는 개발팀(Front-End Developer)이 '결제 실패 화면'을 구현하기 위한 최종 컴포넌트 라이브러리 및 디자인 시스템 명세서입니다. 모든 요소는 BDS_Integrated_Design_System_v3.0의 규칙과 Pain $\rightarrow$ Solution 흐름을 따릅니다.

## 🖼️ 1. 전체 레이아웃 구조 (Wireframe & Flow)
*   **Screen Type:** Modal Overlay / Full Page View
*   **Layout:** 중앙 정렬(Center Alignment). 상단에 시각적 오류 토큰, 중간에 사용자 심리 안정화 메시지, 하단에 재진입 유도 액션 버튼 그룹.
*   **섹션 분할 (Visual Flow):**
    1.  Pain Red Area (Problem Recognition) $\rightarrow$ 2. Transition/Empathy Zone (Emotional Stabilization) $\rightarrow$ 3. Solution Green Area (Action Path Forward).

---
## 🧩 2. 핵심 컴포넌트 상세 명세 (Component Details)
### A. [Error Token] - 시각적 오류 인식
*   **컴포넌트명:** `Failure_Icon`
*   **용도:** 결제 실패 상황을 직관적으로 나타냄. 단순 경고가 아닌 '문제 발생'의 심각성을 전달.
*   **디자인 사양:**
    *   **Shape:** 굵은 테두리의 원형 아이콘 (Circle, Radius: 50px).
    *   **Color:** **Pain Red (#FF4D4D)**를 배경에 사용하되, 너무 자극적이지 않도록 채도는 낮추고 명도를 높인 오프레드 계열을 메인으로 합니다.
    *   **Graphic:** '❌' 또는 ⚠️ 심볼 배치. (SVG 형태로 제공 필요).

### B. [Message Card] - 사용자 공감 및 안내
*   **컴포넌트명:** `Payment_Error_Card`
*   **용도:** 오류의 원인과 시스템이 취할 수 있는 조치를 설명하여 사용자의 불안감을 낮춤 (Emotional Stabilization).
*   **디자인 사양:**
    *   **Background:** 밝은 회색 배경 (`#F9FAFB`). 그림자 효과(Drop Shadow)를 사용하여 독립적인 카드처럼 보이게 합니다.
    *   **Title/Subtitle:** 폰트: Pretendard (SemiBold / Regular). 크기: H3 (24px), Body (16px).
    *   **핵심 문구 예시:** "결제 과정에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
    *   **유의사항:** '실패'라는 단어 대신, **'일시적인 문제', '재확인이 필요합니다'** 등 긍정적이고 수동적인 어조를 사용해야 합니다.

### C. [Action Button Group] - 솔루션 제시 및 재진입 유도
*   **컴포넌트명:** `Retry_Button_Group`
*   **용도:** 사용자에게 다음 행동(액션)을 명확하게 지시하여 이탈을 막고 플로우로 복귀시킵니다.
*   **디자인 사양:** (두 개의 버튼 그룹으로 분리하여 사용합니다.)

#### 1. Primary Action Button: [재시도]
*   **컴포넌트명:** `Button_Primary_Retry`
*   **역할:** 가장 권장되는 행동 (Solution Green의 역할을 수행).
*   **디자인 사양:**
    *   **Background Color:** **Solution Green (#2ECC71)**.
    *   **Text Color:** White (`#FFFFFF`).
    *   **Hover State:** 채도를 약간 낮추고 명도를 높여 부드럽게 변화 (Darker Green to Lighter Green).
    *   **Size/Padding:** Standard Button Size (Min Width: 200px, Height: 56px).

#### 2. Secondary Action Link: [도움말 보기] / [다른 결제 수단 사용]
*   **컴포넌트명:** `Button_Secondary_Link`
*   **역할:** 다음 대안을 제시하거나 정보를 제공하는 백업 플랜.
*   **디자인 사양:**
    *   **Background Color:** Transparent / Border only (Gray-300).
    *   **Text Color:** `#6B7280` (차분한 회색).
    *   **Interaction:** 클릭 시 관련 정보 페이지로 이동하거나, FAQ 모달을 띄웁니다.

## ✨ 3. 구현 가이드라인 요약 (Developer Checklist)
1.  **State Handling:** 버튼의 비활성화 상태(Disabled State)와 로딩 중 상태(`isProcessing: true`)를 반드시 컴포넌트에 포함해야 합니다.
2.  **Accessibility:** 모든 아이콘과 메시지에는 스크린 리더가 인식할 수 있는 **ARIA Label**을 추가해야 합니다. (필수!)
3.  **Responsiveness:** 모바일 환경(최대 420px) 및 태블릿 환경에서 레이아웃이 깨지지 않도록 유연한 Flex/Grid 기반으로 설계합니다.

---
*본 가이드라인은 BDS_Integrated_Design_System_v3.0의 모든 원칙을 반영하여 작성되었습니다.*