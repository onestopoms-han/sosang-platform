-- PLRI 데이터 파이프라인 초기 DB 구조 초안 (v1.0)

-- 1. 경제 지표 원본 데이터 테이블: 외부 데이터 연동을 위한 Raw Data 저장소
CREATE TABLE economic_indicators (
    indicator_id SERIAL PRIMARY KEY,
    indicator_name VARCHAR(100) NOT NULL, -- 예: ConsumerSentimentIndex, InflationRate
    source_system VARCHAR(50) NOT NULL,   -- 예: BOK, StatisticsKorea
    data_value NUMERIC NOT NULL,           -- 실제 측정된 값
    measurement_date DATE NOT NULL,        -- 데이터가 측정된 날짜 (시간계열 분석의 핵심)
    UNIQUE (indicator_name, measurement_date) -- 중복 저장 방지
);

-- 2. 계산된 PLRI 결과 테이블: 최종 리스크 지수 저장소
CREATE TABLE plri_results (
    result_id SERIAL PRIMARY KEY,
    sme_id VARCHAR(50) NOT NULL,           -- 해당 소상공인 또는 지역 식별자
    calculation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- 계산이 수행된 시점
    plri_score NUMERIC NOT NULL,             -- 최종 잠재적 리스크 감소 지수 (PLRI_Formula_v1 결과)
    risk_level VARCHAR(50) NOT NULL,         -- 도출된 위험 수준 (Low, Medium, High 등)
    calculation_details JSONB,               -- 계산에 사용된 상세 로직 및 입력값 포함
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. 데이터 무결성 검증 로그 테이블: 추후 Negative Testing 및 감사용
CREATE TABLE data_integrity_log (
    log_id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,       -- 예: ECONOMIC_INDICATORS, PLRI_RESULTS
    entity_id INTEGER NOT NULL,              -- 해당 레코드 ID
    status VARCHAR(50) NOT NULL,             -- SUCCESS, FAILURE, PENDING
    error_message TEXT,                      -- 오류 발생 시 상세 메시지
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);