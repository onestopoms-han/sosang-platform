<file>
# BDS 소상공인플렛폼 — API 데이터 계약서 (Mock Schema V1.0)

**작성일:** 2026년 6월 17일  
**작성자:** Designer (Lead Designer), 코다리 검토  
**목적:** Trust Widget 및 PainGauge 컴포넌트가 백엔드 API (`/api/v1/diagnose`)로부터 받아야 할 최종 데이터 구조를 정의하여, 프론트엔드와 백엔드의 데이터 교환 표준을 확립한다.

---

## 🎯 1. 핵심 목표 및 원칙
*   **신뢰성:** 모든 데이터는 소상공인의 '위기감'과 '잠재적 신뢰도 상승 가능성'을 숫자로, 그리고 시각적으로 명확히 전달하는 데 초점을 맞춘다.
*   **데이터 타입 정의:** 각 필드는 단순한 값이 아닌, UI 컴포넌트의 로직(Conditional Rendering)을 구동시키는 역할을 해야 한다.

---

## 📊 2. 전체 API 응답 구조 (Root Schema)

API 호출 시 반환되는 최상위 JSON 객체 형태를 규정한다.

```json
{
  "status": "SUCCESS",           // 문자열: 항상 성공 여부를 알림 ("SUCCESS" / "ERROR")
  "diagnosis_time": "2026-06-17T18:59:00Z", // 문자열 (ISO 8601): 진단이 완료된 시점
  "pain_gauge_data": { /* PainGauge 컴포넌트 전용 데이터 */ },
  "trust_widget_data": { /* Trust Widget 컴포넌트 전용 데이터 */ }
}
```

---

## 💔 3. PainGauge 데이터 스키마 (위기감 분석)

소상공인의 현재 위기 수준을 수치와 상태로 제시한다.

| 필드명 | 자료형 | 필수 여부 | 설명 | 조건 및 디자인 가이드라인 (Visual Impact) | 예시 값 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `pain_score` | Float | O | 0.0 ~ 100.0 사이의 위기 점수. (낮을수록 안정적, 높을수록 위험) | **[핵심 지표]** 이 값에 따라 게이지의 색상과 포인터 위치가 결정된다. <br> - 20점 미만: Deep Blue (안정) / Growth Green 계열로 전환 가능성 강조. <br> - 60~85점: 주황색 경고 영역 (Attention required). <br> - 90점 이상: **Red/Danger Color** 필수 활성화 및 '긴급 점검 필요' 배지 표시. | 78.5 |
| `risk_level` | String | O | 분석된 리스크 수준 (카테고리화). | **[UI 로직]** 스코어와 별개로, 명확한 문구적 경고를 제공한다. <br> *예시:* "높음(High)", "주의(Caution)", "안정(Stable)". 이 문자열에 따라 텍스트 사이즈 및 볼드 처리 여부가 결정된다. | "높음" |
| `key_pain_source` | String | O | 가장 큰 위기 요인 (핵심 키워드). | **[하이라이트]** 사용자에게 즉시 전달해야 할 핵심 문구이다. 최대 30자 제한을 두고, 이 필드를 중심으로 텍스트를 크게 강조한다. | "지역 소비 감소 및 온라인 마케팅 부재" |

**JSON 예시 (PainGauge):**
```json
"pain_gauge_data": {
  "pain_score": 78.5,
  "risk_level": "높음",
  "key_pain_source": "지역 소비 감소 및 온라인 마케팅 부재로 위기 고조"
}
```

---

## ✨ 4. Trust Widget 데이터 스키마 (신뢰도 및 해결책 제시)

위기를 해소하고 플랫폼을 통해 얻을 수 있는 신뢰와 행동 계획을 제시한다.

| 필드명 | 자료형 | 필수 여부 | 설명 | 조건 및 디자인 가이드라인 (Visual Impact) | 예시 값 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `trust_score` | Float | O | 0.0 ~ 100.0 사이의 신뢰도 점수. (잠재적 상승 가능성 기반) | **[핵심 지표]** 이 값이 높을수록 '우리의 서비스가 도움 될 수 있다'는 확신을 준다. 게이지 색상 및 상승 추세를 보여준다. | 52.1 |
| `recommended_action` | String | O | 사용자가 당장 취해야 할 가장 중요한 행동 지침 (솔루션 제시). | **[CTA 연결]** 이 문구는 반드시 다음 단계의 액션 버튼(Call to Action)과 연동되어야 한다. '어떻게' 해결할지 명확히 지시한다. | "온라인 채널 다각화 및 비대면 교육 참여" |
| `solution_pillar` | Array<String> | O | 추천되는 세부 솔루션 기둥 (최대 3개). | **[레이아웃]** UI에 카드 형태(Card Layout)로 나열되어야 한다. 각 피어는 아이콘과 함께 제시되며, 클릭 시 상세 설명 페이지로 연결된다. | ["온라인 마케팅", "재무 컨설팅", "정책 자금 연계"] |
| `trust_message` | String | O | 사용자의 상황을 종합적으로 고려한 격려/동기 부여 메시지. | **[톤 앤 매너]** 위로와 희망의 메시지여야 한다. 지나친 공감보다 '해결 가능성'에 초점을 맞춘다. (Deep Blue 계열의 감성을 담는다.) | "지금의 어려움은 기회입니다. 시스템을 통해 성장할 수 있습니다." |

**JSON 예시 (Trust Widget):**
```json
"trust_widget_data": {
  "trust_score": 52.1,
  "recommended_action": "온라인 채널 다각화 및 비대면 교육 참여",
  "solution_pillar": ["온라인 마케팅", "재무 컨설팅", "정책 자금 연계"],
  "trust_message": "지금의 어려움은 기회입니다. 시스템을 통해 성장할 수 있습니다."
}
```

---

## 🛠️ 5. 최종 통합 예시 (Mock API Full Response)

위의 모든 요소를 결합한, 실제 호출될 때의 Mock 응답 데이터 형태이다.

```json
{
  "status": "SUCCESS",
  "diagnosis_time": "2026-06-17T18:59:00Z",
  "pain_gauge_data": {
    "pain_score": 78.5,
    "risk_level": "높음",
    "key_pain_source": "지역 소비 감소 및 온라인 마케팅 부재로 위기 고조"
  },
  "trust_widget_data": {
    "trust_score": 52.1,
    "recommended_action": "온라인 채널 다각화 및 비대면 교육 참여",
    "solution_pillar": ["온라인 마케팅", "재무 컨설팅", "정책 자금 연계"],
    "trust_message": "지금의 어려움은 기회입니다. 시스템을 통해 성장할 수 있습니다."
  }
}
```