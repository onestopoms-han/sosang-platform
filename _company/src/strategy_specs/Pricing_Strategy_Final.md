# 💰 BDS 플랫폼 Tiered Pricing & Monetization Strategy v1.0

**문서 목적:** 개발팀, 디자인팀에게 전달하는 최종 수익화 로직 및 가격 책정 사양서. (AOV 극대화 및 전환 유도 설계)
**기준일:** 2026년 5월
**핵심 전제:** 소상공인의 ‘문제 해결’에 대한 높은 니즈를 가격 결정의 핵심 근거로 사용한다.

---

## I. 🎯 티어별 가치 정의 및 목표 설정 (Value Proposition)

| 구분 | Basic Plan (Basic) | Premium Plan (프리미엄) | Enterprise Plan (엔터프라이즈) |
| :--- | :--- | :--- | :--- |
| **가격대 (가정)** | ₩9,900 /월 | ₩29,900 /월 | 별도 견적 (High-Touch) |
| **핵심 타겟** | 진입 장벽을 낮추고 싶은 소상공인. 초기 테스트 사용자. | '성장'에 집중하며 실질적인 성과를 원하는 사업주. (최대 수익 목표) | 체인점, 대규모 프랜차이즈 본사. 전사적 솔루션 필요 고객. |
| **핵심 가치** | **진단 및 기초 리포트:** "어떤 문제가 있는지" 빠르게 파악. (Minimum Viable Value) | **실행 계획 및 최적화:** "무엇을 어떻게 고쳐야 하는지" 로드맵 제공. (Best-in-Class Solution) | **통합 관리 및 커스터마이징:** "전체 시스템"으로 운영 효율 극대화. (Custom Ecosystem) |
| **KPI 목표** | Trial Sign-up Rate (가입 전환율) | Monthly Recurring Revenue (MRR, 월 반복 매출) & AOV | LTV (고객 생애 가치) 및 계약 규모 |

## II. 🚀 티어별 기능 사양서 (Feature Specification - 개발팀 참고)

### 1. Basic Plan: 진단만 가능 (The Diagnostician)
*   **제한 사항:** AI 진단 리포트 횟수 제한 (월 5회). Action Plan은 '개념' 수준으로 제공.
*   **필수 기능:** 기본 데이터 입력 및 AI 분석 실행 버튼, 핵심 Pain Point 시각화 카드 노출.
*   **결제 로직:** 결제 성공 후 -> 30일 동안 Basic 사용 가능.

### 2. Premium Plan: 진단 + 액션 플랜 (The Accelerator) ⭐ (주력 모델)
*   **제한 해제:** AI 진단 리포트 무제한 및 상세 보고서 다운로드 기능 활성화.
*   **핵심 가치 제공:** **'맞춤형 Action Plan 템플릿 생성'** 기능 (가장 높은 가치를 느끼는 지점).
*   **추가 요소:** 주간/월간 전문가 Q&A 세션 참여권 (제한적).
*   **결제 로직:** 결제 성공 후 -> 즉시 모든 고급 기능 활성화.

### 3. Enterprise Plan: 통합 관리 시스템 (The Command Center)
*   **특징:** 전용 대시보드 제공 (멀티-지점 관리자 페이지).
*   **기능:** API 연동을 통한 POS/재고 데이터 자동 업데이트, 사용자 정의 KPI 모니터링 위젯.
*   **개발 필요:** 별도의 백오피스(Admin Panel) 구축 및 권한 관리 시스템 구현 필수.

## III. 📈 마케팅 채널별 최적화 전략 (Marketing & Funnel Design)

| 채널 | 목표 단계 | 콘텐츠 유형 / Hook | 전환 유도 액션 (CTA) |
| :--- | :--- | :--- | :--- |
| **YouTube/Reels** | 인지(Awareness) → 진단(Diagnosis) | "사장님, 이 문제 때문에 매출이 깎이고 있습니다." (Pain Point 자극형 영상) | **"무료 AI 진단 받아보기"** (Basic Plan 유도) |
| **Instagram/블로그** | 관심(Interest) → 비교(Comparison) | 성공/실패 사례 기반의 'How-to' 카드 뉴스. 경쟁사 대비 우위 강조. | **"가장 적합한 플랜 확인하기"** (Premium으로 유도하는 랜딩 페이지 노출) |
| **오프라인 제휴처** | 구매(Purchase) → 락인(Lock-in) | 지역 상공회의소, 소상공인 지원기관과의 협력 웨비나. '현장 상담' 기회 제공. | **"담당 컨설턴트와 심화 상담 예약하기"** (Enterprise 유도 또는 Premium 업셀링 기회 포착) |

## IV. 📊 개발팀을 위한 기술 요구사항 및 KPI 로드맵

1.  **결제 시스템 연동:** Stripe/PayPal 기반의 구독 결제 모델(Subscription Model) 구현이 최우선입니다.
2.  **권한 관리 (RBAC):** Basic, Premium, Enterprise별 접근 가능한 API 호출 횟수와 기능에 대한 명확한 권한 검증 로직이 필요합니다.
3.  **A/B 테스트 포인트:** 랜딩 페이지 상단 CTA 버튼의 문구 및 위치를 A/B 테스트할 수 있는 기능을 미리 설계해야 합니다.

### 최종 핵심 KPI (Monetization Focus)
*   **KPI 1: Trial-to-Premium 전환율:** Basic 가입자 중 Premium으로 업그레이드되는 비율을 **최소 15% 이상** 목표합니다. (이것이 우리의 주력 수익 파이프라인입니다.)
*   **KPI 2: Average Time to Value (TTV):** 사용자가 서비스에 가입한 후, '가장 큰 도움(Aha Moment)'을 느끼는 시점까지의 시간을 **최대 7일 이내**로 단축해야 합니다.