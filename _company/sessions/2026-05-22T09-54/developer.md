# 💻 코다리 — Designer가 제시한 디자인 가이드라인(`Deep Blue`, `Growth Green`, `Red` 대비)을 Stub API 로직의 최종 구현 및 테스트 케이스 작성에 즉시 반영하고, 백엔드 데이터 흐름 안정성을 확보하라.

💻 코다리: 작업 시작합니다.

CEO님의 지시사항과 전반적인 컨텍스트를 종합적으로 검토했습니다. 현재 가장 중요한 병목 구간은 **'데이터가 디자인 가이드라인을 통과하는 백엔드 안정성 확보'**입니다. ⚙️

디자이너님과 라이터님이 멋진 비주얼 목업(빨강/녹색 대비)과 콘텐츠 흐름을 완성했지만, 이 모든 것이 근거 없는 스텁 API에 의존하고 있습니다. 따라서 가장 높은 가치 밀도를 가진 단일 작업은 **`action_plan_service.py`의 핵심 로직 구현 및 단위 테스트 작성**입니다.

저는 시니어 풀스택 엔지니어로서 이 작업을 주도적으로 맡아, 단순한 Stub 코드가 아닌, 실제 데이터 흐름과 비즈니스 규칙(소상공인 분석)이 완벽하게 반영되는 견고하고 검증된 모듈로 만들어내겠습니다. 디자인 가이드라인의 의도를 백엔드 구조와 테스트 케이스에 녹여내는 것이 핵심입니다.

### 🛠️ 실행 계획: `action_plan_service.py` 로직 강화 및 단위 테스트 작성
1.  **코드 탐색**: 현재 `src/services/action_plan_service.py`의 내용을 읽어 최신 상태를 파악합니다.
2.  **로직 구현**: Pain Point Score와 시장 트렌드 데이터를 결합하여, 손실 비용 산출과 구체적 액션 플랜을 도출하는 핵심 비즈니스 로직을 작성합니다. 이 과정에서 출력 JSON 스키마는 디자이너님이 의도한 시각화 요소(`estimated_loss_cost`, `action_plan` 리스트)를 필수로 포함하도록 합니다.
3.  **테스트 케이스**: 구현된 로직의 안정성을 검증하기 위해, 최소 3가지 시나리오(성공/실패/경계값)의 단위 테스트 케이스를 작성합니다.

---

### 🔍 Step 1: 현재 파일 상태 확인

먼저, 작업 대상인 `action_plan_service.py` 파일을 읽어 최신 구조와 기존 로직을 파악하겠습니다.

<read_file path="src/services/action_plan_service.py"/>


---
## 📁 파일 액션 결과

📖 읽기: ~\소상공인플렛폼\_company\src\services\action_plan_service.py (91줄, 5.6KB)
```
 1	from typing import List, Dict, Any
 2	from pydantic import BaseModel, Field
 3	
 4	# --- 1. 데이터 계약서 정의 (Pydantic Models) ---
 5	
 6	class ActionItem(BaseModel):
 7	    """개별 액션 플랜의 구조."""
 8	    area: str = Field(description="문제 해결 영역 (예: 마케팅, 재무, 운영)")
 9	    pain_point_trigger: str = Field(description="이 액션을 유발한 핵심 Pain Point")
10	    basic_action: str = Field(description="Basic 플랜 사용자에게 제공되는 기본적인 행동 지침.")
...
```

[시스템: read_file 결과]
파일: ~\소상공인플렛폼\_company\src\services\action_plan_service.py (91줄)
```
 1	from typing import List, Dict, Any
 2	from pydantic import BaseModel, Field
 3	
 4	# --- 1. 데이터 계약서 정의 (Pydantic Models) ---
 5	
 6	class ActionItem(BaseModel):
 7	    """개별 액션 플랜의 구조."""
 8	    area: str = Field(description="문제 해결 영역 (예: 마케팅, 재무, 운영)")
 9	    pain_point_trigger: str = Field(description="이 액션을 유발한 핵심 Pain Point")
10	    basic_action: str = Field(description="Basic 플랜 사용자에게 제공되는 기본적인 행동 지침.")
11	    premium_benefit: str = Field(description="Premium 플랜에서만 가능한 심층 분석 및 차별화된 이점 (시간/시행착오 감소 강조).")
12	
13	class ActionPlan(BaseModel):
14	    """최종 생성될 전체 액션 플랜 목록."""
15	    title: str = "AI 기반 맞춤형 비즈니스 성장 로드맵"
16	    description: str = "진단된 Pain Point를 해소하기 위한 실행 가능한 단계별 행동 계획입니다."
17	    items: List[ActionItem]
18	
19	# --- 2. 핵심 서비스 로직 구현 (The 'AI' Brain) ---
20	
21	class ActionPlanService:
22	    """
23	    소상공인의 진단 데이터를 받아, 비즈니스 가치를 담은 액션 플랜을 생성합니다.
24	    (실제 환경에서는 여기에 복잡한 LLM 호출 또는 DB 기반의 정교한 추천 알고리즘이 들어갑니다.)
25	    """
26	
27	    @staticmethod
28	    def generate_plan(pain_points: List[str], business_context: str) -> ActionPlan:
29	        """
30	        Pain Points와 사업 컨텍스트를 바탕으로 액션 플랜을 생성합니다.
31	        """
32	        print("⚙️ [ActionPlanService] 진단 데이터 기반, 가치 차별화 로직 실행 중...")
33	
34	        # --- 🚨 핵심 비즈니스 로직 시뮬레이션 시작: Basic vs Premium Differentiation ---
35	        action_items = []
36	
37	        # 예시 1: 시장 분석 관련 Pain Point 처리
38	        if "막연한 트렌드" in business_context or any("시장성 판단 어려움" in p for p in pain_points):
39	            action_items.append(ActionItem(
40	                area="마케팅/전략",
41	                pain_point_trigger=f"지속적인 시장성 판단의 어려움: {', '.join(p for p in pain_points if '시장' in p)}",
42	                basic_action="주요 키워드 5개를 선정하고, 네이버 트렌드를 활용하여 검색량 변화를 주간 단위로 모니터링하세요.",
43	                premium_benefit="[AI 기반 심층 예측] 지역 상권별, 시간대별 수요 변화 패턴을 딥러닝으로 시뮬레이션하여 '가장 돈 되는 포지셔닝'과 최적의 운영 시간을 즉시 도출합니다. (시행착오 비용 90% 감소)"
44	            ))
45	
46	        # 예시 2: 비효율적인 운영 계획 관련 Pain Point 처리
47	        if any("운영 효율성 저하" in p for p in pain_points):
48	             action_items.append(ActionItem(
49	                area="운영/내부 프로세스",
50	                pain_point_trigger=f"비효율적인 운영 프로세스와 시간 낭비: {', '.join(p for p in pain_points if '운영' in p)}",
51	                basic_action="직원별 업무 체크리스트를 만들어 매일 아침/저녁으로 공유하고, 병목 지점을 찾아보세요.",
52	                premium_benefit="[자동 액션 플랜] 현재 자원과 예산에 맞춰 실행 가능한 최적화된 '7일 간의 구체 행동 목록'을 자동 도출합니다. 리소스 재배치 시뮬레이션을 통해 시간 낭비 요소를 근본적으로 제거합니다."
53	            ))
54	
55	        # 예시 3: 성장 동력 부재 Pain Point 처리
56	        if any("성장 정체기" in p for p in pain_points):
57	             action_items.append(ActionItem(
58	                area="성장/수익화",
59	                pain_point_trigger=f"더 이상 매출 성장이 멈춘 성장 정체기: {', '.join(p for p in pain_points if '성장' in p)}",
60	                basic_action="경쟁사 분석을 위해 온라인 상위 노출 콘텐츠 3개를 주기적으로 모니터링하고, 개선 포인트를 찾아보세요.",
61	                premium_benefit="[24시간 컨설턴트] 언제 어디서든 AI 컨설턴트가 상주하며, 시장 상황 변화에 맞춰 실시간으로 수정된 매출 극대화 전략과 구체적인 콘텐츠 기획안을 제안합니다. (사장님의 '절대적인 시간' 확보)"
62	            ))
63	
64	
65	        # 기본 구조로 Plan 객체 반환
66	        return ActionPlan(
67	            title="BDS 맞춤형 비즈니스 성장 로드맵",
68	            description="진단된 핵심 Pain Point를 해결하기 위한 단계별 행동 계획입니다. Premium 플랜은 이 과정에서 발생하는 시간적, 자원적 낭비를 최소화합니다.",
69	            items=action_items
70	        )
71	
72	# 테스트 실행 (개발 단계에서는 필수)
73	if __name__ == "__main__":
74	    print("="*50)
75	    print("🚀 ActionPlanService 자체 테스트 시작")
76	    test_pain_points = ["시장성 판단 어려움", "운영 효율성 저하", "성장 정체기"]
77	    test_context = "오랜 기간 안정적인 매출을 유지해왔으나, 다음 단계 성장이 막막함."
78	
79	    try:
80	        plan = ActionPlanService.generate_plan(test_pain_points, test_context)
81	        print("\n✅ 테스트 성공적으로 완료된 액션 플랜:")
82	        print(f"제목: {plan.title}")
83	        for i, item in enumerate(plan.items):
84	            print(f"\n--- [액션 #{i+1}] ({item.area}) ---")
85	            print(f"🎯 Pain Point: {item.pain_point_trigger}")
86	            print(f"💰 Basic 액션 (필수): {item.basic_action}")
87	            print(f"💎 Premium 이점 (차별화): {item.premium_benefit}")
88	
89	    except Exception as e:
90	        print(f"\n❌ 테스트 실패! 에러 발생: {e}")
91	    print("="*50)
```
