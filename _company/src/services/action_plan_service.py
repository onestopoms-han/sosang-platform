from typing import List, Dict, Any
from pydantic import BaseModel, Field

# --- 1. 데이터 계약서 정의 (Pydantic Models) ---

class ActionItem(BaseModel):
    """개별 액션 플랜의 구조."""
    area: str = Field(description="문제 해결 영역 (예: 마케팅, 재무, 운영)")
    pain_point_trigger: str = Field(description="이 액션을 유발한 핵심 Pain Point")
    basic_action: str = Field(description="Basic 플랜 사용자에게 제공되는 기본적인 행동 지침.")
    premium_benefit: str = Field(description="Premium 플랜에서만 가능한 심층 분석 및 차별화된 이점 (시간/시행착오 감소 강조).")

class ActionPlan(BaseModel):
    """최종 생성될 전체 액션 플랜 목록."""
    title: str = "AI 기반 맞춤형 비즈니스 성장 로드맵"
    description: str = "진단된 Pain Point를 해소하기 위한 실행 가능한 단계별 행동 계획입니다."
    items: List[ActionItem]

# --- 2. 핵심 서비스 로직 구현 (The 'AI' Brain) ---

class ActionPlanService:
    """
    소상공인의 진단 데이터를 받아, 비즈니스 가치를 담은 액션 플랜을 생성합니다.
    (실제 환경에서는 여기에 복잡한 LLM 호출 또는 DB 기반의 정교한 추천 알고리즘이 들어갑니다.)
    """

    @staticmethod
    def generate_plan(pain_points: List[str], business_context: str) -> ActionPlan:
        """
        Pain Points와 사업 컨텍스트를 바탕으로 액션 플랜을 생성합니다.
        """
        print("⚙️ [ActionPlanService] 진단 데이터 기반, 가치 차별화 로직 실행 중...")

        # --- 🚨 핵심 비즈니스 로직 시뮬레이션 시작: Basic vs Premium Differentiation ---
        action_items = []

        # 예시 1: 시장 분석 관련 Pain Point 처리
        if "막연한 트렌드" in business_context or any("시장성 판단 어려움" in p for p in pain_points):
            action_items.append(ActionItem(
                area="마케팅/전략",
                pain_point_trigger=f"지속적인 시장성 판단의 어려움: {', '.join(p for p in pain_points if '시장' in p)}",
                basic_action="주요 키워드 5개를 선정하고, 네이버 트렌드를 활용하여 검색량 변화를 주간 단위로 모니터링하세요.",
                premium_benefit="[AI 기반 심층 예측] 지역 상권별, 시간대별 수요 변화 패턴을 딥러닝으로 시뮬레이션하여 '가장 돈 되는 포지셔닝'과 최적의 운영 시간을 즉시 도출합니다. (시행착오 비용 90% 감소)"
            ))

        # 예시 2: 비효율적인 운영 계획 관련 Pain Point 처리
        if any("운영 효율성 저하" in p for p in pain_points):
             action_items.append(ActionItem(
                area="운영/내부 프로세스",
                pain_point_trigger=f"비효율적인 운영 프로세스와 시간 낭비: {', '.join(p for p in pain_points if '운영' in p)}",
                basic_action="직원별 업무 체크리스트를 만들어 매일 아침/저녁으로 공유하고, 병목 지점을 찾아보세요.",
                premium_benefit="[자동 액션 플랜] 현재 자원과 예산에 맞춰 실행 가능한 최적화된 '7일 간의 구체 행동 목록'을 자동 도출합니다. 리소스 재배치 시뮬레이션을 통해 시간 낭비 요소를 근본적으로 제거합니다."
            ))

        # 예시 3: 성장 동력 부재 Pain Point 처리
        if any("성장 정체기" in p for p in pain_points):
             action_items.append(ActionItem(
                area="성장/수익화",
                pain_point_trigger=f"더 이상 매출 성장이 멈춘 성장 정체기: {', '.join(p for p in pain_points if '성장' in p)}",
                basic_action="경쟁사 분석을 위해 온라인 상위 노출 콘텐츠 3개를 주기적으로 모니터링하고, 개선 포인트를 찾아보세요.",
                premium_benefit="[24시간 컨설턴트] 언제 어디서든 AI 컨설턴트가 상주하며, 시장 상황 변화에 맞춰 실시간으로 수정된 매출 극대화 전략과 구체적인 콘텐츠 기획안을 제안합니다. (사장님의 '절대적인 시간' 확보)"
            ))


        # 기본 구조로 Plan 객체 반환
        return ActionPlan(
            title="BDS 맞춤형 비즈니스 성장 로드맵",
            description="진단된 핵심 Pain Point를 해결하기 위한 단계별 행동 계획입니다. Premium 플랜은 이 과정에서 발생하는 시간적, 자원적 낭비를 최소화합니다.",
            items=action_items
        )

# 테스트 실행 (개발 단계에서는 필수)
if __name__ == "__main__":
    print("="*50)
    print("🚀 ActionPlanService 자체 테스트 시작")
    test_pain_points = ["시장성 판단 어려움", "운영 효율성 저하", "성장 정체기"]
    test_context = "오랜 기간 안정적인 매출을 유지해왔으나, 다음 단계 성장이 막막함."

    try:
        plan = ActionPlanService.generate_plan(test_pain_points, test_context)
        print("\n✅ 테스트 성공적으로 완료된 액션 플랜:")
        print(f"제목: {plan.title}")
        for i, item in enumerate(plan.items):
            print(f"\n--- [액션 #{i+1}] ({item.area}) ---")
            print(f"🎯 Pain Point: {item.pain_point_trigger}")
            print(f"💰 Basic 액션 (필수): {item.basic_action}")
            print(f"💎 Premium 이점 (차별화): {item.premium_benefit}")

    except Exception as e:
        print(f"\n❌ 테스트 실패! 에러 발생: {e}")
    print("="*50)