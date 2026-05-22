import pytest
from unittest.mock import MagicMock
from services.local_connection_service import LocalConnectionService
from services.schemas.local_connection_schema import ContextualQuerySchema, UserContextSchema

@pytest.fixture(scope="module")
def local_service():
    """로컬 연결 서비스 인스턴스를 테스트 환경에 주입합니다."""
    return LocalConnectionService()

# --- 🟢 Happy Path Test (KPI 목표치 검증) ---
def test_local_connection_success_and_kpi_validation(local_service):
    """
    [테스트 케이스 1] 정상 작동 시, 최소 추천 개수 및 CTA 메시지 유무를 확인한다.
    핵심 KPI: 성공적인 '발견 동기 부여' 여부를 검증해야 한다.
    """
    # 가상의 성공적 쿼리 데이터 설정 (실제 위치 데이터를 사용한다고 가정)
    mock_user_context = UserContextSchema(
        user_id="test_user_123", 
        current_lat=37.5665, 
        current_lon=126.9780, 
        search_query="맛집"
    )
    mock_query = ContextualQuerySchema(
        user_context=mock_user_context, 
        proximity_radius_km=1.0
    )

    # 서비스 실행 (가상 데이터 사용으로 인해 실제 DB 호출은 Mocking됨)
    response = local_service.get_recommendations(mock_query)

    # 검증 로직:
    assert isinstance(response, type(local_service.get_recommendations(mock_query))) # 반환 타입 확인
    assert len(response.recommended_stores) >= 3, "KPI 실패: 최소 추천 상점 개수(3개) 미달." # 비즈니스 로직 검증
    assert response.suggested_cta_message != "", "CTA 메시지 필수 필드 누락." # UX/메시징 검증

# --- 🟡 Edge Case Test (손실 방지 및 경계값 검증) ---
def test_local_connection_failure_scenario(local_service):
    """
    [테스트 케이스 2] 상점을 찾을 수 없는 경우, 시스템이 크래시되지 않고 안전한 메시지를 반환하는지 확인한다.
    핵심 KPI: 사용자 경험의 손실 최소화 (Fail Gracefully).
    """
    # 가상의 실패 쿼리 데이터 설정 (존재하지 않는 위치)
    mock_user_context = UserContextSchema(
        user_id="test_fail_user", 
        current_lat=0.0, 
        current_lon=0.0, 
        search_query=None
    )
    # 매우 넓은 반경을 설정하여 강제로 로직 내부의 예외 발생 지점을 건드립니다.
    mock_query = ContextualQuerySchema(
        user_context=mock_user_context, 
        proximity_radius_km=50.0
    )

    # 서비스 실행 (Mocking된 _mock_fetch_and_process_data가 실패할 수 있도록 가이드)
    with pytest.raises(Exception) as excinfo:
        local_service.get_recommendations(mock_query)

    assert "주변 상점을 찾을 수 없습니다" in str(excinfo.value), "예외 처리 로직이 정의된 메시지를 반환하지 못함."


# --- 🔴 Negative Test (데이터 무결성 검증) ---
def test_local_connection_data_integrity_check(local_service):
    """
    [테스트 케이스 3] 입력 데이터 스키마 유효성 검사 실패 시, 서비스가 적절히 에러를 포착하는지 확인한다.
    핵심 KPI: 시스템 무결성 및 신뢰도 확보 (Data Contract Adherence).
    """
    # 경계값 초과 또는 필수 필드 누락을 가정하여 쿼리를 만듭니다.
    invalid_mock_user_context = UserContextSchema(
        user_id="bad_data", 
        current_lat=100.0, # 위도 범위 초과 (Max 90)
        current_lon=126.9780, 
        search_query="테스트"
    )
    invalid_mock_query = ContextualQuerySchema(
        user_context=invalid_mock_user_context, 
        proximity_radius_km=-5.0 # 거리 범위 초과 (Min 0.1)
    )

    # 스키마 유효성 검사 실패는 파이썬 레벨에서 포착되어야 합니다.
    with pytest.raises(Exception) as excinfo:
         local_service.get_recommendations(invalid_mock_query)
    
    assert "스키마 유효성 검증 실패" in str(excinfo.value), "입력 데이터 스키마 검증(Pydantic validation)이 제대로 작동하지 않음."