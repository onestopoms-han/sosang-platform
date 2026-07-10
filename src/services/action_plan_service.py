from typing import Dict, Any
from src.schemas.kpi_models import ActionInputSchema, GaugeResultSchema, ActionPlanResponse

# EAS 모델 상수 정의 (Designer 명세 기반)
W_CONTROL = 0.50  # 통제권 회복 가중치
W_ROI = 0.50      # 재무적 가치 가중치

def calculate_ease_metrics(input_data: ActionInputSchema) -> GaugeResultSchema:
    """
    입력된 행동 지표를 기반으로 S_Control과 S_ROI를 계산합니다.
    이 함수는 실제 DB 연동 및 복잡한 통계 분석을 대체하는 골격입니다.
    """
    print(f"⚙️ 계산 시작: Action Type={input_data.action_type}, Outcome={input_data.outcome_value}")

    # --- 1단계: S_Control (통제권 회복 점수) 계산 로직 시뮬레이션 ---
    # 실제 구현에서는 입력 데이터(input_data)와 플랫폼의 목표 상태를 비교해야 합니다.
    if input_data.outcome_value >= 80:
        control_score = 0.85  # 높은 성과 달성 시 높은 통제권 회복
    elif input_data.outcome_value >= 40:
        control_score = 0.60
    else:
        control_score = 0.30

    # --- 2단계: S_ROI (재무적 가치 변화) 계산 로직 시뮬레이션 ---
    # 실제 구현에서는 input_data['input_data']와 사용자 설정된 가격 구조를 비교해야 합니다.
    if input_data.outcome_value > 60 and control_score > 0.5:
        roi_value = (input_data.outcome_value / 100) * 200  # 예시: 100점 달성 시 200의 가치 증대
    else:
        roi_value = (input_data.outcome_value / 100) * 50

    # --- 3단계: 스토리 흐름 및 위험 레벨 결정 로직 시뮬레이션 ---
    story_step = "Action" # 현재 단계는 행동 실행 완료 후 다음 단계로 넘어가는 것을 가정
    risk = "Low" if control_score > 0.7 else ("Medium" if control_score > 0.4 else "High")

    # --- 4단계: 피드백 메시지 생성 (Designer 가이드라인 적용) ---
    feedback = f"축하합니다! {input_data.action_type}에서 {input_data.outcome_value:.1f}%의 성과를 달성했습니다. 다음 단계는 {story_step}입니다."

    return GaugeResultSchema(
        control_recovery_score=round(control_score, 2),
        roi_achieved_value=round(roi_value, 2),
        story_flow_step=story_step,
        risk_level=risk,
        feedback_message=feedback
    )

def process_action_plan(input_data: ActionInputSchema) -> ActionPlanResponse:
    """
    사용자 입력에 대해 최종 결과 객체를 반환하는 메인 함수.
    """
    try:
        result = calculate_ease_metrics(input_data)

        # 최종 응답 구조 구성
        response = ActionPlanResponse(
            result=result,
            calculated_metrics={
                "S_Control": result.control_recovery_score,
                "S_ROI": result.roi_achieved_value,
                "Time_Taken_Sec": input_data.time_taken_sec
            }
        )
        return response

    except Exception as e:
        print(f"🚨 계산 중 오류 발생: {e}")
        # 에러 발생 시 명확한 오류 메시지 반환 (내부 호출에 대한 가드)
        return ActionPlanResponse(
            status="error",
            result=GaugeResultSchema(
                control_recovery_score=0.0,
                roi_achieved_value=0.0,
                story_flow_step="Error",
                risk_level="High",
                feedback_message=f"시스템 오류 발생: {str(e)}"
            ),
            calculated_metrics={}
        )

print("action_plan_service.py 파일 생성 완료.")