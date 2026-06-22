# Trust Widget & PainGauge API 명세 초안 (V3.0 기반)

## 1. 개요 (Overview)
본 문서는 소상공인의 신뢰도(Trust)와 고통 지수(Pain)를 시각화하는 Trust Widget 및 PainGauge 컴포넌트를 백엔드 시스템과 연동하기 위한 API 명세를 정의합니다. 디자인 사양(V3.0)에 기반하여, 프론트엔드가 요구하는 데이터 흐름을 명확히 합니다.

## 2. 핵심 엔드포인트 (Core Endpoints)
모든 데이터는 `/api/v1/metrics` 경로를 통해 관리되며, 인증된 사용자(소상공인)의 데이터에 접근합니다.

### 2.1. 신뢰 지표 조회 (Trust Score Retrieval)
- **Endpoint:** `GET /api/v1/metrics/trust_score`
- **목적:** 사용자의 현재 신뢰도 점수 및 세부 구성 요소 조회.
- **요청 파라미터 (Query Parameters):**
    - `context_id`: 특정 분석 컨텍스트(예: 특정 서비스 이용 기록)를 지정할 경우 사용. (선택 사항)
    - `version`: 조회할 데이터 버전 (기본값: latest)
- **응답 형식 (Response Format - JSON):**
```json
{
  "user_id": "string",
  "trust_score": "integer", // 0 ~ 100점
  "details": [
    {
      "metric_name": "Trust_Factor_A", // 예: '거래안정성', '정보투명성' 등 디자인 명세에 따른 세부 지표
      "score": "integer",         // 해당 지표의 점수 (0~100)
      "visualization_key": "string" // 프론트엔드에서 시각화할 때 사용할 키 값
    },
    {
      "metric_name": "Trust_Factor_B",
      "score": "integer",
      "visualization_key": "string"
    }
  ],
  "timestamp": "datetime"
}
```

### 2.2. 고통 지표 조회 (Pain Gauge Retrieval)
- **Endpoint:** `GET /api/v1/metrics/pain_gauge`
- **목적:** 사용자의 현재 고통 수준 및 주요 Pain Point의 심각도 조회.
- **요청 파라미터 (Query Parameters):**
    - `context_id`: 특정 분석 컨텍스트 지정. (선택 사항)
    - `version`: 조회할 데이터 버전 (기본값: latest)
- **응답 형식 (Response Format - JSON):**
```json
{
  "user_id": "string",
  "pain_level": "integer", // 0 (낮음) ~ 100 (매우 높음)
  "pain_details": [
    {
      "pain_point": "string", // 예: '자금흐름 불안정', '마케팅 채널 부족' 등 Pain Point 명칭
      "severity": "integer",   // 해당 Pain Point의 심각도 점수 (0~100)
      "trend": "string"       // 최근 변화 추이 (예: '상승', '유지', '하락')
    },
    {
      "pain_point": "string",
      "severity": "integer",
      "trend": "string"
    }
  ],
  "timestamp": "datetime"
}
```

## 3. 데이터 연동 로직 상세 (Data Linkage Logic Details)
### 3.1. PainGauge 색상 매핑 로직 (Pain Gauge Color Mapping Logic)
(Reference: `Trust_Widget_Technical_Spec_V1.0.md`)
- **논리:** `severity` 점수를 기반으로 Growth Green 계열의 색상을 동적으로 매핑합니다.
- **매핑 규칙:**
    - `severity` < 30 (낮음): Deep Blue (신뢰/안정)에 가까운 낮은 채도 또는 연한 녹색 계열 사용.
    - 30 <= `severity` < 70 (중간): Growth Green (성장/경고)의 중간 채도 적용.
    - `severity` >= 70 (높음): 강한 Growth Green (위험/행동 촉구)의 높은 채도 적용.

### 3.2. Trust Widget 데이터 연동 로직 (Trust Widget Data Linkage Logic)
(Reference: `Trust_Widget_Technical_Spec_V1.0.md`)
- **논리:** `trust_score`와 세부 지표(`details`)를 기반으로 사용자 경험에 맞는 신뢰도를 전달합니다.
- **연동 규칙:**
    - 최종 `trust_score`는 모든 세부 `Trust_Factor_*`의 가중 평균을 통해 산출됩니다. (가중치 설정은 별도 테이블 참조)
    - 프론트엔드는 `details` 배열을 순회하며 각 지표에 맞는 색상과 레이블을 동적으로 렌더링해야 합니다.

## 4. 데이터 검증 및 처리 (Validation and Processing)
- **Input Validation:** 모든 API 요청 시, `user_id`의 존재 여부와 `context_id`의 유효성을 반드시 검증합니다.
- **Data Consistency Check:** 조회된 Trust Score와 Pain Gauge의 추이(`trend`)가 상충되지 않도록 백엔드에서 일관성 검사를 수행해야 합니다.

## 5. 개발팀 참고 사항 (Developer Notes)
1.  **Latency:** 두 지표는 실시간성이 중요하므로, 데이터베이스 조회 시 캐싱 전략을 최적화하여 응답 속도를 보장해야 합니다.
2.  **Scalability:** `metrics` 테이블은 트래픽 증가에 대비하여 읽기 전용(Read-only)으로 설계하고, 쓰기는 배치(Batch) 방식으로 처리하는 것을 고려하십시오.
3.  **V3.0 매핑 확인:** UI/UX V3.0에서 정의된 모든 색상 팔레트 및 레이블은 이 API 응답의 `visualization_key`와 정확히 일치해야 합니다.