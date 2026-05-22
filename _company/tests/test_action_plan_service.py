import unittest
from src.services.action_plan_service import calculate_action_plan

class TestActionPlanService(unittest.TestCase):
    def test_high_loss_scenario(self):
        # Scenario 1: High Loss, requires immediate mitigation (Loss Mitigation focus)
        user_data = {"estimated_loss_cost": 50000000} # 5천만 원 손실 위험
        pain_score = 20
        result = calculate_action_plan(user_data, pain_point_score=pain_score)
        self.assertEqual(result["focus"], "Loss Mitigation (손실 최소화)")
        self.assertEqual(result["priority"], "High")
        self.assertIn("Immediate cost reduction plan", result["action"])
        self.assertIn("Positioning as insurance against potential loss of 50,000,000 KRW", result["insurance_frame"])

    def test_high_pain_scenario(self):
        # Scenario 2: High Pain Score, requires skill building (Skill Gap Filling focus)
        user_data = {"estimated_loss_cost": 1000000} # 1백만 원 손실 위험
        pain_score = 85
        result = calculate_action_plan(user_data, pain_point_score=pain_score)
        self.assertEqual(result["focus"], "Skill & Knowledge Gap Filling (역량 강화)")
        self.assertEqual(result["priority"], "Medium")
        self.assertIn("Targeted learning path", result["action"])

    def test_low_risk_scenario(self):
        # Scenario 3: Low Risk, requires Micro-Win implementation (Micro-Win focus)
        user_data = {"estimated_loss_cost": 10000} # 1만 원 손실 위험
        pain_score = 30
        result = calculate_action_plan(user_data, pain_point_score=pain_score)
        self.assertEqual(result["focus"], "Micro-Win Implementation (마이크로 성공)")
        self.assertEqual(result["priority"], "Low")
        self.assertIn("Implement a small, achievable action step", result["action"])
        self.assertNotIn("insurance_frame", result) # Low risk means less emphasis on insurance framing

    def test_missing_data_scenario(self):
        # Scenario 4: Missing Pain Point Score (Should use default logic)
        user_data = {"estimated_loss_cost": 50000}
        result = calculate_action_plan(user_data, pain_point_score=None)
        self.assertEqual(result["focus"], "Micro-Win Implementation (마이크로 성공)")
        self.assertIn("Focus on growth and opportunity", result["insurance_frame"])

if __name__ == '__main__':
    unittest.main()