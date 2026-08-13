from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import json

# 1. Pydantic 모델 정의 (Input & Output Schema 기반)

class MaterialInput(BaseModel):
    """분석 대상 물질의 화학적 성분 및 물리적 특성"""
    점도: float = Field(..., description="물질의 점도 (예: mPa·s)")
    활성제_유무: bool = Field(..., description="활성제 사용 여부")
    기타_특성: dict = Field(default_factory=dict, description="점도 외 기타 물리적 특성 정보")

class ContextualData(BaseModel):
    """사용 목적 및 환경 정보"""
    최종_용도: str = Field(..., description="물질의 최종 사용 목적")
    처리_주체: str = Field(..., description="물질을 처리하는 주체 (가정/산업)")

class Risk_Parameters(BaseModel):
    """재무적 변동성 또는 심리적 불안정성 관련 입력 값 (선택 사항)"""
    변동성_점수: Optional[float] = Field(None, description="재무적 변동성 점수 (0.0 ~ 1.0)")

class RiskAssessmentInput(BaseModel):
    """API 요청에 필요한 모든 입력값 (Input Schema 반영)"""
    Material_Input: MaterialInput
    Process_Stage: str = Field(..., description="해당 물질이 거친 공정 단계 (Enum 권장)")
    Exclusion_Codes: Optional[List[str]] = Field(None, description="분류에서 제외되어야 하는 HS 코드 목록")
    Contextual_Data: ContextualData
    Risk_Parameters: Optional[Risk_Parameters] = Field(None, description="선택적 위험 파라미터")

class RiskAssessmentOutput(BaseModel):
    """시스템이 산출하여 제공할 결과값 (Output Schema 반영)"""
    Classification_Result: str = Field(..., description="최종 추천 HS 코드 및 분류 결과")
    Risk_Score: float = Field(..., description="시스템이 산출한 종합 리스크 점수 (0.0 ~ 1.0)")

# 2. FastAPI 애플리케이션 설정

app = FastAPI(
    title="CRM Risk Assessment API",
    description="법적 경계 조건 및 공정 단계별 역할을 기반으로 리스크를 평가하는 엔드포인트"
)

@app.post("/api/v1/risk-assessment", response_model=RiskAssessmentOutput)
async def risk_assessment(input_data: RiskAssessmentInput):
    """
    입력된 데이터를 기반으로 잠재적 리스크를 평가하고 분류 결과를 반환합니다.
    (핵심 비즈니스 로직은 추후 구현 예정)
    """
    print("--- Input Received ---")
    print(f"Material_Input: {input_data.Material_Input.model_dump_json()}")
    print(f"Process_Stage: {input_data.Process_Stage}")
    print(f"Contextual_Data: {input_data.Contextual_Data.model_dump_json()}")
    print(f"Risk_Parameters: {input_data.Risk_Parameters.model_dump_json() if input_data.Risk_Parameters else 'N/A'}")

    # TODO: 여기에 실제 리스크 평가 로직을 구현합니다.
    # 예시로 임시 결과를 반환합니다.
    calculated_score = 0.75 # 임시 값
    classification = "HS-XXXX" # 임시 분류 결과

    return RiskAssessmentOutput(
        Classification_Result=classification,
        Risk_Score=calculated_score
    )

# 3. 실행 스크립트 (실제 테스트를 위해 추가)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)