from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.scoring_engine import RRSScoringEngine

router = APIRouter()
scoring_engine = RRSScoringEngine()

# 1. 입력 스키마 정의 (Pydantic 기반)
class BlueprintRequest(BaseModel):
    risk_level: str

# 2. Mock API 엔드포인트 구현
@router.post("/calculate_blueprint")
def calculate_blueprint(request: BlueprintRequest):
    """
    사용자의 위험 수준에 따라 Actionable Blueprint를 시뮬레이션하여 반환합니다.
    실제로는 DB/ML 모델이 계산하겠지만, 현재는 엔진의 결과를 모방합니다.
    """
    try:
        result = scoring_engine.calculate_score(request.risk_level)
        # JSON 스키마 준수 확인 (API 응답 구조)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # 내부 오류 발생 시 로그 기록 필요
        raise HTTPException(status_code=500, detail=f"Internal Server Error during blueprint calculation: {e}")