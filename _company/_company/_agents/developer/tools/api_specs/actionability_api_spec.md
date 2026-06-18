<header>
# 🚀 Actionability 연동 API 명세 v1.0
## BDS 소상공인플렛폼 — 진단서 & 최적화 팁 데이터 흐름 통합 명세서

**작성일**: 2026-06-18  
**작성자**: 코다리 (Developer Agent)  
**버전**: 1.0  
**상태**: Draft

---

## 🎯 목차
1. [개요](#1-개요)
2. [엔드포인트 정의](#2-엔드포인트-정의)
3. [데이터 스키마 (JSON Schema)](#3-데이터-스키마-json-schema)
4. [UI 렌더링 명세](#4-ui-렌더링-명세)
5. [오류 처리 및 상태 코드](#5-오류-처리-및-상태-코드)

---

## 1. 개요

### 목적
AI 진단서 생성 시, 해당 소상공인의 업종별·현황에 맞춘 **즉시 실행 가능한 매출 최적화 팁 (Action Item)** 을 함께 전달하여 사용자의 전환율 (Conversion Rate) 및 사용자 만족도를 극대화합니다. 기존 단순 진단 결과 전달을 넘어 **'고민 → 해결책 제시'** 스토리텔링의 핵심 단계입니다.

### 역할
- **백엔드**: `/api/v1/diagnosis/result` 엔드포인트를 통해 JSON 형태로 `DiagnosisResult` 객체 (진단서 포함) 와 함께 `ActionItemsList` 를 반환.
- **프론트엔드**: 진단서 데이터를 받아 표시함과 동시에, 하단에 '추천 액션' 섹션을 렌더링하여 사용자가 클릭 가능한 액션으로 유도.

---

## 2. 엔드포인트 정의

### POST `/api/v1/diagnosis/result`

**요청 헤더 (Header)**
```json
Content-Type: application/json
Authorization: Bearer {API_KEY}
```

**요청 바디 (Request Body)**
진단서 생성을 위한 기본 입력 데이터 (업종, 매출 규모 등) 를 포함하며, `diagnosis_id` 를 통해 특정 결과와 연결됨.

| 필드명 | 타입 | 필수 | 설명 | 예시 |
| :--- | :--- | :---: | :--- | :--- |
| `diagnosis_id` | string (UUID) | O | 진단서 식별자 | `"d-12345678-abcd-efgh"` |

**응답 바디 (Response Body)**
- **성공 (HTTP 200 OK)**: JSON 형식의 결과 객체.
- **실패 (HTTP 4xx/5xx)**: 오류 메시지 및 상태 코드.

### 응답 구조 (Success Response)
```json
{
  "diagnosis_id": "d-12345678-abcd-efgh",
  "status": "completed",
  "result": {
    "business_profile": { ... }, // 진단서 내 비즈니스 프로파일
    "risk_assessment": { ... },   // 손실 위험도 (Low/Medium/High)
    "action_items": [             // 🔑 핵심: 최적화 팁 리스트
      {
        "id": 1,
        "title": "매출 증대형",
        "description": "월 매출이 50% 이상 증가할 수 있는 전략입니다.",
        "confidence_score": 0.87, // LLM 신뢰도 점수 (0~1)
        "expected_roi": {         // 예상 투자 대비 수익률
          "time_saved_per_month_hours": 24.5,
          "revenue_increase_percent": 35.2
        },
        "steps": [               // 실행 단계 (Actionable)
          {
            "step_number": 1,
            "action": "할인 쿠폰 발행 및 SNS 홍보",
            "estimated_cost": 0,
            "duration_minutes": 30
          },
          {
            "step_number": 2,
            "action": "고객 리뷰 요청 및 인센티브 제공",
            "estimated_cost": 5000,
            "duration_minutes": 10
          }
        ],
        "cta_label": "액션 시작하기" // 프론트엔드 CTA 버튼 라벨
      },
      {
        "id": 2,
        ...
      }
    ]
  }
}
```

---

## 3. 데이터 스키마 (JSON Schema)

### ActionItem 구조체 (`ActionItemsList` 배열 내 객체)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ActionItem",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "title": { "type": "string", "maxLength": 50 },
    "description": { "type": "string" },
    "confidence_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "LLM 이 해당 액션의 효과를 예측한 신뢰도 점수"
    },
    "expected_roi": {
      "type": "object",
      "properties": {
        "time_saved_per_month_hours": { "type": "number", "minimum": 0 },
        "revenue_increase_percent": { "type": "number", "minimum": 0 }
      }
    },
    "steps": {
      "type": "array",
      "items": {
        "title": "Step",
        "type": "object",
        "properties": {
          "step_number": { "type": "integer" },
          "action": { "type": "string" },
          "estimated_cost": { "type": "number", "minimum": 0 }, // 비용은 0 이 가능 (무료 액션)
          "duration_minutes": { "type": "integer" }
        }
      }
    },
    "cta_label": { "type": "string", "description": "프론트엔드에서 표시될 버튼 텍스트" }
  },
  "required": ["id", "title", "description", "confidence_score", "steps"]
}
```

**주요 필드 설명:**
- **`confidence_score`**: LLM 이 해당 액션이 실제로 효과를 낼 확률을 점수로 표현. 프론트엔드에서 신뢰도 배지 (예: '90% 효과 예측') 로 시각화.
- **`expected_roi.time_saved_per_month_hours`**: 액션을 실행하면 매월 절약할 수 있는 시간. 시간 효율성 강조용 지표.
- **`steps.estimated_cost`**: 비용이 0 인 경우에도 해당 필드 값은 0 으로 반환.
- **`cta_label`**: 프론트엔드에서 사용자가 액션에 대한 상세 페이지로 이동하거나 실행을 시작하는 버튼의 텍스트.

---

## 4. UI 렌더링 명세 (프론트엔드 가이드)

### 컴포넌트: `ActionabilityPanel`
- **위치**: 진단서 결과 화면 하단 또는 사이드바에 고정 표시.
- **레이아웃**: 카드형 리스트. 각 액션 아이템마다 '배지'와 '실행 버튼'이 포함되어야 함.

#### 시각적 요소 (Visual Elements)
1.  **배지 (Badge)**: `confidence_score` 에 따라 색상 구분.
    -   🔴 > 0.9: "고도 추천" (초록색 배경, 흰 글자)
    -   🟠 0.7 ~ 0.9: "추천" (노란색 배경, 검은 글자)
    -   ⚪ < 0.7: "참고용" (회색 배경, 회색 글자)

2.  **실행 버튼 (CTA)**: `cta_label` 텍스트 표시. 클릭 시 해당 액션의 상세 설명 및 실행 가이드 페이지로 이동.
    -   예시: "액션 시작하기", "매출 증대형 전략 보기"

3.  **ROI 시각화**: `expected_roi.revenue_increase_percent` 를 간단한 progress bar 또는 아이콘 (예: 💰) 으로 표현.

#### 사용자 인터랙션 (User Interaction)
- **스ROLL 시점**: 진단서 결과 페이지 로딩 시점에 자동으로 `ActionabilityPanel` 컴포넌트가 렌더링됨.
- **클릭 시**: 해당 액션의 상세 내용을 모달 (Modal) 에서 표시하거나, 별도의 상세 페이지로 이동.

---

## 5. 오류 처리 및 상태 코드

| HTTP Status Code | 상황 설명 | 응답 바디 예시 |
| :--- | :--- | :--- |
| `200 OK` | 성공. 진단서와 최적화 팁 데이터가 정상적으로 반환됨. | `{ diagnosis_id: "...", result: { ... } }` |
| `404 Not Found` | 요청한 `diagnosis_id` 가 존재하지 않거나, 해당 ID 로 연동된 최적화 팁이 생성되지 않음. | `{ error: "Diagnosis not found or actionability data pending generation." }` |
| `502 Bad Gateway` | AI 엔진 (LLM) 과의 통신 실패로 최적화 팁 생성 중 오류 발생. | `{ error: "AI Service temporarily unavailable. Retrying...", status: 502, timestamp: "..." }` |
| `503 Service Unavailable` | 백엔드 서버 오버로딩 또는 유지보수 중. | `{ error: "Service maintenance in progress.", retry_after_seconds: 60 }` |

**오류 처리 가이드:**
- **백엔드**: LLM 호출 실패 시, 캐시된 이전 최적화 팁을 반환하거나 (Fallback), 사용자에게 '최적화 팁 생성 중...'이라는 상태 메시지를 프론트엔드로 전달.
- **프론트엔드**: 502/503 에러가 발생하면 '다시 시도하기' 버튼을 표시하고, 최대 3 회 재시도 후 사용자가 수동으로 페이지를 새로고침하도록 유도.

---

**작성자**: 코다리  
**검토 및 승인**: 현빈 (Backend), 레오 (Frontend)