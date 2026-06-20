# BDS 소상공인 플랫폼 | 솔루션 콘텐츠 매트릭스 (v1.0)

## 🎯 목표
초기 베타 사용자 확보를 위해 핵심 Pain Point별 맞춤형 콘텐츠를 채널별로 최적화하고, Mock Data 와 시각화 명세를 일관되게 연동합니다.

---

## 1. 핵심 Pain Point & 솔루션 정의

| Pain Point | 상황 (User Story) | BDS 솔루션 | 기대 효과 |
| :--- | :--- | :--- | :--- |
| **신뢰도 위기** | "고객이 내 가게를 믿지 않아 재방문율이 낮아."<br>"온라인 리뷰가 부정적이라 매출에 영향." | **Trust Widget (BDS 신뢰 지표)**<br>실시간 거래 데이터, 고객 평가, 보증금 관리 정보를 시각화한 위젯 제공. | "이 가게는 BDS 플랫폼에서 검증된 곳입니다."<br>신뢰도 점수 80점 이상 시 특별 혜택 제공. |
| **통증 과부하** | "계산기만 써도 두근거려.<br>"재무 관리, 인력 배정, 마케팅 등 여러 일을 동시에 해야 해 스트레스가." | **PainGauge (BDS 통증 지수)**<br>주요 업무별 스트레스 수준을 그래프로 시각화하고, 자동화된 대안 제시. | "지금 가장 힘든 건 '인력 관리'군요."<br>자동으로 최적의 인력 배정 제안. |
| **디지털 전환 부담** | "앱 사용법을 모르겠어.<br>"온라인 마케팅은 너무 복잡해."<br>"기술적인 지원이 없으면 도저히 안 돼." | **傻瓜式 인터페이스 + AI 컨설턴트**<br>단일 탭으로 모든 기능 접근, AI 챗봇을 통한 1:1 문의 해결. | "앱 하나만 있으면 된다는 걸 알게 해줘.<br>기술적 장벽 제거." |

---

## 2. 채널별 콘텐츠 매핑 (Mock Data 연동)

각 Pain Point별로 YouTube, 인스타그램, 블로그 등 채널에 최적화된 콘텐츠 형식을 정의합니다. Mock Data (`dashboard-api-response-schema-v1.0.json`) 와 시각화 명세서 (`BDS_Component_Spec_v4.0_FINAL.md`) 를 참조하여 일관된 스토리텔링을 적용합니다.

### 2-1. YouTube (신뢰도 위기 & 통증 과부하)
**주요 콘텐츠:** `youtube_script_trust_crisis.md` 기반의 긴 형식 영상.
**Mock Data 연동:** Trust Widget 데이터 (`trust_score`, `pain_level`) 를 애니메이션으로 시각화하여 신뢰도를 증명하는 장면 연출.

| Pain Point | 스크립트 초안 (후크) | CTA (Call to Action) |
| :--- | :--- | :--- |
| **신뢰도 위기** | "당신의 가게를 신뢰하게 만드는 방법은?<br>BDS 플랫폼의 Trust Widget 을 보세요.<br>실시간 거래 데이터가 증명합니다." | "BDS 플랫폼 회원 신청하기<br>[신뢰도 80점 이상 혜택]" |
| **통증 과부하** | "계산기만 봐도 두근거려?<br>PainGauge 로 스트레스를 분석하세요.<br>자동화된 대안이 기다립니다." | "BDS 앱 다운로드 및 PainGauge 체험<br>[스트레스 50% 감소]" |

### 2-2. 인스타그램 (신뢰도 위기 & 디지털 전환 부담)
**주요 콘텐츠:** `instagram_trust_pain_captions.md` 기반의 릴스, 피드 카드.
**Mock Data 연동:** PainGauge 데이터 (`pain_level`) 를 인포그래픽 형식으로 표현하여 시각적 흥미 유발.

| Pain Point | 캡션 초안 (후크) | 해시태그 |
| :--- | :--- | :--- |
| **신뢰도 위기** | "이 가게는 신뢰도 92점!<br>BDS 플랫폼에서 검증되었습니다.<br>#BDS소상공인플렛폼 #신뢰도위기" | `#신뢰도위기 #신뢰도` |
| **디지털 전환 부담** | "앱 하나만 있으면 된다는 걸 알게 해줘.<br>기술적 장벽 제거.<br>#BDS소상공인플렛폼 #디지털전환부담" | `#디지털전환부담 #앱하나면됨` |

### 2-3. 블로그 (통증 과부하 & 디지털 전환 부담)
**주요 콘텐츠:** PainGauge 및 Trust Widget의 기술적 원리, Mock Data 기반의 사례 연구.
**Mock Data 연동:** 실제 거래 데이터를 기반으로 한 통계 분석을 통한 설득력 있는 글 작성.

| Pain Point | 제목 초안 | CTA |
| :--- | :--- | :--- |
| **통증 과부하** | "PainGauge 로 본 소상공인의 스트레스.<br>자동화된 대안의 필요성을 증명합니다." | "BDS 앱 다운로드 및 사례 연구 보기<br>[스트레스 50% 감소]" |
| **디지털 전환 부담** | "傻瓜式 인터페이스 + AI 컨설턴트<br>기술적 장벽 제거를 위한 구체적인 방법." | "BDS 플랫폼 기술 지원 가이드 읽기<br>[기술적 장벽 제거]" |

---

## 3. Mock Data 및 시각화 명세 연동 계획

### 3-1. Mock Data (`dashboard-api-response-schema-v1.0.json`)
코다리 에이전트가 생성한 JSON 데이터 구조를 바탕으로, 다음 필드를 추가합니다:

```json
{
  "trust_score": 82,           // 신뢰도 점수 (0-100)
  "pain_level": 4.2,          // 통증 수준 (0-10)
  "trend_direction": "up",    // 추세 방향 (up/down/stable)
  "category_breakdown": {     // 카테고리별 통증 지점
    "finance": 7.5,           // 재무 관리 스트레스
    "hr": 4.2,                // 인력 배정 스트레스
    "marketing": 3.8          // 마케팅 부담
  },
  "solution_cta": "https://bds-platform.com/trust-widget" // 해결 방안 링크
}
```

### 3-2. 시각화 명세 (`BDS_Component_Spec_v4.0_FINAL.md`)
Designer 에이전트가 정의한 Trust Widget 및 PainGauge 의 인터랙션 로직과 일관되게 적용합니다:

- **Trust Widget:** 신뢰도 점수 `trust_score` 가 80점 이상일 때, 화면에 '신뢰도 우수' 배지 표시.
- **PainGauge:** 통증 수준 `pain_level` 이 5점 이하일 때, '자동화 추천' 버튼 활성화.

---

## 4. 다음 작업 및 분배

### 4-1. 코다리 (Mock Data 생성)
- 현재 스키마 없이 진행 중인 Mock Data 생성을 완료하고, 위 JSON 구조를 반영한 실제 데이터를 생성합니다.
- **산출물:** `dashboard-api-response-schema-v1.0.json`, `trust_pain_mock_data_v1.0.json`

### 4-2. Designer (시각화 명세)
- 위 매트릭스에 정의된 Pain Point별 콘텐츠와 일관된 Trust Widget 및 PainGauge 의 시각적 일관성을 점검합니다.
- **산출물:** `BDS_Component_Spec_v4.0_FINAL.md` 수정본

### 4-3. Writer (콘텐츠 제작)
- 위 매트릭스를 바탕으로 YouTube 스크립트, 인스타그램 캡션, 블로그 글을 최종 완성합니다.
- **산출물:** `youtube_script_trust_crisis_final.md`, `instagram_trust_pain_captions_final.md`, `blog_post_solution.md`

---

## 📊 평가: 완료 — 핵심 Pain Point별 솔루션 콘텐츠 매트릭스 작성 및 Mock Data, 시각화 명세 연동 계획 수립
📝 다음 단계: 코다리 에이전트에게 위 JSON 구조를 반영한 실제 Mock Data 생성 요청 및 Designer 에게 시각적 일관성 점검 요청