from pydantic import BaseModel, Field
from typing import List, Optional
import json

# --- [Schema Definition] ---
# StoryFlowSchema v2.0의 백엔드 강제 계약서 역할
class DiagnosisOutput(BaseModel):
    """진단 엔진이 산출하는 기본 진단 결과."""
    risk_level: str = Field(description="손실 위험도 (Low, Medium, High)")
    loss_potential_score: float = Field(description="잠재적 손실 점수 (0.0 ~ 1.0)")
    diagnosis_message: str = Field(description="진단 요약 메시지")

class PremiumBenefit(BaseModel):
    """Premium 플랜의 가치 제안 데이터 구조."""
    benefit_title: str = Field(description="가장 강조할 프리미엄 기능 제목 (예: AI 최적화 로드맵)")
    value_proposition_detail: str = Field(description="사용자가 얻을 감성적/측정 가능한 이점 설명.")
    is_core_feature: bool = Field(default=True)

class StoryFlowSchema(BaseModel):
    """진단 결과를 바탕으로 사용자를 유료화로 안내하는 3단계 코칭 흐름."""
    step_id: str = Field(description="현재 단계 식별자 (S1, S2, S3)")
    content_template_key: str = Field(description="프론트엔드에서 사용할 콘텐츠 키 (예: 'financial-roadmap')")
    action_required: Optional[str] = Field(default=None, description="사용자가 취해야 할 행동 ('무료 학습', '상담 예약' 등)")
    is_paid_wall_triggered: bool = Field(description="이 단계에서 Paywall을 띄워야 하는지 여부.")
    premium_value_proposition: Optional[PremiumBenefit] = None

# --- [Core Service Implementation] ---
def calculate_loss_action(diagnosis: DiagnosisOutput) -> StoryFlowSchema:
    """
    진단 결과에 따라 사용자에게 최적화된 코칭 스토리 흐름을 계산하고, 
    Paywall 트리거 여부와 Premium 가치를 결정하는 핵심 비즈니스 로직.
    
    [WHY] 단순히 결과를 전달하는 것이 아니라, 감성적인 전환 경험(Story Flow)을 설계해야 하기 때문입니다.
    """
    print("--- [DEBUG] Calculating Loss Action based on Diagnosis ---")

    if diagnosis.risk_level == "High" and diagnosis.loss_potential_score > 0.7:
        # High Risk -> 즉각적인 유료 전환 필요 (Strong Paywall Trigger)
        premium_benefit = PremiumBenefit(
            benefit_title="맞춤형 AI 생존 로드맵",
            value_proposition_detail="경쟁사 대비 월 평균 시간 절약 효과 30% 예측.",
            is_core_feature=True
        )
        return StoryFlowSchema(
            step_id="S2-HighRisk",
            content_template_key="high_risk_intervention",
            action_required="Premium Plan 구매 및 로드맵 받기",
            is_paid_wall_triggered=True, # ★★★ 핵심: 여기서 Paywall 트리거 확정
            premium_value_proposition=premium_benefit
        )

    elif diagnosis.risk_level == "Medium" and diagnosis.loss_potential_score > 0.3:
        # Medium Risk -> 교육/정보 제공으로 유도 후, 낮은 강도의 전환 시도 (Soft Paywall Trigger)
        return StoryFlowSchema(
            step_id="S1-MediumRisk",
            content_template_key="medium_risk_guidance",
            action_required="무료 코칭 자료 다운로드 및 추가 진단 진행",
            is_paid_wall_triggered=False, # 아직은 무료 콘텐츠로 신뢰 확보가 우선
            premium_value_proposition=None
        )

    else:
        # Low Risk -> 문제점 발견 없음. 서비스 이탈 방지에 집중하거나 재진단을 유도.
        return StoryFlowSchema(
            step_id="S0-LowRisk",
            content_template_key="low_risk_status",
            action_required="다른 비즈니스 영역 진단받기 또는 성공 사례 확인",
            is_paid_wall_triggered=False,
            premium_value_proposition=None
        )

# --- [Unit Test Placeholder] ---
def test_paywall_logic():
    """이 함수는 단위 테스트 환경에서 호출되어야 합니다."""
    print("\n[TEST] Running Paywall Logic Unit Test...")
    # Mock Diagnosis Input: High Risk Case
    mock_diagnosis = DiagnosisOutput(
        risk_level="High", 
        loss_potential_score=0.85, 
        diagnosis_message="위험도가 높습니다. 즉각적인 대응이 필요합니다."
    )
    # Mocking된 결과를 통해 Paywall 트리거가 정상 작동하는지 확인해야 합니다.
    result = calculate_loss_action(mock_diagnosis)
    print(f"TEST SUCCESS: High Risk -> Paid Wall Triggered? {result.is_paid_wall_triggered}")
    assert result.is_paid_wall_triggered == True

if __name__ == "__main__":
    # 로컬 실행 테스트 (개발 환경에서 직접 확인)
    test_paywall_logic()