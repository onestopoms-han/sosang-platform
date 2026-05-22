import unittest
from unittest.mock import patch, MagicMock
import json
from src.api.v1.diagnosis_service import diagnose_loss_minimization
from src.models.event_log_schema import EventLogSchema # 데이터 계약 참조

# 실제 테스트 환경을 시뮬레이션하기 위한 Mock 데이터 및 Schema 정의 (실제 통합 과정에서 사용)
MOCK_EVENT_LOG_SCHEMA = EventLogSchema.model_json_schema() # 모델에서 JSON Schema를 가져온다고 가정

class TestDiagnosisService(unittest.TestCase):
    def setUp(self):
        # API 호출에 필요한 Mock 데이터 설정
        self.mock_input = {
            "producer_data": {"location": "Seoul", "product_type": "Local Goods"},
            "performance_metrics": {"sales_volume": 100, "customer_satisfaction": 95}
        }
        self.mock_output = {
            "diagnosis": "High Potential",
            "recommendation": "Focus on local market penetration.",
            "loss_minimization_score": 0.85
        }

    @patch('src.api.v1.diagnosis_service.validate_input_schema') # 가상의 유효성 검사 함수를 패치한다고 가정
    def test_successful_diagnosis_and_validation(self, mock_validate):
        # 1. 입력 데이터의 JSON Schema 유효성 검증 시뮬레이션 (데이터 계약 검증 루프 시작)
        mock_validate.return_value = True # 성공적으로 통과 가정

        # 2. API 호출 및 결과 확인
        result = diagnose_loss_minimization(self.mock_input)
        
        self.assertIn("diagnosis", result)
        self.assertEqual(result["loss_minimization_score"], 0.85)
        
        # 데이터 계약 검증 성공 확인 (실제로는 validate_input_schema가 이 단계에서 실패해야 함)
        self.assertTrue(result["diagnosis"] in ["High Potential", "Medium Potential", "Low Potential"])

    def test_validation_failure_handling(self):
        # 데이터 무결성 실패 시나리오 테스트 (Negative Testing)
        invalid_input = {
            "producer_data": {"location": "InvalidCity"}, # 유효하지 않은 값 삽입
            "performance_metrics": {"sales_volume": -10, "customer_satisfaction": 105} # 음수 및 범위를 벗어난 값 삽입
        }

        # 실제 서비스 로직이 이 실패를 어떻게 처리하는지 검증 (Loss Minimization의 핵심)
        with self.assertRaises(ValueError) as cm: # 유효성 검사 실패 시 ValueError가 발생한다고 가정
            diagnose_loss_minimization(invalid_input)
        
        self.assertIn("Input validation failed", str(cm.exception))

if __name__ == '__main__':
    unittest.main()