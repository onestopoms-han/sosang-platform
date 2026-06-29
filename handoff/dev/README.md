# 🛠️ BDS 개발자 핸드오프 패키지 (V4.0)

## 🎯 목적
본 문서는 '시스템 안정성 지표'를 핵심 가치로 삼는 모든 컴포넌트의 최종 구현 사양을 담고 있습니다. 단순한 디자인 참고 자료가 아닌, **개발팀이 직접 코딩 규칙(Coding Rules)**으로 활용할 수 있도록 토큰 및 스키마 형태로 제공됩니다.

## 📁 구조 개요
1. `DESIGN_TOKENS.css`: 모든 색상, 간격, 타이포그래피의 근간이 되는 변수 정의 파일. **이 파일을 기준으로 전역 스타일을 관리해야 합니다.**
2. `component_schemas/PaymentFailureScreenSchema.json`: 핵심 인터랙션 컴포넌트(`PaymentFailureScreen`)의 Props 구조와 상태 전환 로직(State Logic)을 담은 JSON 스키마.

## 🚀 개발 지침 (Codari & Dev Team)
1. **디자인 시스템 강제 적용:** 모든 UI 요소는 `DESIGN_TOKENS.css`에 정의된 변수(`var(--color-bds-deepblue)`, `var(--font-family-primary)` 등)를 *반드시* 참조해야 합니다. 하드코딩 금지.
2. **상태 기반 로직 구현:** 시스템 안정성 지표(PRSR, ERT)의 변화에 따른 UI/UX 흐름을 스펙 준수하여 개발하십시오. 특히 `PaymentFailureScreen`은 JSON Schema에 명시된 우선순위 순서대로 로직을 구성해야 합니다.
3. **Next Step:** 위 토큰과 스키마를 기반으로, 코다리는 실제 컴포넌트 구현(React/Vue 등)을 진행하고, 백엔드 개발팀은 이 스키마를 바탕으로 API 연동 및 데이터 유효성 검사 로직을 완성해야 합니다.