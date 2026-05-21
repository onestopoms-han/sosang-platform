from typing import Dict, Any, List
import logging

logging.basicConfig(level=logging.INFO)

class ActionPlanService:
    """
    진단 결과를 받아 최종 Action Plan을 생성하는 핵심 비즈니스 로직 서비스.
    데이터 무결성 및 비즈니스 규칙 검증에 초점을 맞춥니다.
    """

    @staticmethod
    def generate_plan(diagnosis_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        진단 데이터로부터 구체적인 실행 계획을 생성합니다.
        
        Args:
            diagnosis_data: AI 진단 엔진에서 나온 결과 구조화된 딕셔너리.
            
        Returns:
            최종 Action Plan이 담긴 딕셔너리.
            
        Raises:
            ValueError: 필수 데이터가 누락되었거나 비즈니스 규칙을 위반한 경우.
        """
        logging.info("--- Running Action Plan Generation Service ---")

        # [1] 입력 데이터 유효성 검증 (Guard Clause)
        if 'key_pain_point' not in diagnosis_data or not diagnosis_data['key_pain_point']:
            raise ValueError("진단 결과에 핵심 페인 포인트(key_pain_point)가 누락되었습니다. 계획 수립 불가.")

        # [2] 비즈니스 로직 처리: 액션 플랜 구성 요소 추출 및 가공
        target_area = diagnosis_data.get('suggested_focus_area', '전반적인 개선')
        priority_action = diagnosis_data['key_pain_point']
        
        # 예시 비즈니스 로직: 페인 포인트에 따른 액션 항목 할당
        if "마케팅" in priority_action and target_area == "온라인 노출":
            action_item = {
                "step": 1,
                "title": "디지털 마케팅 채널 확장",
                "description": "현재 주요 고객층이 활동하는 온라인 플랫폼(예: 네이버 스마트스토어 최적화)에 집중하고, 인플루언서 연계를 검토해야 합니다.",
                "metric": "월별 웹 트래픽 증가율 (%)"
            }
        elif "재고 관리" in priority_action and target_area == "운영 효율성":
            action_item = {
                "step": 2,
                "title": "재고 데이터 통합 및 예측 시스템 도입",
                "description": "판매 기록과 재고 데이터를 실시간으로 연결하여 과잉/부족 재고를 사전에 파악하는 프로세스를 구축해야 합니다.",
                "metric": "재고 폐기율 감소 (%)"
            }
        else:
            action_item = {
                "step": 1,
                "title": f"핵심 개선 과제: {priority_action}",
                "description": "가장 큰 문제점에 대한 구체적인 해결 방안을 단계적으로 설계해야 합니다. (추후 상세화 필요)",
                "metric": "전반적 매출 성장률 (%)"
            }

        # [3] 최종 구조화 및 반환
        final_plan = {
            "success": True,
            "summary": f"{target_area} 측면에서 '{priority_action}'을 해결하기 위한 실행 계획입니다.",
            "recommended_actions": [action_item],
            "follow_up_steps": "다음 단계로 상세 구현 로드맵(Timeline) 및 예산 수립이 필요합니다."
        }

        logging.info("--- Action Plan Service Execution Complete ---")
        return final_plan

# 타입 힌팅을 위해 스터틱 메서드로 정의했습니다.
__all__ = ["ActionPlanService"]