# src/services/action_plan_service.py
from typing import Dict, Any
from pydantic import BaseModel, ValidationError
import json

# --- Mock Data and Schema Definitions (Based on previous context) ---

class ActionBlueprintRequest(BaseModel):
    diagnosis_id: str
    user_role: str
    external_partner_data: Dict[str, Any] = {}

class ActionBlueprintResponse(BaseModel):
    blueprint_id: str
    status: str  # e.g., 'SUCCESS', 'PARTIAL_SUCCESS', 'FAILED'
    action_steps: list[Dict[str, str]]
    risk_assessment: Dict[str, Any]
    partner_integration_status: Dict[str, str]

class ActionPlanService:
    """
    Action Blueprint 및 실행 계획을 관리하는 서비스 레이어.
    데이터 유효성 검증 및 외부 파트너 연동 시뮬레이션을 담당한다.
    """
    def __init__(self):
        # Mock Database/Data Store for demonstration purposes
        self.mock_data = {
            "DGN001": {
                "diagnosis_id": "DGN001",
                "risk_score": 75,
                "status": "HIGH_RISK",
                "suggested_actions": [
                    {"step": 1, "description": "시장 조사 심화"},
                    {"step": 2, "description": "리스크 분산 전략 수립"}
                ]
            },
            "DGN002": {
                "diagnosis_id": "DGN002",
                "risk_score": 30,
                "status": "LOW_RISK",
                "suggested_actions": [
                    {"step": 1, "description": "운영 효율화 방안 모색"}
                ]
            }
        }

    def _validate_diagnosis(self, diagnosis_id: str) -> Dict[str, Any]:
        """진단 ID의 유효성을 검증하고 데이터를 로드한다."""
        if diagnosis_id not in self.mock_data:
            raise ValueError(f"Diagnosis ID '{diagnosis_id}' not found.")
        return self.mock_data[diagnosis_id]

    def _simulate_partner_integration(self, partner_data: Dict[str, Any]) -> Dict[str, str]:
        """외부 파트너사 연동 시뮬레이션 로직."""
        # 실제 API 호출을 대체하여 시뮬레이션
        if 'market_trend' in partner_data and partner_data['market_trend'] == 'volatile':
            return {"MarketAnalysis": "High Volatility Detected. Immediate action required."}
        elif 'cost_estimate' in partner_data:
            return {"CostEstimate": f"Estimated cost based on input: {partner_data['cost_estimate']}"}
        else:
            return {"PartnerStatus": "Data received, but no specific integration points found."}

    def generate_action_blueprint(self, request: ActionBlueprintRequest) -> ActionBlueprintResponse:
        """
        진단 ID를 기반으로 Action Blueprint를 생성하고 외부 파트너 연동을 시뮬레이션한다.
        조건부 흐름 관리 및 권한 체크가 포함된다.
        """
        # 1. 권한 체크 (Authorization Check)
        if request.user_role not in ["ADMIN", "PREMIUM_USER"]:
            raise PermissionError("Access Denied: Insufficient role for Action Blueprint generation.")

        # 2. 진단 데이터 검증 및 로드 (Data Validation & Loading)
        try:
            diagnosis_data = self._validate_diagnosis(request.diagnosis_id)
        except ValueError as e:
            raise ValueError(f"Validation Error: {e}")

        # 3. 조건부 흐름 관리 (Conditional Flow Management)
        if diagnosis_data['risk_score'] > 80:
            status = "CRITICAL_ACTION"
        elif diagnosis_data['risk_score'] > 50:
            status = "HIGH_RISK_PLANNING"
        else:
            status = "LOW_RISK_OPTIMIZATION"

        # 4. 외부 파트너 연동 시뮬레이션 (External Partner Simulation)
        partner_results = self._simulate_partner_integration(request.external_partner_data)

        # 5. 최종 결과 구성 (Response Structuring)
        blueprint_id = f"BP-{request.diagnosis_id}-{hash(json.dumps(request.external_partner_data))}" # Mock ID 생성

        return ActionBlueprintResponse(
            blueprint_id=blueprint_id,
            status=status,
            action_steps=diagnosis_data['suggested_actions'],
            risk_assessment={
                "initial_score": diagnosis_data['risk_score'],
                "current_status": status
            },
            partner_integration_status=partner_results
        )

# --- Unit Tests ---
import unittest

class TestActionPlanService(unittest.TestCase):
    def setUp(self):
        """테스트 전에 서비스 인스턴스를 설정한다."""
        self.service = ActionPlanService()

    def test_successful_blueprint_generation_low_risk(self):
        """낮은 위험도 진단에 대한 성공적인 Blueprint 생성을 테스트한다."""
        request = ActionBlueprintRequest(
            diagnosis_id="DGN002", 
            user_role="PREMIUM_USER"
        )
        partner_data = {"cost_estimate": 1500}
        
        response = self.service.generate_action_blueprint(request)
        
        self.assertEqual(response.status, "LOW_RISK_OPTIMIZATION")
        self.assertIn("CostEstimate", response.partner_integration_status)
        self.assertIsInstance(response.action_steps, list)

    def test_successful_blueprint_generation_high_risk_with_integration(self):
        """높은 위험도 진단과 외부 데이터 연동 시뮬레이션을 테스트한다."""
        request = ActionBlueprintRequest(
            diagnosis_id="DGN001", 
            user_role="ADMIN"
        )
        partner_data = {"market_trend": "volatile"} # Volatile 트렌드 시뮬레이션
        
        response = self.service.generate_action_blueprint(request)
        
        self.assertEqual(response.status, "CRITICAL_ACTION")
        self.assertIn("MarketAnalysis", response.partner_integration_status)

    def test_permission_denied(self):
        """권한이 없는 사용자가 접근 시도 시 예외를 발생시키는 것을 테스트한다."""
        request = ActionBlueprintRequest(
            diagnosis_id="DGN001", 
            user_role="BASIC_USER" # 권한 부족
        )
        
        with self.assertRaisesRegex(PermissionError, "Access Denied"):
            self.service.generate_action_blueprint(request)

    def test_diagnosis_not_found(self):
        """존재하지 않는 진단 ID로 요청 시 예외를 발생시키는 것을 테스트한다."""
        request = ActionBlueprintRequest(
            diagnosis_id="DGN999", 
            user_role="ADMIN"
        )
        
        with self.assertRaisesRegex(ValueError, "Diagnosis ID 'DGN999' not found."):
            self.service.generate_action_blueprint(request)

# 테스트 실행 (실제 환경에서는 이 부분이 자동화되어야 함)
if __name__ == '__main__':
    unittest.main()