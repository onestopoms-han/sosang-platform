# 🎨 Payment Failure Screen: 최종 개발 사양서 (Developer Specification V2.0)

**작성자:** Designer Lead
**배포일:** 2026-05-27
**버전:** 2.0 (UX Review Report 기반, 코딩 규칙 적용 완료 버전)
**승인 요청 대상:** 개발팀 (코다리)

---

## 1. 개요 및 목표

본 사양서는 BDS 플랫폼의 결제 실패 상황(Payment Failure State)에 대한 사용자 경험 흐름을 확정하고, 이 디자인 의도가 모든 기술 스택에서 일관되게 구현될 수 있도록 상세한 규칙과 가이드를 제공하는 것을 목표로 합니다. **'실패는 끝이 아니라 다음 시도를 위한 정보'**라는 핵심 메시지를 시스템 레벨에서 전달해야 합니다.

## 2. 컴포넌트 구조 및 와이어프레임 (Visual Component Specification)

| 요소 | 사양/규칙 | 상세 값 | 비고 |
| :--- | :--- | :--- | :--- |
| **[컨테이너]** | 화면 전체 배경색 (Background Color) | `#FFFFFF` (Pure White) | 신뢰도 및 명료성 확보. |
| **[헤드라인]** | 제목 텍스트 (H2) | "결제가 실패했습니다." | *규칙:* 항상 간결하고 직접적인 문장 사용. |
| **[설명 본문]** | 사용자 안내 메시지 (P Tag) | `[상황에 맞는 오류 설명]` + `(예: 네트워크 연결을 확인해주세요.)` | *핵심:* 실패 원인 분석 및 통제 가능성을 명시. |
| **[세부 정보 블록]** | 상세 에러 코드/원인 텍스트 | `Error Code: [CODE-XXX]` / `Type: Network Timeout` | *규칙:* 개발자용 정보를 사용자에게 제공하되, 눈에 잘 띄지 않게 처리 (Gray Tone). |
| **[메인 CTA 버튼]** | 성공적인 재시도 유도 버튼 | `재시도하기` | *색상 코드:* `#007AFF` (Primary Blue) / *폰트:* [Platform Default] / *크기:* 16px, 전체 너비. |
| **[보조 CTA 링크]** | 대안 제시 링크 | `고객센터 문의` 또는 `결제 수단 변경` | *색상 코드:* `#007AFF` (Primary Blue) / *규칙:* 버튼과 같은 색상을 사용하되, 텍스트 하이퍼링크 형태로 처리하여 가볍게 접근 유도. |

## 3. 시스템 상태 전이 로직 및 흐름도 (Logical Flow & State Machine)

개발팀은 단순한 '오류 표시'가 아닌, **사용자의 행동(Action)**과 **시스템의 응답(Feedback)** 간의 순환 고리를 구현해야 합니다.

**A. 결제 실패 상태 머신 (Payment Failure State Machine):**
1.  **[Start]**: 결제 시도 → 2. **[Failure Detected]**
2.  **[Failure Detected]**: 시스템은 실패 유형(Type)을 식별하여 적절한 UI와 메시지를 로드한다. (예: `NETWORK_ERROR`, `CARD_DECLINED`, `SERVER_TIMEOUT`)
3.  **[UI Display]**: 사용자에게 해당 타입에 맞는 '설명 본문' 및 CTA를 노출한다. (→ **핵심 UX 구현 지점**)
4.  **[User Action]**: 사용자가 다음 중 하나를 선택한다.
    *   `재시도하기` → 5. **[Attempt Retry]**
    *   `수단 변경` → 결제 수단 선택 플로우로 이동 (PaymentMethodSelector)
    *   `문의/취소` → 안내 페이지 또는 취소 처리 완료

**B. 재시도 로직 (`재시도하기` 버튼 클릭 시):**
1.  **[Action]**: 클라이언트가 API 재요청을 시작한다.
2.  **[Loading State]:** 즉시 '처리 중...' 메시지를 표시하고, 3초 이상의 긴 로딩 상태는 방지한다 (최대 1.5초).
3.  **[Success/Fail Check]**:
    *   ✅ **성공 시:** 결제 완료 플로우로 이동 (`PaymentSuccessScreen`).
    *   ❌ **실패 시:** 다시 [Failure Detected] 단계로 돌아가며, 이전 실패와 다른 유형의 에러 메시지를 사용자에게 표시한다. (반복되는 실패 패턴 방지).

## 4. 개발팀 체크리스트 및 요구사항 (Developer Handover Checklist)

개발팀은 다음 항목이 모두 구현되었는지 최종 검증해야 합니다.

1.  **[필수] 시스템 안정성 지표 연동:** 결제 실패 화면 로딩 시, 반드시 현재 PRSR/ERT 값을 작은 글씨로(Footer 또는 상세 정보 블록에) 표시하여 플랫폼의 투명성을 확보할 것.
2.  **[필수] 에러 로그 기록:** 모든 예외 상황(Payment Failure) 발생 시, **테스트 후크 API**를 통해 실패 유형(`CARD_DECLINED`, `NETWORK_ERROR` 등)과 사용자 ID, 시간 스탬프가 정확히 로깅되어야 함.
3.  **[시각] 반응형 디자인:** 모든 폰트 크기 및 버튼 레이아웃은 모바일(Portrait Mode) 환경에서 완벽하게 작동해야 하며, 콘텐츠 여백이 충분해야 합니다.

---
***End of Specification V2.0***