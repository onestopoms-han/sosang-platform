from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import random

router = APIRouter(prefix="/api/diagnosis", tags=["Diagnosis"])

class DiagnosisInput(BaseModel):
    businessSector: str
    annualRevenueEstimate: Optional[float] = None
    operationalStaffCount: int
    currentChallengeFocus: str

class LossBreakdownItem(BaseModel):
    description: str
    potentialCost: float
    mitigationScore: Optional[int] = None

class DiagnosisResult(BaseModel):
    success: bool
    diagnosisId: str
    estimatedPotentialLossAmount: float
    lossDetailBreakdown: Dict[str, LossBreakdownItem]
    recommendedActionPlanSummary: str

@router.post("/submit", response_model=DiagnosisResult)
async def submit_diagnosis(input_data: DiagnosisInput):
    # Calculate some realistic potential loss amount based on inputs (unit: ten-thousand KRW)
    revenue = input_data.annualRevenueEstimate or 5000.0  # default 50 million KRW
    staff = input_data.operationalStaffCount
    focus = input_data.currentChallengeFocus
    
    base_loss = (revenue * 0.08) + (staff * 80)
    if focus == '운영비효율':
        base_loss *= 1.2
    elif focus == '디지털전환부재':
        base_loss *= 1.3
    elif focus == '마케팅성과미흡':
        base_loss *= 1.15
        
    estimated_loss = round(base_loss * 10000) # Convert to KRW
    
    loss_breakdown = {
        '운영비효율': LossBreakdownItem(
            description="재고 관리 비효율 및 리소스 낭비로 인한 손실 가능성",
            potentialCost=round(estimated_loss * 0.45),
            mitigationScore=85
        ),
        '디지털전환부재': LossBreakdownItem(
            description="온라인 예약 및 스마트 결제 시스템 부재로 인한 잠재 고객 이탈",
            potentialCost=round(estimated_loss * 0.35),
            mitigationScore=90
        ),
        '마케팅성과미흡': LossBreakdownItem(
            description="타겟팅 부재 및 마케팅 채널 파편화로 인한 비효율적인 지출",
            potentialCost=round(estimated_loss * 0.20),
            mitigationScore=75
        )
    }
    
    recommendations = {
        '운영비효율': "AI 기반 자동 재고 및 직원 관리 시스템 도입을 통해 연간 35% 이상의 운영비를 절감하는 것을 최우선으로 제안합니다.",
        '디지털전환부재': "카카오톡 채널 통합 1분 예약 서비스 도입 및 스마트 오더 구축을 통해 유실되는 고객 문의를 95% 이상 방지하고 매출을 개선하세요.",
        '마케팅성과미흡': "채널별 유입 데이터 분석 툴 도입과 카카오톡 맞춤 고객 A/B 메시지 카피 전략을 실행하여 광고비 ROI를 2배 이상 높이십시오."
    }
    
    summary = recommendations.get(focus, "AI 진단이 완료되었으며, 실행 가능한 최적화 로드맵이 구성되었습니다. 카카오톡 연동 채널을 활성화하여 1:1 진단 컨설팅을 시작하세요.")
    
    return DiagnosisResult(
        success=True,
        diagnosisId=f"diag_{random.randint(100000, 999999)}",
        estimatedPotentialLossAmount=estimated_loss,
        lossDetailBreakdown=loss_breakdown,
        recommendedActionPlanSummary=summary
    )
