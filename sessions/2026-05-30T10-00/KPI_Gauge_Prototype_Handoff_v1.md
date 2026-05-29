# 📈 KPI Gauge 컴포넌트 프로토타입 핸드오프 사양서 v1.0

## 🎯 목표 및 범위
*   **목표:** 소상공인에게 핵심 지표(KPI)의 상태 변화를 직관적이고 감정적으로 전달하는 UI/UX 프로토타입 정의.
*   **기반 사양:** Motion Design System(`KPI_Gauge_Motion_Handoff_v1.0.md`), Feedback Module Logic(`System_Feedback_Module_Spec_v1.md`).
*   **핵심 원칙:** 상태 변화는 **데이터의 경고/안정화 여부**를 반영하며, 시각적 신호와 Motion 토큰을 통해 감정적 흐름(Pain $\rightarrow$ Solution)을 극대화한다.

---

## 💡 1. 컴포넌트 구조 및 레이아웃 (Structure & Layout)
*   **컨테이너:** 가로형 원통 그래프 형태 유지 (Semi-circular Gauge).
*   **핵심 요소:**
    1.  **Gauge 바늘 (Needle):** 현재 KPI 값을 나타내는 포인터.
    2.  **값 표시 영역 (Value Display):** 수치 값과 상태 라벨을 보여주는 텍스트 블록.
    3.  **상태 메시지 (Status Message):** 상태에 따른 설명 문구 (예: "안정권", "주의 필요").

## 🎨 2. 상태별 시각 디자인 사양 (Visual Specs by State)

| 상태 | 정의/트리거 조건 | 색상 코드 (Hex) | Motion 토큰 적용 | 사용자 경험(UX) 목표 |
| :--- | :--- | :--- | :--- | :--- |
| **Normal** (🟢 안정) | KPI가 Target 범위 내에 있을 때. (예: 70% 이상) | `#4CAF50` (성공 녹색) | `Transition_Smooth_EaseOut`: 부드러운 진입 및 유지. | 신뢰 구축, 심리적 안도감 제공. |
| **Warning** (🟠 경고) | KPI가 Target 범위 하한선 근처일 때. (예: 40% ~ 70%) | `#FFC107` (경고 노랑/주황) | `Transition_Jolt_Bounce`: 약간의 진동(Jolt)과 바운스 효과를 주어 '주의'를 인지시킴. | 경각심 고취, 행동 변화 유도. |
| **Error** (🔴 위험) | KPI가 임계점 이하일 때. (예: 40% 미만) | `#F44336` (위험 빨강) | `Transition_Critical_Shake`: 강한 떨림(Shake) 애니메이션과 함께 바늘이 과장되게 출렁이며 위기감을 조성함. | 즉각적인 관심 요구, 문제 해결 필요성 강조. |
| **Empty/Loading** (🔵 초기) | 데이터 로딩 중일 때. | `#2196F3` (파랑) | `Transition_Spin_Linear`: 부드러운 선형 회전 애니메이션. | 기다림의 지루함 완화, 시스템 작동 인지. |

## ⚙️ 3. 상태 변화별 Motion 및 인터랙션 가이드라인 (Handoff Details)

### A. 데이터 로딩 $\rightarrow$ Normal/Warning/Error
1.  **시퀀스:** [Loading State] $\xrightarrow{\text{Data Fetch}}$ [Initial Bounce] $\xrightarrow{\text{Value Update}}$ [Final Stable State].
2.  **Motion Logic:** Loading 상태의 회전 애니메이션이 멈추고, 데이터가 도착하는 순간 (0.5s 지연 후), Gauge 바늘은 최종 값으로 **부드럽게(Easing)** 이동해야 합니다. 이 '도달 과정' 자체가 하나의 성공적인 피드백 루프여야 합니다.
3.  **Trigger:** API 응답 완료 시, 컴포넌트의 `data` prop 변경을 감지하여 상태 변화를 유발합니다.

### B. Normal $\rightarrow$ Warning (상태 악화)
1.  **시각적 신호:** Gauge 바늘이 Target 영역을 벗어나는 순간(Crossing Threshold), 배경색과 바늘 끝에 **노란색 '경고 띠'가 깜빡이는 애니메이션**이 추가되어야 합니다.
2.  **Motion Logic:** `Transition_Jolt_Bounce`를 적용하여, 단순히 색만 바뀌는 것이 아니라 시각적 충격(Visual Jolt)을 주어 소상공인에게 "문제가 발생했다"고 인지시켜야 합니다.

### C. Warning $\rightarrow$ Error (위기 상황)
1.  **시각적 신호:** 상태가 'Error'로 확정되는 순간, 컴포넌트 전체에 **미세한 붉은색 떨림(Shake)** 효과를 적용하고, 배경의 경고 메시지(`Status Message`)는 "🚨 즉시 점검 필요"와 같은 강렬한 문구로 변경되어야 합니다.
2.  **기술적 요구사항:** Error 상태에서는 해당 KPI에 대한 **'해결책 링크' (Actionable Link)**를 반드시 하단에 노출시켜 사용자의 다음 행동을 유도해야 합니다.

## 🧪 4. 테스트 케이스 정의 (Testing Cases)
| 시나리오 | 초기 상태 | 입력 데이터 (KPI 값) | 예상되는 최종 상태 | 검증 포인트 |
| :--- | :--- | :--- | :--- | :--- |
| **성공적 회복** | Error (`#F44336`) | 50%로 증가 | Warning $\rightarrow$ Normal (`#4CAF50`) | Red $\to$ Yellow $\to$ Green으로의 단계별 색상/모션 변화가 자연스러운가? (감정적 안정화) |
| **급격한 악화** | Normal (`#4CAF50`) | 20%로 급락 | Error (`#F44336`) | 바늘 이동 시, 부드러움 $\to$ 경고 $\to$ 위기라는 감정적 변화가 Motion으로 극대화되었는가? (위험 인지) |

---
**[최종 핸드오프 지침]**
개발팀은 이 사양서를 기반으로 컴포넌트를 개발해야 하며, 모든 애니메이션 타이밍과 색상 코드는 **디자인 시스템 가이드(`bds-design-system.fig`)**를 100% 준수해야 합니다.