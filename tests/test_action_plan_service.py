<![
import pytest
from src.services.action_plan_service import ActionPlanService

# Mock Schema (실제 데이터 스키마를 가정)
class MockSchema:
    def validate(self, data):
        # 실제 유효성 검증 로직을 모방
        return all(k in data for k in ["user_id", "step_type", "details"])

@pytest.fixture
def action_plan_service():
    """테스트에 사용할 서비스 인스턴스를 제공합니다."""
    # 실제 데이터 스키마를 전달 (이 부분은 실제 프로젝트 구조에 맞게 수정 필요)
    mock_schema = MockSchema()
    return ActionPlanService(data_schema=mock_schema)

def test_successful_state_transition(action_plan_service):
    """성공 케이스: S1에서 S2로의 정상적인 상태 전환을 테스트합니다."""
    user_id = "user_abc_123"
    blueprint_data = {
        "user_id": user_id,
        "step_type": "S2_Problem_Recognition",
        "details": {"pain_point": "낮은 마케팅 효율", "insight": "경쟁사 분석 필요"}
    }

    result = action_plan_service.process_action_blueprint(user_id, blueprint_data)

    assert result["status"] == "success"
    assert result["current_state"] == "S2_Problem_Recognition"
    assert len(result["history"]) == 1
    assert result["history"][0]["state"] == "S2"

    # 기록 확인: S1 상태가 누락되었는지 검증
    assert not any(h['state'] == 'S1' for h in result["history"])


def test_failure_due_to_schema_violation(action_plan_service):
    """실패 케이스: ActionBlueprintSchema v3.0을 위반하는 데이터로 인해 처리가 실패하는지 테스트합니다."""
    user_id = "user_fail_456"
    # 필수 필드 'details' 누락 시도
    invalid_blueprint = {
        "user_id": user_id,
        "step_type": "S2_Problem_Recognition"
        # details 누락
    }

    with pytest.raises(ValueError, match="Blueprint 데이터가 ActionBlueprintSchema v3.0을 준수하지 않습니다."):
        action_plan_service.process_action_blueprint(user_id, invalid_blueprint)

    # 실패 시 기록이 남지 않음을 확인 (데이터 무결성 검증)
    assert user_id not in action_plan_service.action_history


def test_failure_due_to_invalid_transition(action_plan_service):
    """실패 케이스: 정의되지 않은 상태 전환 시도 실패를 테스트합니다 (S3에서 S1로의 역행)."""
    user_id = "user_transition_test"
    # 이미 S3 상태라고 가정하고 S1로의 전환 시도
    action_plan_service.action_history[user_id] = {
        "current_state": "S3_Action_Plan",
        "steps": [{"state": "S3", "step_type": "S3_Action_Plan", "data": {}, "timestamp": "..."}]
    }

    invalid_blueprint = {
        "user_id": user_id,
        "step_type": "S1_Diagnosis", # S3 -> S1 시도
        "details": {"pain_point": "Test"}
    }

    with pytest.raises(ValueError, match="잘못된 상태 전환 요청: S3_Action_Plan -> S1_Diagnosis"):
        action_plan_service.process_action_blueprint(user_id, invalid_blueprint)

    # 기록이 변경되지 않았음을 확인 (데이터 무결성 검증)
    assert action_plan_service.action_history[user_id]["current_state"] == "S3_Action_Plan"


def test_data_integrity_with_success(action_plan_service):
    """성공 케이스: S1->S2->S3의 전체 흐름에 걸친 데이터 무결성을 확인합니다."""
    user_id = "user_full_flow"

    # 1. S1 -> S2 전환 (성공)
    s2_data = {"user_id": user_id, "step_type": "S2_Problem_Recognition", "details": {"pain_point": "A", "insight": "B"}}
    result_s2 = action_plan_service.process_action_blueprint(user_id, s2_data)
    assert result_s2["current_state"] == "S2_Problem_Recognition"

    # 2. S2 -> S3 전환 (성공)
    s3_data = {"user_id": user_id, "step_type": "S3_Action_Plan", "details": {"action": "C", "timeline": "D"}}
    result_s3 = action_plan_service.process_action_blueprint(user_id, s3_data)
    assert result_s3["current_state"] == "S3_Action_Plan"

    # 최종 기록 확인: S1이 누락되었는지 (정상 흐름에서는 S1은 별도 기록으로 관리됨)
    history = action_plan_service.action_history[user_id]["steps"]
    assert len(history) == 2 # S2, S3 단계만 기록되어야 함 (S1은 초기 진단 데이터로 분리 가정)
    assert history[0]["state"] == "S2"
    assert history[1]["state"] == "S3"


# 테스트 실행 명령어 준비 (실제 환경에서 실행 시 필요함)
print("테스트 코드 작성 완료. 이제 pytest를 사용하여 실행할 수 있습니다.")