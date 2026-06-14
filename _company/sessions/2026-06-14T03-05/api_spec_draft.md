# 📡 BDS소상공인플렛폼 — 핵심 API 명세 초안 (Draft V1)

## 1. 개요 및 목적
이 명세는 **Trust Widget** 과 **PainGauge** 기능을 구현하기 위한 최소한의 백엔드 데이터 흐름과 API 엔드포인트를 정의합니다.  
Designer 가 설계한 UI/UX 와 Writer 가 쓴 스토리라인을 기술적으로 구현 가능하게 만듭니다.

## 2. 핵심 개념 및 데이터 모델 (Core Concept & Data Model)
### 2.1 데이터 수집 원칙
- **최소한의 데이터**: 사용자 프라이버시 보호를 위해 최소한의 필드만 수집합니다.
- **구조화된 이벤트**: 모든 인터랙션은 `event_id`, `timestamp`, `user_session` 을 포함해야 합니다.
- **가치 기반**: 데이터는 단순 기록이 아닌, '위험-해결-성과' 스토리라인의 한 부분입니다.

### 2.2 주요 엔티티
- `RiskAssessment`: 진단 결과 (PainGauge 기준 위험도)
- `ActionPlan`: 코칭 단계 및 해결책
- `ConversionEvent`: 유료 전환 시도 (Trust Widget 기반)

## 3. API 스텁 및 엔드포인트 정의 (Endpoint Definition)

### 3.1 진단 결과 및 위험도 조회 (`/api/v1/diagnosis`)
**GET /diagnosis**  
- **설명**: 사용자의 현재 상태에 따른 PainGauge 데이터와 다음 액션 플랜을 반환합니다.  
- **Request Headers**: `Authorization`, `User-ID`  
- **Response 200 OK**:  
```json
{
  "risk_level": "high", // 'low', 'medium', 'high'
  "pain_score": 85,    // PainGauge 점수 (1~100)
  "story_stage": "crisis", // 'crisis', 'solution', 'growth'
  "next_action_id": "ip-02" // 다음 인터랙션 지점 ID
}
```

### 3.2 신뢰도 위젯 전환 시도 (`/api/v1/trust`)
**POST /trust**  
- **설명**: 사용자가 Trust Widget 을 통해 유료 플랜에 관심 있음을 표현할 때 호출됩니다.  
- **Request Body**:  
```json
{
  "user_id": "...",
  "plan_type": "premium", // 'basic', 'premium'
  "conversion_source": "widget"
}
```
- **Response 201 Created**:  
```json
{
  "success": true,
  "message": "관심 표시 저장됨. 다음 액션으로 이동합니다.",
  "next_step_id": "ip-03"
}
```

### 3.3 사용자 행동 데이터 수집 (`/api/v1/tracking`)
**POST /tracking/event**  
- **설명**: 파일럿 프로그램 내의 모든 인터랙션을 기록합니다.  
- **Request Body**:  
```json
{
  "event_type": "click", // 'click', 'view', 'purchase'
  "component_id": "pain-gauge-chart", // UI 컴포넌트 ID
  "data_point": {"value": 45, "unit": "score"}, // 가변 데이터
  "timestamp": "2026-06-14T03:05:00Z"
}
```

## 4. KPI 및 성과 지표 (KPI & Metrics)

### 4.1 핵심 성과 지표 (Key Performance Indicators)
- **Trust Score**: 사용자가 플랫폼을 신뢰하는 정도 (Widget 노출 횟수 대비 전환율).  
- **Pain Mitigation Rate**: PainGauge 점수가 감소한 사용자의 비율.  
- **Conversion Efficiency**: Trust Widget 노출당 유료 플랜 구매 건수.

### 4.2 데이터 수집 지점 (Data Collection Points)
- `IP-01`: 진단 시작 시점 (Rust Score 초기화)  
- `IP-02`: PainGauge 표시 후 첫 클릭  
- `IP-03`: Trust Widget 노출 후 전환 시도  

## 5. 다음 단계 및 검증 계획 (Next Steps & Validation Plan)
1. **코다리**: 이 명세를 바탕으로 실제 Python/FastAPI 코드 구조를 설계합니다.  
2. **Designer**: 명세에 정의된 데이터 구조가 UI/UX 흐름과 일치하는지 최종 확인합니다.  
3. **레오**: 온보딩 시나리오가 `next_action_id` 로 정의된 플로우와 자연스럽게 연결되는지 검증합니다.

---
_생성: 2026-06-14T03:05_