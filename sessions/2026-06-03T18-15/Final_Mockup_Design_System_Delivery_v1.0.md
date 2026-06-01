# 🎨 BDS 플랫폼 최종 오류 및 신뢰 시스템 목업 가이드북 v1.0
## 📑 목적: 개발팀(코다리) 전달용, 모든 예외 상황 처리 UI/UX 컴포넌트 통합 명세화
**작성 일자:** YYYY-MM-DD (최종 승인)
**참조 문서:** 
*   [Brand_Design_Brief_TrustSystem_v1.0.md](c:\Users\PJH\소상공인플렛폼\sessions\2026-06-03T17-55\Brand_Design_Brief_TrustSystem_v1.0.md) - 브랜드 신뢰 가이드
*   [Final_System_Design_Spec_Trust_ErrorHandling_v1.0.md](c:\Users\PJH\소상공인플렛폼\sessions\2026-06-03T18-15\Final_System_Design_Spec_Trust_ErrorHandling_v1.0.md) - 시스템 동작 정의
*   [Component_Library_TrustElements_Spec.md](c:\Users\PJH\소상공인플렛폼\sessions\2026-06-03T17-55\Component_Library_TrustElements_Spec.md) - 재사용 컴포넌트 정의

---
## 💡 I. 디자인 원칙 및 토큰 (Design Tokens & Principles)
*   **톤앤매너:** 경고(Warning)와 안심(Relief)의 이중성을 활용하여 사용자 불안을 즉각적으로 해소하는 것에 초점.
*   **오류 메시지 구성 요소:**
    1.  **Iconography:** [Error Icon] (빨간색/삼각형), [Info Icon] (파란색/i), [Success Icon] (녹색/체크)를 반드시 사용.
    2.  **Typography:** 제목은 Bold 24px, 본문은 Regular 16px을 유지하며, 오류 발생 시 '손실 회피 심리'를 자극하는 경고 문구는 강조(Bold 처리)한다.
    3.  **Color Palette (Critical):**
        *   Primary Blue: #007AFF (신뢰/기본 액션)
        *   Error Red: #FF3B30 (즉각적 오류, 경고)
        *   Warning Yellow: #FF9500 (주의 필요, 재시도 권유)

---
## 💳 II. 핵심 목업 시나리오별 디자인 명세 (Mockup Specs by Scenario)

### A. 결제 실패 화면 (Payment Failure Screen) - [가장 중요]
**발생 조건:** 카드사 승인 거부, 시스템 오류 등 최종 구매 단계에서 발생.
**목표:** 사용자에게 '실패 원인'과 '대안(Solution)'을 명확히 제시하여 이탈 방지.
**레이아웃 구조 (Mockup Layout):** 3단 구성 권장.

1.  **헤더 영역 (H24px, Red Text):** [⚠️ 결제에 실패했습니다.] - **경고 톤으로 즉각적 시선 집중.**
2.  **본문/원인 분석 영역:**
    *   **오류 코드/메시지 (시스템 제공):** *“카드사 승인 거부 사유: 유효 기간 만료 또는 한도 초과.”*
    *   **사용자 행동 가이드 (Designer 권장):** "혹시 카드 정보를 다시 확인해주시겠어요? 아래의 **다른 결제 수단(PayPal, 간편결제 등)**을 이용해 주시면 즉시 재구매가 가능합니다." (Solution 제시)
3.  **재시도 액션 버튼:** [💳 다른 결제 수단으로 재시도하기] (Primary Blue Button)

### B. API 호출 실패 화면 (API/Network Error Screen)
**발생 조건:** 백엔드 시스템 오류, 네트워크 단절 등 기술적 문제.
**목표:** 사용자 책임이 아님을 명확히 하고, '시스템 안정성'에 대한 신뢰를 유지하며 재시도를 유도.
**레이아웃 구조 (Mockup Layout):** 2단 구성.

1.  **아이콘 및 헤더:** [❌ 현재 서비스 이용에 문제가 발생했습니다.] (Error Icon + Red Text)
2.  **본문/진정성 메시지:** "죄송합니다. 현재 저희 시스템이 데이터를 불러오는 데 일시적인 장애가 발생했습니다. 고객님의 소중한 정보를 지키기 위해 최선을 다하고 있습니다. **잠시 후 다시 시도해 주시면 감사하겠습니다.**" (공감과 안심 강조)
3.  **액션 버튼:** [🔄 새로고침 또는 1분 뒤 재접속]

### C. 데이터 유효성 검증 실패 화면 (Validation Error Screen)
**발생 조건:** 필수 입력 항목 누락, 잘못된 형식의 정보(예: 이메일 포맷 오류).
**목표:** 사용자가 직관적으로 '어디가', '왜' 틀렸는지 즉시 파악하게 한다.
**레이아웃 구조 (Mockup Layout):** Form Field 옆에 힌트 제공.

1.  **필드 레벨 피드백:** 해당 입력 필드의 **바로 아래**에 빨간색 경고 메시지(Error Icon)를 붙인다.
    *   **(예시)** 이메일 주소: `[사용자 입력값]` (⚠️ 최소 3글자 이상, @와 .이 포함된 포맷을 사용해주세요.)
2.  **폼 상단 요약:** "제출할 정보가 누락되었거나 형식이 잘못되었습니다. 빨간색 표시를 확인 후 수정해 주세요."

---
## ⚙️ III. 컴포넌트 스펙 통합 (Component Specification Integration)
*   모든 오류 메시지에는 **오류 유형(Error Type)**을 명시하는 작은 라벨(`[ERROR: PAYMENT_GATEWAY]`)을 개발팀이 쉽게 디버깅할 수 있도록 포함한다.
*   **토글 컴포넌트:** 성공/실패 여부에 따라 색상과 아이콘이 즉각적으로 전환되는 '상태 표시 토글' 컴포넌트를 반드시 도입하여, 신뢰성을 시각화한다.