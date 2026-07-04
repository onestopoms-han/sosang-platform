from pydantic import BaseModel, Field, conlist, constr
from typing import List, Optional

# --- Input Schema (클라이언트가 보낼 정보) ---
class UserContextSchema(BaseModel):
    """사용자의 현재 위치 및 행동 컨텍스트를 정의하는 스키마."""
    user_id: str = Field(..., description="로그인한 사용자 고유 ID")
    current_lat: float = Field(..., ge=-90, le=90) # 위도 범위 검증
    current_lon: float = Field(..., ge=-180, le=180) # 경도 범위 검증
    search_query: Optional[str] = Field(None, description="사용자가 직접 검색한 키워드 (예: 커피, 숙제)")

class ContextualQuerySchema(BaseModel):
    """'지역 연결' 로직에 필요한 핵심 쿼리 파라미터."""
    user_context: UserContextSchema
    proximity_radius_km: float = Field(..., gt=0.1, description="추천할 반경 (최소 0.1km 이상)")

# --- Output Schema (백엔드가 클라이언트에 보낼 결과) ---
class StoreInfoSchema(BaseModel):
    """단일 상점의 핵심 정보."""
    store_id: str = Field(..., description="상점 고유 식별자")
    name: str = Field(..., max_length=50, description="가게 이름")
    category: str = Field(..., description="주요 카테고리 (예: 카페, 미용실)")
    distance_km: float = Field(..., ge=0.1) # 0은 오류 처리 필요
    # '지역 연결'에 특화된 필드: 고객의 심리를 자극할 스토리텔링 요약
    storytelling_hook: str = Field(..., max_length=100, description="잠재 고객의 행동 유도 문구")

class LocalRecommendationResponseSchema(BaseModel):
    """'지역 연결' 기능 전체 API 응답 구조."""
    recommended_stores: conlist(StoreInfoSchema, min_length=3, max_length=15) # 최소 3개 추천 필수
    suggested_cta_message: str = Field(..., description="사용자에게 보여줄 핵심 행동 유도 메시지 (Loss Minimization 기반)")