"""
BDS 소상공인플렛폼 BEP 시나리오 재검증 스크립트
초기 가정: AOV=$75, CAC=$30 -> 목표: AOV=$90
마케팅 비용 증가에 따른 CAC 변화 반영 및 손익분기점 도달 시점 계산
"""

# --- 초기 가정값 설정 ---
INITIAL_AOV = 75.0
INITIAL_CAC = 30.0
TARGET_AOV = 90.0

# --- 변수: 마진율과 고객 유지율 (가정) ---
MARGIN_RATE = 0.60  # 평균 마진율 가정 (제품별 상이 가능)
RETENTION_RATE = 0.85  # 월간 고객 유지율 (LTV 계산 시 사용)

# --- 변수: 마케팅 비용 증가 시나리오 (ACV 대비 추가 비용) ---
SCENARIOS = [
    {"description": "초기 상태 (AOV=$75, CAC=$30)", "marketing_cost_increase": 0.0},
    {"description": "AOV $90 달성 (마케팅 투자 증가)", "marketing_cost_increase": 15.0}, # AOV 대비 추가 비용 가정
]

def calculate_bep(aov, cac, margin_rate, ltv_factor=4):
    """
    손익분기점 도달 고객 수 계산
    LTV = AOV * Retention * Discount (간단하게 AOV * Margin * 12개월 유지가 LTV 대략적)
    BEP 고객 수 = CAC / (LTV - CAC) -> 이 공식은 LTV > CAC 일 때만 유효함. 
    대신, 단순한 '마진으로 CAC를 상쇄하는 데 필요한 매출'을 계산.

    BEP 도달 고객 수 = CAC / Margin * 100% (이해가 안됨) -> 더 간단한 접근:
    단위 마진 = AOV * Margin
    손익분기점 도달 고객 수 = CAC / 단위 마진
    """
    unit_margin = aov * margin_rate
    if unit_margin <= 0:
        return float('inf'), "마진이 없습니다."
    
    # BEP 도달 고객 수 (CAC 를 커버하기 위한 최소 고객)
    customers_to_bep = cac / unit_margin
    
    # 손익분기점 달성을 위한 매출 (BEP Revenue)
    bep_revenue = customers_to_bep * aov
    
    return customers_to_bep, bep_revenue

def main():
    print("="*60)
    print("📊 BDS 소상공인플렛폼 - BEP 시나리오 재검증")
    print("="*60)
    
    results = []
    
    for scenario in SCENARIOS:
        aov_val = TARGET_AOV if scenario["description"] != "초기 상태 (AOV=$75, CAC=$30)" else INITIAL_AOV
        # 초기 상태에서는 AOV 를 명시적으로 사용
        if scenario["description"] == "초기 상태 (AOV=$75, CAC=$30)":
            aov_val = INITIAL_AOV
        
        cac_val = scenario.get("cac", INITIAL_CAC)  # 마케팅 비용 증가가 CAC 에 미치는 영향 고려
        marketing_increase = scenario["marketing_cost_increase"]
        
        print(f"\n📌 시나리오: {scenario['description']}")
        print("-" * 40)
        
        customers_bep, revenue_bep = calculate_bep(aov_val, cac_val, MARGIN_RATE)
        
        # AOV 상승에 따른 추가 마케팅 비용 (CAC 증가 가정)
        if scenario["description"] != "초기 상태 (AOV=$75, CAC=$30)":
            new_cac = INITIAL_CAC + marketing_increase  # AOV 대비 마케팅 투자 증가로 인한 CAC 상승
            print(f"  📈 AOV: ${aov_val:.2f} -> 단위 마진: ${aov_val * MARGIN_RATE:.2f}")
            print(f"  💰 CAC: ${new_cac:.2f} (기초 ${INITIAL_CAC} + 마케팅 증가 ${marketing_increase:.2f})")
        else:
            new_cac = INITIAL_CAC
            print(f"  📈 AOV: ${aov_val:.2f} -> 단위 마진: ${aov_val * MARGIN_RATE:.2f}")
            print(f"  💰 CAC: ${new_cac:.2f}")
        
        print(f"  👥 BEP 고객 수: {customers_bep:.1f} 명")
        print(f"  💵 BEP 매출: ${revenue_bep:.2f}")

    # --- 정리 ---
    print("\n📊 요약:")
    print("="*60)
    
    for scenario in SCENARIOS:
        aov_val = TARGET_AOV if scenario["description"] != "초기 상태 (AOV=$75, CAC=$30)" else INITIAL_AOV
        new_cac = INITIAL_CAC + scenario["marketing_cost_increase"]
        customers_bep, revenue_bep = calculate_bep(aov_val, new_cac, MARGIN_RATE)
        print(f"{scenario['description']}: BEP 고객 {customers_bep:.1f} 명, BEP 매출 ${revenue_bep:.2f}")

if __name__ == "__main__":
    main()