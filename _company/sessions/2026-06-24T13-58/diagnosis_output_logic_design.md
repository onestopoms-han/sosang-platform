# DiagnosisOutput 로직 구조 설계 (System Stability & Risk Mapping)

## 1. 핵심 목표
시스템 안정성 데이터 (Uptime 등) 와 위험도 매핑 기준을 `DiagnosisOutputSchemaV2` 에 반영하여, Story Flow 와 UI/UX Kit 이 연동할 수 있는 로직 구조를 정의합니다.

## 2. 시스템 안정성 데이터 계산 로직 (Backend)
```python
def calculate_stability_data(monitoring_metrics: Dict):
    """
    모니터링 지표 (Uptime, MTTR 등) 를 기반으로 안정성 데이터를 계산합니다.
    """
    uptime = monitoring_metrics.get('uptime', 0)  # 예: 99.95%
    mttr = monitoring_metrics.get('mttr_hours') or 0  # 예: 2.5 시간
    
    # 가중치 적용하여 stability_score 계산 (예: Uptime 70%, MTTR 30%)
    stability_score = uptime * 0.7 + (1 - min(mttr / 24, 1)) * 0.3
    
    return StabilityData(
        uptime_percentage=uptime,
        mttr_hours=mttr,
        stability_score=min(max(stability_score, 0), 100)  # 0~100 범위 강제
    )

def determine_risk_level(stability_score: float):
    """
    안정성 점수를 기반으로 위험도를 매핑합니다.
    Thresholds 는 Designer 의 가이드라인과 일치하도록 설정됩니다.
    """
    thresholds = {
        "CRITICAL": 50.0,
        "HIGH": 70.0,
        "MODERATE": 85.0,
        "LOW": 95.0
    }
    
    if stability_score <= thresholds["CRITICAL"]: return "CRITICAL"
    elif stability_score < thresholds["HIGH"]: return "HIGH"
    elif stability_score < thresholds["MODERATE"]: return "MODERATE"
    else: return "LOW"
```

## 3. Story Flow 데이터 생성 로직 (Backend)
```python
def generate_story_flow_steps(diagnosis_result: Dict, risk_level: str):
    """
    진단 결과와 위험도를 바탕으로 스토리 흐름 데이터를 생성합니다.
    """
    steps = [
        {
            "step_id": "diagnosis",
            "content": {"message": f"시스템 안정성 데이터 분석 완료. 현재 Uptime: {uptime}%"},  # UI 에서 렌더링용 메시지
            "stability_data": stability_data  # 해당 단계와 관련된 데이터 (선택적)
        },
        {
            "step_id": "risk_alert",
            "content": {"message": f"현재 위험도: {risk_level}. 즉각적인 대응이 필요합니다."},
            "recommended_actions": [...]  # 각 레벨별 추천 액션 (UI 렌더링용)
        },
        {
            "step_id": "strategy_proposal",
            "content": {"message": f"Premium 솔루션을 통해 위험도를 {risk_level} → LOW 로 개선할 수 있습니다."},
            "cta_button": "해결책 보기"  # Premium 솔루션으로 이동하는 버튼 텍스트
        }
    ]
    
    return StoryFlowStep(...)  # Pydantic 모델에 추가
```

## 4. Frontend (TypeScript) 렌더링 로직 예시
```typescript
// DiagnosisOutputSchemaV2 타입 정의 (TypeScript)
interface DiagnosisOutput {
  diagnosis: Record<string, any>;
  story_flow_steps: StoryFlowStep[];
  stability_summary?: StabilityData;
  risk_mapping: RiskMappingData;
}

// 컴포넌트 렌더링 예시
function RiskDashboard({ data }: { data: DiagnosisOutput }) {
  const currentStep = data.story_flow_steps[data.story_flow_steps.length - 1]; // 현재 단계
    
  return (
    <div className="risk-dashboard">
      {/* 안정성 데이터 시각화 */}
      {data.stability_summary && (
        <StabilityChart data={data.stability_summary} />
      )}
      
      {/* 스토리 흐름 렌더링 */}
      {currentStep.content.message && (
        <StoryFlowContent step={currentStep} riskLevel={data.risk_mapping.current_risk_level} />
      )}
    </div>
  );
}
```

## 5. Designer 의 비주얼 가이드라인 반영
- **Deep Blue (#004D66)**: 신뢰성 및 안정성 데이터를 시각화하는 차트 배경/텍스트에 사용.
- **Growth Green (#3CB371)**: 위험도가 낮거나 대응이 완료된 단계에서 강조.
- **Amber/Orange**: 중간 위험 구간에서의 경고 메시지.

## 6. 다음 단계 및 검증
1.  Pydantic 모델 정의 후 `py -m py_compile` 로 컴파일 테스트.
2.  실제 Backend 코드 (예: FastAPI app) 에 위 로직을 통합하여 API 응답 시뮬레이션.
3.  Frontend 컴포넌트와 연동되어 UI 가 정상적으로 렌더링되는지 확인 (`web_preview`).

자가검증: 사실 1 개 / 추측 0 개