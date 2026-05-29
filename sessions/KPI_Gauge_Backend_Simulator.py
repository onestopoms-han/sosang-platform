#!/usr/bin/env python3
"""
KPI Gauge Backend Simulator v1.0
- KPI Gauge 컴포넌트의 상태 머신 (Empty, Loading, Error, Warning) 에 대한 실제 데이터 흐름을 시뮬레이션합니다.
- 백엔드 API 응답 예시와 로직을 프론트엔드 팀과 공유하여 데이터 일치성 검증에 사용됩니다.
"""

import json
import time
import random

# 상태 머신 정의 (System Stability Matrix 기준)
STATES = {
    "EMPTY": {"label": "EMPTY", "color": "#333333", "message": "데이터 로드 중..."},
    "LOADING": {"label": "LOADING", "color": "#5D6875", "message": "KPI 분석 중..."},
    "NORMAL": {"label": "NORMAL", "color": "#2ECC40", "message": "시스템 정상 동작"},
    "WARNING": {"label": "WARNING", "color": "#FF9F1C", "message": "리스크 감지됨 (손실 위험도: {risk_level})"},
    "ERROR": {"label": "ERROR", "color": "#EE5253", "message": "시스템 오류 발생 (에러 코드: {error_code})"}
}

def generate_diagnosis_data(risk_type="normal"):
    """
    진단 데이터를 생성합니다.
    risk_type: 'normal', 'warning', 'error'
    """
    if risk_type == "normal":
        return {
            "diagnosis_id": f"diag_{random.randint(1000, 9999)}",
            "status": "NORMAL",
            "timestamp": int(time.time()),
            "kpi_value": random.uniform(85.0, 95.0),
            "trend": "UP",
            "message": STATES["NORMAL"]["message"],
        }
    elif risk_type == "warning":
        return {
            "diagnosis_id": f"diag_{random.randint(1000, 9999)}",
            "status": "WARNING",
            "timestamp": int(time.time()),
            "risk_level": random.choice(["Low", "Medium", "High"]),
            "kpi_value": random.uniform(50.0, 75.0),
            "trend": "DOWN",
            "message": STATES["WARNING"]["message"].format(risk_level=random.choice(["Low", "Medium", "High"])),
        }
    else:  # error
        return {
            "diagnosis_id": f"diag_{random.randint(1000, 9999)}",
            "status": "ERROR",
            "timestamp": int(time.time()),
            "error_code": random.choice(["E001", "E002", "E003"]),
            "kpi_value": None,
            "trend": None,
            "message": STATES["ERROR"]["message"].format(error_code=random.choice(["E001", "E002", "E003"])),
        }

if __name__ == "__main__":
    # 시나리오 1: 정상 상태 데이터 (목업의 '안정성' 강조용)
    print("=== 시나리오 1: NORMAL 상태 데이터 ===")
    for i in range(3):
        data = generate_diagnosis_data(risk_type="normal")
        print(json.dumps(data, indent=2))
        time.sleep(0.5)

    # 시나리오 2: 경고 상태로 전환 (목업의 '감정적 여정' 강조용)
    print("\n=== 시나리오 2: WARNING → ERROR 로 전환 (에러 처리 검증) ===")
    data = generate_diagnosis_data(risk_type="warning")
    print(json.dumps(data, indent=2))
    time.sleep(1.5)

    # 시나리오 3: 에러 상태 및 Recovery (목업의 'Recovery Flow' 강조용)
    print("\n=== 시나리오 3: ERROR → NORMAL 로 복구 ===")
    data = generate_diagnosis_data(risk_type="error")
    print(json.dumps(data, indent=2))
    time.sleep(1.5)

    # 시나리오 4: Empty 상태 (초기 로드 시나리오)
    print("\n=== 시나리오 4: EMPTY 상태 ===")
    data = {"status": "EMPTY", "message": "데이터를 로딩 중입니다..."}
    print(json.dumps(data, indent=2))