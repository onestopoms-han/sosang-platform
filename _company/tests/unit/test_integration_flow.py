import unittest
from services.paywall_logic_service import analyze_loss_gauge, determine_premium_cta

# Mocking the diagnosis output schema for testing purposes
MOCK_DIAGNOSIS_SCHEMA = {
    "risk_level": "High",  # High, Medium, Low
    "core_pain_point": "자금 유동성 악화로 인한 폐업 위기", # 예시 페인 포인트
    "current_status": 0.75 # Loss Gauge 값 (0~1)
}

class TestIntegrationFlow(unittest.TestCase):
    """
    진단 결과(Diagnosis Output)가 Loss Gauge를 거쳐 Paywall CTA로 연결되는 핵심 통합 테스트 케이스 모음.
    이 테스트는 비즈니스 로직과 기술적 구현의 연결성을 검증합니다.
    """

    def test_high_risk_scenario_trigger_paywall(self):
        """
        [시나리오 1] 위험도 High (Loss Gauge > 0.8) -> 즉각적인 Paywall 유도 및 Premium CTA 제시.
        기대: Loss Gauge가 높은 임계값을 넘어서고, 가장 강력한 프리미엄 가치 제안(Premium Value Proposition)을 받아야 한다.
        """
        # 테스트 입력 데이터: 최고 수준의 위험 상태 가정
        input_data = {
            "risk_level": "High",
            "core_pain_point": "경영 악화로 인한 폐업 위기", 
            "current_status": 0.92 # 높은 손실 지표
        }
        
        # 1. Loss Gauge 분석 (Loss Gauge 로직 검증)
        loss_score = analyze_loss_gauge(input_data["core_pain_point"], input_data["current_status"])
        self.assertGreaterEqual(loss_score, 0.85, "High Risk 시나리오에서 Loss Score가 충분히 높게 계산되어야 합니다.")

        # 2. Paywall CTA 결정 (비즈니스 로직 검증)
        cta = determine_premium_cta(input_data["risk_level"], loss_score)
        self.assertEqual(cta["type"], "Premium", "High Risk 시나리오에서는 Premium 플랜이 가장 강력한 대안으로 제시되어야 합니다.")
        self.assertIn("구체적인 실행 로드맵", cta["value_proposition"], "가치 제안에 '실행 계획' 같은 구체적 해결책이 포함되어야 합니다.")

    def test_medium_risk_scenario_guide_to_paid(self):
        """
        [시나리오 2] 위험도 Medium (0.5 < Loss Gauge < 0.8) -> 무료 콘텐츠 제공 후, 행동 변화 유도를 통해 Paywall으로 안내.
        기대: 직접적인 위협보다는 '개선할 수 있는 기회'를 제시하며 다음 단계를 제안해야 한다.
        """
        # 테스트 입력 데이터: 관리가 필요한 상태 가정
        input_data = {
            "risk_level": "Medium",
            "core_pain_point": "마케팅 채널 분산으로 인한 효율 저하", 
            "current_status": 0.65 # 중간 손실 지표
        }

        # 1. Loss Gauge 분석
        loss_score = analyze_loss_gauge(input_data["core_pain_point"], input_data["current_status"])
        self.assertTrue(0.5 < loss_score <= 0.8, "Medium Risk 시나리오에서 적절한 중간 범위의 Loss Score가 계산되어야 합니다.")

        # 2. Paywall CTA 결정
        cta = determine_premium_cta(input_data["risk_level"], loss_score)
        self.assertEqual(cta["type"], "Pro", "Medium Risk 시나리오에서는 'Pro' 플랜이나 무료 진단 후 다음 단계 유도가 적절합니다.")
        self.assertIn("최적화된 개선 방안", cta["value_proposition"])

    def test_low_risk_scenario_maintain_engagement(self):
        """
        [시나리오 3] 위험도 Low (Loss Gauge < 0.5) -> 추가적인 정보 제공 및 플랫폼 재참여 유도.
        기대: Paywall을 강요하지 않으며, 다음 콘텐츠/서비스를 통해 지속적인 관계를 유지해야 한다.
        """
        # 테스트 입력 데이터: 비교적 안정적인 상태 가정
        input_data = {
            "risk_level": "Low",
            "core_pain_point": "시장 트렌드 변화에 대한 정보 부족", 
            "current_status": 0.35 # 낮은 손실 지표
        }

        # 1. Loss Gauge 분석
        loss_score = analyze_loss_gauge(input_data["core_pain_point"], input_data["current_status"])
        self.assertLess(loss_score, 0.5, "Low Risk 시나리오에서 낮은 Loss Score가 계산되어야 합니다.")

        # 2. Paywall CTA 결정
        cta = determine_premium_cta(input_data["risk_level"], loss_score)
        self.assertEqual(cta["type"], "None", "Low Risk 시나리오에서는 유료 전환을 강요하지 않고, 정보 제공이나 재참여를 유도해야 합니다.")

if __name__ == '__main__':
    unittest.main()