<header>## BDS 소상공인플랫폼 — P0 컴포넌트 최종 테스트 및 리스크 승인 계획서 (V1.0)</header><body>
### 1. 목표 (Objective)

MVP 핵심 기능인 `SME-AlertBadge` 와 `MetricCard` 가 **비즈니스 로직 (수익화 모델 연동)**과 **디자인 시스템 (손실 최소화 UX)**을 완벽히 준수하는지, 특히 **예외 상황 (Critical/Warning/Error 상태)**에서 정의된 대로 동작하는지를 검증합니다.

### 2. 주요 리스크 및 대응 전략 (Risk & Mitigation)

| 리스크 ID | 리스크 명세 | 원인 | 영향도 | 대응 방안 (Design/Code 기준) |
| :--- | :--- | :--- | :--- | :--- |
| **R01** | **데이터 누락으로 인한 UI 붕괴** | API 응답에서 필수 필드가 누락될 경우 | 🔴 **Critical** | JSON Schema 에서 `required` 지정. 백엔드 가드 로직 추가 (`validator`). |
| **R02** | **상태 변경 (State Transition) 실패** | Critical $\to$ Warning 전환 시 UI 가 즉시 업데이트되지 않음 | 🟠 **High** | React 상태 관리 (`useReducer`) 로 전역 상태 동기화. Debounce 로직 제거. |
| **R03** | **손실 최소화 테마 적용 실패** | 에러 상황에서도 경고색 (Orange) 이 아닌 중성색 (Gray) 으로 렌더링됨 | 🟠 **High** | `designer.md` 의 색채 가이드라인을 컴포넌트 스타일 객체 (`theme.critical`) 로 강제 적용. |
| **R04** | **수익화 로직 연동 오작동** | 정부/금융권 자금 지원 알림이 실제 수익 모델과 불일치 | 🟡 **Medium** | `financial_partnership_model_spec.md` 의 P1 기능을 UI 컴포넌트 props 로 명시. |
| **R05** | **에러 핸들링 UX 비일관성** | 예외 상황 (4xx/5xx) 에 대해 정해진 피드백 메시지 대신 기술적 오류 표시 | 🟠 **High** | `<run_command>grep -r "Error" . --include="*.tsx"` 를 실행하여 모든 Error Boundary 및 Fallback UI 를 스캔. |

### 3. 테스트 시나리오 (Test Scenarios) — P0 컴포넌트 검증

#### 시나리오 A: 정상 동작 (Happy Path)
- **조건**: API 가 정상 응답 (`status: 200`, `data.alert_level = "Critical"`)
- **기대 결과**: `SME-AlertBadge` 가 빨간색으로 표시되고, `MetricCard` 가 해당 데이터를 즉시 렌더링.
- **검증 도구**: React Test Library (`render`, `screen.getByText`).

#### 시나리오 B: 데이터 누락 (Negative Testing)
- **조건**: API 응답에서 `data.alert_level` 이 누락됨 (`undefined`)
- **기대 결과**: JSON Schema 유효성 검사 실패 메시지 표시. 백엔드 가드 로직이 활성화되어 기본값(`Normal`)으로 처리하거나, 사용자에게 "데이터를 다시 요청해주세요"라는 안내 메시지를 띄움.
- **검증 도구**: `validator.js` 또는 Pydantic 기반의 `fastapi` 백엔드 테스트.

#### 시나리오 C: 상태 전이 (State Transition)
- **조건**: 현재 상태가 `Warning`, API 에서 `Critical` 상태로 변경됨
- **기대 결과**: UI 가 즉시 `Critical` 색상을 적용하고, 이전 상태를 유지하지 않음.
- **검증 도구**: React DevTools State Inspector 를 모니터링하여 재렌더링 타이밍 확인.

#### 시나리오 D: 손실 최소화 테마 적용 (Error Handling UX)
- **조건**: API 에서 에러 상태 (`status: 500`) 가 발생함
- **기대 결과**: `ErrorBoundary` 가 활성화되어 `<run_command>` 의 결과처럼 기술적 오류 메시지를 대신 "잠시 데이터 처리 중입니다. 잠시 후 다시 시도해주세요"라는 손실 최소화 테마의 에러 메시지 (예: 파란색 배경에 흰 글씨) 가 표시됨.
- **검증 도구**: 브라우저 네트워크 탭에서 500 에러를 유발하고, UI 를 캡처하여 `designer.md` 의 가이드라인과 비교.

### 4. 실행 및 승인 프로세스

1.  **테스트 환경 구성**: `test_plan_final.md` 기준에 따라 로컬 개발 서버 (`dev`) 와 테스트 데이터 (Mock API) 를 준비합니다.
2.  **자동화 스크립트 작성**: Python 또는 Node.js 기반의 E2E 테스트 스크립트를 생성하여 위 시나리오를 자동 실행합니다.
3.  **결과 보고서 제출**: 모든 테스트가 통과된 후, `sessions/2026-05-29T14-48/test_result_report.md` 파일을 작성하고 CEO 및 개발팀에 공유합니다.

---

### 📊 평가: 완료 — MVP 핵심 기능의 기술적 리스크와 디자인 시스템 준수성을 검증할 테스트 계획이 수립됨
### 📝 다음 단계: `test_plan_final.md` 의 내용을 바탕으로 코다리에게 P0 컴포넌트 (SME-AlertBadge, MetricCard) 의 실제 코드 검증을 지시합니다.
</body>