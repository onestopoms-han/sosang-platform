# 🚀 BDS 플랫폼 — Trust Widget & PainGauge 백엔드 API 스텍 명세서 (V1.0)

## 1. 개요
이 문서는 소상공인플렛폼의 핵심 기능인 **Trust Widget** (신뢰도 지표) 과 **PainGauge** (위험도 시각화) 의 백엔드 API 구조를 정의합니다. 디자인 스펙 V4.1 의 색상, 메시지 로직을 데이터 모델에 직접 반영하여 프론트엔드 연동 시 일관된 경험을 제공합니다.

## 2. API 엔드포인트 및 기능
- **GET /api/v1/health** — 서비스 상태 체크 (모니터링용)
- **POST /api/v1/trust-data** — 신뢰도 데이터 수집 (외부 소스, 사용자 입력 연동)
- **POST /api/v1/pain-gauge-input** — PainGauge 위험도 데이터 입력
- **GET /api/v1/pain-gauge-status** — 현재 위험도 상태 및 메시지 로직 확인

## 3. 데이터 모델 (Pydantic Schemas)

### TrustWidgetDataSchema
```python
class TrustWidgetData(BaseModel):
    trust_score: float  # 신뢰도 점수 (0~100)
    confidence_level: Literal["low", "medium", "high"]
    source: str  # 데이터 출처 (API, 사용자 입력 등)
    timestamp: datetime

# V4.1 색상 매핑
trust_color_map = {
    "low": "#FF5722",   # Deep Red (신뢰 부족 시 경고)
    "medium": "#FFC107", # Orange (주의)
    "high": "#4CAF50"    # Growth Green (신뢰 확보)
}
```

### PainGaugeDataSchema
```python
class PainGaugeData(BaseModel):
    pain_score: float  # 위험도 점수 (0~100)
    risk_level: Literal["safe", "warning", "critical"]
    message_type: str  # V4.1 메시지 타입
    # V4.1 메시지 로직
    # safe: "안녕하세요, 현재 상태는 안정적입니다."
    # warning: "주의가 필요합니다. 다음 단계를 확인하세요."
    # critical: "긴급 조치가 필요합니다. 즉시 대응해 주세요."

# V4.1 색상 매핑
pain_color_map = {
    "safe": "#2E7D32",   # Deep Blue 기반의 안정 색상
    "warning": "#FF9800", # Orange (주의)
    "critical": "#D50000" # Red (긴급)
}
```

## 4. 로직 및 비즈니스 규칙
- **신뢰도 계산**: 외부 데이터 (API, 사용자 입력) 와 내부 분석 결과를 가중치 평균으로 합산.
- **위험도 평가**: PainGauge 점수 범위 (0~25: Safe, 26~70: Warning, 71~100: Critical) 에 따라 메시지 및 색상 변경.
- **메시지 로직**: V4.1 가이드라인에 따른 공감적 메시지 삽입 (불안감 해소).

## 5. API 응답 형식 예시
```json
{
  "trust_widget": {
    "score": 82,
    "color": "#4CAF50",
    "message": "신뢰도가 높습니다."
  },
  "pain_gauge": {
    "score": 35,
    "risk_level": "warning",
    "color": "#FF9800",
    "message": "주의가 필요합니다. 다음 단계를 확인하세요."
  }
}
```

## 6. 구현 계획
1. **FastAPI** 기반 API 서버 구축 (Pydantic v2 통합).
2. 데이터 수집 및 분석 파이프라인의 초기 로직 구현.
3. V4.1 색상 매핑 및 메시지 로직을 데이터 모델에 직접 포함.
4. 프론트엔드 컴포넌트 (`TrustWidget`, `PainGauge`) 와의 연동 테스트 케이스 준비.

---
_생성일: 2026-06-15T00-02 | 작성자: 코다리 (시니어 풀스택 엔지니어)_


✅ **명세 완료**: API 스텍 명세서 (`trust_widget_pain_gauge_api_spec_v1.md`) 를 생성했습니다. 이제 이 명세를 기반으로 초기 백엔드 구조 (FastAPI + Pydantic) 와 핵심 로직을 구현하겠습니다.

📂 **초기 백엔드 코드**를 `sessions/2026-06-15T00-02/backend_initial_structure.py` 로 생성합니다.


<create_file path="sessions/2026-06-15T00-02/backend_initial_structure.py">
# 🚀 BDS 플랫폼 — Trust Widget & PainGauge 백엔드 초기 구조 (FastAPI + Pydantic v2)
# V4.1 디자인 스펙과 비즈니스 로직이 직접 반영됨

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, validator
from typing import Literal, Optional
from datetime import datetime
import json

app = FastAPI(title="BDS 플랫폼 API", version="1.0")

# ==================== V4.1 디자인 스펙 매핑 (모델에 직접 포함) ====================
TRUST_COLOR_MAP: dict[str, str] = {
    "low": "#FF5722",   # Deep Red
    "medium": "#FFC107",
    "high": "#4CAF50"   # Growth Green
}

PAIN_COLOR_MAP: dict[str, str] = {
    "safe": "#2E7D32",  # Deep Blue 기반 안정 색상
    "warning": "#FF9800",
    "critical": "#D50000"
}

TRUST_MESSAGE_MAP: dict[float, str] = {
    (0, 40): "신뢰도가 낮습니다. 추가 정보를 입력해주세요.",
    (41, 70): "신뢰도가 중평입니다. 현재 상태를 모니터링하고 있습니다.",
    (71, 100): "신뢰도가 높습니다."
}

PAIN_MESSAGE_MAP: dict[tuple[float, float], str] = {
    (0, 25): "안녕하세요, 현재 상태는 안정적입니다.",
    (26, 70): "주의가 필요합니다. 다음 단계를 확인하세요.",
    (71, 100): "긴급 조치가 필요합니다. 즉시 대응해 주세요."
}

# ==================== Pydantic Schemas ====================
class TrustWidgetData(BaseModel):
    trust_score: float = Field(ge=0, le=100)
    confidence_level: Literal["low", "medium", "high"]
    source: str
    timestamp: datetime = Field(default_factory=datetime.now)

    @validator("confidence_level")
    def validate_confidence(cls, v):
        if v == "low": return "low"
        elif v == "medium": return "medium"
        elif v == "high": return "high"
        else: raise ValueError("Invalid confidence level")

class PainGaugeData(BaseModel):
    pain_score: float = Field(ge=0, le=100)
    risk_level: Literal["safe", "warning", "critical"]
    message_type: Optional[str] = None  # V4.1 메시지 타입 (선택적)

# ==================== API Endpoints ====================
@app.get("/api/v1/health")
def health_check():
    """서비스 상태 체크 (모니터링용)"""
    return {"status": "healthy", "version": "1.0", "timestamp": datetime.now().isoformat()}

@app.post("/api/v1/trust-data")
def submit_trust_data(data: TrustWidgetData):
    """신뢰도 데이터 수집"""
    # V4.1 색상 로직 적용
    color = TRUST_COLOR_MAP.get(data.confidence_level, "#FFC107")  # 기본값 Orange (주의)
    message = TRUST_MESSAGE_MAP[(data.trust_score, 100)] or "신뢰도 데이터를 저장했습니다."
    
    return {
        "status": "success",
        "trust_data": data.dict(),
        "color": color,
        "message": message
    }

@app.post("/api/v1/pain-gauge-input")
def submit_pain_gauge(data: PainGaugeData):
    """PainGauge 위험도 데이터 입력"""
    # V4.1 색상 및 메시지 로직 적용
    color = PAIN_COLOR_MAP.get(data.risk_level, "#FFC107")  # 기본값 Orange (주의)
    message_type = data.message_type or "default"
    
    return {
        "status": "success",
        "pain_gauge_data": data.dict(),
        "color": color,
        "message": f"PainGauge 데이터를 처리했습니다. Risk Level: {data.risk_level}"
    }

@app.get("/api/v1/pain-gauge-status")
def get_pain_gauge_status(risk_level: Literal["safe", "warning", "critical"] = "safe"):
    """현재 위험도 상태 및 메시지 로직 확인"""
    # V4.1 메시지 로직 적용 (예시)
    message = PAIN_MESSAGE_MAP[(0, 25)] if risk_level == "safe" else \
              PAIN_MESSAGE_MAP[(26, 70)] if risk_level == "warning" else \
              PAIN_MESSAGE_MAP[(71, 100)]
    
    return {
        "risk_level": risk_level,
        "color": PAIN_COLOR_MAP.get(risk_level, "#FFC107"),
        "message": message
    }

# ==================== 테스트용 엔드포인트 (Self-RAG 검증용) ====================
@app.get("/api/v1/test-schema")
def test_schema():
    """Pydantic Schema 정의 확인"""
    return {
        "trust_color_map": TRUST_COLOR_MAP,
        "pain_color_map": PAIN_COLOR_MAP,
        "message_maps_available": True
    }

if __name__ == "__main__":
    import uvicorn
    # 로컬 테스트 환경 (FastAPI + Uvicorn)
    uvicorn.run("backend_initial_structure:app", host="localhost", port=8000, reload=True)