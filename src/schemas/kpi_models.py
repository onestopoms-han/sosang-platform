from pydantic import BaseModel, Field
from typing import Literal, Dict, Any
from datetime import datetime

# 1. KPI 측정 및 결과 모델
class RoiResult(BaseModel):
    """투자 수익률 (ROI) 계산 결과"""
    roi_value: float = Field(..., description="계산된 투자 수익률 값")
    risk_level: Literal["Low", "Medium", "High"] = Field(..., description="현재 위험 수준")
    recommendation: str = Field(..., description="다음 실행 단계 추천")

# 2. 게이지 업데이트 모델
class GaugeUpdate(BaseModel):
    """통제권 회복 게이지 업데이트 요청"""
    user_id: str = Field(..., description="사용자 고유 ID")
    action_type: str = Field(..., description="수행된 행동 유형 (예: 'Consulting', 'Platform_Use')")
    roi_achieved: float = Field(..., description="이 행동으로 인해 달성된 재무적 가치 (ROI)")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# 3. 프리미엄 전환 모델 (Action Blueprint 관련)
class PremiumTrigger(BaseModel):
    """프리미엄 플랜 전환 트리거 요청"""
    user_id: str = Field(..., description="사용자 고유 ID")
    reason: str = Field(..., description="프리미엄 전환을 원하는 구체적인 이유 (예: '고급 분석 도구 필요', '더 빠른 실행 로드맵 요구')")
    current_status: str = Field(..., description="현재 사용자 상태 (Diagnosis 결과 기반)")
    justification: Dict[str, Any] = Field(..., description="전환 근거 데이터 (KPI 및 스토리라인 기반)")

# 4. StoryFlowSchema 확장 (상태 변화 로직을 위한 구조)
class StoryFlowState(BaseModel):
    """사용자의 코칭 여정 상태를 정의하는 조건부 로직 맵"""
    current_stage: str = Field(..., description="현재 사용자 진행 단계 (예: 'Diagnosis', 'Action Planning', 'Execution')")
    next_action_required: str = Field(..., description="다음으로 요구되는 행동 또는 정보")
    progress_score: float = Field(..., ge=0.0, le=100.0, description="현재 진행도 점수 (0~100)")
    status_history: list[Dict[str, Any]] = Field(default_factory=list, description="과거 상태 변화 기록")

print("✅ schemas.py 파일 생성 완료.")