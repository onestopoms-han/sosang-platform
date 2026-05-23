import json
from typing import Dict, Any
from pydantic import BaseModel, Field
import logging

# 로거 설정 (시니어 엔지니어가 항상 하는 습관)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class MaxLossCalculation(BaseModel):
    """연구원이 정의한 최대 손실액 계산 구조를 반영합니다."""
    basis: str = Field(description="손실 추정의 근거 (예: 평균 일일 매출 * 예상 손실률)")
    estimated_period_days: int = Field(description="손실이 발생한 기간 (일)")
    calculated_value: float = Field(description="최대 손실 금액 (KRW)")

class DiagnosisInputSchema(BaseModel):
    """API가 받을 진단 입력 데이터 스키마."""
    scenario_id: str = Field(description="시나리오 고유 ID.")
    small_business_type: str = Field(description="소상공인 업종 (예: 음식점, 소매업).")
    pain_point_description: str = Field(description="고객이 겪는 구체적인 어려움.")
    core_risk_metric: str = Field(description="핵심 리스크 지표 (예: 시스템 가용성 리스크).")
    max_loss_data: MaxLossCalculation

class DiagnosisOutputSchema(BaseModel):
    """최종 진단 결과 출력 스키마. WTP가 포함됨."""
    diagnosis_status: str = Field(description="진단의 종합 상태 (예: High Risk, Monitor).")
    calculated_max_loss: float = Field(description="측정된 최대 손실액.")
    premium_value_proposition: Dict[str, Any] = Field(description="프리미엄 플랜이 제공하는 구체적인 가치 제안 (WTP 근거).")
    story_flow_recommendation: str = Field(description="사용자에게 제시할 다음 스토리 흐름/액션 단계.")

def calculate_wtp_and_diagnose(input_data: DiagnosisInputSchema) -> DiagnosisOutputSchema:
    """
    [핵심 비즈니스 로직] Max Loss를 기반으로 WTP와 최종 진단 결과를 도출하는 서비스.
    이 함수는 모든 비즈니스 규칙과 가치 제안의 핵심을 담고 있습니다.
    """
    logging.info(f"--- Starting Diagnosis for Scenario: {input_data.scenario_id} ---")

    # 1. Max Loss 분석 및 위험도 결정 (Diagnosis Status)
    max_loss = input_data.max_loss_data.calculated_value
    if max_loss >= 2000000: # 임의의 비즈니스 로직 기준 설정
        diagnosis_status = "Critical Risk"
        story_flow_recommendation = f"{input_data.small_business_type} 업종은 {input_data.core_risk_metric}에 매우 취약합니다. 즉각적인 시스템 개선이 필요합니다."
    elif max_loss >= 500000:
        diagnosis_status = "High Risk"
        story_flow_recommendation = f"현재 손실 규모를 줄이기 위한 단기 방안 마련과 함께, 근본적인 대비책을 강구해야 합니다."
    else:
        diagnosis_status = "Low Risk / Monitoring"
        story_flow_recommendation = "리스크는 낮지만, 시장 변화에 대한 지속적인 모니터링이 필요합니다. 예방적 관점을 가져야 합니다."

    # 2. WTP (Willingness To Pay) 근거 도출 - 가상의 프리미엄 Value Proposition
    # 실제로는 복잡한 알고리즘이나 ML 모델을 사용해야 하지만, PoC를 위해 로직으로 대체합니다.
    premium_value = {
        "basis": "Max Loss의 X%에 해당하는 시간 절약 또는 매출 보장 효과",
        "quantifiable_benefit": f"{max_loss * 0.1:.0f}원 상당의 손실 예방 가치 제공 (월 기준)", # 임시 계산
        "differentiator": "24시간 전문 컨설팅 및 전담 기술 지원 (경쟁사 대비 우위)"
    }

    # 3. 최종 결과 구조화
    output = DiagnosisOutputSchema(
        diagnosis_status=diagnosis_status,
        calculated_max_loss=float(max_loss),
        premium_value_proposition=premium_value,
        story_flow_recommendation=story_flow_recommendation
    )
    logging.info("--- Diagnosis Completed Successfully ---")
    return output

# --------------------
# 테스트용 Mock Data 로드 함수 (PoC 환경 구축을 위함)
# --------------------
def load_mock_data(file_path: str) -> Dict[str, Any]:
    """Mock 데이터 파일을 읽어와서 파이썬 객체로 반환합니다."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        logging.error(f"Mock Data 파일을 찾을 수 없습니다: {file_path}")
        return {}

if __name__ == "__main__":
    # 테스트 실행 예시 (스크립트가 직접 돌아갈 때만 동작하도록 main 블록에 배치)
    print("--- WTP Calculator Service Test Run ---")
    # Researcher님이 만든 mock data 파일 경로를 사용합니다.
    mock_data = load_mock_data("../mock_data/test_dataset_specification_v1.json")

    if 'mock_scenarios' in mock_data and mock_data['mock_scenarios']:
        first_scenario = mock_data['mock_scenarios'][0]
        print(f"\n[테스트 스케줄: {first_scenario['scenario_name']}]")

        # 입력 데이터 객체 생성 시뮬레이션 (Mock Data를 Schema에 맞게 변환)
        input_schema = DiagnosisInputSchema(
            scenario_id=first_scenario["scenario_id"],
            small_business_type=first_scenario["small_business_type"],
            pain_point_description=first_scenario["pain_point_description"],
            core_risk_metric=first_scenario["core_risk_metric"],
            max_loss_data=MaxLossCalculation(**first_scenario["max_loss_calculation"])
        )

        # 핵심 함수 실행
        result = calculate_wtp_and_diagnose(input_schema)

        print("\n========================================")
        print("✅ 최종 진단 결과 (Diagnosis Output):")
        print(json.dumps(result.dict(), indent=2, ensure_ascii=False))
        print("========================================\n")
    else:
        logging.warning("테스트할 Mock Data를 찾을 수 없습니다. 파일 경로를 확인해 주세요.")

# --------------------
# 끝
# --------------------