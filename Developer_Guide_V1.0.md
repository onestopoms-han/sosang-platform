# ✨ BDS Component Library: Developer Guide V1.0 (SSOT)

## 🚀 개요
본 문서는 BDS 플랫폼의 모든 개발 컴포넌트에 대한 단일 진실 공급원(Single Source of Truth, SSOT)입니다. 백엔드/프론트엔드 개발팀은 본 가이드를 기반으로 구현을 진행해야 하며, 디자인 수정 요청 시 반드시 본 문서에 반영되어야 합니다.

## 🎨 공통 시스템 및 변수 정의
### 1. 컬러 팔레트 (Color Palette)
| 용도 | 색상명 | HEX Code | Role/사용 예시 |
| :--- | :--- | :--- | :--- |
| Primary | BDS Blue | #0056A8 | 핵심 CTA, 헤딩 배경 등 |
| Secondary | Accent Green | #2ECC71 | 긍정적 상태(Low Pain, High Trust) 표시 |
| Danger | Alarm Red | #E74C3C | 위험/분노 단계(High Pain, Low Trust) 표시 |
| Neutral-BG | Light Gray | #F5F5F5 | 배경색 (Card, Section Divider) |
| Text-Primary | Dark Black | #212121 | 본문 텍스트 기본 색상 |

### 2. 타이포그래피 (Typography)
*   **폰트:** Noto Sans KR (Fallback: Malgun Gothic)
*   **H1:** 32px, Bold (핵심 섹션 제목)
*   **Body:** 16px, Regular (본문 내용)

---

## 🧩 컴포넌트별 API 명세서 (Component Specification)

### 1. TrustWidget Component
신뢰도 등급(A/B/C)을 시각적으로 표현하는 위젯입니다.

**🔗 파일 경로:** `src/components/TrustWidget.tsx`
**📚 Props 정의 (TypeScript):**
```typescript
interface TrustWidgetProps {
  /** 리스크 등급 ('A', 'B', 'C'). 기본값은 'A'. */
  riskGrade?: 'A' | 'B' | 'C'; 
  /** 위젯에 표시할 구체적인 신뢰 메시지 (선택 사항). */
  message?: string; 
}
```

**🎨 상태(State) 정의 및 시각 규칙:**
| Props 값 (`riskGrade`) | 색상 (Background/Text) | 아이콘 | 의미 |
| :--- | :--- | :--- | :--- |
| 'A' (High Trust) | `#2ECC71` / White | ✅ | 매우 신뢰할 수 있는 파트너입니다. |
| 'B' (Medium Trust)| `#F39C12` / Dark | ⚠️ | 추가 검토가 필요합니다. |
| 'C' (Low Trust) | `#E74C3C` / White | ❌ | 신뢰도가 낮습니다. 주의가 필요합니다. |

**🧪 개발 가이드라인:**
*   **Accessibility:** 모든 등급에 대한 ARIA Label을 반드시 추가해야 합니다.
*   **Integration:** `message` Prop이 제공될 경우, 위젯 아래에 `<p class="trust-detail-msg">` 형태로 표시되어야 합니다.

### 2. PainGauge Component
소상공인의 감정적 난이도(Pain Level)를 시각적으로 게이지로 표현합니다. (0~100점 기준)

**🔗 파일 경로:** `src/components/PainGauge.tsx`
**📚 Props 정의 (TypeScript):**
```typescript
interface PainGaugeProps {
  /** 현재 Pain Level 점수 (0 ~ 100). 기본값은 25. */
  painLevel: number; 
}
```

**🔥 상태(State) 정의 및 시각 규칙:**
| Props 값 (`painLevel` 범위) | 색상 (Gauge Fill Color) | 감정 단계 (Pain Stage) | 키 메시지 (Headline Suggestion) |
| :--- | :--- | :--- | :--- |
| 0 - 39 | `#2ECC71` (Green) | Low Pain (고요/안도) | "상황을 진단하고 해결책을 찾고 있습니다." |
| 40 - 79 | `#F39C12` (Orange)| Medium Pain (불만/좌절) | "어떤 어려움에 부딪히셨나요? 함께 논의해봅시다." |
| 80 - 100 | `#E74C3C` (Red) | High Pain (분노/위기) | "지금 당장 무엇이 가장 힘든가요? 즉각적인 도움이 필요합니다." |

**📐 개발 가이드라인:**
*   **Animation:** `painLevel` 변화 시 부드러운 트랜지션(Transition) 효과를 적용해야 합니다. (CSS Transition: `width 0.5s ease-in-out`)
*   **Tooltip:** 마우스 오버 시, 현재 점수와 해당 단계의 이름이 Tooltip으로 표시되어야 합니다.

### 3. StoryInputForm Component
(미구현) 소상공인의 경험을 스토리텔링 형태로 입력받는 핵심 양식 컴포넌트입니다.

**🔗 파일 경로:** `src/components/StoryInputForm.tsx` (신규 구현 필요)
**📚 Props 정의 (TypeScript):**
```typescript
interface StoryInputFormProps {
  // ... 추후 추가될 필드 명세서가 여기에 들어갑니다.
}
```

---

## 🛠️ 개발팀 체크리스트 및 다음 단계
1. **테스트 시나리오 확보:** 모든 컴포넌트 조합에 대한 테스트 케이스를 Writer에게 요청합니다. (예: Trust='C' & Pain=95)
2. **A11y 검토 완료:** 위젯의 역할(Role)과 상태 메시지 전달이 스크린 리더와 완벽하게 호환되는지 QA팀과 재검증해야 합니다.