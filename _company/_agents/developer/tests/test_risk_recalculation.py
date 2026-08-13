import unittest
import json
from src.risk_recalculation_api import (
    RiskRecalculationRequest, 
    RiskRecalculationResponse, 
    process_recalculation_request,
    check_ambiguity
)

class TestRiskRecalculation:(unittest.TestCase):
    
    def setUp(self):
        # 테스트에 사용할 기본 설정 (실제 DB 조회 대신 임시값 사용)
        self.base_config = {
            "penalty_rules": {"weight": 0.5},
            "thresholds": {"weight": 2.0}
        }

    def test_successful_recalculation(self):
        # 성공적인 케이스 테스트 (모호성 없음)
        test_data = {
            "item_id": "8204",
            "submitted_evidence": {
                "type": "weight",
                "value": 1.5,
                "unit": "kg"
            },
            "delta_L": 0.3,
            "reference_value": 10.0,
            "deviation_factor_config": self.base_config
        }
        
        result = process_recalculation_request(test_data)
        
        self.assertEqual(result['status'], 'Success')
        self.assertGreaterEqual(result['recalculated_risk_score'], 50.0) # 임시 기준값 대비 증가 확인
        self.assertIn('adjustment_applied', result['deviation_details'])

    def test_ambiguity_handling(self):
        # 모호성 발생 시뮬레이션 테스트 (모호성 감지 실패)
        test_data = {
            "item_id": "8204",
            "submitted_evidence": {
                "type": "weight",
                "value": 3.0, # 임계값(2.0) 초과하여 모호성 발생 시뮬레이션
                "unit": "kg"
            },
            "delta_L": 0.1,
            "reference_value": 10.0,
            "deviation_factor_config": self.base_config
        }

        result = process_recalculation_request(test_data)
        
        self.assertEqual(result['status'], 'Ambiguous')
        self.assertIn('reason', result['deviation_details'])


if __name__ == '__main__':
    unittest.main()