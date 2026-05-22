# 이 파일은 이전 세션에서 생성된 것으로 가정하고, 임시로 구조만 정의합니다.
from pydantic import BaseModel, Field
import datetime

class EventLogSchema(BaseModel):
    """
    [데이터 계약서] 모든 이벤트 로깅의 기본 스키마. 
    이 구조를 벗어나는 데이터는 시스템에서 무시하거나 경고해야 함.
    """
    timestamp: datetime.datetime = Field(description="이벤트가 발생한 정확한 시간")
    event_type: str = Field(description="이벤트의 유형 (e.g., view, search, purchase)")
    category: str = Field(description="세부 카테고리 (e.g., product_page, payment, keyword)")
    user_id: int | None = Field(default=None, description="사용자 고유 ID")
    metadata: dict[str, Any] = Field(default_factory=dict, description="추가 메타데이터 (예: 검색어, 상품 ID)")

# 이 파일이 존재한다는 가정 하에 diagnosis_service.py를 작성했습니다.