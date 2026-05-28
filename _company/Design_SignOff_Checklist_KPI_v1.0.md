# 🎨 BDS소상공인플렛폼: 핵심 컴포넌트 디자인 최종 Sign-Off 리포트 (v1.0)

**검수 대상:** KPI-Card, TrendGraph
**목적:** 확정된 브랜드 토큰(Color/Typography) 및 상태 반영 규칙(Critical/Warning 등)이 개발 구현 스펙과 100% 일치하는지 최종 확인하고 통합 명세서화.
**작성자:** Designer (Lead Designer)

---

## 🟢 1. 디자인 토큰 일관성 검증 (Design Token Consistency Check)

모든 컴포넌트에서 다음의 기본 토큰 사용 규칙을 지켜야 합니다. 개발팀은 CSS/Styled-Component 레벨에서 이 토큰 값을 직접 참조하여 구현해야 합니다.

| 영역 | 토큰명 | 정의 값 | 사용 예시 및 검수 사항 |
| :--- | :--- | :--- | :--- |
| **Primary Color** | `--color-primary` | `#007AFF` (Blue) | 버튼 배경, 핵심 CTA 강조. *KPI 수치 상승 화살표에 제한적 사용.* |
| **Background** | `--color-bg-main` | `#F9F9F9` | 컴포넌트 외부 영역 기본 배경색. |
| **Text/Body** | `--color-text-body` | `#333333` | 모든 일반 텍스트 (레이블, 설명 등). |
| **Highlight Accent** | `--color-accent` | `#FFC107` (Amber) | 'Opportunity'와 같은 긍정적 가이드 강조 영역. *과도한 사용 금지.* |

## 🔴 2. 상태 반영 규칙 검증 (Status Reflection Rules - Color & Iconography)

KPI 수치나 지표 변화에 따른 시각적 경고 시스템은 가장 엄격하게 관리되어야 합니다. 이 매핑 테이블을 벗어난 색상 조합은 절대 금지합니다.

| 상태 | 기준 로직 (임계값) | 배경색/테두리 | 텍스트/아이콘색 | 아이콘 형태 | 검수 포인트 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Critical** | R01 < 70 | `#FFEDED` (Light Red) | `#D9534F` (Red) | ⚠️/🔴 | 배경과 텍스트의 명도 대비가 충분해야 합니다. 경고임을 즉각 인지 가능하도록 디자인합니다. |
| **Warning** | R01 < 85 AND ≥ 70 | `#FFFBEB` (Light Yellow) | `#F0AD4E` (Orange) | ⚠️/🟠 | Critical보다 낮은 긴장감을 주어야 합니다. 오탐지(False Positive)를 줄이는 것이 중요합니다. |
| **Normal** | R01 ≥ 85 | `--color-text-body` | `#333333` | ✅/🔵 | 기본 상태의 색상 토큰을 사용하며, 시각적 변화가 최소화되어야 합니다. (Neutral State) |

## 📐 3. 컴포넌트별 구조 및 UX 검수 항목

### A. KPI-Card (핵심 지표 요약 카드)
1. **데이터 흐름:** 반드시 `(지표명) > (현재 수치) > (변화량/추이)` 순서로 정보가 계층적으로 배치되어야 합니다.
2. **Typography:** '현재 수치'는 가장 큰 크기(`--font-size-xl`)를 사용하며, 상태 색상과 연동된 폰트 두께(Bold)를 적용합니다.
3. **Interactivity:** 카드 클릭 시 해당 지표의 상세 추이 그래프(TrendGraph)로 이동하는 명확한 액션 유도(CTA)가 필요합니다.

### B. TrendGraph (시간 흐름 추이 그래프)
1. **축(Axis) 표시:** Y축과 X축 라벨은 필수적으로 포함되어야 하며, 특히 '기간'을 나타내는 X축의 레이블링 간격 규칙(Spacing Token)을 엄수해야 합니다.
2. **색상 매핑:** 변화 추이선 자체는 Primary Color(`--color-primary`)를 기본으로 하되, 위 섹션 2의 상태 로직에 따라 선 색상이 동적으로 변환되어야 합니다. (e.g., Critical 구간에서는 Red 계열로 자동 전환)
3. **Tooltip/Hover:** 마우스 오버 시 정확한 날짜와 수치(Date/Value)가 포함된 Tooltip이 명확하게 떠야 하며, 이 툴팁의 배경색은 `--color-bg-main`을 따릅니다.

---
**[✅ 최종 승인 요약]**
*   **핵심:** 모든 시각적 요소는 정의된 토큰과 상태 매핑 규칙에 따라 **'일치하는 것'**이 최우선 목표입니다.
*   **개발팀 액션 요청:** 컴포넌트 구현 완료 후, 이 리포트를 기준으로 QA를 진행하고, 불일치 항목은 즉시 피드백하여 수정해야 합니다.