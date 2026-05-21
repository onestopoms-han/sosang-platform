# -*- coding: utf-8 -*-
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from pydantic import BaseModel

router = APIRouter()

# --- 데이터 모델 정의 (diagnosis_input_schema.ts 기반) ---

class DiagnosisInput(BaseModel):
    """AI 진단 엔진에 입력될 소상공인 데이터 스키마."""
    business_type: str  # 예: 식당, 소매점, 서비스업 등
    revenue_level: str  # 예: 초기, 성장기, 안정기 등 (Pain Point 기반)
    pain_points: List[str] # 현재 겪고 있는 구체적인 어려움 목록
    current_strategy: str # 현재 시도하고 있는 해결책
    target_goal: str # 달성하고자 하는 최종 목표

class ActionPrescription(BaseModel):
    """진단 결과로 도출되는 실행 가능한 행동 제안 스키마."""
    actionable_steps: List[Dict[str, Any]] # 구체적인 실행 단계 (Action Plan)
    revenue_increase_potential: float # 예상 매출 증대 잠재력 (%)
    risk_assessment: str # 위험 평가 (낮음, 중간, 높음)
    recommended_next_step: str # 다음으로 취해야 할 가장 중요한 행동

# --- API 엔드포인트 정의 ---

@router.post("/diagnosis", response_model=ActionPrescription, status_code=status.HTTP_200_OK)
async def generate_action_prescription(input_data: DiagnosisInput):
    """
    입력된 데이터를 기반으로 AI 진단 및 실행 가능한 행동 처방을 생성합니다.
    """
    print(f"Received diagnosis request for business type: {input_data.business_type}")

    # TODO: 실제 AI 모델 호출 로직 삽입 (이 부분은 추후 모델 연동)
    # 임시로 더미 데이터 반환
    if "식당" in input_data.business_type:
        action_steps = [
            {"step": 1, "task": "메뉴 가격 구조 재분석", "detail": "원가율 및 고객 지불 의사 기반으로 메뉴군을 재조정합니다."},
            {"step": 2, "task": "온라인 예약 시스템 도입 검토", "detail": "고객 유입 채널 다각화를 위해 예약 기능을 테스트합니다."},
        ]
        return ActionPrescription(
            actionable_steps=action_steps,
            revenue_increase_potential=30.5,
            risk_assessment="중간",
            recommended_next_step="고객 반응 데이터 수집을 위한 설문조사 툴 도입을 우선 검토합니다."
        )
    else:
        return ActionPrescription(
            actionable_steps=[{"step": 1, "task": "기본 시장 조사", "detail": "경쟁사와 현재 상황에 대한 객관적 데이터를 수집합니다."}],
            revenue_increase_potential=15.0,
            risk_assessment="낮음",
            recommended_next_step="현재 운영 데이터의 정량적 분석을 시작합니다."
        )

# TODO: 실제 DB 연동 및 복잡한 로직은 추후 구현 예정.