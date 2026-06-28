<file_content>from fastapi import FastAPI
import random
from datetime import timedelta
from models import DashboardStatusResponse, TrustWidgetResponse, PainGaugeResponse

app = FastAPI(title="Trust & Pain Gauge API", version="1.0.0")

@app.get("/status")
async def get_dashboard_status():
    """신뢰도 및 위기감 상태를 반환하는 엔드포인트"""
    
    # Mock 데이터 생성 (실제 로직에서는 DB 또는 센서에서 가져옴)
    trust_score = random.uniform(60, 95)  # 신뢰도 점수 모의
    pain_level = random.uniform(15, 80)   # 위기감 점수 모의
    
    # 상태 결정 (모델 정의된 로직 적용)
    trust_state_data = determine_trust_state(trust_score)
    pain_state_data = determine_pain_state(pain_level)
    
    response = DashboardStatusResponse(
        trust_widget=TrustWidgetResponse(
            timestamp=datetime.utcnow(),
            trust_data=dict(trust_score, status=trust_state_data["status"], message=trust_state_data["message"]),
            message=f"신뢰도: {trust_score:.2f}"
        ),
        pain_gauge=PainGaugeResponse(
            timestamp=datetime.utcnow(),
            pain_data=dict(pain_level, severity=pain_state_data["severity"], message=pain_state_data["message"]),
            message=f"위기감: {pain_level:.2f}"
        )
    )
    
    return response

if __name__ == "__main__":
    import uvicorn
    # 로컬 개발 서버 실행 (8000 포트)
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
</file_content>