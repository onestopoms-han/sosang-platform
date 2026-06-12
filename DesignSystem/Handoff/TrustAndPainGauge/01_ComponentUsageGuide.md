# 🛠️ Trust Widget & PainGauge 컴포넌트 사용 가이드 (V2.0 - 개발팀 최종 핸드오프)

## ✨ 개요
본 문서는 `BDS소상공인플렛폼`의 핵심 데이터 시각화 컴포넌트인 '신뢰 지표(Trust Widget)'와 '고통 지표(PainGauge)'의 디자인 시스템 표준 및 구현 가이드를 담고 있습니다. 개발팀은 이 사양을 기반으로 React/Vue 등 프론트엔드 스택에 즉시 컴포넌트를 구현해야 합니다.

## 📐 핵심 토큰 (Design Tokens)
| 토큰 이름 | 정의 | 값 (Hex Code) | 용도 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| `--color-primary` | 신뢰/안정성 강조색 | `#004D66` (Deep Blue) | 메인 배경, 핵심 CTA, 경계선 | Trust Widget의 기본 컬러 |
| `--color-secondary` | 성장/긍정적 변화 강조색 | `#3CB371` (Growth Green) | 긍정적 수치, 성공 상태, 진행 바 | PainGauge의 개선 영역 |
| `--color-danger` | 위험/주의 경고색 | `#CC0000` | 낮은 점수, 문제 발생 시 | 임계점(Threshold) 하회 |
| `--spacing-unit-1x` | 기본 간격 단위 | `8px` | 컴포넌트 내부 패딩 및 마진 | 8px 그리드 시스템 준수 |

## 🧩 컴포넌트별 상세 사양 (Props & States)

### 🟢 Trust Widget (신뢰 지표)
**[기능]**: 사용자의 신뢰 수준을 시각적으로 측정하고, 그에 따른 안정성을 제시합니다.
**[위젯 구조]**: [Gauge Bar] + [Score Text] + [Description Tag]

| Prop Name | Type | Required | Description | Valid Values / Example | 개발 가이드 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `score` | Number | Yes | 현재 측정된 신뢰 점수 (0-100) | 85 | **[핵심]** 이 값이 게이지 바의 길이와 색상을 결정합니다. |
| `status` | Enum | Yes | 지표 상태 분류 | `'High'`, `'Medium'`, `'Low'` | `score` 값에 따라 내부 로직이 변경됩니다. |
| `variant` | String | No | 위젯 스타일 옵션 | `'compact'`, `'standard'` | 간격과 패딩 변화를 통해 대응합니다. |

**[상태별 디자인 및 구현 지침]**

1.  **High (score >= 75):**
    *   **색상:** `--color-secondary` (`#3CB371`)
    *   **시각적 피드백:** 게이지가 녹색 영역에 머물며, 부드러운 `scale-up` 애니메이션 적용.
2.  **Medium (score 40 - 74):**
    *   **색상:** `--color-primary` (`#004D66`)
    *   **시각적 피드백:** 중간 단계임을 알리는 은은한 `pulsing` 효과 적용.
3.  **Low (score < 40):**
    *   **색상:** `--color-danger` (`#CC0000`)
    *   **시각적 피드백:** 경고 애니메이션과 함께, 하단에 **'주의: 즉각적인 개선 필요'**와 같은 명확한 Callout 텍스트를 추가해야 합니다.

---

### 🟡 PainGauge (고통 지표)
**[기능]**: 소상공인이 느끼는 어려움(Pain Point)의 정도를 측정하고, 해결을 통한 잠재적 성장 가능성을 제시합니다.
**[위젯 구조]**: [Progress Bar] + [Gap Analysis Area]

| Prop Name | Type | Required | Description | Valid Values / Example | 개발 가이드 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `painScore` | Number | Yes | 현재 고통 점수 (0-100) | 65 | 이 값이 게이지 바의 '채워진' 영역을 결정합니다. |
| `potentialGain` | Number | Yes | 해결 시 잠재적 개선점 (0-100) | 25 | **[핵심]** 이 값은 남는 여백(Gap)의 크기를 결정하며, 성장 가능성을 나타냅니다. |

**[구현 및 애니메이션 지침]**
1.  **Progress Bar:** 게이지 바는 `painScore`에 해당하는 너비로 채워집니다. (색상: `--color-danger`)
2.  **Gap Analysis Area:** 남은 여백(100 - `painScore`)을 '성장 잠재력'으로 정의하고, 이 영역을 배경의 밝고 긍정적인 색상(`--color-secondary` 계열)으로 처리합니다.
3.  **애니메이션**: 페이지 로드 시, 게이지 바가 **좌측에서 우측으로 `painScore` 값에 맞춰 부드럽게 채워지는(Fill Animation)** 애니메이션을 적용해야 합니다. (시간: 0.8s)

---
### 💡 QA 및 통합 체크리스트 (개발팀 최종 Sign-off용)
*   [ ] **토큰 일관성:** 모든 색상과 간격은 정의된 Design Tokens를 사용했는지 확인.
*   [ ] **반응형(Responsive):** 모바일, 태블릿, 데스크톱 환경에서 컴포넌트 크기가 적절히 조정되는지 테스트.
*   [ ] **접근성(A11y):** 모든 위젯에 ARIA 레이블과 스크린 리더가 읽을 수 있는 대체 텍스트가 포함되었는지 확인.
*   [ ] **상태 처리:** 데이터 로딩/오류 발생 시, `Skeleton Loader` 및 `Fallback UI`가 정상 작동하는지 검증 (코다리 구현 영역 연동).