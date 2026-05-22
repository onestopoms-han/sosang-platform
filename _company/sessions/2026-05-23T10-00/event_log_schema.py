from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal, Optional

# --- Base Event Schema (모든 이벤트의 공통 계약) ---
class BaseEventSchema(BaseModel):
    """모든 이벤트 로깅에 필요한 기본 구조."""
    event_id: str = Field(..., description="고유한 이벤트 식별자 (UUID 권장)")
    timestamp: datetime = Field(..., description="이벤트 발생 시점 (UTC 기준)")
    user_id: Optional[str] = Field(None, description="이벤트 발생 사용자 ID (선택 사항)")
    event_type: Literal["L-CLR", "S-SCR", "KPI_UPDATE", "SYSTEM_ERROR"] = Field(..., description="이벤트 유형")
    source_module: str = Field(..., description="이벤트가 발생한 시스템 모듈")
    context: dict = Field(default_factory=dict, description="이벤트에 대한 상세 컨텍스트 데이터 (JSON 형식)")
    metadata: Optional[dict] = Field(default_factory=dict, description="추가 메타데이터 (예: 세션 ID, 장치 정보)")

# --- Specific Event Schemas ---

class LCLREventSchema(BaseEventSchema):
    """Local Click & Lead Event Schema."""
    event_type: Literal["L-CLR"] = "L-CLR"
    context: dict = Field(..., description="클릭 이벤트 관련 상세 정보")
    # 예: context = {"item_id": "xyz123", "location_context": "city"}

class SCREventSchema(BaseEventSchema):
    """Save & Share Rate Event Schema."""
    event_type: Literal["S-SCR"] = "S-SCR"
    context: dict = Field(..., description="저장/공유 이벤트 관련 상세 정보")
    # 예: context = {"action": "save", "platform": "mobile"}

class KPIUpdateSchema(BaseEventSchema):
    """KPI 업데이트 이벤트 Schema."""
    event_type: Literal["KPI_UPDATE"] = "KPI_UPDATE"
    context: dict = Field(..., description="업데이트된 핵심 지표 데이터")
    # 예: context = {"metric": "AOV", "value": 15000, "attributed_source": "local_search"}

class SystemErrorSchema(BaseEventSchema):
    """시스템 오류 이벤트 Schema."""
    event_type: Literal["SYSTEM_ERROR"] = "SYSTEM_ERROR"
    context: dict = Field(..., description="오류 상세 정보")
    # 예: context = {"error_code": 500, "module": "API_Gateway", "trace_id": "xyz"}

# --- Data Contract Registry ---
EVENT_SCHEMA_REGISTRY = {
    "L-CLR": LCLREventSchema,
    "S-SCR": SCREventSchema,
    "KPI_UPDATE": KPIUpdateSchema,
    "SYSTEM_ERROR": SystemErrorSchema,
}