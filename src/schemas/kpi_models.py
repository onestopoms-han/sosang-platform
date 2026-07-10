from pydantic import BaseModel, Field
from typing import Literal, Optional

# --------------------------------------------------
# 1. 입력 스키마: 사용자 행동 지표 (Input Schema)
# 사용자가 플랫폼에서 수행한 특정 행동과 그 결과에 대한 데이터를 수집합니다.
# --------------------------------------------------
class ActionInputSchema(BaseModel):
    """사용자의 특정 행동 및 측정된 결과를 담는 입력 모델."""
    user_id: str = Field(..., description="플랫폼 사용자 고유 ID")
    action_type: Literal["inventory_sync", "labor_optimization", "marketing_execution"] = Field(..., description="수행한 핵심 행동 유형")
    input_data: dict = Field(..., description="행동과 관련된 구체적인 측정 데이터 (예: 재고 차이, 시간 절약량)")
    outcome_value: float = Field(..., description="사용자 행동으로 인해 발생한 정량적 결과 값 (0.0 ~ 100.0)")
    time_taken_sec: int = Field(..., description="해당 행동에 소요된 시간 (초)")

# --------------------------------------------------
# 2. 출력 스키마: 게이지 및 가치 변화 (Output Schema)
# 백엔드가 계산하여 프론트엔드로 반환할 핵심 지표를 정의합니다.
# --------------------------------------------------
class GaugeResultSchema(BaseModel):
    """계산된 통제권 회복 및 ROI 결과."""
    control_recovery_score: float = Field(..., description="통제권 회복 점수 (S_Control). 0.0 ~ 1.0")
    roi_achieved_value: float = Field(..., description="달성된 재무적 가치 변화 (S_ROI). 상대적 수익 증대 지표")
    story_flow_step: str = Field(..., description="현재 사용자 스토리 흐름 단계 (예: Diagnosis, Plan, Action)")
    risk_level: Literal["Low", "Medium", "High"] = Field("Medium", description="현재 상태의 위험 수준")
    feedback_message: str = Field(..., description="사용자에게 제공할 구체적인 피드백 메시지")

# --------------------------------------------------
# 3. 통합 스키마 (통합 API 응답)
# 입력과 결과를 하나의 응답으로 묶어 전달합니다.
# --------------------------------------------------
class ActionPlanResponse(BaseModel):
    """최종 액션 플랜 결과 모델."""
    status: Literal["success", "error"] = Field("success", description="API 호출 성공 여부")
    result: GaugeResultSchema
    calculated_metrics: dict = Field(..., description="S_Control, S_ROI 등 상세 계산 값")

print("kpi_models.py 파일 생성 완료.")