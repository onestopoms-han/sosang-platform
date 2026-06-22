from pydantic import BaseModel, Field
from datetime import datetime

class TrustScoreInput(BaseModel):
    experiment_id: str = Field(..., description="A/B 테스트 ID")
    trust_score_min: int = Field(ge=0, le=100)
    trust_score_max: int = Field(ge=0, le=100)
    control_group_enabled: bool

class ReductionReport(BaseModel):
    user_id: str
    timeframe: str = "last_24h"
    pain_level_filter: float  # <=3 인 경우
    reduction_metric: float   # 이탈률 감소 %
    attribution_score: int    # 신뢰도 점수 기여도