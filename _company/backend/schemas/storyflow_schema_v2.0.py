# StoryFlowSchema v2.0 - API 계약서 (Payment Flow Focus)

from pydantic import BaseModel, Field
from typing import List, Optional

# 1. 진단 결과 (기존 유지)
class DiagnosisOutput(BaseModel):
    risk_level: str = Field(..., description="진단된 손실 위험도 (Low, Medium, High)")
    diagnosis_summary: str = Field(..., description="핵심 문제 요약")
    suggested_path: List[str] = Field(..., description="권장되는 코칭 단계 목록")

# 2. 가치 제안 및 전환 관련 데이터 (추가/강화)
class PremiumValueProposition(BaseModel):
    # '손실 최소화' 테마에 맞춰, 프리미엄이 제공하는 구체적인 이득을 측정 가능한 형태로 정의합니다.
    risk_reduction_metric: float = Field(..., description="진단 결과 대비, 프리미엄 도입으로 예상되는 손실 위험 감소율 (%)")
    time_saved_estimate: str = Field(..., description="사용자가 절약할 것으로 예상되는 시간 (예: 월 5시간)")
    exclusive_feature_benefit: str = Field(..., description="프리미엄 전용 핵심 기능의 구체적인 이점 설명")
    cost_of_inaction: float = Field(..., description="현재 상태를 유지했을 때 예상되는 잠재적 손실 금액 (손실 회피 심리 자극)")

# 3. 최종 API 응답 스키마
class StoryFlowSchemaResponse(BaseModel):
    diagnosis: DiagnosisOutput
    premium_proposition: PremiumValueProposition
    suggested_flow: List[str] # 코칭 흐름을 UI에 바로 전달하기 위함
    technical_feasibility_score: float = Field(..., description="시스템이 제시하는 기술적 실행 가능성 점수 (0.0 ~ 1.0)")

# API 엔드포인트 정의를 위한 최종 데이터 모델 구조
class PaymentFlowData(BaseModel):
    # 이 스키마가 결제 페이지 목업에 필요한 모든 핵심 데이터를 포함합니다.
    flow_data: StoryFlowSchemaResponse

# 예시 데이터 (개발 환경에서 테스트용으로 사용)
example_response = PaymentFlowData(
    flow_data=StoryFlowSchemaResponse(
        diagnosis=DiagnosisOutput(
            risk_level="High",
            diagnosis_summary="시장 데이터 분석 부족으로 인한 비효율적 자원 배분.",
            suggested_path=["데이터 수집 시작", "AI 기반 전략 설계", "실행 및 검증"]
        ),
        premium_proposition=PremiumValueProposition(
            risk_reduction_metric=45.0, # 45% 위험 감소 가정
            time_saved_estimate="월 7시간",
            exclusive_feature_benefit="실시간 데이터 기반 예측 엔진 접근 권한",
            cost_of_inaction=150000  # 잠재적 손실 금액 예시
        ),
        suggested_flow=["데이터 수집 시작", "AI 기반 전략 설계", "실행 및 검증"],
        technical_feasibility_score=0.92 # 기술적 실행 가능성 높음
    )
)