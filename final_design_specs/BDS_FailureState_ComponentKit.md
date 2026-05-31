# 🛠️ [BDS] Failure State Component Kit Specification v1.0

## 🎯 목표
금융 거래 실패, 데이터 전송 오류 등 시스템의 예외 상황에서 소상공인 사용자에게 **최소한의 불안감**을 주면서도 **명확한 다음 행동 지침(Next Step)**을 제공하는 재사용 가능한 컴포넌트 세트를 정의합니다.

## 🏗️ 구조 (Component Hierarchy)
모든 실패 상태는 아래 세 가지 핵심 컴포넌트로 구성되어야 합니다.

1.  **`<ErrorContainer>`:** 전체 오류 섹션을 감싸는 최상위 레이아웃 및 시각적 경고를 담당합니다.
2.  **`<ErrorMessageDisplay>`:** 사용자에게 문제가 발생했음을 알리고, 원인을 설명하는 텍스트 영역입니다.
3.  **`<ActionFallbackButton>`:** 사용자가 다음으로 취해야 할 가장 중요한 행동(예: 재시도, 관리자 문의)을 유도합니다.

---

### I. Component Detail: `<ErrorContainer>` (Wrapper)

| 속성 | 값/설명 | 개발 참고사항 |
| :--- | :--- | :--- |
| **Purpose** | 오류 상태임을 시각적으로 명확히 구분하고, 실패 상황 전반의 레이아웃을 담당합니다. | 화면 중앙에 고정되거나, 해당 폼 섹션 전체를 오버레이 처리합니다. |
| **Visual Style** | 배경: `#FFF8F7` (약간 따뜻한 경고색) / 테두리: `1px solid #FFC3A0` (경고톤) / 그림자: 최소화하여 위압감을 제거합니다. | Tailwind CSS Class 예시: `bg-red-50/60 p-8 border border-orange-200 rounded-xl shadow-lg` |
| **Iconography** | ⚠️ 경고 아이콘을 크게 배치하고, 텍스트와 결합하여 '주의'의 의미를 전달합니다. | Font Awesome (FA): `fa-exclamation-triangle` 또는 커스텀 SVG 사용 권장. |

---

### II. Component Detail: `<ErrorMessageDisplay>` (Message & Explanation)

| 속성 | 값/설명 | 개발 참고사항 |
| :--- | :--- | :--- |
| **Primary Message (`msg`)** | "거래 처리에 오류가 발생했습니다." 와 같이 간결하고 즉각적인 메시지를 제공합니다. | **[규칙]** 사용자가 가장 먼저 읽고, 자신의 문제를 인식하는 문장이어야 합니다. (예: '시스템이 잠시 혼란을 겪었습니다.') |
| **Detailed Explanation (`details`)** | 오류의 원인을 소상공인이 이해할 수 있는 쉬운 언어로 풀어서 설명합니다. (기술 용어 금지) | **[규칙]** *‘무엇’* 이 문제인지, 그리고 *‘왜’* 문제가 되었는지(원인만 언급)를 분리하여 설명해야 합니다. (예: "현재 계좌 정보가 일시적으로 유효하지 않아 거래가 중단되었습니다.") |
| **Tone & Copy** | 공감적이고 안심시키는 톤을 유지하며, '실패'보다는 '일시적인 상황'이라는 느낌을 부여합니다. | 예시 카피 구조: "걱정 마세요. 이 문제는 쉽게 해결할 수 있습니다." (Before `[Error]`) |

---

### III. Component Detail: `<ActionFallbackButton>` (Call to Action)

| 속성 | 값/설명 | 개발 참고사항 |
| :--- | :--- | :--- |
| **Primary CTA (`actionType`)** | 사용자가 가장 먼저 해야 할 행동을 버튼으로 명확히 제시합니다. | **[우선순위]** 1순위: 재시도 (Retry) / 2순위: 정보 확인 (Check Info) / 3순위: 문의하기 (Contact Support). |
| **State Management** | 버튼 클릭 시, 어떤 데이터를 다시 전송할지(Payload)를 명확히 정의하고 로딩 상태(`isLoading`)를 필수적으로 반영합니다. | `onClick` 핸들러는 반드시 이전의 실패 데이터를 기반으로 재시도하는 로직을 포함해야 합니다. (재전송되는 데이터 ID/Key 명시 필요). |
| **Fallback CTA** | primary CTA가 불가능할 때 제공하는 대체 옵션입니다. (예: '다른 결제 수단 선택하기' 버튼) | `disabled` 상태를 명확히 관리하며, 클릭 시 다른 화면(페이지 이동 또는 모달 오픈)을 유도합니다. |

---