# Analytics Hook 스키마 및 이벤트 로직 설계 초안 (V1.0)

## 1. 개요: 비즈니스 목표와 컴포넌트 측정 기준의 기술적 연결
`TrustWidget`과 `PainGauge`은 사용자의 심리적 상태 (불안, 신뢰) 를 시각화하는 컴포넌트입니다. 이들의 상태는 세그먼트별 KPI (전환율, 유지율, AOV 등) 와 직접적으로 연결되어야 합니다. 본 설계는 **Analytics Hook**이라는 이벤트 기반 시스템으로 이러한 연결을 구현합니다.

### 핵심 원칙
- **감성 데이터 → 비즈니스 로직**: 컴포넌트 상태 (예: PainGauge 위험도 High) 는 사용자에게 '손실 가능성'을 경고하고, 이는 `BDS Partner`로의 전환 유도 로직과 연결됩니다.
- **KPI 목표 → 이벤트 조건**: 세그먼트별 KPI 목표 (예: Pro 세그먼트 30일 내 유지율 85%)는 `analytics_hook`에서 조건문으로 처리됩니다.
- **이벤트 로그 → 피드백 루프**: 모든 Hook 실행은 `event_log`에 기록되어, 백엔드에서 A/B 테스트나 모델 학습에 활용됩니다.

## 2. Analytics Hook 스키마 정의 (Pydantic 기반)

### 2.1 기본 이벤트 구조
```python
from pydantic import BaseModel, Field

class AnalyticsEvent(BaseModel):
    event_id: str = Field(..., description="고유 이벤트 ID")
    user_id: int | None = Field(None, description="사용자 ID (anon_id 가능)")
    timestamp: float = Field(default_factory=lambda: time.time())
    segment: Literal["BDS_Fre", "BDS_Pro", "BDS_Partner"]  # 세그먼트 타입
    component_state: dict = Field(..., description="TrustWidget/PainGauge 현재 상태")
    kpi_target: str | None = Field(None, description="연결된 KPI 목표 코드 (예: 'retention_30d')")
    hook_result: bool  # Hook 성공 여부

class TrustState(BaseModel):
    trust_score: float = Field(..., ge=0, le=100)
    risk_level: Literal["low", "medium", "high"] | None = None
    confidence: float = Field(ge=0.5, le=1.0)

class PainState(BaseModel):
    pain_level: Literal["minor", "moderate", "severe"]  # 신뢰 수준에 따른 위험도
    mitigation_status: str | None = Field(None, description="손실 최소화 전략 적용 상태")
```

### 2.2 이벤트 종류 및 목적
| Hook 타입 | 컴포넌트 상태 조건 | KPI 연결 | 비즈니스 목적 |
|-----------|-------------------|----------|---------------|
| `trust_alert` | TrustWidget `risk_level == "high"` | AOV 감소, 이탈률 증가 | Pro/Partner 전환 유도 |
| `pain_response` | PainGauge `pain_level == "moderate"~"severe"` | 유지율 저하 | 솔루션 제시 (BDS Partner) |
| `kpi_check` | 사용자 행동 + 컴포넌트 상태 조합 | 30일 내 유지율, 전환율 | 자동화된 마케팅 메시지 발송 |

## 3. 이벤트 로직 설계 (백엔드 API 스텁)

### 3.1 Hook 실행 흐름
```
[프론트엔드: 컴포넌트 상태 업데이트] → [Analytics Hook 전송] → [백엔드: KPI 조건 검사] → [결과 반환 + 이벤트 로그 기록]
```

### 3.2 백엔드 API 스텁 (FastAPI)
```python
@app.post("/analytics/hook")
async def analytics_hook(event: AnalyticsEvent):
    # 1. 컴포넌트 상태 파싱
    component = event.component_state
    segment = event.segment

    # 2. KPI 목표 매핑 (예: 'retention_30d'는 30일 내 유지율 85% 유지)
    kpi_map = {
        "BDS_Fre": {"retention_7d": 95, "conversion": 10},
        "BDS_Pro": {"retention_30d": 85, "conversion": 20},
        "BDS_Partner": {"lru_6m": 90, "conversion": 30},
    }

    # 3. 조건문 로직 (예: TrustWidget risk_level == high → Pro 전환 유도)
    if component.get("trust_score") < 50 and kpi_map[segment].get("retention_30d"):
        return {"status": "triggered", "action": "send_pro_upgrade_message"}

    # 4. 이벤트 로그 저장 (Redis + Postgres)
    event.log_id = generate_log_id()
    db.insert(event)

    return {"event_id": event.event_id, "hook_result": True}
```

### 3.3 프론트엔드 연동 (React + Context API)
```tsx
// 컴포넌트 상태 업데이트 시 Analytics Hook 호출
function TrustWidget({ userState }) {
  const [componentState, setComponentState] = useState({ trust_score: 70 });

  useEffect(() => {
    if (userState.risk_level === "high") {
      // Hook 전송
      fetch('/analytics/hook', { method: 'POST', body: JSON.stringify({
        component_state: componentState,
        segment: userState.segment,
        kpi_target: "retention_30d"
      })});
    }
  }, [userState.risk_level]);

  return <widget />; // 컴포넌트 렌더링
}
```

## 4. 초기 구현 체크리스트 (MVP)

- [ ] Analytics Hook 스키마 `AnalyticsEvent.py` 작성 및 유효성 검사 로직 테스트.
- [ ] 백엔드 API `/analytics/hook` 엔드포인트 구현 (FastAPI + Pydantic).
- [ ] 프론트엔드 컴포넌트 (`TrustWidget`, `PainGauge`) 에서 상태 업데이트 시 Hook 전송 테스트.
- [ ] KPI 목표 매핑 데이터 `kpi_map.json` 생성 및 버전 관리.
- [ ] 이벤트 로그 스키마 `event_log_schema.py` 정의 (Postgres 테이블).

## 5. 현빈 (Business) 협업 요청 사항

다음 정보를 제공해 주시면 설계가 정확해질 것입니다:
1. **세그먼트별 KPI 목표값**: 현재 `business_segmentation_and_pricing.md`에 포함된 목표값과 함께, Analytics Hook 에서 참조해야 하는 구체적인 지표 (예: 30일 내 유지율 85%)를 명시하세요.
2. **이벤트 트리거 조건**: 예를 들어 "TrustWidget risk_level == high"일 때 어떤 비즈니스 로직 (메시지 발송, UI 변경 등) 이 실행되어야 하는지 정의해 주세요.

> 💻 코다리: 위 스키마는 TrustWidget/PainGauge의 상태와 세그먼트별 KPI를 연결하는 기본 골격입니다. 현빈님이 제공하는 KPI 목표값과 이벤트 트리거 조건을 바탕으로, 구체적인 로직 맵을 작성하겠습니다.