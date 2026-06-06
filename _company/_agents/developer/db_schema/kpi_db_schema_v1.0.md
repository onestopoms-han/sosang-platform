<find>
# 📋 KPI Database Schema Specification v1.2 (KPI 계산 로직 $SM$ 공식 기반)

## 1. 개요 및 목표
- **배경**: 소상공인의 '재정 불안(PAIN)'과 '공급망 리스크'를 실시간으로 측정하여 의사결정을 돕는 대시보드 구축.
- **목표**: KPI 로직($SM$ 공식)을 반영한 데이터 모델 설계 및 API 엔드포인트 명세 작성.
- **핵심 지표**:
    - `PAIN_01`: 재정 불안정성 지수 (매출 변동폭 + 현금 흐름 오차율)
    - `PAIN_02`: 공급망 리스크 점수 (지연 배송 + 가격 변동 폭)
    - `SM` 공식: **안전 마진** = `(현재 자본 - 위험 자산) / 현재 자본 * 100`

## 2. 엔티티 및 속성 정의

### 2.1. 주요 테이블 목록
| 테이블명 | 설명 | 주요 키 |
|---|---|---|
| `merchant_profile` | 소상공인 기본 정보 (가맹점 ID, 업종, 위치) | `merchant_id` (PK) |
| `financial_metrics` | 재정 지표 (매출, 현금 흐름 등 - PAIN_01 계산용) | `metrics_id` (PK), `merchant_id` (FK) |
| `supply_chain_events` | 공급망 이벤트 (지연 배송, 가격 변동 - PAIN_02 계산용) | `event_id` (PK), `merchant_id` (FK) |
| `kpi_snapshot` | KPI 스냅샷 (안전 마진 등 최종 산출값 저장용) | `snapshot_id` (PK), `merchant_id` (FK), `period_end_date` |

### 2.2. 상세 스키마 정의

#### 📄 merchant_profile
```sql
CREATE TABLE merchant_profile (
    merchant_id VARCHAR(36) PRIMARY KEY, -- UUID
    shop_name VARCHAR(100),
    industry_code VARCHAR(20),
    registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 📄 financial_metrics (PAIN_01 계산용)
```sql
CREATE TABLE financial_metrics (
    metrics_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    merchant_id VARCHAR(36), -- FK to merchant_profile
    report_period_start DATE NOT NULL, -- 월별 또는 주별 시작일
    report_period_end DATE NOT NULL,
    revenue_current_period DECIMAL(15, 2) DEFAULT 0.00,       -- 현재 기간 매출
    revenue_previous_period DECIMAL(15, 2) DEFAULT 0.00,      -- 전 기간 매출 (비교용)
    cash_flow_operating_current DECIMAL(15, 2) DEFAULT 0.00,  -- 현재 현금 흐름 (운영 활동)
    cash_flow_operating_previous DECIMAL(15, 2) DEFAULT 0.00, -- 전 기간 현금 흐름
    
    volatility_revenue_percent DECIMAL(5, 2), -- 매출 변동률 (%) -> PAIN_01 입력값
    volatility_cashflow_percent DECIMAL(5, 2), -- 현금 흐름 변동률 (%) -> PAIN_01 입력값

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (merchant_id) REFERENCES merchant_profile(merchant_id),
    UNIQUE KEY uk_merchant_period (merchant_id, report_period_start) -- 중복 방지
);
```

#### 📄 supply_chain_events (PAIN_02 계산용)
```sql
CREATE TABLE supply_chain_events (
    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    merchant_id VARCHAR(36), -- FK to merchant_profile
    event_type ENUM('DELAY', 'PRICE_FLUCTUATION', 'SUPPLIER_FAILURE') NOT NULL,
    affected_item_code VARCHAR(50),
    
    delay_days INT DEFAULT 0,           -- 지연일수 (DELAY 타입 기준)
    price_change_percent DECIMAL(5, 2), -- 가격 변동률 (%) (PRICE_FLUCTUATION 타입 기준)
    
    impact_score DECIMAL(3, 1) DEFAULT 0.0, -- 임팩트 점수 (내부 로직 산출 후 저장 가능)

    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (merchant_id) REFERENCES merchant_profile(merchant_id),
    INDEX idx_merchant_event_type (merchant_id, event_type) -- 연산 최적화
);
```

#### 📄 kpi_snapshot (최종 산출값 저장용 - 대시보드 표시용)
```sql
CREATE TABLE kpi_snapshot (
    snapshot_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    merchant_id VARCHAR(36),
    
    pain_01_value DECIMAL(5, 2), -- 재정 불안정성 지수 (0~100 점)
    pain_02_value DECIMAL(5, 2), -- 공급망 리스크 점수 (0~100 점)
    
    safety_margin_percent DECIMAL(5, 2), -- 안전 마진 ($SM$ 공식 결과, %)
    risk_score_total DECIMAL(3, 1),     -- 총 위험 점수 (가중 평균 등)

    period_snapshot_date DATE NOT NULL, -- 스냅샷 기준일 (예: 오늘 또는 월 말)
    
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (merchant_id) REFERENCES merchant_profile(merchant_id),
    UNIQUE KEY uk_merchant_period (merchant_id, period_snapshot_date) -- 중복 방지

);
```

### 2.3. 추가 테이블 (필요 시 확장용)
- `audit_log`: KPI 계산 및 스냅샷 생성 이력 기록.
- `config_settings`: 가중치, 임계값 등 계산을 위한 설정값 저장.

## 3. API 엔드포인트 명세

### 📡 GET /api/v1/kpi/dashboard/{merchant_id}
**설명**: 특정 소상공인의 대시보드용 KPI 데이터 반환. 프론트엔드는 이를 `KPI-Card` 와 `TrendGraph`에 시각화합니다.

| 필드명 | 타입 | 설명 | 예시 값 |
|---|---|---|---|
| `merchant_id` | string | 고유 식별자 | `"m_123456"` |
| `pain_01` | object | 재정 불안정성 지수 상세 | `{ "value": 72.5, "status": "warning", "trend": "+5%" }` |
| `pain_02` | object | 공급망 리스크 점수 상세 | `{ "value": 48.3, "status": "normal", "trend": "-1%" }` |
| `safety_margin` | number | 안전 마진 (%) | `65.8` |
| `risk_total` | number | 총 위험 점수 (0~100) | `89.4` |
| `period_start` | date | 데이터 기간 시작일 | `"2026-06-01"` |
| `period_end` | date | 데이터 기간 종료일 | `"2026-06-30"` |

**Response Example**:
```json
{
  "merchant_id": "m_123456",
  "pain_01": {
    "value": 72.5,
    "status": "warning",      // UI 색상 매핑용: critical, warning, normal
    "trend": "+5%",          // 기간 대비 변화 (상승 시 위험 증가)
    "components": [
      { "name": "revenue_volatility", "score": 30.2 },
      { "name": "cashflow_volatility", "score": 42.3 }
    ]
  },
  "pain_02": {
    "value": 48.3,
    "status": "normal",
    "trend": "-1%",
    "components": [
      { "name": "delay_impact", "score": 25.1 },
      { "name": "price_fluctuation", "score": 23.2 }
    ]
  },
  "safety_margin": 65.8,
  "risk_total": 89.4,
  "period_start": "2026-06-01",
  "period_end": "2026-06-30"
}
```

**Response Example (Critical 상태)**:
```json
{
  "merchant_id": "m_123457",
  "pain_01": {
    "value": 92.1,
    "status": "critical",    // 🔴 긴급 조치 필요
    "trend": "+15%",
    ...
  },
  "pain_02": {
    "value": 78.4,
    "status": "warning",
    ...
  },
  "safety_margin": 38.2,
  "risk_total": 96.5
}
```

### 📡 GET /api/v1/kpi/trend/{merchant_id}?period=7d|30d|90d
**설명**: `TrendGraph` 컴포넌트용 시간대별 KPI 변화 트렌드 데이터 제공.

**Response Example**:
```json
{
  "merchant_id": "m_123456",
  "period_start": "2026-05-01",
  "period_end": "2026-06-30",
  "data_points": [
    { "date": "2026-05-01", "pain_01": 45.2, "pain_02": 38.1 },
    { "date": "2026-05-08", "pain_01": 48.7, "pain_02": 39.0 },
    ...
    { "date": "2026-06-30", "pain_01": 72.5, "pain_02": 48.3 }
  ]
}
```

### 📡 POST /api/v1/kpi/refresh/{merchant_id}
**설명**: 실시간 KPI 계산 요청. 프론트엔드에서 새로고침 버튼을 누르면 백엔드가 모든 데이터 소스(DB, 외부 API 등) 를 재가독하여 최신 스냅샷을 생성하고 반환합니다.

**Response Example**:
```json
{
  "status": "success",
  "message": "KPI calculation completed.",
  "snapshot_id": 987654321,
  "calculated_at": "2026-06-06T10:30:45Z"
}
```

## 4. 구현 우선순위 및 리스크 관리

### 🔥 우선순위 1 (Critical): DB 스키마 정의 및 API 엔드포인트 개발
- **이유**: 대시보드 구축의 핵심 기반. 프론트엔드 팀은 이 데이터를 기반으로 컴포넌트를 구현할 수 있어야 함.
- **담당**: 코다리 (백엔드) + 현빈 (DB 설계 협업).

### ⚠️ 우선순위 2: PAIN_01, PAIN_02 계산 로직 백엔드 서비스 개발
- **이유**: DB 가 준비되면 바로 계산을 적용해야 함. `financial_metrics` 과 `supply_chain_events` 테이블 데이터를 기반으로 `kpi_snapshot` 에 값을 저장하는 프로세스 구현.
- **담당**: 코다리 (백엔드).

### 📌 우선순위 3: API 문서화 및 프론트엔드 팀과 데이터 계약서 공유
- **이유**: 개발 병렬 진행을 위해 API 스키마를 확정해야 함. `mock_kpi_response.json` 을 바탕으로 실제 응답 데이터를 정교하게 정의함.
- **담당**: 코다리 (API 문서), Designer (UI/UX 연동 검토).

## 5. 참고 자료 및 도구
- `kpi_calculation_spec_v1.0.md`: 이전 버전의 KPI 계산 로직 명세.
- `mock_kpi_response.json`: API 응답 예시 데이터.
- `PainGauge_V1.0.tsx`: 프론트엔드 컴포넌트 프로토타입 (UI/UX 기준).