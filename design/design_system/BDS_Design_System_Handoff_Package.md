# 🎨 BDS 디자인 시스템 최종 핸드오프 패키지 v1.0
## 🎯 목적
이 문서는 모든 컴포넌트 구현(Trust Widget, PainGauge 등)의 단일 진실 공급원(Single Source of Truth, SSOT)이며, 개발팀과 QA팀이 코딩 및 테스트 시 반드시 참조해야 하는 최종 명세서입니다.

---

## I. 디자인 토큰 (Design Tokens)
개발 환경에서 사용될 모든 기본 값 정의.

### 1. 컬러 팔레트 (Color Palette)
| 용도 | 이름 | HEX 코드 | 설명 |
| :--- | :--- | :--- | :--- |
| Primary Action | `--color-primary` | `#2980B9` | 핵심 액션 버튼, 강조색 (신뢰/성장) |
| Success State | `--color-success` | `#2ECC71` | Trust Widget: A 등급, 긍정적 상태 |
| Warning State | `--color-warning` | `#F39C12` | Trust Widget: B 등급, 주의 필요 상태 |
| Danger State | `--color-danger` | `#E74C3C` | Trust Widget/PainGauge: C 등급 (분노), 위험 상태 |
| Background Neutral | `--color-bg-neutral` | `#F8F9FA` | 기본 배경색 |
| Border Default | `--color-border` | `#CED4DA` | 일반적인 경계선 색상 |

### 2. 타이포그래피 (Typography)
*   **폰트:** Noto Sans KR (가독성 최우선)
*   **H1:** 32px, Bold, `--color-primary`
*   **Body Large:** 18px, Regular
*   **Small Label:** 14px, SemiBold

### 3. 간격 및 그림자 (Spacing & Shadow)
*   **Spacing Unit:** $4\text{pt}$ 기반 스케일링 (예: `spacing-md`: $16\text{px}$, `spacing-lg`: $24\text{px}$)
*   **Shadow:** Soft Box Shadow (z-index 10)

---

## II. 컴포넌트별 인터랙션 및 흐름 상세 정의

### 💡 A. PainGauge Component Flow
| 상태 | 시각적 변화 | 상호작용(UX) | 개발 명세 참고 |
| :--- | :--- | :--- | :--- |
| **Low (녹색)** | 배경: 연한 녹색, 아이콘: 👍 / 🟢 | 마우스를 올리면(Hover): 부드러운 확장 애니메이션. | `pain_level_state_map_v2.md` 참조 |
| **Medium (노란색)** | 배경: 연한 노란색, 아이콘: ⚠️ / 🟡 | 클릭 시: 다음 단계(Self-Reflection)로의 흐름 유도. | 상태 변화 트리거 확인 필요. |
| **High (빨간색)** | 배경: 빨간색 고정, 아이콘: 🔥 / 🔴 | 강렬한 경고 애니메이션(Pulse). 이탈 방지 액션 필수. | `--color-danger` 사용. |

### ✨ B. TrustWidget Component Flow
*   **표시 위치:** PainGauge 바로 하단 (맥락적 연계성 강조)
*   **데이터 흐름:** 진단 결과 (`DiagnosisOutputSchema`)의 `risk_grade`에 따라 동적으로 클래스 변경 및 색상 적용.
*   **애니메이션:** 컴포넌트 로딩 시, 리스크 등급별 색상이 0.3초 동안 페이드인되어 신뢰도를 높임.

---

## III. QA 테스트 케이스 매트릭스 (Critical Path)
개발 완료 후 QA팀이 가장 먼저 검증해야 할 핵심 경로 목록입니다.

| 컴포넌트 | 기능/시나리오 | 입력값(Input) | 예상 결과(Expected Output) | 성공 기준 및 예외 처리 |
| :--- | :--- | :--- | :--- | :--- |
| **PainGauge** | 초기 진단 (Low) | Pain Level: Low | 🟢 표시. "안전한 상태입니다." 메시지 출력. | 배경색, 아이콘 색상 정확성 검증. |
| **PainGauge** | 심각 단계 도달 | Pain Level: High | 🔴 표시. "즉각적인 개선이 필요합니다!" 경고창 활성화. | 에러 핸들링(High일 때 다른 데이터가 들어올 경우) 확인. |
| **TrustWidget** | Low Risk (A등급) | `risk_grade`: 'A' | ✅ 녹색 테두리와 텍스트 표시. "높음" 레이블 필수 포함. | 색상 코드가 정확한지, 애니메이션이 적용되는지 확인. |
| **Integration** | 전체 흐름 (High → Low) | PainGauge(High) $\to$ [액션] $\to$ 진단 재실행(Low) | High 상태에서 Low 상태로의 시각적/데이터 변화가 부드럽게 이어지는지 검증. | 페이지 이동 없이, 컴포넌트 내부 데이터 업데이트만으로 완성되어야 함. |