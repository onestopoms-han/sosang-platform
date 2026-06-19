#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BDS 소상공인플랫폼 - 최소 기능 Mock Data 생성기 (V1.0)
Designer 의 시각적 기준과 Developer 의 API 스펙을 통합하여, 프론트엔드 렌더링용 JSON 구조를 생성합니다.

사용법:
    python mock_data_generator.py > mock_trust_pain_output.json

출력 예시:
{
  "trust_score": 650,
  "pain_level": 4.2,
  "story_flow_stage": 2,
  "premium_value_proposition": {
    "time_saved_per_month": 12,
    "roi_improvement": 1.8
  },
  ...
}
"""

import json
import random
from datetime import datetime, timedelta

# Designer 의 시각적 기준 (색상 및 레이아웃 매핑)
VISUAL_GUIDELINES = {
    "trust_high": {"color": "#3CB371", "label": "신뢰도 상승"},
    "pain_warning": {"color": "#FF6B6B", "label": "주의: 고통 증가"},
    "neutral": {"color": "#004D66", "label": "정상 상태"}
}

# Developer 의 API 스펙 (StoryFlowSchema)
STORY_FLOW_STAGES = {
    1: {"name": "진단 초기", "message": "사업의 숨은 리스크를 발견했습니다."},
    2: {"name": "해결 제안", "message": "이러한 문제를 해결할 수 있는 솔루션이 있습니다."},
    3: {"name": "프리미엄 전환 유도", "message": "더 깊은 분석과 맞춤형 코칭을 원하신다면?"}
}

def generate_mock_trust_pain_data(trust_score: int = random.randint(500, 700), pain_level: float = round(random.uniform(1.0, 5.0), 2)):
    """
    Designer 의 시각적 기준과 Developer 의 API 스펙을 통합하여 Mock Data 를 생성합니다.
    """
    
    # 상태 기반 색상 및 메시지 결정 (Designer 기준)
    if trust_score > 650:
        visual_state = "trust_high"
    elif pain_level > 3.5:
        visual_state = "pain_warning"
    else:
        visual_state = "neutral"

    # 프론트엔드에서 사용할 JSON 구조 (Developer 스펙 기반)
    data = {
        "timestamp": datetime.now().isoformat(),
        "trust_score": trust_score,
        "pain_level": pain_level,
        "visual_guideline": {
            "color_hex": VISUAL_GUIDELINES[visual_state]["color"],
            "label_text": VISUAL_GUIDELINES[visual_state]["label"]
        },
        "story_flow": {
            "stage_id": random.choice([1, 2, 3]),
            "stage_name": STORY_FLOW_STAGES[random.choice([1, 2, 3])]["name"],
            "cta_message": STORY_FLOW_STAGES[random.choice([1, 2, 3])]["message"]
        },
        "premium_value_proposition": {
            "time_saved_per_month": random.randint(5, 20),
            "roi_improvement_ratio": round(random.uniform(1.0, 3.0), 1)
        }
    }

    return data

def generate_batch(count: int = 10):
    """
    지정된 개수의 Mock Data 를 생성합니다.
    """
    batch_data = [generate_mock_trust_pain_data() for _ in range(count)]
    
    # 전체 JSON 구조를 작성하여 파일로 저장할 수 있도록 준비
    result = {
        "batch_id": f"BATCH_{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "generated_at": datetime.now().isoformat(),
        "data": batch_data
    }

    return result

if __name__ == "__main__":
    # 테스트: 10 개의 Mock Data 를 생성하고 JSON 형식으로 출력합니다.
    output = generate_batch(count=10)
    
    print(json.dumps(output, indent=4, ensure_ascii=False))