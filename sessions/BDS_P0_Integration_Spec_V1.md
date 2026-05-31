# 🛠️ BDS P0 컴포넌트 통합 인터랙션 명세서 (V1.0)
## 🎯 목표: MetricCard와 SME-AlertBadge의 상태 기반 데이터 연동 규칙 확정

### 💡 개요 및 전제 조건
본 문서는 `MetricCard`가 보여주는 핵심 지표(KPI)와, 해당 KPI를 해석하여 경고/안내 정보를 제공하는 `SME-AlertBadge` 간의 **데이터 종속적 시각 변화 로직**을 정의합니다.

*   **핵심 원칙:** Badge의 레벨(`Level`)이 MetricCard의 색상과 텍스트 강도에 직접적인 영향을 미칩니다.
*   **개발팀 전달 포인트:** 각 상태(State)별로 필요한 Props와 해당 Props가 유발하는 CSS/Style 변화를 명시해야 합니다.

---

### 🟢 1. 통합 인터랙션 시나리오 정의 (Use Cases)

| Scenario ID | 데이터 입력 값 (Input Data) | Badge Level (`props`) | MetricCard 상태(State) | 예상 사용자 경험 (UX Flow) |
| :--- | :--- | :--- | :--- | :--- |
| **UC-1** | `Revenue: $50k` / `Trend: +12%` | ✅ Success (Green) | 안정적, 긍정적 상승세 강조 | KPI와 Badge 모두 녹색 계열의 신뢰감을 전달. '지속 가능한 성장' 메시지 전달. |
| **UC-2** | `Inventory: Low Stock` / `Trend: Stable` | ⚠️ Warning (Yellow) | 경고 감지, 주의 필요 영역 강조 | MetricCard의 배경이나 테두리가 노란색으로 은은하게 변하고, 숫자에 '주의' 아이콘이 추가되어 시각적 경계심을 유발. |
| **UC-3** | `Debt: Overdue` / `Trend: Negative` | 🚨 Critical (Red) | 심각한 위험 감지, 즉각 행동 요구 | MetricCard의 주 색상이 빨간색으로 바뀌고, 전체 컴포넌트에 강렬한 그림자(Shadow) 및 깜빡임 애니메이션을 적용하여 시선 집중. |

---

### 🟡 2. 상태별 디자인 & 기술 명세 (State-Specific Technical Specs)

#### 🔷 State A: Success / Stable Growth (UC-1 기준)
*   **Badge Props:** `level="success"`
*   **MetricCard 변경 규칙:**
    *   `$color_primary`: `#27ae60` (딥 그린, 신뢰성)
    *   `$bg_gradient`: 투명 -> #e9f7ef (은은한 배경 강조)
    *   `$border_thickness`: 1px solid #2ecc71
    *   **Interaction:** 부드러운 `scale(1.0)` 애니메이션으로 안정감을 부여합니다.

#### 🔷 State B: Warning / Caution (UC-2 기준)
*   **Badge Props:** `level="warning"`
*   **MetricCard 변경 규칙:**
    *   `$color_primary`: `#f39c12` (앰버/골드, 주의)
    *   `$bg_gradient`: #fff8e1 -> #ffe0b2 (따뜻한 경고 배경)
    *   `$border_thickness`: 2px dashed #ffcc80 (점선 강조로 비정형적 느낌 부여)
    *   **Interaction:** `pulse(slow)` 애니메이션을 적용하여 지속적인 주의를 환기시킵니다.

#### 🔴 State C: Critical / Action Required (UC-3 기준)
*   **Badge Props:** `level="critical"`
*   **MetricCard 변경 규칙:**
    *   `$color_primary`: `#c0392b` (강한 레드, 위기)
    *   `$bg_gradient`: #fdeded -> #fadbd8 (빨간색 기반의 위험 경고 배경)
    *   `$border_thickness`: 3px solid #e74c3c (두껍고 명확한 경계)
    *   **Interaction:** `blink(fast)` 애니메이션과 함께, 상단에 **'❗즉시 확인 필요'**라는 고정된 오버레이 텍스트가 노출되어야 합니다.

---

### 🛠️ 3. 개발팀을 위한 최종 컴포넌트 Props 구조 (API Level)

두 컴포넌트는 다음의 공통 인터페이스를 사용하도록 강제합니다.

```typescript
interface ComponentProps {
    // 필수 Prop: Badge가 제공하는 상태 레벨
    alertLevel: 'success' | 'warning' | 'critical'; 
    
    // MetricCard에 필요한 핵심 데이터 (상태 변화의 근거)
    kpiValue: number;       // 예: 50000
    trendChange: number;   // 예: 12.3
    
    // 추가적인 조건부 Props (필요 시)
    isOverdue?: boolean; 
}
```

**✅ 검토 요청 사항:** 위 `alertLevel`에 따라 CSS/Animation이 변하는 로직을 컴포넌트 레벨에서 처리할 수 있는지 코다리에게 기술적 확인을 요청합니다.