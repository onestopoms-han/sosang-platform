# 📊 TrustWidget & PainGauge 시각적 일관성 검증 테스트 데이터셋 명세서

**작성일:** 2026. 06. 28 오후 5:30  
**작성자:** Researcher  
**참조:** `BDS_Final_Visual_Asset_Handoff_Guide.md`, `Dashboard_API_Response_Schema_v1.0.md`

## 🎯 목적
TrustWidget 및 PainGauge 컴포넌트가 Critical(Deep Blue/Red), Warning(Growth Green), Normal 상태에 따라 색상이나 레이아웃이 일관되게 반응하는지 검증하기 위한 **가상 데이터 (Mock Data) 생성 규칙 및 샘플**을 정의합니다.

---

## 1. 테스트 데이터셋 구조 (JSON Schema Draft)
백엔드에서 실제 데이터를 받아오기 전, 프론트엔드 개발을 위해 다음과 같은 형태의 정적 JSON 파일을 사용합니다.

```json
{
  "timestamp": 1719580200000,
  "metrics": {
    "trust_score": 62,        // Critical: <60 (Normal/Warning 기준 고려 필요)
    "growth_rate": -1.2,      // Warning: Negative Growth
    "pain_level": 78          // Critical: >75
  },
  "status": {
    "trust_status": "Critical",
    "growth_status": "Warning",
    "overall_status": "Critical"  // 우선순위 높은 상태 (Red)
  }
}
```

## 2. 시각적 일관성 검증 시나리오 (Test Cases)
각 컴포넌트별, 그리고 통합 상태에서 예상되는 UI 변화 사례입니다.

| ID | 시나리오명 | 조건 (JSON 값 기준) | 기대 UI 반응 (Visual Spec) | 테스트 도구 |
|:---|:---|:---|:---|:---|
| **TC-01** | Normal 상태 기본 렌더링 | `trust_score: 85`, `pain_level: 20` | **Green** 배경/텍스트. 로딩 애니메이션 정상. | - |
| **TC-02** | Critical 경계 (Deep Blue) | `trust_score: 61` ~ `70` | **Blue** 배경 전환. 경고 아이콘 등장. 숫자 강조. | - |
| **TC-03** | Critical 심화 (Red) | `pain_level: >75` | **Red** 배경/글자. "Immediate Action Needed" 배너 표시. | - |
| **TC-04** | Mixed Status (Warning 우선) | `trust_score: 90`, `growth_rate: -2.5` | **Green** 기반에 Warning 아이콘. Growth 그래프 빨간색 라인 강조. | - |
| **TC-05** | API Fallback | API 응답 지연/오류 시 | 로딩 스켈레톤 → "데이터 연결 중" 메시지 → Error 상태 (Red) UI. | Postman/Swagger |

## 3. 데이터 생성 및 확보 방안

### A. 백엔드 Mock Server 구축 (현빈 에이전트 협업)
1.  **FastAPI 또는 Node.js**로 간단한 서버를 띄웁니다.
2.  위의 JSON 스키마에 맞춰 `GET /api/v1/dashboard/status` 엔드포인트를 만듭니다.
3.  **쿼리 파라미터 (query params)**를 통해 상태를 직접 조작할 수 있게 합니다.  
    예: `?trust=Critical&pain=80` → 서버가 해당 값의 JSON을 바로 반환합니다.

### B. 정적 파일 생성 (Researcher)
1.  모든 시나리오에 대한 `.json` 파일을 `assets/test_data/` 폴더에 배치합니다.
2.  각 파일명은 시나리오명 + 타임스탬프 형식 (`tc-01-normal.json`) 으로 저장합니다.

### C. UI 테스팅 자동화 (코다리 에이전트 협업)
1.  **Playwright 또는 Cypress** 스크립트를 작성하여:
    *   Mock API 서버를 시작 → 프론트엔드 렌더링 → 색상 측정 → 비교.
    *   CSS 변수 (`--color-critical`, `--color-warning`) 가 실제 UI 요소에 적용되는지 확인.

## 4. 검증 기준 (Acceptance Criteria)
- **[UI Consistency]**: Critical 상태일 때 `trust_score` 값이 70 이라도, `pain_level` > 80 이면 **Red**가 우선되어야 합니다. (최고위험도 우선 원칙)
- **[Animation]**: 상태 전환 시 색상 변화는 부드럽게 (`transition: background-color 0.5s ease`) 되어야 합니다.
- **[Accessibility]**: Red/Blue 배경에서도 텍스트 가독성 대비율 (WCAG AA 이상, 최소 4.5:1) 을 유지해야 합니다.

## 5. 다음 단계
1.  **Researcher**: `assets/test_data/mock_responses.json` 파일 생성 및 명세 배포.
2.  **Developer (코다리)**: 정적 JSON 파일을 기반으로 컴포넌트 렌더링 로직 구현 시작 (TC-01 ~ TC-04).
3.  **Backend (현빈)**: Mock API 서버 코드 작성하여 테스트 환경에 배포.

---
📊 평가: 진행중 — Mock 데이터 생성 및 개발자 협업 분배를 위한 명세 정리 완료  
📝 다음 단계: assets/test_data/mock_responses.json 파일 생성 및 코다리/현빈 에이전트에게 위 명세를 공유합니다.