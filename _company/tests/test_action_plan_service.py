<![
import unittest
from unittest.mock import MagicMock
from src.services.action_plan_service import generate_action_plan

class TestActionPlanService(unittest.TestCase):
    def setUp(self):
        # Mocking dependencies if necessary, assuming data schema is passed directly for this test scope
        pass

    def test_generate_action_plan_with_premium_tier(self):
        # Premium Tier에 따른 Action Plan 생성 로직 검증 (Pain Point 기반)
        user_data = {
            "business_type": "Restaurant",
            "pain_points": ["경제적 위협", "운영 효율성 저하"],
            "target_goal": "매출 30% 증가",
            "pricing_tier": "Premium"
        }
        
        # 예상되는 결과: Premium은 더 구체적인 '맞춤형 Action Plan 템플릿'을 생성해야 함.
        result = generate_action_plan(user_data, "Premium")
        
        self.assertIn("ActionPlanTemplate", result, "결과에 ActionPlanTemplate이 포함되어야 함.")
        self.assertIn("FocusArea: Operational Efficiency", result["ActionPlanDetails"].get("FocusArea"), "Premium 티어는 운영 효율성에 초점을 맞춰야 함.")
        self.assertTrue(result["ROI_Simulation"].get("estimated_roi", 0) > 0, "프리미엄은 ROI 시뮬레이션이 양수여야 함.")

    def test_generate_action_plan_with_basic_tier(self):
        # Basic Tier에 따른 Action Plan 생성 로직 검증 (Pain Point 기반)
        user_data = {
            "business_type": "Retail",
            "pain_points": ["미래 성장 불확실성"],
            "target_goal": "신규 고객 확보",
            "pricing_tier": "Basic"
        }
        
        result = generate_action_plan(user_data, "Basic")
        
        self.assertIn("ActionPlanTemplate", result, "결과에 ActionPlanTemplate이 포함되어야 함.")
        self.assertIn("FocusArea: Customer Acquisition", result["ActionPlanDetails"].get("FocusArea"), "Basic 티어는 고객 확보에 초점을 맞춰야 함.")
        self.assertTrue(result["ROI_Simulation"].get("estimated_roi", 0) > 0, "기본도 ROI 시뮬레이션이 양수여야 함.")

if __name__ == '__main__':
    unittest.main()
"/>