import os
import json
import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class KakaoTalkService:
    """
    오프라인 소상공인을 위한 카카오톡 챗봇 연동 및 알림톡(AlimTalk) 전송 서비스를 제공합니다.
    사용자의 카카오톡 요청을 분석하여 AI 에이전트(컨설턴트, 마케터 등)와 연동하고 적절한 템플릿 형태로 응답을 구성합니다.
    """

    def __init__(self, agents_dir: str = None):
        # 기본 에이전트 설정 경로 (없는 경우 상대 경로 매핑)
        if agents_dir is None:
            self.agents_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "_agents"))
        else:
            self.agents_dir = agents_dir

    def parse_chatbot_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        카카오톡 챗봇 서버에서 들어온 Webhook 요청(JSON)을 파싱하여 발화 정보와 사용자 정보를 추출합니다.
        """
        try:
            user_request = payload.get("userRequest", {})
            utterance = user_request.get("utterance", "").strip()
            user_id = user_request.get("user", {}).get("id", "anonymous_user")
            params = payload.get("action", {}).get("params", {})

            return {
                "utterance": utterance,
                "user_id": user_id,
                "params": params,
                "success": True
            }
        except Exception as e:
            logger.error(f"Failed to parse KakaoTalk payload: {e}")
            return {
                "utterance": "",
                "user_id": "anonymous_user",
                "params": {},
                "success": False,
                "error": str(e)
            }

    def _load_agent_persona(self, agent_name: str) -> str:
        """
        프로젝트 내 에이전트의 prompt.md 파일에서 페르소나 정보를 읽어옵니다.
        """
        persona_path = os.path.join(self.agents_dir, agent_name, "prompt.md")
        if os.path.exists(persona_path):
            try:
                with open(persona_path, "r", encoding="utf-8") as f:
                    return f.read().strip()
            except Exception as e:
                logger.error(f"Failed to read persona for agent {agent_name}: {e}")
        
        # 기본 예비 페르소나 (40년 경력 오프라인 비즈니스 컨설턴트)
        return (
            "너는 40년 전문성을 가진 오프라인 소상공인(외식업, 도소매 등) 성공을 돕는 베테랑 비즈니스 컨설턴트다. "
            "테이블 오더, 무인 결제, 플랫폼 광고 등으로 인한 소상공인의 비용 부담과 단골 고객 이탈 문제를 해결하는 현실적이고 "
            "당장 실행 가능한 조언(Action Pillars)을 제시하라."
        )

    def generate_ai_response(self, user_utterance: str, user_id: str, business_type: str = "외식업") -> str:
        """
        사용자의 질문에 대해 에이전트 페르소나와 결합하여 컨설팅 답변을 생성합니다.
        (실제 LLM 호출을 가정하며, 본 기능에서는 로직 분기 및 매장 상황별 최적의 답변 반환을 시뮬레이션함)
        """
        persona = self._load_agent_persona("ceo")
        
        # 질문 내용에 따른 맞춤형 컨설팅 로직 (오프라인 매장의 진짜 페인포인트 기반)
        utterance_lower = user_utterance.replace(" ", "")
        
        if "테이블오더" in utterance_lower or "티오더" in utterance_lower or "위약금" in utterance_lower:
            return (
                "🧭 **40년 경력 비즈니스 컨설턴트 조언 (테이블 오더 분쟁 관련):**\n\n"
                "테이블 오더 기기의 잦은 고장이나 와이파이 끊김으로 영업에 피해를 보고 계시는군요. "
                "위약금 없는 무상 해지를 위해서는 다음 3단계를 당장 준비하셔야 합니다.\n\n"
                "1️⃣ **장애 내역 채증:** 통신이 안 되거나 결제 승인이 안 될 때마다 동영상이나 화면을 사진으로 남기고, "
                "반드시 고객센터에 전화를 걸어 장애 접수 이력(번호/시간)을 기록으로 남겨두세요.\n"
                "2️⃣ **무상 해지 조항 확인:** 계약서 약관에 '월 X회 이상 혹은 연속 X시간 이상 장애 발생 시 위약금 없는 해지 사유'가 포함되어 있는지 찾아보세요.\n"
                "3️⃣ **최고서 발송:** '기본 서비스 의무 불이행으로 매장 매출 손실이 심각하여 계약 해지를 통보한다'는 취지의 내용증명을 본사에 발송하는 것부터 협상이 시작됩니다."
            )
        elif "단골" in utterance_lower or "리뷰" in utterance_lower or "포인트" in utterance_lower:
            return (
                "🧭 **40년 경력 비즈니스 컨설턴트 조언 (고객 소통 단절 관련):**\n\n"
                "테이블 결제를 도입하면 손님이 결제 후 곧바로 가게를 나가버려 단골을 잡기가 매우 어렵습니다. 이를 해결할 '비대면 락인 장치'가 시급합니다.\n\n"
                "1️⃣ **영수증 QR 리뷰 연동:** 테이블 결제 태블릿 화면의 결제 완료 창이나 종이 영수증 하단에 '네이버 영수증 리뷰 작성 시 즉시 할인/사이드 증정' QR코드를 큼직하게 띄우세요.\n"
                "2️⃣ **테이블 텐트카드(스탠드) 활용:** 테이블마다 QR 코드를 붙여두고 '오늘 식사는 어떠셨나요? 사장님께 한 줄 평을 남겨주시면 평생 단골 적립 포인트 1,000원을 드립니다'라는 장치를 상시 가동하세요.\n"
                "3️⃣ **카카오톡 채널 추가 유도:** 음료 제공 이벤트 등을 통해 손님들이 사장님 매장의 카카오톡 채널을 추가하게 만들면, 나중에 신메뉴 출시나 이벤트 알림톡을 직접 보낼 수 있어 단골 관리가 한결 수월해집니다."
            )
        elif "객단가" in utterance_lower or "메뉴" in utterance_lower or "매출" in utterance_lower:
            return (
                "🧭 **40년 경력 비즈니스 컨설턴트 조언 (객단가/AOV 개선 관련):**\n\n"
                "태블릿 메뉴판은 사람처럼 말을 걸 수 없기 때문에 메뉴판 '배치 설계' 하나로 매출이 좌우됩니다.\n\n"
                "1️⃣ **첫 화면에 고마진 세트 배치:** 태블릿을 켰을 때 나오는 첫 페이지에는 단품 메뉴가 아닌 '메인 요리 + 고마진 사이드 + 음료/주류' 세트를 묶어 최상단에 노출하세요.\n"
                "2️⃣ **옵션 창 유도 필터링:** 고객이 메인 메뉴를 장바구니에 담을 때 '이 메뉴와 어울리는 소스/사이드 추가' 옵션 선택창이 강제로 노출되도록 메뉴판 옵션을 수정하세요.\n"
                "3️⃣ **이탈 방지 골든 타임 활용:** 고객이 결제 직전에 주저할 때, 태블릿 화면 우측 하단에 '오늘의 추천 주류 추가 시 1,000원 할인'과 같은 타임세일 배너를 띄우는 것이 좋습니다."
            )
        else:
            return (
                f"🧭 **40년 경력 비즈니스 컨설턴트 답변:**\n\n"
                f"사장님, 보내주신 질문('{user_utterance}')을 검토했습니다. "
                f"오프라인 매장 운영 중 겪으시는 비용 부담이나 고객 이탈에 대한 구체적인 애로사항을 말씀해주시면, "
                f"40년 동안 쌓은 현장 매뉴얼 데이터를 바탕으로 즉시 실천할 수 있는 3단계 액션 플랜을 제시해 드리겠습니다."
            )

    def generate_kakaotalk_response(self, content_text: str, buttons: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        카카오톡 챗봇이 요구하는 JSON 표준 응답 규격(SkillResponse)에 맞추어 데이터를 빌드합니다.
        """
        simple_text = {
            "text": content_text
        }
        
        outputs = [
            {
                "simpleText": simple_text
            }
        ]
        
        # 만약 버튼 링크가 전달된 경우 BasicCard 형식으로 응답 구성
        if buttons:
            outputs = [
                {
                    "basicCard": {
                        "description": content_text,
                        "buttons": buttons
                    }
                }
            ]

        return {
            "version": "2.0",
            "template": {
                "outputs": outputs
            }
        }

    def send_alimtalk_notification(self, user_id: str, template_type: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        특정 이벤트를 기반으로 사장님에게 알림톡(AlimTalk) 전송 요청을 처리하는 Mock API입니다.
        """
        logger.info(f"Sending AlimTalk push ({template_type}) to user {user_id}")
        
        # 템플릿에 따른 메시지 가공
        if template_type == "LOSS_GAUGE_ALERT":
            loss_gauge = context.get("loss_gauge", 70)
            lost_revenue = context.get("lost_revenue", "650,000")
            loss_reason = context.get("loss_reason", "경쟁 매장의 주말 주류 할인 공세로 인한 객단가 하락")
            
            message = (
                f"📢 [BDS AI 비즈니스 파트너 알림]\n\n"
                f"사장님, 이번 주 매장 진단 리포트입니다.\n\n"
                f"🚨 보이지 않는 위협 지표 (Loss Gauge): {loss_gauge}% (주의)\n"
                f"• 위협 요인: {loss_reason}\n"
                f"• 방치 시 예상 월 손실액: 약 {lost_revenue}원\n\n"
                f"✅ 이번 주 당장 실행할 3가지 액션 (Action Pillars):\n"
                f"1. 태블릿 메뉴판 첫 화면에 '메인+고마진 사이드 세트' 배치\n"
                f"2. 피크타임 회전율을 위해 네이버 플레이스 타임세일 쿠폰 발행\n"
                f"3. 테이블 결제기 통신망 사전 검사\n\n"
                f"자세한 팁과 AI 상담은 아래 버튼을 클릭하여 채팅창에서 바로 질문해 보세요!"
            )
        else:
            message = f"📢 [BDS 알림] 사장님, 가게 관리를 위한 새로운 조언이 도착했습니다. 채널에서 확인해 보세요!"

        # 가상의 알림톡 연동 업체 API 응답 시뮬레이션
        return {
            "success": True,
            "user_id": user_id,
            "message_sent": message,
            "status": "Delivered"
        }
