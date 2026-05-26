## 🔍 신뢰 회복을 위한 핵심 지표 선정 및 데이터 수집 방안 분석 보고서

### 1. 요약
사용자 신뢰 회복은 단순한 기능 안정성을 넘어, 사용자가 느끼는 불확실성과 좌절감을 최소화하는 데서 시작됩니다. 본 보고서는 시스템 지표(메트릭)와 비즈니스 KPI 간 연관성을 분석하여, 결제 실패 및 성공 경험에서 사용자 신뢰를 재건하는 데 가장 효과적인 핵심 지표 3 가지를 선정하고, 이를 측정하기 위한 데이터 수집 계획을 제시합니다.

### 2. 선정된 핵심 지표 (Top 3 Trust Metrics)
각 지표는 LTV 보호와 churn 예방이라는 비즈니스 KPI 와 강한 상관관계를 보입니다. 💼 현빈의 "재시도 성공률"과 "소요 시간"을 기본으로 확장하되, 신뢰 회복에 직접적으로 연결되는 새로운 관점을 추가합니다.

#### 지표 1: 결제 재시도 성공률 (Payment Retry Success Rate, PRSR)
- **정의:** `(성공한 재시도 횟수 / 총 재시도 시도 횟수) × 100`
- **신뢰 회복 메커니즘:** 사용자의 금전적/시스템적 좌절감을 즉시 해소하고 "시스템이 문제를 해결해 준다는" 느낌을 줍니다. PRSR 이 높을수록 재구매 의도와 LTV 가 증가합니다. 💼 현빈의 KPI 로 이어지며, 이는 LTV 보호에 가장 직접적으로 기여합니다.
- **데이터 수집 방안:** 
  - `payment.py` 와 `onboarding.py` 에서 성공/실패 로직 주위에 이벤트 로깅 추가 (예: `retry_success`, `retry_attempt`).
  - 기존 메트릭 수집 시스템(예: Prometheus) 에 새로운 카운터 등록.

#### 지표 2: 오류 해결 시간 (Error Resolution Time, ERT)
- **정의:** 결제 오류 발생부터 사용자가 명확한 대안을 제시받거나 다음 단계로 이동할 때까지의 시간.
- **신뢰 회복 메커니즘:** 불확실성을 줄여줍니다. 3 초 이내의 빠른 안내는 사용자의 불안감을 낮추고 신뢰를 높입니다. 🎨 Designer 의 "심리적 이득 극대화" 가이드라인과 일치하며, UI 에서 즉시 제공되는 대안(예: 다른 결제 수단 전환)이 ERT 를 단축시킵니다.
- **데이터 수집 방안:**
  - 오류 발생 시점 로그(`onboarding_error`), 해결 또는 대안 제시 시점 로그(`error_resolved`).
  - SQL 쿼리로 `create_time` 과 `resolved_at` 의 차이를 계산 (테스트 환경에서는 Mock 데이터 생성 가능).

#### 지표 3: 시스템 복구 속도 (Recovery Speed, RS) — 장애 발생 후 정상 서비스 재개까지의 시간.
- **정의:** 결제 게이트웨이 다운이나 내부 오류 시, 모든 사용자에게 정상 응답을 다시 제공하는 데 걸리는 시간.
- **신뢰 회복 메커니즘:** 신뢰는 "시스템이 항상 작동한다"는 믿음에서 비롯됩니다. RS 가 짧을수록 고객 이탈률이 낮아집니다. 💻 코다리의 E2E 테스트 목표와 연결하여, 장애 발생 시 자동 복구 프로세스의 속도를 측정합니다.
- **데이터 수집 방안:**
  - 인프라 모니터링 도구(예: Datadog) 를 활용하여 `up_time` 과 `down_start` / `recovery_time` 이벤트 추적.
  - 비즈니스 로직은 영향 없으므로, 운영팀의 업무 프로세스와 연동됩니다.

### 3. 비즈니스 KPI와의 연관성 분석 (Qualitative Correlation)
- **LTV 보호:** 지표 1(PRSR) 이 높으면 재시도 기회를 놓치지 않아 매출 손실이 줄어듭니다. 지표 2(ERT) 가 짧을수록 CS 비용이 감소하고 LTV 에 기여합니다. 💼 현빈의 "LTV 보호 기여도"와 유사하지만, 신뢰 회복에 초점을 맞춥니다.
- **Churn 예방:** 신뢰는 한 번의 나쁜 경험으로 쉽게 무너집니다. ERT 와 RS 는 그 경험을 최소화하여 재구매 확률을 높입니다. 🎨 Designer 의 "신호등 시스템"(🟢 Green: 정상, 🔴 Red: 비상) 과 연계하여 대시보드에서 신뢰 상태를 시각화할 수 있습니다.

### 4. 데이터 수집 및 분석 파이프라인 설계 (Data Collection Framework)
#### 4.1 코드 레벨에서 측정 포인트 추가
- `payment.py`: 
  ```python
  # 결제 성공/실패 로직 주위에 이벤트 기록
  log_event("retry_attempt", attempt_id=...)
  log_event("retry_success", ...)
  ```
- `onboarding.py`:
  ```python
  error_start = time.time() if payment_error else None
  ...
  resolve_time = time.time() - error_start if error_start else None
  ```

#### 4.2 모니터링 스택 확장 (Observability Stack)
- 기존 로깅(예: Serilog) 을 Prometheus exporters 와 연결하여 실시간 대시보드 구축.
- Grafana 템플릿 준비: 신뢰 지표 대시보드 (PRSR, ERT, RS 가 신호등으로 표시).

#### 4.3 SQL 기반 메트릭 추출 (테스트/분석용)
- 거래 로그 테이블(`transactions`) 에서 다음 쿼리 실행:
```sql
SELECT 
    DATE(created_at) as date,
    SUM(CASE WHEN status = 'retry_success' THEN 1 ELSE 0 END) / NULLIF(SUM(status IN ('retry_attempt','retry_success')),0) * 100 as prsr
FROM transactions
WHERE created_at >= '2026-05-01';
```

### 5. 구현 로드맵 (Implementation Roadmap)
- **단기 (1~2 주):** 코드 레벨에서 이벤트 로깅 추가, 모니터링 스택 설정 및 대시보드 구축 완료.
- **중장기 (3 개월):** 분석 결과를 기반으로 KPI 를 시스템 최적화 지표로 통합하여 운영팀의 의사결정에 반영.

### 6. 결론
신뢰 회복을 위한 핵심 지표는 단순한 기술 지표가 아니라, 사용자 경험과 직접 연결된 비즈니스 지표를 선택해야 합니다. 제안된 PRSR, ERT, RS 는 💼 현빈의 KPI 와 💻 코다리의 안정성 목표를 확장하며, 데이터 수집 방안은 기존 인프라를 최소改动으로 확장 가능합니다. 🎨 Designer 의 시각적 가이드라인과 연계하여 대시보드를 사용자 친화적으로 만들면 더욱 효과적입니다.