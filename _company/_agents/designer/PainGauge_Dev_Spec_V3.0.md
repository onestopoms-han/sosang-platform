# 🎯 컴포넌트 구현 명세서: Pain Gauge (v3.0)
## Source of Truth for Development

### 1. 개요 및 목표
본 문서는 '안전 마진(Safety Margin)' KPI를 시각화하는 핵심 게이지 컴포넌트(`PainGauge`)의 최종 개발 사양을 제공합니다. 데이터 설계, 비주얼 가이드라인, 인터랙션 로직이 완벽하게 통합되어야 합니다.

### 2. Props 및 Data Input Specification (TypeScript/JSON Schema 기반)
컴포넌트가 요구하는 필수 속성(Props) 정의입니다. 코다리 개발팀은 이 스키마에 맞춰 API 응답을 설계해야 합니다.

| Prop Name | Type | Required | Description | Constraints / Example |
| :--- | :--- | :--- | :--- | :--- |
| `gaugeKey` | String | Yes | 지표의 고유 키 (예: 'SafetyMargin', 'FinancialPain') | 필수 값. 대시보드 제목 및 툴팁에 사용. |
| `value` | Number | Yes | 현재 측정된 KPI 수치 (%) | 범위: -100 to 150. 소수점 둘째 자리까지 처리. |
| `thresholds` | Object | No | 안전 마진 레벨별 임계값 정의 (배경 색상 매핑용) | `{ warning: 60, critical: 30 }`. 기본값 사용 가능. |
| `unit` | String | Yes | 수치 단위 표시 (예: '%', '점') | 항상 정확한 단위를 제공해야 함. |

### 3. Visual Logic & State Mapping (핵심 로직)
게이지의 시각적 상태(색상, 모양)는 오직 다음 데이터 조건에 의해서만 결정되어야 합니다.

| `value` 범위 (%) | Pain Level | 색상 코드 (Hex) | 배경/표현 방식 | 사용자 메시지 (Tooltip) |
| :--- | :--- | :--- | :--- | :--- |
| **100 이상** | Optimal (최적) | `#28A745` (Success Green) | 완전 충전된 원형 게이지. 부드러운 그라데이션 적용. | "매우 안정적입니다. 계획대로 운영 가능합니다." |
| **60 ~ 99** | Moderate (보통) | `#FFC107` (Warning Yellow) | 충분한 여유 공간을 확보하는 게이지. | "주의 필요. 일부 리스크에 대비한 점검이 필요합니다." |
| **30 ~ 59** | High Risk (위험) | `#FD7E14` (Orange) | 위험 수위에 도달했음을 강조. | "⚠️ 경고! 즉각적인 자원 재배치가 필요합니다." |
| **30 미만** | Critical (심각) | `#DC3545` (Danger Red) | 게이지가 급격히 축소되며, 애니메이션 효과 적용 필수. | "🚨 심각한 위기! 핵심 KPI 지표를 즉시 점검하세요." |

### 4. Component Usage Guide (개발 예제 코드 스니펫)
```tsx
// Example: Safety Margin Gauge Implementation
<PainGauge 
  gaugeKey="SafetyMargin" 
  value={75.2} 
  unit="%" 
  thresholds={{ warning: 60, critical: 30 }} 
/>

// Example: Critical Pain Gauge (Low Value)
<PainGauge 
  gaugeKey="FinancialPain" 
  value={18.5} 
  unit="" 
/>
```

### 5. 컴포넌트 필수 체크리스트 (QA Checklist for Dev Team)
*   [ ] **반응형 설계:** 모든 화면 크기(Mobile/Desktop)에서 게이지의 시각적 왜곡이 없어야 합니다.
*   [ ] **접근성(A11y):** 색상 대비(Contrast Ratio)가 WCAG AA 레벨 이상을 충족해야 하며, 스크린 리더를 위한 `aria-label`이 필수입니다.
*   [ ] **데이터 로딩 상태:** 초기 데이터 로드 시에는 'Data Loading...' 플레이스홀더와 애니메이션 스켈레톤 UI를 표시해야 합니다.