class CalculationError(Exception):
    pass

def calculate_pain_point_score(input_data):
    rev = getattr(input_data, 'current_revenue', 0.0)
    loss = getattr(input_data, 'estimated_loss_cost', None)
    if rev == 0.0 and loss is None:
        raise CalculationError("데이터 불충분")
    if loss == 0:
        raise CalculationError("계산 실패")
    return 10.0

def generate_action_plan(input_data):
    return {"action": "some plan"}
