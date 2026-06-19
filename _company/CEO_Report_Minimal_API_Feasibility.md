# 🚀 BDS 플랫폼 최소 기능 API 엔드포인트 및 Mock Data 생성 Feasibility Report (V1.0)

## 1. 개요
Designer 가 제시한 최종 디자인 시스템 가이드라인과 Developer 가 정리한 API 스펙(`StoryFlowSchema`) 을 기반으로, 실제 프론트엔드 개발에 바로 사용할 수 있는 **최소 기능 API 엔드포인트**와 **Mock Data 생성 스크립트**를 완성했습니다.

## 2. 구현된 Mock Data 생성기 (`mock_data_generator.py`)
- **위치**: `developer/mock_data_generator.py`
- **기능**: Designer 의 시각적 기준(색상, 레이아웃) 과 Developer 의 API 스펙(StoryFlowSchema) 을 통합하여, 프론트엔드 렌더링용 JSON 구조를 생성합니다.
- **출력 예시**: 
```json
{
  "timestamp": "2026-06-19T15:30:00",
  "trust_score": 680,
  "pain_level": 2.5,
  "visual_guideline": {
    "color_hex": "#3CB371",
    "label_text": "신뢰도 상승"
  },
  "story_flow": {
    "stage_id": 2,
    "stage_name": "해결 제안",
    "cta_message": "이러한 문제를 해결할 수 있는 솔루션이 있습니다."
  }
}
```

## 3. 확정된 API 엔드포인트 명세 (`Feasibility_List_Minimal_API.json`)
- **GET /v1/trust-pain-data**: 전체 Mock Data 를 반환합니다. (Mock Data 생성 스크립트 연동)
- **GET /v1/story-flow/{stage_id}**: 특정 스토리 흐름 단계에 대한 상세 정보를 반환합니다.

## 4. 다음 단계
- 프론트엔드 개발팀이 이 Mock Data 를 사용하여 초기 UI 렌더링을 시작할 수 있도록, `mock_trust_pain_output.json` 파일을 공유합니다.
- 실제 API 서버가 준비되면, 이 스크립트를 백엔드로 대체할 수 있도록 연동 계획을 수립합니다.

**자가검증: 사실 3개 / 추측 0개**