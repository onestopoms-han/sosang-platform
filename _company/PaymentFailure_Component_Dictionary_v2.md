# 💳 Payment Failure Screen Component Dictionary (Single Source of Truth)
## 🎯 목적 및 범위
본 문서는 '결제 실패' 흐름(Pain Red $\to$ Solution Green)에 사용되는 모든 UI 컴포넌트의 최종 디자인 사양을 정의하며, 개발팀이 **Props 기반**으로 코딩할 수 있도록 설계된 싱글 소스 오브 트루스(SSOT)입니다.

## 💡 핵심 원칙
1. **Atomic Design:** 각 컴포넌트는 독립적이며 재사용성이 최우선입니다.
2. **State Driven:** 모든 상호작용은 명확한 상태(Success/Failure/Retry)에 의해 구동됩니다.
3. **Prop-Based:** 개발자는 주어진 Props를 통해 컴포넌트를 구성합니다.

---

## 🧱 컴포넌트 목록 및 사양 (Component Dictionary)

### 1. FailureContainer (`<FailureContainer>`) - 최상위 레이아웃
*   **역할:** 실패 경험 전체를 감싸는 컨테이너 역할을 하며, 오류 메시지와 재시도 CTA의 위치를 정의합니다.
*   **Props:**
    *   `status`: (Enum) `'initial' | 'failed' | 'retrying'`
    *   `errorMessage`: (String) 사용자에게 보여줄 간결한 실패 원인 설명 (예: "카드 정보가 유효하지 않습니다.")
    *   `errorCode`: (String, Optional) 개발 및 추적용 상세 오류 코드.
*   **State Logic:** `status='failed'`일 때만 핵심 CTA(`RetryButton`)가 활성화됩니다.

### 2. FailureMessage (`<FailureMessage>`) - 실패 메시지 영역
*   **역할:** 사용자에게 심리적 안정과 해결책을 제시하는 본문 텍스트를 담습니다.
*   **Props:**
    *   `title`: (String) 가장 크고 눈에 띄는 제목 (예: "결제가 완료되지 않았어요.")
    *   `description`: (String) 부연 설명 텍스트 (예: "잠시 후 다시 시도하거나 다른 결제 수단을 이용해주세요.")
    *   `iconType`: (Enum) 표시할 아이콘 종류 (`'card_fail'` 또는 `'network_fail'`)
*   **Design Detail:** `title`은 항상 Red 계열의 경고 톤을 유지합니다.

### 3. RetryButton (`<RetryButton>`) - 재시도 액션 버튼 (가장 중요)
*   **역할:** 사용자가 문제를 해결하기 위해 직접 수행하는 핵심 CTA입니다.
*   **Props:**
    *   `isDisabled`: (Boolean) 현재 비활성화 여부 (초기 로드 시 `true`).
    *   `onRetryClick`: (Function) 클릭 시 호출되는 재시도 API 함수.
    *   `isLoading`: (Boolean) 버튼이 로딩 중일 때의 상태 (`true`이면 텍스트 대신 스피너 표시).
*   **State Logic:**
    *   **Initial State:** `isDisabled=true`, `isLoading=false`. (사용자에게 생각할 시간을 줌)
    *   **Active State:** 사용자가 정보를 수정하고 버튼을 누를 때. (`onRetryClick` 실행)
    *   **Loading State:** API 호출 중. (`isLoading=true`)

### 4. PaymentMethodSelector (`<PaymentMethodSelector>`) - 결제 수단 선택 컴포넌트 (Optional, Advanced Flow용)
*   **역할:** 재시도 실패 시 다른 결제 수단을 유도하는 인터페이스를 제공합니다.
*   **Props:**
    *   `selectedMethod`: (String) 현재 선택된 결제 방식의 ID.
    *   `availableMethods`: (Array<{id: string, name: string}>) 사용 가능한 모든 결제 수단 목록.

---

## ⚙️ 컴포넌트 구현 예시 (Pseudo-Code / Prop Usage Example)

### [Scenario A: 초기 실패 발생 시]
```jsx
<FailureContainer status="failed" errorMessage="결제 정보에 오류가 있습니다.">
  <FailureMessage title="⚠️ 결제가 완료되지 않았어요." description="카드 번호 또는 유효 기간을 다시 한번 확인해주세요." iconType="card_fail" />
  <RetryButton 
    isDisabled={false} // 사용자가 수정할 수 있도록 활성화
    onRetryClick={handlePaymentAttempt} 
    isLoading={false}
  />
</FailureContainer>
```

### [Scenario B: 재시도 로직 실행 중]
*   사용자가 버튼을 누른 후, 백엔드 API를 호출하는 동안의 상태입니다.
```jsx
<FailureContainer status="retrying" errorMessage="재시도를 시도합니다. 잠시만 기다려 주세요...">
  {/* 메시지는 단순화하거나 로딩 스피너로 대체 */}
  <RetryButton 
    isDisabled={true} // 버튼 자체는 비활성화 상태 유지
    onRetryClick={() => {}} // 함수를 막음
    isLoading={true} // 핵심: 로딩 스피너 표시
  />
</FailureContainer>
```

### [개발팀 참고 사항]
*   **상태 전환:** 실패 발생 $\to$ (사용자 입력) $\to$ 재시도 버튼 클릭 $\to$ API 호출 시작(Loading State) $\to$ 성공/실패 판정. 이 3단계 상태 전환을 Props 로직으로 완벽하게 구현해야 합니다.