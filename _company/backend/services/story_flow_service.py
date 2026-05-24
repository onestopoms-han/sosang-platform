from typing import Dict, Any, Optional
from pydantic import BaseModel, Field, ValidationError
import json

# =======================================================
# 1. 데이터 계약서 (Schema v3.0 - StoryFlow) 정의
# Designer와 Writer의 요구사항을 통합한 최신 스키마입니다.
# 진단 결과(Diagnosis)를 바탕으로 유료 콘텐츠가 포함된 스토리 구조를 반환합니다.
# =======================================================

class ActionStep(BaseModel):
    """개별 행동 단계의 상세 정보."""
    step_id: str = Field(..., description="단계 고유 ID (예: risk_assessment_1)")
    title: str = Field(..., description="사용자에게 노출될 제목.")
    content_type: str = Field(..., description="콘텐츠 타입 (e.g., 'GUIDE', 'TOOL', 'REPORT').")
    description: str = Field(..., description="이 단계에서 제공되는 구체적인 가치 설명.")
    required_action: Optional[str] = Field(None, description="사용자가 수행해야 할 명확한 행동 지침 (CTA).")

class StoryFlowStep(BaseModel):
    """하나의 스토리 전개 단계."""
    step_order: int = Field(..., description="스토리 흐름 상 순서.")
    header_message: str = Field(..., description="이 단계를 시작할 때 사용자에게 전달되는 공감 메시지 (Writer 영역).")
    core_data: Dict[str, Any] = Field(..., description="진단/분석에 필요한 핵심 데이터 블록.")
    action_plan: list[ActionStep] = Field(..., description="이 단계에서 수행 가능한 구체적인 행동 목록.")

class StoryFlowSchema(BaseModel):
    """최종 API 응답 스키마. 진단 결과와 결합된 전체 여정 흐름."""
    diagnosis_summary: Dict[str, Any] = Field(..., description="진단의 핵심 요약 정보 (Loss Gauge 데이터).")
    suggested_flow: list[StoryFlowStep] = Field(..., description="사용자에게 추천되는 단계별 스토리 순서.")
    premium_value_proposition: Optional[Dict[str, str]] = Field(None, description="프리미엄 플랜이 해결하는 핵심 가치 제안 (Writer/Designer 영역).")


# =======================================================
# 2. 서비스 로직 구현 (StoryFlowEngine)
# 이 클래스가 모든 비즈니스 로직을 담당합니다.
# =======================================================

class StoryFlowService:
    """소상공인 Pain Point를 해결하는 단계적 스토리 흐름 생성 엔진."""

    def __init__(self, user_tier: str):
        self.user_tier = user_tier # 'FREE', 'PRO', 'PREMIUM'

    def get_story_flow(self, diagnosis_data: Dict[str, Any]) -> StoryFlowSchema:
        """
        진단 데이터를 기반으로 사용자의 구독 티어에 맞춰 최적화된 스토리 흐름을 생성합니다.
        이 함수가 핵심적인 비즈니스 로직입니다.
        """
        print(f"⚙️ [INFO] 사용자 등급 {self.user_tier} 기준으로 Story Flow를 생성 중...")

        # 1. 진단 요약 데이터 추출 (Loss Gauge 역할)
        diagnosis_summary = {
            "risk_level": diagnosis_data.get("risk_score", "N/A"),
            "key_weakness": diagnosis_data.get("primary_pain_point", "주요 위험 요소 미감지")
        }

        # 2. 스토리 플로우 생성 (티어 기반 로직)
        if self.user_tier == 'FREE':
            # 무료 사용자는 가장 기본적인 리스크 진단과 최소한의 가이드만 제공합니다.
            suggested_flow = [
                StoryFlowStep(
                    step_order=1,
                    header_message="걱정하지 마세요. 먼저 현재 상태를 객관적으로 파악하는 것이 중요합니다.",
                    core_data={"score": diagnosis_summary['risk_level']},
                    action_plan=[
                        ActionStep(step_id="free_check_01", title="기초 지표 점검하기", content_type="GUIDE", description="가장 기본적인 3가지 KPI를 무료로 제공합니다.", required_action="지표 확인")
                    ]
                )
            ]
            premium_prop = None

        elif self.user_tier == 'PRO':
            # PRO 사용자는 액션 플랜을 제시받지만, 핵심 분석 자료는 유료입니다. (Action Pillar 접근 제한)
             suggested_flow = [
                StoryFlowStep(
                    step_order=1,
                    header_message="단순히 위험만 아는 것은 부족합니다. 이 지표를 개선할 '방향'을 잡아보세요.",
                    core_data={"analysis_focus": "시장 트렌드 분석"},
                    action_plan=[
                        ActionStep(step_id="pro_guide_01", title="주요 시장 변화 예측 보고서 열람 (Pro)", content_type="REPORT", description="경쟁사 대비 우리 가게가 취할 수 있는 전략적 위치를 제시합니다.", required_action="보고서 확인")
                    ]
                ),
                StoryFlowStep(
                    step_order=2,
                    header_message="이제 다음 단계로 나아가기 위한 구체적인 '전략'이 필요합니다. 이것만으로는 부족할 수 있습니다.",
                    core_data={"analysis_focus": "구체적 액션 플랜"},
                    action_plan=[
                        ActionStep(step_id="pro_limited", title="부분 실행 가이드라인 (Pro)", content_type="GUIDE", description="전략의 일부만 경험할 수 있습니다.", required_action="가이드 다운로드")
                    ]
                )
            ]
            premium_prop = {"Value": "경쟁사 대비 시장 우위 확보를 위한 핵심 데이터 3가지 분석"}

        elif self.user_tier == 'PREMIUM':
             # PREMIUM 사용자는 모든 정보에 접근할 수 있으며, 최종 해결책을 제시받습니다.
             suggested_flow = [
                StoryFlowStep(
                    step_order=1,
                    header_message="당신의 비즈니스를 한 단계 업그레이드할 준비가 되셨나요? 이제 '전략적 실행'이 필요합니다.",
                    core_data={"analysis_focus": "최종 생존 전략"},
                    action_plan=[
                        ActionStep(step_id="prem_full_01", title="AI 기반 통합 생존 로드맵 전체 열람 (Premium)", content_type="REPORT", description="리스크부터 개선, 수익화까지의 완벽한 청사진을 제공합니다.", required_action="전체 로드맵 구매")
                    ]
                )
            ]
             premium_prop = {"Value": "AI가 예측하는 미래 리스크를 제거하고, 최적화된 3개년 성장 전략 패키지"}

        # 최종 스키마 검증 및 반환
        try:
            story_flow = StoryFlowSchema(
                diagnosis_summary=diagnosis_summary,
                suggested_flow=suggested_flow,
                premium_value_proposition=premium_prop
            )
            return story_flow
        except ValidationError as e:
            # 데이터 구조 오류 시 디버깅용 에러 처리
            print(f"❌ [ERROR] StoryFlowSchema 유효성 검사 실패: {e}")
            raise

# =======================================================
# 3. 테스트 코드 (예시)
# =======================================================

def run_test():
    """실제 API 호출 전에 로직을 테스트합니다."""
    sample_diagnosis = {"risk_score": "High", "primary_pain_point": "재고 관리의 비효율성"}
    print("\n--- 🟢 FREE 티어 테스트 ---")
    try:
        free_service = StoryFlowService(user_tier='FREE')
        story_flow_free = free_service.get_story_flow(sample_diagnosis)
        print("✅ Free Flow 성공적으로 생성됨.")
    except Exception as e:
        print(f"❌ Free Flow 테스트 실패: {e}")

    print("\n--- 🟢 PREMIUM 티어 테스트 ---")
    try:
        premium_service = StoryFlowService(user_tier='PREMIUM')
        story_flow_premium = premium_service.get_story_flow(sample_diagnosis)
        print("✅ Premium Flow 성공적으로 생성됨.")

if __name__ == "__main__":
    run_test()