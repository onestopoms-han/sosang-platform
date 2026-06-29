from pydantic import BaseModel, Field, validator
from typing import List, Optional

# --- 1. Diagnosis Input Schema (사용자 입력 데이터) ---
class DiagnosisInput(BaseModel):
    """
    AI 리스크 예측 대시보드에 필요한 소상공인 기본 정보 및 재무 상태 입력값.
    [근거: Researcher V1.0, 코다리 개인 메모리]
    """
    business_type: str = Field(..., description="소상공인의 업종 (예: 식당, 온라인 쇼핑몰)")
    monthly_revenue_l: float = Field(..., ge=0, description="월 평균 매출액 ($L_{Revenue}$).")
    impacted_days: int = Field(..., ge=1, description="AI 리스크 발생 시 비즈니스 중단 예상 일수 ($D_{Impact}$).")
    current_solution_cost: float = Field(..., ge=0, description="현재 운영하는 유사 솔루션의 월 비용.")

# --- 2. Diagnosis Output Schema (API 응답 데이터 계약서 - V3.0) ---
class StoryFlowStep(BaseModel):
    """
    진단 결과에 따라 사용자에게 제시되는 코칭 단계별 콘텐츠 구조.
    [근거: 코다리 개인 메모리, Writer 산출물]
    """
    step_name: str = Field(..., description="이 단계의 제목 (예: 1단계 - 문제 인식)")
    content_type: str = Field(..., enum=["TEXT", "VISUAL_GAUGE", "CTA"], description="콘텐츠 형태")
    description: str = Field(..., description="사용자에게 전달할 상세 스토리텔링 내용.")
    required_data_point: Optional[str] = Field(None, description="이 단계에서 반드시 보여줘야 하는 핵심 데이터 지표 (예: Max Loss)")

class PremiumValueProposition(BaseModel):
    """
    Premium 플랜의 가치를 측정 가능한 데이터를 통해 증명하는 구조.
    [근거: 코다리 개인 메모리]
    """
    value_metric: str = Field(..., description="제시할 핵심 가치 지표 (예: 시간 절약 효과, 비용 감소율)")
    quantified_benefit: float = Field(..., gt=0, description="정량화된 이득 값 (단위 포함).")
    description: str = Field(..., description="이 가치가 소상공인에게 주는 의미.")

class DiagnosisOutput(BaseModel):
    """
    AI 리스크 예측 대시보드의 최종 출력 데이터 구조. 
    진단 결과, 스토리 플로우, 그리고 유료 전환 근거가 모두 포함되어야 함.
    [근거: 통합 스케줄, 코다리 개인 메모리]
    """
    # --- Core Diagnosis Metrics (위협 지표) ---
    max_loss_amount: float = Field(..., ge=0, description="최대 예상 손실액 ($Max Loss$). Red Zone 값.")
    risk_level: str = Field(..., enum=["LOW", "MEDIUM", "HIGH"], description="전반적인 리스크 등급.")
    
    # --- Core Value Metrics (해결책 지표) ---
    mitigation_rate: float = Field(..., ge=0, le=1.0, description="플랫폼 도입으로 감소 가능한 리스크율 (0.0 ~ 1.0).")
    wtp_calculated: float = Field(..., gt=0, description="계산된 지불 의사 금액 ($WTP$).")

    # --- Conversion & Storytelling Flow ---
    story_flow: List[StoryFlowStep] = Field(..., description="사용자에게 순차적으로 제시될 코칭 단계 목록.")
    premium_benefits: Optional[List[PremiumValueProposition]] = Field(None, description="상위 플랜을 가치 증명하는 항목들.")

    @validator("max_loss_amount")
    def validate_max_loss(cls, v):
        if v < 0:
            raise ValueError("Max Loss는 음수가 될 수 없습니다.")
        return v
#