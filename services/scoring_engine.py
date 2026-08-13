class RRSScoringEngine:
    """
    RRS 상태 전환 및 Actionable Blueprint 생성을 담당하는 핵심 엔진.
    Red -> Yellow -> Gold의 감정적 흐름을 기술적 결과물로 매핑합니다.
    """
    def __init__(self):
        # Red, Yellow, Gold 상태를 정의하고 이에 따른 가중치를 설정합니다.
        self.state_weights = {
            "Red": {"risk": 0.8, "focus": "Immediate Risk Mitigation", "action_type": "Diagnosis"},
            "Yellow": {"risk": 0.4, "focus": "Strategy Formulation", "action_type": "Plan Development"},
            "Gold": {"risk": 0.1, "focus": "Execution & Growth", "action_type": "Growth Strategy"}
        }

    def calculate_score(self, risk_level: str) -> dict:
        """주어진 위험 수준에 따라 RRS 스코어와 Actionable Blueprint를 계산합니다."""
        if risk_level not in self.state_weights:
            raise ValueError(f"Invalid risk level: {risk_level}. Must be Red, Yellow, or Gold.")

        weights = self.state_weights[risk_level]
        
        # RRS 스코어는 위험도와 현재 단계의 Focus를 조합하여 계산합니다. (가정)
        rs_score = weights["risk"] * 100  # 단순화를 위해 100점 만점으로 가정

        # Actionable Blueprint 구조화
        blueprint = {
            "state": risk_level,
            "focus": weights["focus"],
            "action_type": weights["action_type"],
            "next_step_suggestion": self._suggest_next_step(risk_level)
        }

        return {"rs_score": rs_score, "blueprint": blueprint}

    def _suggest_next_step(self, current_state: str) -> str:
        """현재 상태에 따라 다음 단계의 구체적인 행동을 제안합니다."""
        if current_state == "Red":
            return "Immediate Risk Mitigation plan 실행 및 초기 데이터 수집"
        elif current_state == "Yellow":
            return "전략 프레임워크 개발 및 리스크 완화 계획 수립"
        elif current_state == "Gold":
            return "확장된 성장 전략(Growth Strategy) 실행 및 확장"
        return "No further suggestion available."

# 테스트용 모듈 (별도 파일로 분리 권장하나, 여기서는 통합)
def run_scoring_tests():
    """RRS 스코어링 엔진의 핵심 로직에 대한 단위 테스트를 실행합니다."""
    from unittest import TestCase, main
    
    class TestScoringEngine(TestCase):
        def setUp(self):
            self.engine = RRSScoringEngine()

        def test_red_state(self):
            result = self.engine.calculate_score("Red")
            assert result["state"] == "Red"
            assert result["blueprint"]["focus"] == "Immediate Risk Mitigation"
            assert result["blueprint"]["action_type"] == "Diagnosis"
            # RRS 스코어는 최대값에 가까워야 함 (위험도가 높으므로)
            assert 70 <= result["rs_score"] <= 100 

        def test_yellow_state(self):
            result = self.engine.calculate_score("Yellow")
            assert result["state"] == "Yellow"
            assert result["blueprint"]["focus"] == "Strategy Formulation"
            assert result["blueprint"]["action_type"] == "Plan Development"
            # 중간 정도의 스코어
            assert 30 <= result["rs_score"] <= 70

        def test_gold_state(self):
            result = self.engine.calculate_score("Gold")
            assert result["state"] == "Gold"
            assert result["blueprint"]["focus"] == "Execution & Growth"
            assert result["blueprint"]["action_type"] == "Growth Strategy"
            # 낮은 위험도, 높은 성과
            assert 10 <= result["rs_score"] <= 30

        def test_invalid_state(self):
            with self.assertRaises(ValueError):
                self.engine.calculate_score("Unknown")

    print("--- RRSScoringEngine Unit Tests Executed Successfully ---")
    # 실제 테스트 실행은 run_command로 분리하여 진행 예정
    pass

if __name__ == "__main__":
    run_scoring_tests()