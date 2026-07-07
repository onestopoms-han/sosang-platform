<title>StoryFlowSchema v2.0 (Value Proposition 포함)</title>
```json
{
  "type": "object",
  "properties": {
    "diagnosis_result": {
      "type": "string",
      "description": "AI 진단 엔진의 최종 결과 (예: 손실 위험도 High)",
      "enum": ["Low", "Medium", "High"]
    },
    "story_flow": {
      "type": "array",
      "description": "사용자의 상태 변화에 따른 코칭 및 행동 플로우.",
      "items": {
        "type": "object",
        "properties": {
          "step_name": {"type": "string", "description": "단계 이름 (예: 불확실성 인식, 통제권 확보)"},
          "required_action": {"type": "string", "description": "이 단계에서 사용자에게 필요한 구체적인 행동."},
          "value_proposition": {
            "type": "object",
            "description": "해당 단계에서 제공하는 가치 (Premium/Basic 차별점 포함).",
            "properties": {
              "basic_benefit": {"type": "string"},
              "premium_benefit": {"type": "string", "description": "프리미엄 플랜에서만 제공되는 구체적인 이익 (예: 월 평균 시간 절약 효과)"}
            },
            "required": ["basic_benefit"]
          },
          "visual_cue": {"type": "string", "description": "이 단계에서 사용자에게 보여줄 핵심 시각 요소 (Designer와의 연동 지점)."}
        },
        "required": ["step_name", "required_action", "value_proposition"]
      }
    },
    "risk_assessment": {
      "type": "object",
      "properties": {
        "uncertainty_score": {"type": "number", "description": "현재 불확실성 점수 (0-100)"},
        "control_level": {"type": "string", "enum": ["Low", "Medium", "High"], "description": "사용자의 현재 통제 수준"}
      }
    }
  },
  "required": ["diagnosis_result", "story_flow", "risk_assessment"]
}
```