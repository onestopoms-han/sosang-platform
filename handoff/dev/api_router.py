from fastapi import FastAPI, Depends, HTTPException
from typing import List
# 1단계에서 정의한 스키마를 임포트합니다.
from .schemas.ai_dashboard_schema import DiagnosisInput, DiagnosisOutput

app = FastAPI(title="AI Risk Dashboard API")

@app.post("/api/v1/diagnose", response_model=DiagnosisOutput)
async def diagnose_risk_dashboard(input_data: DiagnosisInput):
    """
    소상공인 입력 데이터를 받아 AI 리스크를 진단하고, 최적의 유료 전환 플로우와 함께 
    종합적인 대시보드 결과를 반환합니다. (End-to-End Flow)
    """
    print(f"--- [API Call] Diagnosis 시작: {input_data.business_type} ---")

    # 1. 핵심 리스크 계산 로직 호출 (Max Loss, Risk Level 도출)
    # TODO: 실제 복잡한 비즈니스/경제 모델링 함수가 여기에 들어갈 것입니다.
    max_loss = input_data.monthly_revenue_l * (input_data.impacted_days / 30) * 1.5 # 가상 계산 로직
    risk_level = "HIGH" if max_loss > 10_000 else ("MEDIUM" if max_loss > 3_000 else "LOW")

    # 2. WTP 및 Mitigation Rate 계산 (가치 증명)
    mitigation_rate = 0.65 # 가상 값 설정
    wtp = min(max_loss * 0.7, 5000) # 최대 지불 의사액 제한

    # 3. 스토리 플로우 및 프리미엄 가치 산출 (Conversion Logic)
    story_flow = [
        StoryFlowStep(
            step_name="1단계: 위험 인식",
            content_type="VISUAL_GAUGE",
            description=f"현재 귀사의 최대 예상 손실액은 {max_loss:,.0f}원입니다. 이 수치는 우리가 막지 못할 리스크를 의미합니다.",
            required_data_point="Max Loss"
        ),
        StoryFlowStep(
            step_name="2단계: 해결책 제시",
            content_type="TEXT",
            description=f"{mitigation_rate*100:.0f}%의 리스크를 줄일 수 있는 방법이 있습니다. 바로 BDS 솔루션입니다.",
            required_data_point="Mitigation Rate"
        ),
        StoryFlowStep(
            step_name="3단계: 가치 증명 (CTA)",
            content_type="CTA",
            description=f"이 모든 것을 해결하기 위해, 최소 {wtp:,.0f}원 정도의 투자가 필요합니다. 지금 바로 확인하세요!",
            required_data_point="WTP Calculated"
        )
    ]

    premium_benefits = [
        PremiumValueProposition(
            value_metric="시간 절약 효과", 
            quantified_benefit=25.0, 
            description="직원들이 AI 문제 대응에 매달리는 시간을 월 25시간 단축할 수 있습니다."
        )
    ]

    # 4. 최종 결과물 반환 (Pydantic Validation 통과 확인)
    return DiagnosisOutput(
        max_loss_amount=max_loss,
        risk_level=risk_level,
        mitigation_rate=mitigation_rate,
        wtp_calculated=wtp,
        story_flow=story_flow,
        premium_benefits=premium_benefits
    )

#