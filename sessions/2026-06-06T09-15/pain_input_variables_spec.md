# 📊 PAIN 지표 입력 변수 명세서 (Data Input Specification v1.0)

**작성일:** 2026-06-06  
**작성자:** 코다리 (시니어 풀스택 엔지니어)  
**상태:** Review Pending

## 1. 개요 및 목표
PAIN_01 (재정 불안정성), PAIN_02 (공급망 리스크) 지수를 계산하기 위해 필요한 **기본 입력 데이터 (Input Data)** 와 이를 수집할 **API 스텍/DB 명세**를 정의합니다.

- **목표**: 파일럿 초기 단계에서 가장 핵심적인 Pain Point 두 가지를 측정 가능한 데이터 포인트로 변환하고, 이를 기반으로 API 엔드포인트를 설계하는 기준을 마련함.
- **범위**: MVP (Minimum Viable Product) 에 필요한 최소한의 데이터 수집 및 연동 로직만 포함. 외부 복잡한 연동은 Phase 2 에서 진행.

## 2. PAIN_01: 재정 불안정성 지수 (Financial Instability Score)
**계산 공식 요약:** $PAIN\_01 = \text{Max}(Base, 1 - (\frac{\text{Current CashFlow Error}}{\text{Threshold}}))$  
(여기서 `Current CashFlow Error`는 실제 매출 대비 예상 매출의 편차)

### 🔹 입력 데이터 포인트 (Data Point A: 매출 흐름)
| 필드명 | 타입 | 설명 | 예시 값 | 수집 경로 |
| :--- | :--- | :--- | :--- | :--- |
| `expected_monthly_sales` | float | 월 예상 매출액 | 10,000,000 KRW | DB 저장값 (기초 데이터) |
| `actual_monthly_sales` | float | 실제 매출액 | 8,500,000 KRW | **API 연동 또는 수동 입력** |
| `cash_flow_variance` | float | 현금흐름 오차율 (%) | -15.0% | `(expected - actual) / expected * 100` |

### 🔹 API 스텍 및 DB 명세 (MVP 초안)
- **API 엔드포인트:** `GET /api/pain/v1/financials`  
  - **요청 헤더:** `Authorization: Bearer {token}`  
  - **응답 본문 (JSON):**  
    ```json
    {
      "data": [
        {
          "id": "fin_001",
          "period_start": "2026-05-01",
          "expected_sales": 10000000.0,
          "actual_sales": 8500000.0,
          "variance_percent": -15.0
        }
      ]
    }
    ```
- **DB 테이블 스키마 (SQLite/PostgreSQL 초안):**  
  ```sql
  CREATE TABLE financial_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    period_start TEXT NOT NULL,
    expected_sales DECIMAL(12, 2) DEFAULT 0.00,
    actual_sales DECIMAL(12, 2) DEFAULT 0.00,
    variance_percent DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

## 3. PAIN_02: 공급망 리스크 지수 (Supply Chain Risk Score)
**계산 공식 요약:** $PAIN\_02 = \text{Max}(Base, 1 - (\frac{\text{Current Delay Count}}{\text{Threshold}}))$  
(여기서 `Current Delay Count`는 최근 30 일 내 지연 배송 건수)

### 🔹 입력 데이터 포인트 (Data Point B: 공급망 상태)
| 필드명 | 타입 | 설명 | 예시 값 | 수집 경로 |
| :--- | :--- | :--- | :--- | :--- |
| `delayed_order_count` | int | 30 일 내 지연 배송 건수 | 5 | **API 연동 또는 수동 입력** |
| `average_delay_days` | float | 평균 지연일 (사용자 경험 지표) | 4.2 days | `(총 지연일 / 총 주문건수)` |
| `supplier_status_flag` | boolean | 공급망 정상 여부 | true/false | API 상태 코드 연동 |

### 🔹 API 스텍 및 DB 명세 (MVP 초안)
- **API 엔드포인트:** `GET /api/pain/v1/supply-chain`  
  - **요청 헤더:** `Authorization: Bearer {token}`  
  - **응답 본문 (JSON):**  
    ```json
    {
      "data": [
        {
          "id": "sc_002",
          "order_date_range_start": "2026-05-01",
          "delayed_count": 5,
          "avg_delay_days": 4.2,
          "supplier_alert": true
        }
      ]
    }
    ```
- **DB 테이블 스키마 (SQLite/PostgreSQL 초안):**  
  ```sql
  CREATE TABLE supply_chain_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    order_date_range_start TEXT NOT NULL,
    delayed_count INTEGER DEFAULT 0,
    avg_delay_days DECIMAL(5, 2),
    supplier_alert BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

## 4. 개발팀/백엔드 팀 전달 메시지 (Handoff Note)
- **우선순위:** 이 명세대로 API 스텍을 구현하여, 파일럿 참여자에게 데이터 입력용 UI 를 제공하자.  
- **주의사항:** 초기에는 **수동 입력** (Sandbox 환경 내 폼) 과 **API 연동** 두 가지 방식을 모두 지원할 것을 권장합니다. (예: `actual_sales` 는 API 가 없을 때 수동 입력 가능하도록 설계)
- **다음 단계:** 이 명세를 기반으로 `pain_api_schema.json` 파일을 작성하고, 프론트엔드 개발팀이 UI 컴포넌트를 구현하도록 전달합니다.

---
**작성자:** 코다리  
**검토 요청:** 현빈 (백엔드), 레오 (프론트엔드)