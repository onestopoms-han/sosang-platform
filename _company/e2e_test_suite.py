import json
import pytest
from roi_calculator import calculate_roi # 가정: roi_calculator.ts에서 export된 함수를 임포트한다고 가정

# Mock 데이터 로드 (실제 환경에서는 파일 경로에 따라 수정 필요)
MOCK_DATA_PATH = "mock_data.json"

@pytest.fixture(scope="session")
def mock_data():
    with open(MOCK_DATA_PATH, 'r') as f:
        return json.load(f)

def test_roi_calculation_integrity(mock_data):
    """
    모의 데이터를 사용하여 ROI 계산 로직이 데이터 무결성을 유지하는지 검증합니다.
    MVP 1의 핵심인 ROI 시뮬레이션 기능에 대한 E2E 테스트입니다.
    """
    print("--- ROI Calculation Integrity Test Start ---")

    # 사용자별 ROI 검증
    for scenario in mock_data.get("mock_roi_scenario", []):
        user_id = scenario["user_id"]
        input_data = scenario["input_data"]
        expected_result = scenario["expected_roi_multiplier"]

        # 1. 실제 계산 수행 (가정: calculate_roi 함수 사용)
        try:
            actual_roi = calculate_roi(input_data) # 이 함수는 roi_calculator.ts에 정의되어 있어야 함
            print(f"User {user_id}: Actual ROI calculated is {actual_roi}")

            # 2. 결과 검증 (오차 범위 내에서 확인)
            # 실제 계산 로직의 복잡성에 따라 오차 범위를 설정해야 하지만, 여기서는 단순 비교로 시작
            assert actual_roi == expected_result, f"ROI Mismatch for {user_id}: Expected {expected_result}, Got {actual_roi}"
            print(f"✅ User {user_id} ROI Test Passed.")

        except Exception as e:
            pytest.fail(f"ROI calculation failed for {user_id}: {e}")


    # 데이터 존재 여부 검증
    assert len(mock_data.get("mock_user_data", [])) > 0, "Mock User Data is missing."
    print("✅ Mock Data Structure Integrity Check Passed.")

    print("--- ROI Calculation Integrity Test Complete ---")


def test_data_availability():
    """모의 데이터셋이 성공적으로 로드되었는지 확인합니다."""
    try:
        with open(MOCK_DATA_PATH, 'r') as f:
            data = json.load(f)
        assert "mock_user_data" in data and "mock_roi_scenario" in data
        print("✅ Mock Data File Loaded Successfully.")
    except FileNotFoundError:
        pytest.fail(f"Mock Data file {MOCK_DATA_PATH} not found.")


# E2E 테스트 실행 명령 (실제 환경에서 py 실행)
# 이 코드는 실제 파일 시스템에 존재한다고 가정하고, 필요한 경우 실제 run_command로 실행되도록 설계합니다.
print("E2E Test Script Ready for Execution.")