import json
from typing import Dict, Any

# 가상의 데이터 및 설정 (실제로는 DB 또는 외부 서비스 연동)
PRICING_TIERS = {
    "Basic": {"price": 49000, "value_proposition": "기본 진단 결과 제공"},
    "Standard": {"price": 99000, "value_proposition": "심층 분석 및 맞춤 코칭 로드맵 (시간 절약 효과: 10%)"},
    "Premium": {"price": 199000, "value_proposition": "AI 기반 예측 리포트 + 실시간 액션 플랜 연동 (시간 절약 효과: 30%)"}
}

# Loss Gauge 계산 로직
def calculate_loss_gauge(diagnosis: Dict[str, Any], user_plan: str) -> Dict[str, Any]:
    """
    진단 결과와 사용자 플랜을 기반으로 손실 게이지 및 행동 유도 데이터를 계산합니다.
    """
    if user_plan not in PRICING_TIERS:
        raise ValueError(f"Invalid user plan: {user_plan}")

    plan_data = PRICING_TIERS[user_plan]
    
    # 1. 기본 손실 위험도 계산 (진단 결과 기반)
    risk_level = diagnosis.get("risk_level", "Medium") # 예시 데이터 가정
    
    # 2. 플랜별 가치 반영 (Loss Gauge의 핵심)
    if user_plan == "Basic":
        loss_gauge_value = 50  # 기본 손실 위험도만 표시
        action_prompt = f"진단 결과: {risk_level}. Basic 플랜으로 시작하여 기초를 다지세요."
    elif user_plan == "Standard":
        # Standard는 시간 절약 효과 반영
        loss_gauge_value = 30  # 위험도 + 가치 확보 (10% 절약)
        action_prompt = f"진단 결과: {risk_level}. Standard 플랜으로 전환하여 핵심 전략을 실행하세요. (시간 절약 예상: 10%)"
    elif user_plan == "Premium":
        # Premium은 최대 가치 및 예측 리포트 반영
        loss_gauge_value = 10  # 최소화된 손실 위험도 + 최적의 액션 플랜 확보 (30% 절약)
        action_prompt = f"진단 결과: {risk_level}. Premium 플랜으로 전환하여 AI 기반 예측 리포트와 즉각적인 행동 전략을 실행하세요. (시간 절약 예상: 30%)"
    else:
        # Fallback for unknown plans
        loss_gauge_value = 100 # 최대 위험 표시
        action_prompt = "플랜 선택이 불확실합니다. 플랜을 확인하고 다음 단계로 진행하세요."

    # 3. 최종 결과 반환 구조 (프론트엔드에 전달할 데이터)
    return {
        "loss_gauge": loss_gauge_value,
        "risk_level": risk_level,
        "action_prompt": action_prompt,
        "plan_details": plan_data.get("value_proposition", "일반 플랜")
    }

def get_pricing_details(plan: str) -> Dict[str, Any]:
    """사용자 플랜에 대한 상세 정보를 반환합니다."""
    return PRICING_TIERS.get(plan, {"price": 0, "value_proposition": "알 수 없는 플랜"})

def validate_story_flow(diagnosis: Dict[str, Any], user_plan: str) -> bool:
    """StoryFlowSchema에 따른 조건부 흐름의 유효성을 검증합니다."""
    # TODO: 실제 StoryFlowSchema 로직을 여기에 통합하여 복잡한 상태 전환 검증 로직 구현 필요.
    # 현재는 단순 플랜 존재 여부로 기본 검증만 수행함.
    if user_plan not in ["Basic", "Standard", "Premium"]:
        return False
    return True

# --- Mock API Endpoints (실제 서비스에서는 DB/외부 연동) ---
def mock_api_diagnose(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """진단 엔진의 모의 호출."""
    print("Mock Diagnosis Engine Called.")
    # 실제 진단 결과는 이전 단계에서 생성된 데이터나 Mock 데이터를 사용해야 함.
    return {"risk_level": "High", "score": 85, "recommendation": "즉각적인 재정 계획이 필요합니다."}

def mock_api_get_pricing(plan: str) -> Dict[str, Any]:
    """가격 및 가치 정보를 반환합니다."""
    return get_pricing_details(plan)

# --- 메인 서비스 함수 (프론트엔드 요청 처리) ---
def handle_paywall_request(diagnosis: Dict[str, Any], requested_plan: str) -> Dict[str, Any]:
    """
    Paywall 및 Loss Gauge에 필요한 모든 데이터를 통합하여 반환합니다.
    높은 손실 게이지 감지 시 카카오톡 알림톡 전송 기능과 연동됩니다.
    """
    if not validate_story_flow(diagnosis, requested_plan):
        return {"error": "선택하신 플랜은 유효하지 않습니다."}

    pricing = get_pricing_details(requested_plan)
    loss_data = calculate_loss_gauge(diagnosis, requested_plan)

    # 40년 경력 컨설턴트 관점: 손실 경고(Loss Gauge)가 높을 경우 즉시 카카오톡 알림 발송 시뮬레이션
    kakaotalk_alert_status = "Skipped"
    if loss_data.get("loss_gauge", 0) >= 50:
        try:
            from services.kakaotalk_service import KakaoTalkService
            kt_service = KakaoTalkService()
            # 가상 사용자 ID 매핑 및 손실 세부 정보 전달
            alert_res = kt_service.send_alimtalk_notification(
                user_id="user_12345",
                template_type="LOSS_GAUGE_ALERT",
                context={
                    "loss_gauge": loss_data["loss_gauge"],
                    "lost_revenue": "1,500,000",
                    "loss_reason": "테이블오더 도입 이후 대면 결제 단절로 인한 단골 이탈 및 메뉴 배치 비효율"
                }
            )
            if alert_res.get("success"):
                kakaotalk_alert_status = "Sent successfully"
        except Exception as e:
            kakaotalk_alert_status = f"Failed: {str(e)}"

    # 최종적으로 프론트엔드에 전달할 데이터 구조 정의 (StoryFlowSchema v2.0 반영)
    return {
        "success": True,
        "pricing": pricing,
        "loss_gauge_data": loss_data,
        "diagnosis_summary": diagnosis,
        "story_flow_status": "Ready for action",
        "kakaotalk_alert_status": kakaotalk_alert_status
    }

# 테스트용 Mock 데이터
mock_diagnosis_result = {"risk_level": "High", "score": 85, "recommendation": "즉각적인 재정 계획이 필요합니다."}
print("Paywall Logic Service Initialized.")