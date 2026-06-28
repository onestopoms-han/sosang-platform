# 📐 API Schema & Component Contract: Trust Widget & PainGauge

**작성일:** 2026-06-28T04:35  
**작성자:** 코다리 (Developer)  
**참조:** Designer 의 Figma Blueprint (`sessions/2026-06-28T04-27/designer.md`)

---

## 🎯 목표
Designer 가 정의한 시각적 스타일 (Deep Blue, Growth Green, Red 등) 과 레이아웃 구조를 백엔드 API 와 프론트엔드 컴포넌트 (`TrustWidget`, `PainGauge`) 가 준수할 수 있는 명확한 계약서 (API Schema) 로 전환합니다.

## 1️⃣ API Response Structure (백엔드 → 프론트엔드)

프론트엔드가 컴포넌트를 렌더링하는 데 필요한 최소한의 데이터만 포함해야 합니다. 불필요한 중첩 구조를 피하고, 타입 안정성을 위해 Pydantic/Zod 스타일의 Schema 를 따릅니다.

### 1.1 Trust Widget API Response

```json
{
  "platform_trust_score": {
    "value": 85,           // 0~100 점수 (Deep Blue 배경 기본)
    "trend": "up",         // "up" | "down" | "stable" (배경 내 작은 그래프용)
    "components": [        // 신뢰도 세부 지표 (아이콘 + 상태 색상)
      { "name": "data_accuracy",     "score": 92,     "color": "#3CB371" },
      { "name": "system_stability",  "score": 80,     "color": "#3CB371" },
      { "name": "user_satisfaction", "score": 65,     "color": "#FFC107" } // 노란색 주의
    ]
  }
}
```

**규칙:**
- `platform_trust_score.value` 가 90 이상일 경우 메인 스코어 컬러는 `#3CB371` (Growth Green).
- 70~89 일 경우 회색 (`#6C757D`).
- 69 이하면 `#DC3545` (Red) 로 변경됨.

### 1.2 PainGauge API Response

```json
{
  "pain_gauge": {
    "level": "high",       // "low" | "medium" | "high" | "critical"
    "percentage": 78,     // 게이지 바의 현재 위치 (%)
    "status_message": "경고: 손실 위험이 높습니다.", // 동적 메시지 (조건부 렌더링용)
    "color_state": "#DC3545", // 게이지 바 전체 색상
    "target_value": 50,   // 목표치 (예: 0% 이상 유지)
    "history_points": [   // 과거 데이터 포인트 (선택적)
      { "date": "2026-06-27", "value": 45 },
      { "date": "2026-06-28", "value": 78 }
    ]
  }
}
```

**규칙:**
- `pain_gauge.level` 값에 따라 `color_state` 가 자동 매핑됨:
  - `"low"` → `#3CB371` (Green)
  - `"medium"` → `#FFC107` (Yellow)
  - `"high"` → `#DC3545` (Red)
  - `"critical"` → `#DC3545` (Dark Red, 더 진한 색상 권장: `#991B1B`)

## 2️⃣ 프론트엔드 컴포넌트 계약 (Component Contract)

### 2.1 TrustWidget 컴포넌트 Props

```typescript
interface TrustWidgetProps {
  apiResponse: { platform_trust_score: PlatformTrustScore }; // 위에서 정의된 API 구조
}

// 내부 상태 관리:
// - `scoreColor`: score 값에 따라 동적 색상 변경 (조건부 렌더링)
// - `isCritical`: 특정 스코어 이하일 경우 CTA 버튼 텍스트 변경 ("신뢰가 낮습니다. 즉각 조치하세요.")
```

### 2.2 PainGauge 컴포넌트 Props

```typescript
interface PainGaugeProps {
  apiResponse: { pain_gauge: PainGaugeData }; // 위에서 정의된 API 구조
}

// 내부 상태 관리:
// - `gaugeColor`: `color_state` 값을 직접 사용 (백엔드에서 이미 계산됨)
// - `isCriticalState`: level 이 'critical' 일 경우 배경이 어두워짐 (`#002634`)
```

## 3️⃣ 기술적 병목 지점 점검 및 해결책

### 병목 1: 백엔드가 복잡한 논리 (색상 매핑) 를 수행할지, 프론트엔드에서 처리할지?

- **현재 상황:** Designer 가 색상 코드를 정의했지만, `pain_gauge.level` 을 'high'로만 반환하고 실제 색상은 프론트엔드에서 계산하는 방식이 더 유연합니다.
- **해결책:** 백엔드는 `level`, `percentage` 같은 원본 데이터만 제공하고, `color_state` 는 프론트엔드가 Props 로 받아 조건부 렌더링해야 합니다. 이를 위해 API 응답에 `color_state` 필드를 포함하되, 이 값은 백엔드의 기본 매핑 테이블 (Level → Hex) 을 기반으로 자동 생성됩니다.

### 병목 2: 동적 데이터 업데이트 시 성능 문제

- **현재 상황:** PainGauge 의 게이지 바가 실시간으로 채워져야 할 경우, `percentage` 값을 자주 변경하면 렌더링 성능에 영향을 줄 수 있습니다.
- **해결책:** `history_points` 배열을 사용하며, 백엔드는 주기적으로 (예: 5 초마다) 전체 히스토리를 반환하지 않고 delta 값만 전송하는 스트리밍 방식을 고려합니다. 현재 MVP 에서는 단순 REST API 만 구현하므로 `history_points` 를 초기화 시점에 한 번만 전달하고, 프론트엔드에서 애니메이션을 적용하는 방식이 적합합니다.

### 병목 3: 데이터 유효성 검사 (Validation)

- **현재 상황:** 백엔드가 잘못된 데이터를 반환할 경우 프론트엔드 컴포넌트가 깨질 수 있습니다.
- **해결책:** API 응답에 `schema_version` 필드를 포함하여, 프론트엔드에서 Schema 를 동적 업데이트할 수 있도록 합니다. 현재는 v1.0 을 사용합니다.

## 4️⃣ 다음 단계 및 분배 계획

### 4.1 백엔드 팀 (현빈)
- [ ] API 응답 구조를 실제로 구현하여 테스트 데이터를 생성합니다. (`pain_gauge.level` 값과 `color_state` 매핑 로직 추가)
- [ ] 백엔드가 반환하는 `history_points` 데이터의 크기를 제한합니다 (최대 10 개까지).

### 4.2 프론트엔드 팀 (코다리)
- [ ] `TrustWidget`, `PainGauge` 컴포넌트를 React/Tailwind CSS 로 구현합니다.
- [ ] 백엔드에서 반환하는 데이터와 실제 UI 가 일치하는지 확인합니다.

### 4.3 디자이너 (Designer)
- [ ] API 응답 구조를 Figma 와 비교하여 시각적 일관성을 최종 확인합니다. (특히 `color_state` 색상 코드가 Design System 과 정확히 일치하는지)

---

**자가검증: 사실 2 개 / 추측 0 개**  
📊 평가: 진행중 — API Schema 정의 완료, 병목 지점 해결책 제안됨  
📝 다음 단계: 현빈에게 백엔드 응답 구조 구현을 요청하고, 코다리가 프론트엔드 컴포넌트 구현 시작.