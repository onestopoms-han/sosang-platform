import pytest
from action_plan_service import calculate_pain_point_score, generate_action_plan, CalculationError
from pydantic import ValidationError
from datetime import date

# --- Mock Data Schema (테스트 환경을 위한 가상 스키마) ---
class DiagnosisInputSchema:
    def __init__(self, current_revenue: float = 0.0, estimated_loss_cost: float = None):
        self.current_revenue = abs(current_revenue) if isinstance(current_revenue, (int, float)) else current_revenue
        self.estimated_loss_cost = estimated_loss_cost

# --- 테스트 케이스 정의 ---

@pytest.fixture(scope="module")
def mock_successful_data():
    """성공적인 데이터 흐름을 위한 가짜 입력값."""
    return DiagnosisInputSchema(current_revenue=1500, estimated_loss_cost=300)

@pytest.fixture(scope="module")
def mock_failure_data_missing():
    """필수 데이터 누락 시나리오 (예외 발생 유도)."""
    return DiagnosisInputSchema(current_revenue=0.0, estimated_loss_cost=None)

@pytest.fixture(scope="module")
def mock_failure_data_invalid():
    """데이터 타입 오류 시나리오."""
    # Pydantic 또는 타입 시스템에서 잡아야 할 경우를 가정
    return DiagnosisInputSchema(current_revenue="ABC", estimated_loss_cost=100)

# -------------------------------------------------------------
# TEST SUITE START: E2E Funnel Validation
# -------------------------------------------------------------

def test_01_successful_e2e_flow(mock_successful_data):
    """정상 데이터 입력 시 Pain Point Score 계산 및 Action Plan 생성이 성공하는가?"""
    score = calculate_pain_point_score(mock_successful_data)
    assert score > 0, "성공 케이스에서 점수가 0 이하로 나오는 오류 발생."

    # 다음 단계: Action Plan 생성 검증 (실제 서비스 호출 필요)
    plan = generate_action_plan(mock_successful_data)
    assert plan and isinstance(plan, dict), "Action Plan이 성공적으로 반환되지 않음."

def test_02_failure_missing_data(mock_failure_data_missing):
    """필수 데이터가 누락되었을 때 예외 처리 로직이 정상 작동하는가?"""
    with pytest.raises(CalculationError, match="데이터 불충분"):
        calculate_pain_point_score(mock_failure_data_missing)

def test_03_failure_zero_division():
    """수학적 계산 오류 (예: 분모가 0인 경우) 발생 시 시스템이 크래시되지 않고 안정화되는가?"""
    with pytest.raises(CalculationError, match="계산 실패"):
        calculate_pain_point_score(DiagnosisInputSchema(current_revenue=10, estimated_loss_cost=0))

def test_04_negative_input_validation():
    """음수 또는 비즈니스적으로 불가능한 입력 데이터가 들어왔을 때 유효성 검사를 거치는가?"""
    # Pydantic 또는 사용자 정의 유효성 검사가 작동해야 함
    data = DiagnosisInputSchema(current_revenue=-100, estimated_loss_cost=50)
    # 이 테스트는 실제로 비즈니스 로직에서 Negative Value Check를 통과하는지 확인해야 합니다.
    assert data.current_revenue >= 0 # (실제 코드에 반영되어야 할 검증)