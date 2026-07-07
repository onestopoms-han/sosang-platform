from typing import Dict, Any
from pydantic import BaseModel
import json

# --- 1. Schema 정의 (Pydantic) ---

class StoryFlowSchema(BaseModel):
    """사용자 상태 변화에 따른 조건부 로직 맵."""
    steps: Dict[str, Dict[str, Any]] = {
        "A_Alert": {"description": "즉각적인 위험 감지 및 대응", "focus": "Immediate Reaction"},
        "B_Path": {"description": "중기적 경로 분석 및 전략 수립", "focus": "Strategic Planning"},
        "C_Control": {"description": "시스템 구조 개선 및 통제권 회복", "focus": "System Control"}
    }

class ActionablePlan(BaseModel):
    """사용자에게 제공할 구체적인 행동 계획."""
    next_step_id: str
    control_focus: str
    immediate_action: Dict[str, str]
    control_value: str
    recommended_resource: Dict[str, Any]

class PredictiveControlResponse(BaseModel):
    """최종 API 응답 스키마."""
    status: str
    risk_level: str
    risk_narrative: str
    actionable_plan: ActionablePlan
    system_feedback: Dict[str, Any]


# --- 2. 핵심 로직 구현 (Service Layer) ---

class PredictiveControlService:
    def __init__(self):
        self.story_flow = StoryFlowSchema()

    def _determine_action(self, risk_level: str) -> ActionablePlan:
        """리스크 레벨에 따라 가장 적절한 행동 계획을 매핑하는 로직."""
        if risk_level == "A":
            return self._generate_plan_a()
        elif risk_level == "B":
            return self._generate_plan_b()
        elif risk_level == "C":
            return self._generate_plan_c()
        else:
            raise ValueError("알 수 없는 리스크 레벨입니다.")

    def _generate_plan_a(self) -> ActionablePlan:
        """A 등급(Alert)에 대한 행동 계획 생성."""
        return ActionablePlan(
            next_step_id="A_Alert",
            control_focus=self.story_flow.steps["A_Alert"]["focus"],
            immediate_action={
                "task": "일별 매출 변동성 확인 및 즉각 대응",
                "rationale": "당장의 불안감을 해소하고 손실을 최소화하기 위해 현재 데이터에 기반한 빠른 조치를 취합니다.",
                "control_value": "불안 감소 (Alert)"
            },
            recommended_resource={
                "type": "Quick_Checklist",
                "name": "Daily_Variance_Checklist",
                "link": "/quick-check/daily-variance"
            }
        )

    def _generate_plan_b(self) -> ActionablePlan:
        """B 등급(Path)에 대한 행동 계획 생성."""
        return ActionablePlan(
            next_step_id="B_Path_Analysis_Step_1",
            control_focus=self.story_flow.steps["B_Path"]["focus"],
            immediate_action={
                "task": "3주간 원자재/인건비 변동성 시뮬레이션",
                "rationale": "중기적 경로를 분석하여 잠재적 마진 압박에 대한 전략적 대응 시간을 확보합니다.",
                "control_value": "계획 확보 (Path)"
            },
            recommended_resource={
                "type": "Forecasting_Tool",
                "name": "Margin_Forecasting_Template",
                "link": "/templates/margin-forecasting"
            }
        )

    def _generate_plan_c(self) -> ActionablePlan:
        """C 등급(Control)에 대한 행동 계획 생성."""
        return ActionablePlan(
            next_step_id="C_Control",
            control_focus=self.story_flow.steps["C_Control"]["focus"],
            immediate_action={
                "task": "사업 모델의 플랫폼 의존도 분석 및 재설계",
                "rationale": "궁극적인 통제권을 확보하기 위해, 현재 시스템의 취약점을 진단하고 사업 구조를 개선합니다.",
                "control_value": "통제권 회복 (Control)"
            },
            recommended_resource={
                "type": "Deep_Dive_Guide",
                "name": "Platform_Dependency_Audit",
                "link": "/guides/platform-audit"
            }
        )

    def generate_control_plan(self, risk_level: str, diagnosis_data: Dict[str, Any]) -> PredictiveControlResponse:
        """최종 응답을 생성하는 메인 함수."""
        try:
            action = self._determine_action(risk_level)
            
            # 리스크 레벨에 따른 스토리텔링 톤 조정 (예시)
            if risk_level == "C":
                narrative = f"{self.story_flow.steps['C_Control']['description']}이 필요합니다."
            elif risk_level == "B":
                narrative = f"{self.story_flow.steps['B_Path']['description']}을 통해 통제권을 확보할 수 있습니다."
            else: # A
                narrative = f"{self.story_flow.steps['A_Alert']['description']}에 즉각적으로 대응해야 합니다."

            response = PredictiveControlResponse(
                status="success",
                risk_level=risk_level,
                risk_narrative=narrative,
                actionable_plan=action,
                system_feedback={
                    "confidence_score": 0.95, # 로직 기반이므로 높은 자신감 부여
                    "data_freshness": "Realtime"
                }
            )
            return response

        except ValueError as e:
            # 데이터 유효성 검증 실패 시 에러 반환
            raise Exception(f"Predictive Control 계산 오류: {e}")

# --- 3. 테스트 (Self-Verification Loop) ---

def run_test():
    service = PredictiveControlService()
    
    print("--- Test Case 1: Risk Level A (Alert) ---")
    data_a = {"margin_volatility": 0.15, "inventory_risk": "High"}
    result_a = service.generate_control_plan("A", data_a)
    print(json.dumps(result_a.model_dump(), indent=2, ensure_ascii=False))

    print("\n--- Test Case 2: Risk Level C (Control) ---")
    data_c = {"margin_volatility": 0.40, "inventory_risk": "Critical"}
    result_c = service.generate_control_plan("C", data_c)
    print(json.dumps(result_c.model_dump(), indent=2, ensure_ascii=False))

run_test()