import unittest
from unittest.mock import MagicMock, Mock
from datetime import datetime
from pydantic import ValidationError

# 실제 모듈 임포트 (경로 확인 필요)
from src.services.action_plan_service import ActionPlanService, RoiResult, GaugeUpdate, PremiumTrigger 

class TestActionPlanService(unittest.TestCase):
    def setUp(self):
        """테스트 시작 시마다 서비스 인스턴스와 Mock DB 세션을 설정합니다."""
        # 실제 DB 연결 대신 Mock 객체를 사용합니다.
        self.mock_db = MagicMock()
        self.service = ActionPlanService(self.mock_db)

    def test_calculate_roi_successful(self):
        """ROI 계산 로직이 올바르게 작동하는지 확인합니다."""
        user_id = "user123"
        # ROI 계산에 필요한 최소한의 데이터 입력 (실제 비즈니스 로직 가정)
        action_data = {
            'time_spent': 5,  # 시간
            'cost_incurred': 100, # 비용
            'platform_value': 300 # 플랫폼 가치
        }
        
        result = self.service.calculate_roi(user_id, action_data)
        
        self.assertIsInstance(result, RoiResult)
        # 계산된 ROI 값의 범위 및 논리적 흐름 검증 (실제 비즈니스 로직과 일치해야 함)
        self.assertGreaterEqual(result.roi_value, -10.0) 
        self.assertIn(result.risk_level, ["Low", "Medium", "High"])

    def test_calculate_roi_missing_data(self):
        """필수 데이터가 누락되었을 때 예외 처리가 되는지 확인합니다."""
        user_id = "user123"
        action_data = {
            'time_spent': 5,
            # cost_incurred 또는 platform_value 누락
        }

        with self.assertRaisesRegex(ValueError, "ROI 계산을 위해 time_spent, cost_incurred, platform_value 데이터가 누락되었습니다."):
            self.service.calculate_roi(user_id, action_data)
            
    def test_update_gauge_successful(self):
        """게이지 업데이트 로직이 성공적으로 기록되는지 확인합니다."""
        user_id = "user456"
        action_type = "Consulting"
        roi_achieved = 60.0 # 높은 ROI 가정
        
        # Mock DB의 commit 호출을 예상
        self.mock_db.session.commit.return_value = None

        result = self.service.update_gauge(user_id, action_type, roi_achieved)
        
        self.assertIsInstance(result, GaugeUpdate)
        self.assertEqual(result.action_type, action_type)
        # 점수 증가 로직 검증 (예시: 50 + 60*20 = 620 -> min 100)
        self.assertLessEqual(result.progress_score, 100.0)

    def test_trigger_premium_success(self):
        """충분한 조건 만족 시 프리미엄 전환이 성공적으로 이루어지는지 확인합니다."""
        user_id = "premium_user"
        reason = "고급 실행 로드맵 필요"
        current_status = "Execution"
        justification = {"roi_achieved": 75.0, "platform_value": 500}

        # DB 커밋이 성공해야 함을 Mock 설정
        self.mock_db.session.commit.return_value = None

        result = self.service.trigger_premium(user_id, reason, current_status, justification)
        
        self.assertTrue(result)
        # 실제 DB에 PremiumTrigger가 추가되었는지 확인 (Mock 호출 검증)
        self.mock_db.session.add.assert_called_once()

    def test_trigger_premium_failure(self):
        """충분하지 않은 조건일 때 프리미엄 전환이 실패하고 예외를 발생시키는지 확인합니다."""
        user_id = "basic_user"
        reason = "고급 실행 로드맵 필요"
        current_status = "Execution"
        justification = {"roi_achieved": 30.0, "platform_value": 100} # ROI가 낮음

        # 권한 오류 발생을 예상
        with self.assertRaisesRegex(PermissionError, "프리미엄 전환 조건\(ROI > 50% 달성\)이 충족되지 않았습니다."):
            self.service.trigger_premium(user_id, reason, current_status, justification)

if __name__ == '__main__':
    unittest.main()