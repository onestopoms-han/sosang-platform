# BDS 플랫폼 디자인 시스템 매뉴얼 V1.0

## 🎯 목표 및 범위
본 매뉴얼은 모든 사용자 접점(PainGauge, 스토리 양식, FAQ 등)의 UI/UX 일관성을 보장하며, 개발팀이 '질문' 없이 코딩을 시작할 수 있도록 하는 최종 스펙 문서이다.

### 1. 브랜드 아이덴티티 (Brand Identity)
*   **톤앤매너:** 신뢰감 있는 전문 컨설팅가(Trusted Consultant), 따뜻하지만 객관적인 데이터 기반 접근.
*   **주요 감정 유도:** 불안함(Pain) → 통찰(Insight) → 안전함(Safety/Growth).

### 2. 컬러 팔레트 (Color Palette)
| 이름 | 용도 | HEX 코드 | 사용 규칙 |
| :--- | :--- | :--- | :--- |
| Primary Blue (신뢰) | 핵심 액션 버튼, 헤딩 배경, 중요한 데이터 강조. | `#0D47A1` | 가장 신뢰할 때만 사용. 긍정적 변화를 상징. |
| Secondary Orange (경고/주의) | 위험 감지(Warning), 즉각적인 행동 유도 필요 구역. | `#FF8F00` | PainGauge의 경고 레벨에 한해 제한적으로 사용.
| Danger Red (위험) | 심각한 문제 발생, 즉각적 개입 필요 지표. | `#D32F2F` | 통계적으로 위험 수준(Danger Zone)일 때만 사용. |
| Neutral Gray (배경/텍스트) | 배경색, 구분선, 보조 텍스트. | `#F5F5F5`, `#424242` | 가독성을 최우선으로 한다.

### 3. 타이포그래피 시스템 (Typography System)
*   **폰트:** Pretendard (가장 범용적이고 가독성이 높음).
*   **계층 구조:**
    *   H1: 32px, Bold, Primary Blue
    *   H2: 24px, SemiBold, `#424242`
    *   Body Large: 18px, Regular, `#424242` (주요 설명)
    *   Body Small: 16px, Regular, `#607D8B` (보조 정보/캡션)

### 4. 컴포넌트 라이브러리 규칙 (Component Rules)
#### A. 버튼 (Button Component)
*   **Primary Button:** 배경색: Primary Blue (`#0D47A1`), 텍스트: White, Corner Radius: 8px. (가장 중요한 CTA에만 사용)
*   **Secondary Button:** 배경색: Light Gray (`#E0E0E0`), 텍스트: `#607D8B`, Border: 1px solid `#AAAAAA`. (보조적인 기능 실행 시)
*   **Disabled State:** Opacity: 0.5, Cursor: Not-allowed.

#### B. 카드/모듈 (Card Component)
*   **기본 구조:** 배경색: White, Shadow: Subtle Box-Shadow (Elevation 1), Padding: 24px.
*   **활용 목적:** 독립된 콘텐츠 블록화. PainGauge 결과 요약 등 주요 정보를 담는 데 사용한다.

#### C. 입력 필드 (Input Field Component)
*   **기본 상태:** Border: 1px solid `#BDBDBD`, Background: White, Focus State: Border color changes to Primary Blue (`#0D47A1`).
*   **에러 상태:** Border: 2px solid Danger Red (`#D32F2F`), 아래에 에러 메시지(`Body Small`)를 표시한다.

### 5. UX/UI 피드백 규칙 (Error Handling & Feedback)
개발팀이 반드시 준수해야 할 '오류 처리' 스펙입니다.

1.  **폼 유효성 검사:** 필드가 비어있을 경우, 즉시 해당 필드 아래에 **Danger Red** 경고 메시지("필수는 입력해주세요.")를 표시한다. (브라우저 기본 팝업 사용 금지)
2.  **시스템 알림:** 성공적인 액션 완료 시, 화면 상단 중앙에 Primary Blue 배경의 작은 토스트(Toast) 알림을 **3초간** 보여준다. ("데이터가 안전하게 저장되었습니다.")
3.  **로딩 상태:** API 호출 중에는 버튼 비활성화와 함께, Primary Blue를 활용한 스켈레톤 로더 또는 인디케이터를 표시한다. (사용자 이탈 방지)

---