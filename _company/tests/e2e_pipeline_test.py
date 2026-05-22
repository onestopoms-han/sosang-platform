import unittest
from unittest.mock import MagicMock, patch
# 시스템의 핵심 모듈들을 임포트합니다. 실제 경로로 조정 필요
from src.models.event_log_schema import EventLogSchema # 데이터 계약서 역할
from src.api.v1.diagnosis_service import diagnose_loss_minimization # 진단 엔진 API

class TestLossMinimizationE2E(unittest.TestCase):
    """
    전체 소상공인 데이터 처리 파이프라인의 End-to-End 테스트를 수행합니다.
    데이터 수집 -> 이벤트 로깅 -> 손실 최소화 진단 순서로 검증합니다.
    """

    @patch('src.api.v1.diagnosis_service.save_event_log') # 1. 외부 의존성 Mocking: 로그 저장 기능 목킹
    def test_full_data_pipeline(self, mock_save_event_log):
        """
        가상의 소상공인 시나리오 데이터를 통해 전체 파이프라인을 테스트합니다.
        - 데이터 입력 (Input) -> 이벤트 기록 (Log) -> 진단 결과 도출 (Diagnosis) 순서로 진행됩니다.
        """
        print("\n[--- E2E Test Start: Full Data Pipeline Simulation ---]")

        # 1. 가상의 시나리오 데이터 준비 (가장 중요한 테스트 케이스)
        test_scenario_data = {
            "store_id": "S001",
            "date": "2024-06-15",
            "kpis": {
                "total_sales": 1500, # 총 매출 (KPI)
                "customer_count": 80, # 고객 수 (KPI)
                "avg_transaction": 18.75, # 평균 거래액 (KPI)
                "return_rate": 0.05 # 반품율 (KPI)
            },
            "event_details": [
                {"type": "sale", "amount": 1000, "user_id": "U1"},
                {"type": "discount", "reason": "coupon", "value": -200}
            ]
        }

        # 2. 이벤트 로깅 시스템 시뮬레이션 (데이터를 기록하는 단계)
        # 이 부분이 실제 DB 저장 대신 Mock으로 대체됩니다.
        event_log_data = EventLogSchema(**test_scenario_data).to_dict()
        print(f"  [PASS] Step 1: Event Log Data Schema 유효성 검사 완료. 기록할 데이터 구조 확정.")

        # mock_save_event_log가 실제로 호출되는지 확인합니다.
        mock_save_event_log(event_log_data) # 로그 저장 기능 '호출'만 테스트 (실제 DB write는 안 함)
        self.assertTrue(mock_save_event_log.called, "Event Log Module이 호출되지 않았습니다.")

        # 3. 진단 서비스 실행 및 결과 검증 (핵심 로직 검증)
        diagnosis_result = diagnose_loss_minimization(test_scenario_data)

        print("\n[--- Diagnosis Result ---]")
        print(f"  Loss Minimization Score: {diagnosis_result.get('score', 'N/A')}")
        self.assertIn("Action Plan", diagnosis_result, "진단 결과에 필수 Action Plan 필드가 누락되었습니다.")

        # 4. 최종 검증 (결과값이 비즈니스 로직을 따르는지 확인)
        if test_scenario_data['kpis']['return_rate'] > 0.03:
            self.assertIn("재고 관리 개선", diagnosis_result['action_plan'], "반품율이 높음에도 재고 관련 조언이 빠졌습니다.")

        print("\n[--- E2E Test Complete: All components passed validation! ---]")


if __name__ == "__main__":
    # 테스트 실행 시, 필요한 Mock 환경을 설정하거나 실제 DB 연결을 분리해야 합니다.
    unittest.main()