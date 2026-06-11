# 🧩 BDS Pain Level API 스크립트 (State-Based v2.0)
> **작성자:** Writer Agent  
> **버전:** 2.0.1  
> **용도:** 코다리 개발팀의 `Trust Widget` 및 `PainGauge` 컴포넌트에 즉시 연동할 API 응답 스크립트  
> **참고:** 기존 `BDS_Trust_Pain_Copy_Asset_Spec.md`(v1) 를 상태 기반 구조로 재작성

---

## 📊 상태 정의 (State Definitions)
각 단계는 **`Pain Level`(불안/당황/분노 등)**과 **`Workshop Stage**(진단/해결책 제시/확인 요청)의 조합으로 구성됩니다.  
코다리는 이 JSON 데이터를 프론트엔드 컴포넌트의 `setScriptData(state)` 함수에 직접 넘겨주면 됩니다.

### 🔄 상태 전이 규칙 (Transition Rules)
- **`current_pain_level`**가 높을수록 → **`CTA_intensity`(강도)**를 증가시킵니다.  
- **`user_action`**(클릭/스크롤)에 따라 다음 단계로 이동합니다.

---

## 📝 스크립트 매핑 (Script Mapping per State)
각 상태는 `key`(JSON 키), `headline`, `body`, `cta_text`, `button_color`로 구성됩니다.  
**코다리:** 이 객체를 API 엔드포인트 `/api/workshop/stages/{stage_id}` 로 반환하도록 구현해 주세요.

### 🟢 State: `INTRO_PAIN_AWARENESS` (진단 시작)
**상황:** 사용자가 플랫폼에 진입하여 자신의 고민을 표현한 직후  
**API 키:** `intro_pain_awareness` | **상태:** 초기 감성 연결  
```json
{
  "headline": "당신의 가게, 지금 어떤 통증이 있나요?",
  "body": "소상공인의 고민은 다릅니다. 하지만 해결하려는 마음만 같다면, 우리는 함께할 수 있습니다.",
  "cta_text": "지금 당장 내 가게 진단을 받아보세요",
  "button_color": "#0056B3"
}
```

### 🟡 State: `PAIN_LEVEL_DIAGNOSIS` (불안/당황 단계)
**상황:** 사용자가 구체적인 고민 (예: 자금난, 고객 감소 등) 을 선택한 후  
**API 키:** `pain_level_diagnosis_anxiety` | **상태:** 불안감 해소 및 공감  
```json
{
  "headline": "💰 자금이 부족한 건가요? | 📉 매출이 줄어드는 건가요?",
  "body": "단순히 '힘드다'를 넘어서, 그 이유를 명확히 파악합니다. 지금 바로 원인을 찾아드립니다.",
  "cta_text": "내 가게 맞춤 솔루션 추천받기",
  "button_color": "#FF5722"
}
```

### 🔴 State: `PAIN_LEVEL_SOLUTION_PITCH` (분노/행동 단계)
**상황:** 사용자가 해결책 제안에 반응하거나, 대안 제시를 요청한 후  
**API 키:** `pain_level_solution_pitch` | **상태:** 신뢰 형성 및 행동 유도  
```json
{
  "headline": "✅ 이 문제가 바로 '안전마진'이 될 수 있습니다.",
  "body": "대신은 이미 준비했습니다. 지금 클릭하면, 당신의 가게를 위한 구체적인 실행 계획입니다.",
  "cta_text": "무료 전략 세팅 시작하기",
  "button_color": "#4CAF50"
}
```

### 🟣 State: `PAIN_LEVEL_VERIFY_AND_ACT` (확인 및 행동)
**상황:** 사용자가 제안된 솔루션을 검토하거나, 추가 정보를 원할 때  
**API 키:** `pain_level_verify_and_act` | **상태:** 최종 전환 유도  
```json
{
  "headline": "지금 바로 내 가게 문제를 해결하는 전략을 받아보세요",
  "body": "BDS 플랫폼의 전문가들이 준비한 '가게 진단 리포트'를 지금 무료로 확인하세요.",
  "cta_text": "무료 리포트 받기",
  "button_color": "#9C27B0"
}
```

### 🟠 State: `PAIN_LEVEL_RECOVERY_PATH` (회복 단계)
**상황:** 사용자가 솔루션을 적용하고, 개선 효과를 경험한 후  
**API 키:** `pain_level_recovery_path` | **상태:** 장기적 신뢰 및 로열티 강화  
```json
{
  "headline": "💡 '안전마진'이 당신의 가게를 지키고 있습니다.",
  "body": "지속 가능한 성장을 위해, 지금 바로 전문가의 맞춤형 컨설팅을 신청하세요.",
  "cta_text": "전문가 상담 예약하기",
  "button_color": "#795548"
}
```

---

## 🛠️ 개발 가이드 (For Kodiari)
1. **API 응답 구조:** 위 JSON 객체를 API 엔드포인트에 반환하세요.  
2. **상태 관리:** `current_pain_level`과 `user_action`을 기반으로 다음 상태를 결정하는 로직은 코다리의 상태 머신 (State Machine) 에서 구현합니다.  
3. **테스트용 데이터:** 아래 스크립트 파일 (`pain_level_state_map.json`) 이 바로 사용 가능한 JSON 포맷입니다.

<create_file path="sessions/writer_assets/pain_level_state_map.json">
{
  "states": [
    {
      "id": "intro_pain_awareness",
      "name": "진단 시작 (감성 연결)",
      "headline": "당신의 가게, 지금 어떤 통증이 있나요?",
      "body": "소상공인의 고민은 다릅니다. 하지만 해결하려는 마음만 같다면, 우리는 함께할 수 있습니다.",
      "cta_text": "지금 당장 내 가게 진단을 받아보세요",
      "button_color": "#0056B3"
    },
    {
      "id": "pain_level_diagnosis_anxiety",
      "name": "불안/당황 (공감)",
      "headline": "💰 자금이 부족한 건가요? | 📉 매출이 줄어드는 건가요?",
      "body": "단순히 '힘드다'를 넘어서, 그 이유를 명확히 파악합니다. 지금 바로 원인을 찾아드립니다.",
      "cta_text": "내 가게 맞춤 솔루션 추천받기",
      "button_color": "#FF5722"
    },
    {
      "id": "pain_level_solution_pitch",
      "name": "분노/행동 (신뢰 형성)",
      "headline": "✅ 이 문제가 바로 '안전마진'이 될 수 있습니다.",
      "body": "대신은 이미 준비했습니다. 지금 클릭하면, 당신의 가게를 위한 구체적인 실행 계획입니다.",
      "cta_text": "무료 전략 세팅 시작하기",
      "button_color": "#4CAF50"
    },
    {
      "id": "pain_level_verify_and_act",
      "name": "확인/행동 (최종 전환)",
      "headline": "지금 바로 내 가게 문제를 해결하는 전략을 받아보세요",
      "body": "BDS 플랫폼의 전문가들이 준비한 '가게 진단 리포트'를 지금 무료로 확인하세요.",
      "cta_text": "무료 리포트 받기",
      "button_color": "#9C27B0"
    },
    {
      "id": "pain_level_recovery_path",
      "name": "회복 (장기적 신뢰)",
      "headline": "💡 '안전마진'이 당신의 가게를 지키고 있습니다.",
      "body": "지속 가능한 성장을 위해, 지금 바로 전문가의 맞춤형 컨설팅을 신청하세요.",
      "cta_text": "전문가 상담 예약하기",
      "button_color": "#795548"
    }
  ],
  "metadata": {
    "version": "2.0.1",
    "last_updated": "2026-06-11T14:30:00Z",
    "author": "Writer Agent (BDS 플랫폼)"
  }
}