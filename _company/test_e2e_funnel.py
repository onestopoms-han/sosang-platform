# End-to-End 사용자 시나리오 통합 테스트 스크립트 (KPI 검증용)
# 목적: Pain Point Score 입력 -> Action Plan 계산 및 KPI Impact 측정까지의 전체 데이터 흐름을 검증한다.

import json
from action_plan_service import calculate_kpi_impact # 새로 추가된 함수 사용 가정

def run_scenario_test(scenario_name, pain_point_data):
    """하나의 시나리오에 대해 E2E 테스트를 실행하고 KPI 결과를 출력한다."""
    print(f"\n--- [시나리오 시작] {scenario_name} ---")
    
    # 1. Pain Point Score 입력 (랜딩 페이지 Front-end Input Mock)
    pain_point_score = pain_point_data['initial_pain_point']
    print(f"[STEP 1/3: 데이터 입력]: 초기 손실 비용 추정치 (Pain Point Score): {pain_point_score}점")

    # 2. Action Plan 계산 및 KPI Impact 측정 (Backend Logic)
    suggested_action = pain_point_data['optimal_action']
    kpi_result = calculate_kpi_impact(pain_point_score, suggested_action)
    
    print(f"[STEP 2/3: 로직 실행]: Action Plan 기반 KPI Impact 계산 완료.")
    print(f"  -> 예상 절감 효과 (KPI Score): {kpi_result['kpi_impact_score']}점")

    # 3. 최종 의사결정 유도 및 측정 지표 기록 (Final Conversion Check)
    if kpi_result['kpi_impact_score'] > 5: # 임의 기준 설정
        print("[STEP 3/3: 컨버전 검증]: Impact가 높으므로, '전문 컨설팅 신청' CTA 노출 및 가상 전환 성공.")
        return {"KPI Score": kpi_result['kpi_impact_score'], "Conversion Status": "Success", "Target KPI Met": True}
    else:
        print("[STEP 3/3: 컨버전 검증]: Impact가 낮아, '추가 정보 탐색' 유도 및 전환 실패.")
        return {"KPI Score": kpi_result['kpi_impact_score'], "Conversion Status": "Fail", "Target KPI Met": False}

# --- 테스트 케이스 셋팅 (실제 파일럿 데이터 대용) ---
test_scenarios = [
    {
        "name": "A. 매장 노후화로 인한 손실 최소화 시나리오",
        "initial_pain_point": 15.0, # 높음
        "optimal_action": "매장 간판 전면 교체 및 '나들가게' 공동 브랜드 적용 (300만원 예상)"
    },
    {
        "name": "B. 재고 관리 비효율로 인한 손실 최소화 시나리오",
        "initial_pain_point": 8.5, # 중간
        "optimal_action": "간단한 QR 기반 실시간 재고 공유 시스템 도입 (월 구독료 10만원 예상)"
    },
    {
        "name": "C. 마케팅 채널 파악 실패로 인한 손실 최소화 시나리오",
        "initial_pain_point": 3.0, # 낮음
        "optimal_action": "지역 커뮤니티 온라인 광고 시작 (소액 테스트)"
    }
]

# 모든 시나리오 실행 및 결과 리포팅
all_results = []
for scenario in test_scenarios:
    result = run_scenario_test(scenario["name"], scenario)
    all_results.append(result)

print("\n==========================================")
print("✅ [최종 요약] E2E 테스트 시나리오 완료")
print(f"총 {len(test_scenarios)}개 시나리오 중, 성공적으로 KPI가 측정된 케이스: {sum(1 for r in all_results if r['Target KPI Met'])} / {len(test_scenarios)}")

# 실제 보고서 작성을 위해 결과를 JSON 파일로 저장
with open("e2e_kpi_report.json", 'w') as f:
    json.dump(all_results, f, indent=4)
print("\n[시스템 알림] 테스트 결과가 e2e_kpi_report.json 파일에 성공적으로 저장되었습니다.")