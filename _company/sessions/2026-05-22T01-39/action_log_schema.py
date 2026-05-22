from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class ActionLog(BaseModel):
    event_id: str
    user_id: int
    event_type: str
    variation_group: Literal["Control", "VariationB"]
    timestamp: datetime
    metadata: dict = {}

# 이 스키마를 기반으로 로그 저장 로직을 구현할 예정입니다.