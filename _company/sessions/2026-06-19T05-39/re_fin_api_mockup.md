# 📄 Re:Fin API Mockup & Design Handoff Guide (V1.0)

## 개요
Designer 가 확정된 `Trust Widget` 과 `PainGauge` 를 프론트엔드 컴포넌트로 구현하기 위한 **API 명세서**와 **초기 Mockup 지침**입니다. 이 문서는 백엔드 개발자와 프론트엔드 개발자가 동일한 기준을 공유할 수 있도록 작성되었습니다.

## 1. 핵심 색상 팔레트 (Design Tokens)
```css
:root {
  --brand-green: #4CAF50;   /* 신뢰, 안정감 */
  --brand-red: #F44336;     /* 위험, 주의 */
  --neutral-gray-900: #212121;
  --neutral-gray-700: #757575;
  --background-light: #f5f5f5;
}
```

## 2. API 엔드포인트 스키마 (Mock Data)

### 2.1. 신뢰도 지표 (`Trust Widget`)
**엔드포인트**: `GET /api/v1/finance/trust-score`  
**HTTP Method**: GET  
**Response Status**: 200 OK  

**Response Body**:
```json
{
  "trust_score": {
    "current": 85,           // 현재 신뢰도 점수 (0-100)
    "trend": "up",           // "up" | "down" | "stable"
    "critical_threshold": 70,// 점수가 이 이하면 Critical 상태 표시
    "components": [
      {
        "name": "liquid_ratio",   // 유동성 비율
        "score": 92,              // 하위 항목 점수
        "color": "--brand-green" 
      },
      {
        "name": "debt_service_coverage",
        "score": 78,
        "color": "--neutral-gray-700"
      }
    ]
  }
}
```

### 2.2. 고통 수준 지표 (`Pain Gauge`)
**엔드포인트**: `GET /api/v1/finance/pain-level`  
**HTTP Method**: GET  
**Response Status**: 200 OK  

**Response Body**:
```json
{
  "pain_level": {
    "current": 3,            // 현재 고통 수준 (0-5 단계)
    "trend": "stable",       // "up" | "down" | "stable"
    "critical_threshold": 4,
    "factors": [
      {
        "name": "cash_flow_volatility",   // 현금 흐름 변동성
        "impact": "high",                  // "low" | "medium" | "high"
        "color": "--brand-red"             // 고통 수준이 높을수록 빨간색 계열 사용
      },
      {
        "name": "market_uncertainty",
        "impact": "medium",
        "color": "--neutral-gray-700"
      }
    ]
  }
}
```

### 2.3. 종합 재무 상태 (`Dashboard Summary`)
**엔드포인트**: `GET /api/v1/finance/dashboard`  
**HTTP Method**: GET  
**Response Status**: 200 OK  

**Response Body**:
```json
{
  "dashboard": {
    "summary": {
      "trust_score_current": 85,
      "pain_level_current": 3,
      "recommendation": "유동성 확보를 위해 단기 채권 매입 고려",
      "action_required": false    // true 일 경우 긴급 조치 유도 UI 표시
    },
    "last_updated": "2026-06-19T05:39:00Z"
  }
}
```

## 3. 프론트엔드 컴포넌트 구현 지침 (Mockup)

### 3.1. Trust Widget 컴포넌트
**UI 요소**:  
- **시각적 표현**: `#4CAF50` 배경에 신뢰도 점수가 큰 텍스트로 표시. `trend: "down"` 이면 노란색 경고 아이콘 추가.  
- **하위 항목**: `components` 배열을 카드 형태로 나열. 점수가 70 이하일 경우 빨간색 테두리 적용.  

**예시 레이아웃 (ASCII)**:
```
┌───────────────────────────────┐
│ 🟢 신뢰도: 85                 │
│ ↑ 안정적                      │
│ ───────────────────────────   │
│ [유동성] 92       [채무비율]78│
└───────────────────────────────┘
```

### 3.2. Pain Gauge 컴포넌트
**UI 요소**:  
- **시각적 표현**: `#F44336` 배경에 고통 수준 게이지 (0-5 단계) 표시. 현재 위치를 동적으로 이동.  
- **요인 목록**: `factors` 배열을 수평 스크롤 리스트로 배치. `impact: "high"` 일 경우 빨간색 경고 배지 추가.  

**예시 레이아웃 (ASCII)**:
```
┌───────────────────────────────┐
│ 🔴 고통 수준: 3              │
│ ───────────────────────────   │
│ [현금흐름] 🚨        [시장]    │
└───────────────────────────────┘
```

### 3.3. 상태 변경 로직 (React Example)
**컴포넌트 상태 관리**:  
- `useState` 를 사용하여 API 응답 데이터를 저장하고, `useEffect` 가 데이터 업데이트될 때마다 UI 렌더링.  

**예시 코드 (Pseudo-code)**:
```tsx
function TrustWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/v1/finance/trust-score')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>로딩 중...</div>;

  const isCritical = data.trust_score.current <= data.trust_score.critical_threshold;

  return (
    <Card color={isCritical ? "red" : "green"}>
      <h3>{`신뢰도: ${data.trust_score.current}`}</h3>
      {/* 하위 항목 렌더링 */}
    </Card>
  );
}
```

## 4. Mock API 데이터 생성 (Postman / Fiddler)
이명세는 실제 백엔드 개발 전에 **Mock API**로 프론트엔드 팀의 초기 구현을 검증하는 데 사용됩니다.  
- **Faker.js** 라이브러리를 사용하여 랜덤 데이터를 생성하거나, **JSON Server** 를 활용하여 빠르게 테스트 환경 구축.  
- `trust_score.current`와 `pain_level.current` 값은 시뮬레이션된 비즈니스 로직에 따라 주기적으로 변동됨.

## 5. 다음 단계
1. 백엔드 팀이 실제 API 개발 착수 전, 이 명세를 기반으로 **Mock 서버**를 구축하여 프론트엔드 팀의 컴포넌트 구현 검증.
2. 프론트엔드 팀이 위 지침에 따라 **초기 Mockup 컴포넌트**를 제작하고, `re_fin_api_mockup.md` 의 UI 예시와 유사한 레이아웃을 확인.
3. 디자인 팀이 생성된 컴포넌트를 **실제 프로토타입**으로 검토하여 시각적 일관성 검증.

---
💻 코다리: 이 문서는 개발 착수를 위한 기술적 기반을 제공합니다. 다음 사이클에서 프론트엔드 컴포넌트 구현 및 자기 검증 루프를 실행할 예정입니다. ✅