# MVP 데이터 무결성 & 수익화 로직 통합 명세서 (v1.0)

## 1. 배경 및 목적
- **배경**: 개발팀이 정의한 `SME-AlertBadge`, `MetricCard` 컴포넌트의 JSON Schema와 백엔드 유효성 검증 로직은 데이터 무결성을 보장해야 하지만, 금융 제휴 수익화(예: PayPal) 시 API 비용, 플랫폼 부담, 리스크 전가 조항과 충돌할 수 있음.
- **목적**: MVP 성공을 위해 데이터 누락, 시스템 오류 등 예외 상황에서도 사용자 경험(UX)을 유지하면서 수익 모델이 정상 작동하도록 통합 명세를 작성함.

## 2. 통합 원칙
1. **데이터 무결성 우선**: 금융 제휴 API 응답의 유효성을 JSON Schema 규칙으로 검증하여 `null` 또는 에러 메시지를 표시하지 않고, 시각적으로 안전한 Fallback 상태(`SME-AlertBadge`)로 전환됨.
2. **수익화 로직 연계**: PayPal API 비용 및 플랫폼 부담이 발생하면 수익 모델 연동 시 '시스템 점검 중' 배지가 UI에 노출되도록 개발 명세에 반영함.
3. **MVP 성공 기준**: 데이터 누락 리스크 해결과 수익화 로직이 정확히 연동되어, 초기 테스트 기간(5~10 곳 생산자 대상) 동안 99% 이상 정상 응답 시 MVP 성공으로 간주함.

## 3. 통합 요구사항 명세
### 3.1 컴포넌트별 데이터 무결성 & 수익화 로직 매핑
| 컴포넌트 | JSON Schema 제약 조건 | 데이터 누락 예외 처리 | 수익화 로직 연동 |
|----------|----------------------|-----------------------|-------------------|
| `SME-AlertBadge` | `"type": "object", "properties": { "status": {"enum": ["ok", "check"] } }` | API 429 (Rate Limit) → status: "check" + 배지 색상 경고색 → 안정색 전환 | PayPal API 비용 발생 시, '시스템 점검 중' 배지가 UI에 노출됨. |
| `MetricCard` | `"properties": { "revenue": {"type": "number", "minimum": 0 } }` | API 응답 누락 → revenue: null → MetricCard 은 데이터 없이도 정상 렌더링 (색상 안정색 유지) | 플랫폼 부담액 발생 시, 수익 모델 연동 로직을 백엔드 유효성 검증 규칙에 추가함. |

### 3.2 백엔드 유효성 검증 로직 (Python Pseudo-code)
```python
def validate_payment_response(api_response):
    # JSON Schema 제약 조건 적용
    schema = {
        "type": "object",
        "properties": {"status": {"enum": ["ok", "check"]}, "revenue": {"minimum": 0}}
    }
    
    if not json_validator.validate(schema, api_response):
        # 데이터 무결성 위반 → Fallback 상태 전환
        return {
            "error_type": "api_timeout",
            "fallback_ui_state": "system_check"  # UI 컴포넌트에 'SME-AlertBadge' 노출
        }
    else:
        # 정상 응답 → 수익화 로직 적용
        apply_revenue_logic(api_response["revenue"])

def apply_revenue_logic(revenue_amount):
    # PayPal API 비용 및 플랫폼 부담 계산
    platform_fee = calculate_platform_burden(revenue_amount)
    profit_margin = revenue_amount - (platform_fee + api_cost)
    
    if profit_margin > 0:
        return {"transaction_status": "success", "fee_breakdown": {...}}
    else:
        # 수익 모델이 정상 작동하지 않음 → '시스템 점검 중' 배지 노출
        return {
            "error_type": "financial_risk",
            "ui_state": "system_check"  # 개발팀 요구사항과 일치하는 Fallback 상태
        }
```

### 3.3 UI 컴포넌트와의 연동 (Designer 팀 참고)
- `SME-AlertBadge` 는 JSON Schema `"status": "check"` 상태를 받아 경고색(예: 주황색)에서 안정색(예: 파란색)으로 전환됨.
- `MetricCard` 는 데이터 누락 시에도 렌더링이 중단되지 않고, '데이터 없음' 상태 시각화 (안정색 유지) 로 설계됨.

## 4. MVP 성공 우선순위 기준
| 우선순위 | 항목 | 근거 및 기대 효과 |
|----------|------|-------------------|
| **P0** | 데이터 무결성 & 수익화 로직 연동 명세 확정 | 개발팀과 비즈니스 팀 간의 충돌 방지, 초기 테스트 기간 중 사용자 경험(UX) 보장. |
| **P1** | JSON Schema 규칙을 백엔드 유효성 검증 로직에 반영 | API 응답의 오류를 UI 컴포넌트에서 안전하게 처리하여 수익화 모델의 안정성을 확보. |
| **P2** | '시스템 점검 중' 배지 노출 시 수익 모델 연동 테스트 | 실제 금융 제휴 API 호출 시, Fallback 상태가 정상적으로 작동하는지 MVP 환경에서 검증. |

## 5. 다음 단계 (대기)
- **코다리 (Developer)**: JSON Schema 규칙을 백엔드 유효성 검증 로직에 반영하고, '시스템 점검 중' 배지가 UI 컴포넌트에 노출될 때 수익 모델 연동 테스트를 즉시 시작함.
- **Designer**: `SME-AlertBadge`, `MetricCard` 의 Fallback 상태 시각화 (안정색 유지) 를 위한 최종 디자인 명세를 작성하여 개발팀에 전달함.

📊 평가: 진행중 — 데이터 무결성 & 수익화 로직 통합 명세 작성을 완료하고, 코다리 및 Designer 에게 우선순위를 분배할 것.
📝 다음 단계: 코다리에 JSON Schema 규칙을 백엔드 유효성 검증 로직에 반영하라고 지시하고, Designer 에게 Fallback 상태 시각화 디자인 명세를 작성하라고 지시함.