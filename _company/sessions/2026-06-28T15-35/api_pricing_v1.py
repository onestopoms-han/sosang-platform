# 💻 코다리 — 가격 전략 API 백엔드 컴포넌트 (FastAPI)
# 스키마 기반 Mock API 구현 및 사용자 여정 데이터 연동

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import json
import os

# --- 스키마 임포트 또는 인라인 정의 ---
# pricing_schema_v1.py 의 내용을 직접 여기에서 활용하거나 별도 파일로 import 합니다.
# 현재는 내부 로직을 위해 스키마를 바로 정의합니다 (추후 실제 프로젝트에서는 모듈 분리 필요).

class PricingPlan(BaseModel):
    plan_id: str
    name: str
    price: float
    features: list[str]

class UserJourneyStep(BaseModel):
    step_id: int
    title: str
    description: str
    recommended_plan_id: str | None = None  # 추천 플랜 ID

# --- 실제 가격 데이터 및 사용자 여정 데이터 (Mock Data) ---
PRICING_DATA = [
    PricingPlan(plan_id="basic", name="Basic Plan", price=10000, features=["기본 분석", "월간 리포트"]),
    PricingPlan(plan_id="pro", name="Pro Plan", price=25000, features=["고급 분석", "실시간 알림", "커스텀 보고서"]),
    PricingPlan(plan_id="premium", name="Premium Plan", price=50000, features=["AI 컨설턴트", "일대일 코칭", "API 우선 접근권"]),
]

USER_JOURNEY_DATA = [
    UserJourneyStep(step_id=1, title="문제 인식 단계", description="비즈니스의 어려움을 명확히 파악하고 있습니다."),
    UserJourneyStep(step_id=2, title="솔루션 탐색 단계", description="해결책을 찾고 있으며 가격 대비 효과를 고려하고 있습니다."),
    UserJourneyStep(step_id=3, title="구매 결정 단계", description="최적의 플랜을 선택하여 구매를 완료할 준비가 되었습니다."),
]

# --- FastAPI 애플리케이션 설정 ---
app = FastAPI(title="BDS 소상공인플렛폼 — 가격 전략 API")

@app.get("/api/pricing-plans")
async def get_pricing_plans():
    """현재 유효한 가격 플랜 목록을 반환합니다."""
    return {"plans": PRICING_DATA}

@app.get("/api/user-journey/{step_id}")
async def get_user_journey_step(step_id: int):
    """특정 단계의 사용자 여정을 반환합니다."""
    step = next((s for s in USER_JOURNEY_DATA if s.step_id == step_id), None)
    if not step:
        raise HTTPException(status_code=404, detail="요청한 사용자 여정 단계가 존재하지 않습니다.")
    
    # 단계에 따라 추천 플랜 ID 를 동적으로 포함 (예시 로직)
    recommended_plan = None
    if step.step_id == 1:
        recommended_plan = "basic"  # 문제 인식 -> Basic 플랜 안내
    elif step.step_id == 2:
        recommended_plan = "pro"     # 솔루션 탐색 -> Pro 플랜 강조
    elif step.step_id == 3:
        recommended_plan = "premium" # 구매 결정 -> Premium 플랜 유도

    return {
        "step": step,
        "recommended_plan": recommended_plan,
    }

@app.get("/api/pricing-recommendation")
async def get_pricing_recommendation():
    """사용자 여정 데이터를 기반으로 최적의 가격 추천을 제공합니다."""
    # 가장 높은 단계 (구매 결정) 를 기준으로 추천 플랜 반환
    final_step = next((s for s in USER_JOURNEY_DATA if s.step_id == 3), None) or USER_JOURNEY_DATA[-1]
    
    recommended_plan_id = final_step.recommended_plan or "premium"
    recommended_plan_obj = next((p for p in PRICING_DATA if p.plan_id == recommended_plan_id), None)

    if not recommended_plan_obj:
        raise HTTPException(status_code=404, detail="추천 플랜을 찾을 수 없습니다.")

    return {
        "message": f"{final_step.title} 단계에 최적의 추천입니다.",
        "recommended_plan": recommended_plan_obj.dict()
    }

@app.post("/api/pricing-recommendation")
async def post_pricing_recommendation(body: dict):
    """사용자 입력 데이터(예: 현재 단계, 예산) 를 기반으로 맞춤형 추천을 제공합니다."""
    current_step_id = body.get("current_step", 1)
    budget = body.get("budget", 30000)

    # 로직: 예산 범위 내에서 가장 높은 단계의 플랜을 추천
    available_plans = [p for p in PRICING_DATA if p.price <= budget]
    
    if not available_plans:
        raise HTTPException(status_code=422, detail="요청한 예산 범위 내에서 유효한 플랜이 없습니다.")

    # 사용자가 현재 단계에 따라 추천 단계 (예시)
    target_step_id = min(current_step_id + 1, 3)
    target_step = next((s for s in USER_JOURNEY_DATA if s.step_id == target_step_id), None)

    recommended_plan_id = target_step.recommended_plan or available_plans[-1].plan_id
    
    return {
        "recommendation": f"{target_step.title} 단계에서 예산 범위 내 추천 플랜은 다음과 같습니다.",
        "budget": budget,
        "recommended_plan_id": recommended_plan_id,
        "details": next((p.dict() for p in PRICING_DATA if p.plan_id == recommended_plan_id), None)
    }

# --- 메인 실행 포인트 (단일 스크립트 테스트용) ---
if __name__ == "__main__":
    import uvicorn
    # 로컬 포트 8000 에서 실행 (시스템이 자동으로 결과를 출력합니다.)
    uvicorn.run(app, host="127.0.0.1", port=8000)