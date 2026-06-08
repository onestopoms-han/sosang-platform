# 📈 PainGauge 컴포넌트 최종 Design System Specification (V3.0)
**배포일:** 2026년 6월 7일
**적용 대상:** 웹/모바일 모든 플랫폼, PainGauge 위젯 사용처 전체
**목표:** 'Safety Margin' 디자인 원칙을 기반으로 개발팀이 시각적 일관성을 100% 확보할 수 있도록 최종 UI/UX 및 상호작용(Interaction) 규격 정의.

---

## 🎨 1. 핵심 브랜드 요소 (Color & Typography)

### 1.1 컬러 팔레트 확정
| 역할 | 이름 | Hex Code | 용도 및 설명 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Deep Blue | `#004D66` | 핵심 정보, 배경, 제목 등 신뢰도를 높이는 기본 색상. | 로고/헤더 메인 컬러 |
| **Secondary** | Growth Green | `#3CB371` | 성장 지표, 긍정적 변화, 성공 메시지 강조 (Growth Animation). | 애니메이션 적용 필수 |
| **Action** | Safety Orange | `#FF8C00` | CTA 버튼, 즉각적인 행동 유도(Call to Action) 요소. | 클릭 가능 영역에 사용 |
| **Warning/Error**| Deep Red | `#CC3333` | 입력 오류 메시지, 위험 지표 등 부정적 피드백. | 텍스트 및 경계선 |
| **Background** | Neutral Gray | `#F5F7FA` | 메인 배경색 (가독성 확보). | |

### 1.2 타이포그래피 시스템
*   **폰트:** Pretendard (또는 프로젝트 확정 폰트)
*   **제목(H1):** 32px Bold (`Deep Blue`) - 최대 시선 집중 영역에 사용.
*   **부제목(H2):** 24px SemiBold (`Deep Blue`) - 섹션 구분을 위한 주요 소제목.
*   **본문:** 16px Regular (`#333333`) - 가장 일반적인 정보 전달 영역.
*   **강조:** 18px Bold (`Growth Green` 또는 `Safety Orange`).

---

## ⚙️ 2. 컴포넌트별 상태 및 상호작용(State & Interaction) 규격

PainGauge는 사용자 입력과 데이터 변화에 따라 다음의 4가지 주요 상태를 명확히 구분해야 합니다.

### 2.1. 초기/비활성 상태 (Default State)
*   **시각적 요소:** 컴포넌트 전체가 `Neutral Gray` 배경 위에 위치하며, 제목은 "현재 안전마진 분석이 필요합니다." 등의 안내 문구를 사용합니다.
*   **상호작용:** '분석 시작' 버튼(Safety Orange)을 통해 데이터 입력 흐름으로 진입해야 합니다.

### 2.2. 로딩 상태 (Loading State)
*   **시각적 요소:** 스켈레톤 UI(Skeleton UI)를 적용하여, 실제 데이터가 불러와지는 듯한 시각적 착시를 유도합니다.
*   **애니메이션:** 부드러운 페이드인/아웃 애니메이션을 적용하며, 로딩 인디케이터는 `Deep Blue` 계열의 점진적 움직임을 사용합니다. (지루함을 방지)

### 2.3. 결과 표시 상태 (Result Display State) - 가장 중요
*   **데이터 시각화:** 현재 안전마진 지표를 **핵심 수치(KPI)**로 강조합니다. (18px Bold, `Growth Green` 적용).
*   **성장 애니메이션 규칙:**
    *   **발동 조건:** 이전 분석 결과 대비 긍정적 변화가 감지될 때만 발동.
    *   **효과:** 수치가 증가할 경우, 단순 숫자가 아닌 **'바운스(Bounce) 효과와 함께 Growth Green으로 상승하며 애니메이션'**되어야 합니다. (사용자에게 즉각적인 '성장했다!'는 심리적 만족감 제공).
    *   **규격:** `[숫자] -> (0.3초 동안) 부드러운 스프링 바운스 효과와 Growth Green 색상 변화`

### 2.4. CTA 버튼 및 클릭 흐름 규격
*   **버튼 디자인:** 모서리 반경(Border Radius): 8px / 그림자(Shadow): 미사용 (깔끔한 느낌 유지).
*   **기본 상태:** `Safety Orange` (#FF8C00) - 채움(Filled) 스타일.
*   **호버(Hover) 상태:** 색상 변화를 최소화하며, 약간의 명도/채도 증가 또는 1px 테두리 추가로 피드백 제공 (너무 화려한 애니메이션 금지).
*   **클릭(Active) 상태:** 20ms 간격으로 어두워지는 효과(`Darker Orange`)와 함께 눌리는 시각적 피드백을 제공합니다.

---

## ✨ 3. 최종 필수 에셋 목록 (Developer Handoff Checklist)

개발팀은 다음의 컴포넌트 및 리소스를 Figma/Storybook 등에서 참조할 수 있도록 준비해야 합니다.

1.  **[Asset] PainGauge Core Widget:** 다양한 데이터 포인트를 표시하는 기본 구조물.
2.  **[Asset] Growth Icon Set (V3):** 성장 애니메이션을 위한 벡터 아이콘 세트 (Up Arrow, Shield 등). `Growth Green` 적용 필수.
3.  **[Animation Spec] Bounce & Grow Sequence:** Growth Animation의 정확한 타이밍(0.3초)과 이징 함수(Easing Function: Cubic Bézier)를 명시하여 구현할 것.
4.  **[Component] Safety Margin Status Pill:** '안전함', '주의 필요', '위험' 등 상태별 뱃지 컴포넌트 (Deep Blue, Growth Green, Deep Red 배경).

---
*(본 문서는 모든 시각적 결정에 대한 최종 승인(Approval)을 의미하며, 이 규격서가 곧 개발의 진실(Source of Truth)입니다.)*