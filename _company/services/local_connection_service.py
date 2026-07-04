from services.schemas.local_connection_schema import ContextualQuerySchema, LocalRecommendationResponseSchema, StoreInfoSchema
from typing import List
import logging
# from database.db_connector import get_nearby_stores # 실제 DB 연결 시 주석 해제 필요

logger = logging.getLogger(__name__)

class LocalConnectionService:
    """
    소상공인의 지역적 가치를 극대화하는 '지역 연결' 추천 로직을 담당합니다.
    이 서비스는 KPI 측정을 위한 모든 데이터를 추상화하고 관리합니다.
    """
    
    def __init__(self):
        pass

    def get_recommendations(self, query: ContextualQuerySchema) -> LocalRecommendationResponseSchema:
        """
        쿼리 정보를 바탕으로 지역 추천을 수행하고, KPI 측정에 필요한 구조화된 결과를 반환합니다.
        """
        logger.info(f"Executing local recommendation for user {query.user_context.user_id} at ({query.user_context.current_lat}, {query.user_context.current_lon})")
        
        try:
            # 1. DB 호출 및 필터링 (가정)
            # raw_data = get_nearby_stores(query.user_context, query.proximity_radius_km) 
            
            # [STUB 구현]: 실제 데이터베이스/외부 API 호출을 대체하는 가상의 추천 로직 실행
            recommended_stores = self._mock_fetch_and_process_data(query)

            if not recommended_stores:
                raise ValueError("주변 상점을 찾을 수 없습니다. 반경 또는 위치를 재설정해 주세요.")

            # 2. KPI 기반 메시지 생성 (Loss Minimization 적용)
            cta_message = self._generate_loss_minimizing_cta(query, recommended_stores)

            # 3. 최종 응답 구조화 및 검증
            return LocalRecommendationResponseSchema(
                recommended_stores=recommended_stores,
                suggested_cta_message=cta_message
            )

        except ValueError as e:
            logger.error(f"Local Connection Error: {e}")
            raise Exception(str(e))
        except Exception as e:
            logger.critical(f"Critical failure in LocalConnectionService: {e}", exc_info=True)
            # 시스템 오류 시, 안전한 기본 메시지를 반환하여 서비스 중단을 막습니다. (가드 로직)
            return LocalRecommendationResponseSchema(
                recommended_stores=[], 
                suggested_cta_message="현재 추천 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요."
            )

    def _mock_fetch_and_process_data(self, query: ContextualQuerySchema) -> List['StoreInfoSchema']:
        """가상의 데이터 로직 (실제로는 Geo-spatial DB 쿼리가 들어감)."""
        if query.user_context.current_lat == 0.0 and query.user_context.current_lon == 0.0:
            return []
        # 실제 구현 시 이 부분을 전문적인 지리 정보 서비스로 대체해야 합니다.
        return [
            StoreInfoSchema(store_id="S001", name="골목 카페 '정겨움'", category="카페", distance_km=0.35, storytelling_hook="대형 프랜차이즈가 절대 따라올 수 없는, 할머니의 손맛이 느껴지는 곳."),
            StoreInfoSchema(store_id="S002", name="행복 미용실 '헤어라인'", category="미용실", distance_km=0.71, storytelling_hook="전문가가 1:1로 컨설팅해주는, 당신만을 위한 공간."),
            StoreInfoSchema(store_id="S003", name="정육점 '우리동네 식탁'", category="식품/정육", distance_km=0.52, storytelling_hook="오늘 저녁 만찬을 완성할, 최상급 숙성육을 지금 바로 만나보세요.")
        ]

    def _generate_loss_minimizing_cta(self, query: ContextualQuerySchema, stores: List['StoreInfoSchema']) -> str:
        """KPI 측정에 중요한 '행동 유도 문구'를 생성합니다."""
        # 여기에서 복합적인 로직 (예: 주변 날씨 + 요일별 취약점 분석)이 들어가야 합니다.
        return "오늘의 추천! ☕️ 지금 바로 방문하여, 지나치기 쉬운 소상공인의 진정한 가치를 경험해보세요."