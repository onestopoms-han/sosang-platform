from pydantic import BaseModel, Field, validator
from typing import List, Optional, Literal
from datetime import date

# --- Shared Enums ---
RiskLevel = Literal["Low", "Medium", "High"]
ActionType = Literal["Self-Check", "Resource-Review", "Consultation"]
BenefitType = Literal["Financial", "Legal", "TimeSaving"]


class StepContent(BaseModel):
    """단일 코칭 단계에 필요한 콘텐츠 구조."""
    title: str = Field(description="사용자에게 노출될 단계 제목.")
    step_id: str = Field(description="이 단계를 식별하는 고유 ID (예: S-01).")
    required_action: ActionType = Field(description="사용자가 이 단계에서 취해야 할 행동 유형.")
    content_details: dict = Field(description="단계에 필요한 구체적인 콘텐츠 데이터 맵. { 'text': str, 'image_url': Optional[str], ... }")


class PremiumValueProposition(BaseModel):
    """Premium 플랜의 가치 제안을 수치화하여 기술적으로 정의."""
    benefit_type: BenefitType = Field(description="제공되는 혜택의 유형 (재무, 법률, 시간).")
    claim_title: str = Field(description="가치를 증명하는 제목.")
    proof_data: Optional[dict] = Field(description="수치적 근거 데이터. 예: {'metric': 'time_saved', 'value': 15, 'unit': 'hours/month'}.")


class DiagnosisOutputSchemaV2(BaseModel):
    """
    진단 엔진의 최종 결과물 및 스토리 흐름을 담는 API 스키마 (StoryFlowSchema v2.0).
    Phase 1 목표: Story Flow를 통한 유료 전환 경험 제공.
    """
    diagnosis_id: str = Field(description="진단을 실행한 고유 ID.")
    initial_risk_level: RiskLevel = Field(description="초기 진단 결과에 따른 위험 레벨.")
    story_flow: List[StepContent] = Field(description="사용자가 거쳐야 할 코칭 스텝의 순서 배열.")
    premium_value_proposition: Optional[PremiumValueProposition] = Field(None, description="만약 Pro/Premium 플랜이 적용될 경우 제공되는 가치 제안 필드.")


# --- API Contract Example Endpoint ---
# POST /api/v1/diagnosis/generate_flow
# Request Body: { "input_data": {...} }
# Response Body: DiagnosisOutputSchemaV2