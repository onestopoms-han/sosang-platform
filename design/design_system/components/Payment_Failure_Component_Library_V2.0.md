# 💳 BDS 플랫폼: 결제 실패 경험 디자인 시스템 컴포넌트 라이브러리 (V2.0)

**목표:** 기술적 오류(결제 실패)를 사용자 신뢰 재구축의 기회로 활용하는 모든 UI 요소를 표준화하고, 개발팀이 즉시 참조 가능한 형태로 제공한다.
**근거 가이드라인:** 결제 경험 스토리텔링 가이드라인 (Final V2.0)

## 1. Core Components (핵심 구조 컴포넌트)

### 1.1. [Component] Failure Message Container (실패 메시지 컨테이너)
*   **용도:** 시스템 오류 발생 시 사용자에게 가장 먼저 노출되는 영역. 단순히 '실패'를 알리는 것을 넘어, 불안감 해소와 다음 행동을 유도하는 것이 핵심.
*   **구조:** `[Icon/Visual] + [Headline (System Status)] + [Sub-text (Cause Explanation)]`
*   **규칙:** 실패의 원인을 추측하게 하지 않도록 **'현재 상태' 중심**으로 서술한다. (예: "일시적인 네트워크 문제로 재시도를 부탁드립니다.")

### 1.2. [Component] Reassurance Widget (신뢰 회복 위젯)
*   **용도:** 결제 실패 직후 사용자가 느낄 수 있는 '돈이 나갔는데 왜 안 되지?'라는 심리적 불안감을 해소하는 핵심 컴포넌트. **(가장 중요)**
*   **구조:** `[안심 아이콘/이미지] + [명확한 보증 문구] + [환불 프로세스 안내]`
*   **속성 (State):**
    *   `Default`: 일반적인 자동 환불 시스템 설명.
    *   `Error_Observed`: "현재 오류가 감지되었습니다. 30분 후 재시도하시면 됩니다." 와 같이 구체적 시간 언급.

### 1.3. [Component] Action Button Group (행동 유도 버튼 그룹)
*   **용도:** 사용자가 다음 단계로 나아가게 하는 핵심 인터랙션 영역. 혼란을 방지하고 명확한 선택지를 제공해야 함.
*   **구성 요소:**
    *   `[Primary CTA - 재시도]`: 가장 강조되어야 하며, 시스템이 처리할 수 있는 최적의 시간(예: 1분 후)을 제안하는 카운트다운 기능과 결합된다. (Deep Blue 활용)
    *   `[Secondary CTA - 고객센터 문의]`: 실패 원인 분석이나 직접적인 도움 요청 시 사용한다.

## 2. Atomic Components (원자적 구성 요소)

### 2.1. [Atom] Deep Blue Primary Button (`Button-Primary`)
*   **색상:** `#004D66` (Deep Blue - 신뢰, 안정감 상징)
*   **디자인:** 모서리가 부드럽게 처리된 직사각형 형태. 클릭 유도력이 가장 높아야 함.

### 2.2. [Atom] Growth Green Success Indicator (`Indicator-Green`)
*   **색상:** `#3CB371` (Growth Green - 성공, 성장 상징)
*   **용도:** 환불 완료, 재시도 성공 등 긍정적 결과 발생 시 사용되는 배경 및 아이콘.

### 2.3. [Atom] Informational Text Block (`Text-Info`)
*   **스타일:** 회색 계열의 작은 글씨체로 작성되어야 하며, 법률/정책 관련 문구에만 사용한다. (ex: "본 서비스는 XXX 규정에 따라 운영됩니다.")

## 3. Implementation Flow Map (구현 플로우 지도)

| 단계 | 컴포넌트 조합 | 목표 사용자 심리 | 핵심 지표 측정 |
| :--- | :--- | :--- | :--- |
| **A. Failure Detection** | Failure Message Container + Reassurance Widget | 좌절감 해소, 안도감 부여 | PRSR (Pain Resolution Success Rate) |
| **B. Retry Attempt** | Primary CTA (`재시도`) + 카운트다운 위젯 | 통제권 회복, 다음 행동 확신 | ERT (Estimated Recovery Time) |
| **C. Escalation/Success** | Secondary CTA 또는 Indicator-Green | 명확한 도움 경로 확보 / 성취감 경험 | RS (Retry Success Rate) |