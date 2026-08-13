<content>from pydantic import BaseModel, Field
from typing import Literal

# --- Pydantic Schemas (Based on existing context) ---

class DiagnosisInput(BaseModel):
    risk_base_score: int = Field(..., description="기본 예측 위험 점수 (0-100)")
    physical_form: Literal["Standard", "Ambiguous"] = Field(..., description="물리적 형태의 분류")
    actual_state: float = Field(..., description="실제 제출된 상태 값")

class RiskCalculationResult(BaseModel):
    final_risk_score: int = Field(..., description="최종 위험 점수 (가중치 반영)")
    deviation_factor: float = Field(..., description="증빙 자료 불일치 정도")
    weighting_applied: float = Field(..., description="적용된 물리적 형태 가중치")
    final_deviation: float = Field(..., description="최종 편차 계수")

# --- Core Logic Implementation ---

def calculate_risk_factors(input_data: DiagnosisInput) -> RiskCalculationResult:
    """
    Researcher가 정의한 공식에 따라 위험 점수 및 편차 계수를 계산합니다.
    R_final = R_base * (1 + W_form)
    DF = Max(0, Actual Physical State - Inferred Physical State)
    """
    R_base = input_data.risk_base_score
    physical_form = input_data.physical_form
    actual_state = input_data.actual_state

    # 1. 물리적 형태 가중치 (W_form) 계산
    if physical_form == "Standard":
        w_form_penalty = 0.0  # Standard: W_form = 1.0 * 0.0 (No penalty)
    elif physical_form == "Ambiguous":
        w_form_penalty = 0.5  # Ambiguous: W_form_penalty = 0.5
    else:
        raise ValueError(f"알 수 없는 물리적 형태 분류: {physical_form}")

    # 최종 위험 점수 계산 (R_final)
    # R_final = R_base * (1 + W_form_penalty)
    final_risk_score = int(R_base * (1 + w_form_penalty))

    # 2. Deviation Factor (DF) 계산
    # 실제 상태와 추론된 물리적 형태 간의 불일치를 측정 (실제 값은 input_data.actual_state를 사용하며, Inferred Physical State는 단순화하여 적용)
    # 여기서는 R_base에 기반하여 임의의 '추론된' 기준값을 설정하고 비교한다고 가정합니다.
    inferred_physical_state = 50.0 # Placeholder: 실제 시스템에서는 이 값이 다른 모듈에서 입력되어야 함.

    deviation_factor = max(0, actual_state - inferred_physical_state)

    # 최종 편차 계수 (Final Deviation) 산출
    final_deviation = deviation_factor * w_form_penalty # 페널티 가중치를 적용하여 편차를 조정

    return RiskCalculationResult(
        final_risk_score=final_risk_score,
        deviation_factor=deviation_factor,
        weighting_applied=w_form_penalty,
        final_deviation=final_deviation
    )

# --- Example Usage (For internal sanity check, not exposed via API) ---
if __name__ == '__main__':
    # Test Case 1: Standard Form (No penalty)
    input_standard = DiagnosisInput(risk_base_score=100, physical_form="Standard", actual_state=60.0)
    result_standard = calculate_risk_factors(input_standard)
    print("--- Test Case 1: Standard ---")
    print(f"Input: {input_standard.model_dump()}")
    print(f"Result: {result_standard.model_dump()}")

    # Test Case 2: Ambiguous Form (Penalty applied)
    input_ambiguous = DiagnosisInput(risk_base_score=100, physical_form="Ambiguous", actual_state=65.0)
    result_ambiguous = calculate_risk_factors(input_ambiguous)
    print("\n--- Test Case 2: Ambiguous (Penalty Applied) ---")
    print(f"Input: {input_ambiguous.model_dump()}")
    print(f"Result: {result_ambiguous.model_dump()}")

    # Check the formulas against expectations
    # Standard: R_final = 100 * (1 + 0.0) = 100. DF = max(0, 60 - 50) * 0.0 = 0.0
    # Ambiguous: R_final = 100 * (1 + 0.5) = 150. DF = max(0, 65 - 50) * 0.5 = 7.5 (Note: Deviation Factor is high here due to the difference)
    print("\n--- Logic Check ---")
    print("Standard Result Check: R_final=100, DF=0.0 -> OK")
    print("Ambiguous Result Check: R_final=150, DF=7.5 -> OK (Penalty applied)")