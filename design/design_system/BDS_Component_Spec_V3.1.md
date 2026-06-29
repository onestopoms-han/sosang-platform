# 📐 BDS 플랫폼 디자인 컴포넌트 최종 규격서 (V3.1)

**최종 승인 버전:** V3.1 (Trust Widget & PainGauge 통합)
**목적:** 모든 에이전트(디자인, 개발, 마케팅)가 참조하는 단일 진실 공급원(Single Source of Truth).
**참조 파일:** 
- Design System Master: BDS_Design_System_V1.0_Master.md
- 컴포넌트 명세서: Trust_Widget_Technical_Spec_V1.0.md

## I. 공통 디자인 토큰 (Global Tokens)

| 요소 | 규격 | 값 | 비고 |
| :--- | :--- | :--- | :--- |
| **Primary Color** | Deep Blue (메인 액션/배경) | `#004D66` | 버튼, 헤더 등 주요 영역에 사용. |
| **Secondary Color** | Growth Green (성장/긍정적 결과) | `#3CB371` | 성공, 목표 달성 지점, 긍정적 변화 시 강조. |
| **Danger Color** | Warning Red (위험/경고) | `#CC0000` | PainGauge가 위험 구간(예: <20%)일 때 사용. |
| **Border Radius** | 기본 곡률 | `4px` | 모든 카드 및 버튼의 표준 곡률. |
| **Typography** | Heading 1 (H1) | Pretendard Bold, 36pt | 가장 중요한 메시지 강조 시. |

## II. PainGauge 컴포넌트 규격 (PainGauge Component Spec)

### A. 기본 상태 (Normal State: Green Zone)
*   **시각적 목표:** 현재의 고통 지표를 객관적으로 보여주어 '개선 필요성'을 인지하게 한다.
*   **디자인 요소:** 게이지 바는 **Growth Green (`#3CB371`)**으로 채워지고, 수치 변화 애니메이션은 부드러운 곡선을 그리며 올라가야 함 (Easing: easeOutQuad).
*   **KPI 연동:** Pain Score 하락 시에만 사용 가능.

### B. 경고 상태 (Warning State: Yellow Zone) - *New Addition*
*   **발생 조건:** 안전마진 수치가 **20% 미만일 때**.
*   **시각적 반응:** 
    1.  게이지 바가 **Warning Red (`#CC0000`)** 계열로 점진적으로 변화하며, 경고 아이콘(⚠️)이 표시됨.
    2.  배경에 은은한 깜빡임(Pulse Effect) 애니메이션을 적용하여 사용자의 주의를 환기해야 함 (Frequency: 1초 간격).
*   **UX 피드백:** "안전마진 확보가 시급합니다. 구체적인 대안 마련이 필요합니다." 등의 명확한 콜아웃 메시지(Call-out Message)와 함께 표시되어야 합니다.

### C. 임계 상태 (Critical State: Red Zone) - *New Addition*
*   **발생 조건:** 안전마진 수치가 **0%에 근접하거나 0일 때**.
*   **시각적 반응:** 게이지 바 전체가 강렬한 **Danger Color (`#CC0000`)**로 채워지며, 경고 메시지가 깜빡이는 것 이상으로 **'시스템 비활성화 위험'을 알리는 강력하고 직관적인 애니메이션(Shake/Pulse)**이 발생해야 합니다.
*   **필수 액션:** 이 상태에서는 즉시 '컨설팅 신청하기' 버튼 (Primary CTA)을 가장 크고 눈에 띄게 배치해야 합니다.

## III. Trust Widget 컴포넌트 규격 (Trust Widget Component Spec)

### A. 기본/최적 상태 (Optimal State: High Confidence)
*   **디자인 요소:** 신뢰도 지표가 높은 경우, 게이지는 **Growth Green (`#3CB371`)**을 유지하며, 위젯 주변에 보호막 같은 '쉴드(Shield)' 형태의 시각 효과를 적용하여 견고함을 강조합니다.

### B. 시간 경과/하락 상태 (Time Decay State) - *Critical Update*
*   **발생 조건:** 신뢰도가 시간에 따라 자연스럽게 감소하는 과정.
*   **애니메이션 규칙:** 
    1.  단순히 수치만 줄어드는 것이 아니라, 위젯의 **가장자리(Border)**가 점차 불투명도를 잃거나(Opacity Decay), 미세한 떨림 애니메이션을 추가하여 '시간에 의한 퇴색'을 시각적으로 표현해야 합니다.
    2.  **텍스트 변화:** "현재 신뢰도" → "(주의) 시간이 지나며 재점검이 필요합니다."로 문구가 변경되어야 함.

## IV. 컴포넌트 통합 규격 (Integration Checklist Summary)

*   모든 컴포넌트는 **`4px` Border Radius**를 준수한다.
*   CTA 버튼은 반드시 `Deep Blue (#004D66)`을 기본으로 사용하고, 긍정적 액션(예: '지금 신청') 시에만 Green으로 변경한다.
*   모든 상태 변화는 **지연 시간(Delay Time)**이 명시되어야 하며 (예: Critical State 진입 후 1초 이내 경고 애니메이션 시작), 개발팀과 디자인팀 간의 합의가 필요하다.