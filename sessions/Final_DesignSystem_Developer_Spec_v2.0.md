# 🛠️ BDS 소상공인 플랫폼 - 최종 개발 핸드오프 사양서 (v2.0)

## 🎯 목적 및 범위
본 문서는 BDS 소상공인 플랫폼의 핵심 컴포넌트(KPI Gauge 등)에 대한 디자인 의도, 인터랙션 로직, 데이터 구조를 결합하여 **개발팀이 별도의 질문 없이 즉시 코드 구현을 시작할 수 있도록** 하기 위함입니다. 모든 애니메이션 파라미터와 데이터 흐름은 이 사양서에 정의된 대로 작동해야 합니다.

---

## 🧩 컴포넌트 상세 명세: KPI Gauge
소상공인의 현재 상태(Pain)를 측정하고, 솔루션 적용 후 변화하는 기대 효과(Gain/Solution)를 시각적으로 전달하는 핵심 위젯입니다.

### 1. Props (필수 입력 속성 정의)
| Prop Name | Type | Description | Required | Constraints / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `kpi_title` | String | 지표의 제목 (예: '매출 증가율', '운영 안정도') | YES | 최대 30자. 가독성 높은 고딕체 사용 필수. |
| `current_value` | Number | 현재 측정된 값 (Pain 상태) | YES | 소수점 첫째 자리까지 허용. [0.0 ~ 100.0] 범위 제한. |
| `target_value` | Number | 목표로 설정한 값 (Solution 기대치) | YES | 최소값은 항상 0.0으로 설정. |
| `status` | Enum | 현재 상태 감정 (Pain/Neutral/Growth) | YES | ['PAIN', 'NEUTRAL', 'GROWTH']. 이 값에 따라 메인 컬러 및 애니메이션 유형 결정. |
| `unit` | String | 측정 단위 (예: '%', '건', '점') | NO | 공백 처리 필수. |

### 2. State & Data Flow 로직
*   **데이터 흐름:** API Gateway $\rightarrow$ Backend Service $\rightarrow$ Frontend Component Props (`current_value`, `target_value`, `status`)
*   **Status Mapping (Color/Emotion):**
    *   `PAIN`: Critical Red (#E74C3C). 애니메이션: 급격한 하강(Drop) + 떨림 효과(Shake).
    *   `NEUTRAL`: Warning Yellow (#F39C12). 애니메이션: 완만한 변화(Slight Shift).
    *   `GROWTH`: Stable Green (#2ECC71). 애니메이션: 안정적 상승(Ascend) + 부드러운 커브.

### 3. Motion Logic Specification (KPI_Gauge_Motion_Handoff_v1.0 연동)
| 모션 단계 | 트리거 | 파라미터/로직 | 지속 시간 (Duration) | Easing Function | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Initial Load** | Component Mount | 0 $\rightarrow$ `current_value` | 800ms | Cubic Bézier (EaseOut ${0.25, 1, 0.5, 1}$) | 값의 시작점은 항상 0부터 카운트업/다운해야 함. |
| **Pain State Transition** | Status Change to PAIN | `current_value` $\rightarrow$ Low Value | 600ms | Quadratic (EaseOut) + Shake | 값이 떨림 애니메이션(Shake)을 포함하여 하강하는 시각적 공포감을 연출해야 함. |
| **Growth State Transition** | Status Change to GROWTH | Previous Value $\rightarrow$ `target_value` | 1200ms | Cubic Bézier (EaseIn ${0.4, 0, 0.2, 1}$) | 목표치를 향해 도달하는 '성장'의 안정감을 극대화해야 함. |

### 4. JSON Schema 예시 (API Data Contract)
개발팀이 백엔드와 통신할 때 사용할 데이터 구조 정의입니다.

```json
{
  "type": "object",
  "properties": {
    "kpi_title": {"type": "string", "description": "지표 제목"},
    "current_value": {"type": "number", "minimum": 0.0, "maximum": 100.0},
    "target_value": {"type": "number", "minimum": 0.0},
    "status": {"type": "string", "enum": ["PAIN", "NEUTRAL", "GROWTH"]},
    "unit": {"type": "string"}
  },
  "required": ["kpi_title", "current_value", "target_value", "status"]
}
```

---
**[개발팀 참고 사항]**
*   위의 `KPI_Gauge` 컴포넌트는 단일한 State Machine으로 동작합니다. (PAIN $\rightarrow$ NEUTRAL $\rightarrow$ GROWTH)
*   모든 모션은 **시간 경과에 따른 시각적 경험(Temporal Experience)**을 최우선 목표로 합니다. 값의 변화 자체가 메시지입니다.