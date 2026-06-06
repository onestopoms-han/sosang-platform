# 🔗 Trust Element 최종 통합 컴포넌트 명세서 (V3.0)

## 📄 목적 및 범위
본 문서는 BDS소상공인플렛폼의 모든 신뢰 관련 시각적 요소(Trust Widget, Trust Meter 등)가 **기술 안정성 지표**를 가장 일관되고 설득력 있게 전달하기 위한 최종 기준점입니다. 디자인 시스템 (V2.0)과 API 명세 (V2.0)의 모든 요소를 통합하여 개발 및 QA의 단일 참조 문건으로 사용합니다.

## 🎯 적용 컴포넌트
*   **메인 위젯:** Trust Widget (핵심 기술 안정성 지표 표시)
*   **보조 요소:** Trust Meter / Confidence Score Card (페이지별 신뢰도 요약 표시)

---

## ⚙️ 섹션 1: 데이터 구조 및 흐름 (API Spec 기반)

### 1.1 필수 입력 필드 (Data Schema)
| 필드명 | 타입 | 설명 | 예시값 | 중요도 |
| :--- | :--- | :--- | :--- | :--- |
| `status` | Enum | 시스템 상태 ('SUCCESS', 'WARNING', 'CRITICAL', 'UNKNOWN') | 'SUCCESS' | 필수 |
| `data_points` | Array<Object> | 측정 지표 배열 (예: Success Rate, Uptime) | [{name: "Success Rate", value: 0.98, unit: "%"}] | 필수 |
| `last_updated` | String | 데이터 최종 업데이트 시점 (ISO 8601) | "2026-06-07T10:30:00Z" | 필수 |
| `message` | String | 사용자에게 전달할 요약 메시지 (CTA와 연동 가능) | "지난 1년간 최고 수준의 안정성을 기록했습니다." | 선택 |

### 1.2 데이터 흐름 로직 (Logic Flow)
*   **성공 상태(`SUCCESS`):** 모든 `data_points`가 임계값(예: Success Rate > 95%)을 만족할 경우. **[디자인 방향]**: Growth Green 색상을 주력으로 사용하여 '안심'과 '성장'의 느낌 부여.
*   **경고 상태(`WARNING`):** 일부 `data_points`가 임계값에 근접했거나, 주기적인 모니터링이 필요할 때. **[디자인 방향]**: Deep Blue 배경 위에 Warning Orange를 포인트 컬러로 사용하여 '주의 깊은 확인' 유도.
*   **심각 상태(`CRITICAL`):** 핵심 지표(예: Retry Rate)가 기준치를 크게 벗어나거나, 서비스 장애 이력이 있을 때. **[디자인 방향]**: 강한 경고성을 띠는 Deep Blue/Red 조합을 사용하고, 즉각적인 해결책 제시 필수.
*   **미확인 상태(`UNKNOWN`):** 데이터 수집에 실패했거나 API 호출이 불가능할 때. **[디자인 방향]**: 중립적이고 투명한 회색 계열의 톤으로 '데이터 로딩 중'임을 명시하며 사용자 이탈 방지.

---

## ✨ 섹션 2: 시각 디자인 및 컴포넌트 스펙 (Design System V2.0 기반)

### 2.1 기본 레이아웃 구조 (Layout Structure)
*   **[최상단]:** Status Indicator (Badge 형태, 가장 먼저 눈에 띄는 위치).
*   **[중앙]:** Main Metric Visualization (핵심 지표를 원형 차트 또는 게이지 형태로 시각화. **숫자 크기: H1 레벨 사용**).
*   **[하단]:** Supporting Metrics List (측정 지표 배열을 리스트로 나열하며, 각 지표에 대한 간결한 설명과 추이를 제공).

### 2.2 상태별 시각적 규칙 (State-Specific Visual Rules)

| Status | 주 색상(Primary Color) | 강조색(Accent Color) | 아이콘/모양 | 필수 메시지 컴포넌트 |
| :--- | :--- | :--- | :--- | :--- |
| **SUCCESS** | Deep Blue (#004D66) | Growth Green (#3CB371) | 체크 마크 (✓), 상승 화살표 (↑) | "데이터 기반의 확실한 성장." |
| **WARNING** | Deep Blue (#004D66) | Warning Orange (#FF9800) | 경고 삼각형 (!), 모니터 아이콘 | "정기적인 관리가 필요한 지표가 있습니다. 자세히 확인하세요." |
| **CRITICAL** | Deep Blue (#004D66) | Red (#D32F2F) | 느낌표 (❗), 다운 화살표 (↓) | "서비스 안정성에 문제가 발생했습니다. 즉시 전문가에게 문의하세요." |

### 2.3 인터랙션 및 예외 처리
1.  **Tooltip/Hover:** 모든 수치 지표 위에 마우스를 올릴 경우, 해당 지표의 **변동 추이 그래프(Mini-Chart)**가 반드시 표시되어야 합니다. (시간 경과에 따른 변화를 시각화).
2.  **Error State (개발팀 요청):** API 통신 실패 시에는 단순히 "오류"라고 표시하는 것이 아니라, "데이터 로드를 위해 잠시만 기다려 주세요."와 같은 **사용자 친화적인 액션 메시지**가 표시되어야 합니다.

---
*작성일: 2026-06-07*
*승인 예정: [디자인] / [개발]*