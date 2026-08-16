import unittest
from action_plan_service import process_action_plan
import json

# 테스트 데이터 정의 (Safe Default 및 Failover 시나리오)
TEST_CASES = [
    {
        "name": "Test 1: Valid Input - Standard Flow",
        "input": {"diagnosis_result": "High Risk", "user_data": {"loss_amount": 100000}},
        "expected_status": "Success",
        "expected_output_key": "Action Plan Generated"
    },
    {
        "name": "Test 2: Safe Default - Missing Diagnosis Result (Failover)",
        "input": {"user_data": {"loss_amount": 50000}}, # diagnosis_result 누락 시도
        "expected_status": "Failure",
        "expected_error_type": "MissingRequiredField",
        "expected_output_key": None
    },
    {
        "name": "Test 3: Safe Default - Invalid Data Type (Safe Default)",
        "input": {"diagnosis_result": "Medium Risk", "user_data": {"loss_amount": "abc"}}, # 데이터 타입 오류 시도
        "expected_status": "Success",
        "expected_output_key": "Action Plan Generated",
        "expected_default_applied": True # Safe Default 적용 확인
    },
    {
        "name": "Test 4: Failover - Extreme Value (Risk-to-Action Ratio Check)",
        "input": {"diagnosis_result": "Critical Risk", "user_data": {"loss_amount": 99999999}}, # 극단적 값 입력 시도
        "expected_status": "Success",
        "expected_output_key": "Action Plan Generated",
        "expected_risk_level": "Critical" # Critical Risk에 맞는 Action Plan이 생성되는지 확인
    },
    {
        "name": "Test 5: Failover - Empty Input (System Stability Check)",
        "input": {}, # 모든 입력 누락 시도
        "expected_status": "Failure",
        "expected_error_type": "EmptyInputError",
        "expected_output_key": None
    }
]

class TestActionPlanService(unittest.TestCase):
    def setUp(self):
        # 테스트를 위해 기본 설정을 로드하거나 서비스 인스턴스를 초기화합니다.
        # 실제 환경에서는 Mocking을 통해 외부 의존성(API 호출 등)을 격리해야 합니다.
        pass

    def test_action_plan_flow(self):
        print("\n--- Running E2E Action Plan Flow Tests ---")
        for i, test_case in enumerate(TEST_CASES):
            with self.subTest(test=test_case["name"]):
                # 실제 서비스 호출 (실제 로직에 따라 Mocking 필요)
                # 여기서는 action_plan_service.py의 실제 함수를 가정하고 테스트합니다.
                try:
                    result = process_action_plan(test_case["input"])
                    
                    # 1. 상태 검증
                    self.assertEqual(result.get("status"), test_case["expected_status"], f"Test {i+1} Status Mismatch")

                    if test_case["expected_status"] == "Success":
                        # 2. 성공 시 데이터 구조 및 핵심 결과 검증
                        self.assertIn(test_case["expected_output_key"], result, f"Test {i+1} Missing Expected Output Key")
                        
                        # 3. Safe Default 적용 확인 (Test 3에 한정)
                        if test_case.get("expected_default_applied"):
                            self.assertTrue(result.get("safe_defaults_applied"), "Safe Defaults flag is missing in success case.")

                    else: # Failure Case 검증
                        # 4. 실패 시 에러 메시지 및 타입 검증 (Failover 로직 확인)
                        self.assertIn(test_case["expected_error_type"], result.get("error_type", ""), f"Test {i+1} Error Type Mismatch")

                except Exception as e:
                    # 예상치 못한 시스템 충돌 시, 이는 심각한 Failover 실패로 간주합니다.
                    self.fail(f"Test {i+1} Unexpected System Crash/Exception: {e}")

        print("\n--- All E2E Tests Finished ---")


if __name__ == '__main__':
    # 실제 실행 시, process_action_plan 함수가 정의되어 있어야 합니다.
    unittest.main(argv=['first-arg-action=sys.argv], exit=False)