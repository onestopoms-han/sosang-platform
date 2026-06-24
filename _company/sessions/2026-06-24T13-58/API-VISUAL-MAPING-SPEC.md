<create_file>
# 📄 API-VISUAL-MAPING-SPEC.md

## 1. 개요 및 목적
`DiagnosisOutputSchema v2`에서 정의된 API 응답 데이터를 프론트엔드 UI 컴포넌트로 효율적으로 렌더링하기 위한 데이터 계약서입니다. 백엔드의 필드명, 타입, 조건이 프론트엔드의 컴포넌트 상태, 색상, 레이아웃과 어떻게 매핑되는지 기술합니다.

## 2. 브랜드 및 디자인 시스템 변수 (Global Constants)
프론트엔드에서 전역으로 적용해야 할 색상 및 스타일 규칙입니다.

```typescript
const BRAND_COLORS = {
  DEEP_BLUE: '#004D66',    // 배경, 신뢰감, 기본 텍스트
  GROWTH_GREEN: '#3CB371', // 강조, 성공, CTA 버튼
  WARNING_RED: '#E57373',  // 위험도 'High' 시 사용
  CAUTION_ORANGE: '#FFB74D', // 주의가 필요할 때
};

// 조건부 렌더링 변수
const RISK_LABELS = {
  LOW: 'A (Safe)',
  MEDIUM: 'B (Caution)',
  HIGH: 'C (Critical)'
};
```

## 3. API 응답 필드 매핑 표 (Field Mapping Matrix)
백엔드가 반환하는 JSON 객체의 각 키가 프론트엔드 UI 의 어떤 요소에 연결되는지 정의합니다.

| API 필드명 | 타입 | 조건/값 예시 | UI 컴포넌트/행동 | 시각적 규칙 |
| :--- | :--- | :--- | :--- | :--- |
| `risk_score.level` | Enum | `'HIGH'`, `'MEDIUM'`, `'LOW'` | `RiskBannerComponent` (배너) | High → Red 배경 (`WARNING_RED`), Medium → Orange, Low → Green |
| `risk_score.score_value` | Number | 0 ~ 100 | `ProgressRingComponent` (링 차트) | 0~30: Green, 31~70: Yellow/Orange, >70: Red |
| `diagnosis_result.flow_id` | String | `'A01'`, `'B02'`, `'C03'` | `FlowRendererComponent` (플로우 렌더) | 해당 ID 에 맞는 스토리라인 SVG 또는 단계별 카드 렌더링 |
| `premium_value_proposition.time_saved` | Number | 4.5 | `TimeSaverBadge` ( 배지 ) | "월 평균 시간 절약 효과: ${time_saved}시간" 텍스트 표시 |
| `action_plan_flow.stage` | Enum | `'INTRO'`, `'DIAGNOSIS'`, `'CONVERSION'` | `PageRouter` (라우터) | 현재 단계에 맞는 컴포넌트 (`IntroView`, `DiagnosisView`, `ConversionView`) 렌더링 |
| `api_metadata.system_uptime` | String | `"99.9%"` | `TrustIndicatorComponent` | 신뢰도 배지 (`"시스템 안정성: 99.9%"`) 표시 |

## 4. 조건부 로직 예시 (Conditional Rendering Logic)
프론트엔드 컴포넌트 내부에서 API 데이터를 기반으로 조건부 렌더링을 수행하는 로직입니다.

```typescript
// Example: Conversion View 렌더링 로직
function renderConversionView(data) {
  const isPremium = data.action_plan_flow.stage === 'CONVERSION';
  const showPremiumCTA = !isPremium && data.risk_score.level !== 'LOW'; // High/Medium일 때 CTA

  return (
    <div className="conversion-container">
      {/* 신뢰도 표시 */}
      <TrustIndicator uptime={data.api_metadata.system_uptime} />
      
      {/* 리스크 배너 */}
      <RiskBanner level={data.risk_score.level} color={getRiskColor(data.risk_score.level)} />

      {showPremiumCTA && (
        <button className="cta-button" style={{ backgroundColor: BRAND_COLORS.GROWTH_GREEN }}>
          Premium 솔루션으로 전환하기
        </button>
      )}
    </div>
  );
}
```

## 5. 예시 응답 데이터 및 예상 UI 결과

### API 응답 예시 (`DiagnosisOutputSchema v2`)
```json
{
  "risk_score": {
    "level": "HIGH",
    "score_value": 85,
    "trend": "rising"
  },
  "api_metadata": {
    "system_uptime": "99.9%",
    "version": "2.1.0"
  },
  "premium_value_proposition": {
    "time_saved": 4.5,
    "unique_feature": "AI 기반 손실 예측 정확도 95%"
  }
}
```

### 예상 UI 렌더링 결과
- **RiskBanner**: 빨간색 배경 (`WARNING_RED`)에 "손실 위험도 High" 텍스트 표시
- **ProgressRing**: 링 차트가 85% 채워져 있고 붉은색으로 표시됨 (위험 구간).
- **TrustIndicator**: 우측 상단에 작은 배지 `시스템 안정성: 99.9%` 표시됨.

## 6. 다음 단계 및 개발 팀 협업 가이드라인
- **백엔드 팀**: 위 스키마를 준수하여 API 응답을 반환합니다. 필드명은 변경하지 않습니다.
- **프론트엔드 팀**: 위의 매핑 표와 조건부 로직을 컴포넌트 구현 시 참조합니다. `DiagnosisOutputSchema v2`의 필드가 누락되면 UI 가 깨질 수 있으므로 필수 필드를 유지해야 합니다.
- **테스트 팀**: 위 예시 응답 데이터를 포함한 단위 테스트 케이스를 작성하여 각 컴포넌트의 렌더링 정확도를 검증합니다.

---
**작성자:** 코다리 (Developer Agent)
**날짜:** 2026-06-24T13:57