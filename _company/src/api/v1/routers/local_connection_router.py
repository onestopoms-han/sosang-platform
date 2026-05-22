from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List
import logging

# 로깅 설정 (로그 추적은 필수)
logger = logging.getLogger(__name__)

# --------------------------------------------------
# [1] 데이터 모델 정의 (Input/Output Schema)
# 스키마는 services/schemas에서 가져오는 것이 원칙이나, 여기서는 편의상 재정의합니다.
class ConnectionRequest(BaseModel):
    """지역 연결 정보를 요청하는 표준화된 입력 모델."""
    source_store_id: str  # 지역 상점 고유 ID (예: 12345)
    target_category: str # 목표 카테고리 (예: 식당, 미용실 등)
    search_radius_km: float = 1.0

class ConnectionResponse(BaseModel):
    """API 응답으로 제공되는 지역 연결 정보의 표준화된 모델."""
    success: bool
    message: str
    results: List[dict] # 실제 데이터는 리스트 형태로 반환

# 라우터 초기화
local_connection_router = APIRouter(prefix="/v1/local-connections", tags=["Local Connection"])

@local_connection_router.post("/", response_model=ConnectionResponse)
async def get_local_connections(request: ConnectionRequest):
    """
    요청된 기준과 범위 내에서 최적의 지역 연결 상점 목록을 검색합니다.
    [근거: 코다리 개인 메모리 - Local Connection 기능 구현]
    """
    logger.info(f"Processing local connection request for {request.source_store_id} targeting {request.target_category}")

    try:
        # 🚨 핵심 서비스 레이어 호출 (실제 비즈니스 로직)
        # 이 부분에서 service 계층의 유효성 검사 및 예외 처리가 동작해야 함.
        from src.services.local_connection_service import LocalConnectionService
        
        service = LocalConnectionService()
        
        if not service.validate_request(request):
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="잘못된 요청 데이터입니다.")

        # 서비스 로직 호출 (가정: 실제 데이터를 가져오는 메서드)
        results = service.find_best_matches(
            source_id=request.source_store_id, 
            category=request.target_category, 
            radius=request.search_radius_km
        )

        if not results:
            return ConnectionResponse(success=False, message="검색 조건에 맞는 지역 연결 상점을 찾을 수 없습니다.", results=[])
        
        # 성공적으로 데이터가 검색되었음을 알림
        return ConnectionResponse(
            success=True, 
            message="최적의 지역 연결 상점 목록을 성공적으로 반환했습니다.", 
            results=results
        )

    except HTTPException as e:
        # FastAPI 예외 처리 (4xx)
        raise e
    except Exception as e:
        logger.error(f"Critical error during local connection retrieval: {e}")
        # 시스템 내부 오류는 사용자에게 최소한의 정보만 제공해야 함.
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="시스템 처리 중 알 수 없는 오류가 발생했습니다.")