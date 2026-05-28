# 📈 KPI Status Gauge 컴포넌트 최종 개발자 핸드오프 사양서 (V1.0)
## 📋 개요 및 목표
*   **컴포넌트명:** `KPIStatusGauge`
*   **목표:** 소상공인의 '시스템 안정성 지표'를 직관적이고 애니메이션 기반으로 시각화하여, 사용자에게 즉각적인 위기 인지 및 개선 행동을 유도한다.
*   **참조 사양서:** [Design_Token_Master_Spec_v2.0.md] (디자인 토큰의 단일 출처)

---
## 🎨 Part 1: Designer - 시각적/상호작용 스펙 (Designer Output)

### 1. 상태 정의 및 색상 코드 (Status & Color Palette)
| Status Level | 의미 | 배경색 (Background) | 게이지 바 색상 (Gauge Bar Fill) | 경고 메시지 (Text Color) |
| :---: | :---: | :---: | :---: | :---: |
| **CRITICAL** | 즉각적인 위험 (즉시 대응 필요) | #FFCDD2 (밝은 Red) | #DC143C (Crimson) | #B91C2E (짙은 Red) |
| **WARNING** | 주의 필요 (모니터링 및 계획 수립) | #FFF3CD (밝은 Yellow) | #FF8C00 (Dark Orange) | #6B46C1 (Indigo) |
| **NORMAL** | 안정적 (현상 유지 또는 개선 진행 중) | #D1FAE5 (밝은 Green) | #3CB371 (Medium Sea Green) | #065F46 (짙은 Green) |

### 2. 상태별 애니메이션 및 트랜지션 스펙
*   **Transition:** 모든 상태 변화는 **0.7초**의 부드러운 곡선(Ease-Out Cubic)을 적용한다.
*   **Normal State Animation:** 게이지 바 전체에 걸쳐 미세한 '숨쉬기' 효과 (Pulse Effect)를 주기적으로 적용한다. (주기: 3s, Scale: 1.02 $\rightarrow$ 1.0)
*   **Critical State Transition:** Normal $\to$ Critical 전환 시, 게이지 바가 **점진적이고 빠르게(Rapid Filling)** 경고색으로 채워지는 애니메이션을 적용한다. 이 과정에서 **'경보음 아이콘'**이 짧게 깜빡여야 한다.
*   **Warning State Display:** 게이지 값이 Warning 수준에 머물 경우, 해당 영역의 배경과 테두리가 1초 간격으로 미세하게 **깜빡이는(Flashing)** 효과를 주어 시각적 주의를 환기시킨다.

### 3. 인터랙션 (Interaction UX)
*   **Hover Action:** 마우스 커서가 게이지 위에 올라가면, 단순한 지표 수치 외에 '위험 요소 분석 요약'을 포함하는 **툴팁(Tooltip)**이 나타나야 한다.
    *   *Tooltip Content:* "현재 위험도: [Status Level] - 주요 원인: [Top Pain Point]. 즉시 조치가 필요합니다."
*   **Click Action:** 게이지를 클릭하면, 해당 지표와 관련된 상세 데이터가 담긴 **전용 모달(Modal)**이 팝업되어야 하며, 이 모달 내에서 '개선 액션 플랜'을 제시하는 CTA 버튼으로 연결된다.

---
## 💻 Part 2: 코다리 - 시스템 로직 및 개발자 Props (Developer Input)

### 1. 컴포넌트 구조화 (Props Interface Definition)
이 컴포넌트는 다음의 TypeScript 인터페이스를 기반으로 구현되어야 합니다.

```typescript
interface KPIStatusGaugeProps {
  /** 현재 지표 상태 레벨: 'CRITICAL' | 'WARNING' | 'NORMAL' */
  statusLevel: 'CRITICAL' | 'WARNING' | 'NORMAL'; 
  /** 게이지의 실제 수치 (0~100): 퍼센트 형태로 사용. */
  currentKpiValue: number; 
  /** 위험 요소 분석 요약 데이터: Tooltip에 사용됨. */
  painPointSummary?: string;
  /** 최근 활동 로그 목록: 모달 내 상세 정보로 사용. (최대 5개) */
  historyLogs: { timestamp: Date, description: string }[];
}
```

### 2. 로직 검증 및 개발 시 유의사항
1.  **데이터 종속성:** `currentKpiValue`는 반드시 시스템 안정성 데이터베이스에서 실시간으로 가져와야 하며, 이 값이 변화할 때마다 애니메이션 스펙(Part 1)이 트리거되어야 합니다.
2.  **State Machine 구현 필수:** 게이지의 상태 전환은 단순히 색상 변경이 아닌, Part 1에 정의된 **애니메이션 시퀀스 및 타이밍 로직을 따르는 State Machine**으로 설계해야 합니다. (예: Normal $\to$ Warning일 때, 경고 애니메이션이 정상 애니메이션을 *덮어쓰는* 방식으로 작동)
3.  **성능 최적화:** 게이지 값이 실시간으로 업데이트되므로, 재렌더링 시 성능 저하가 발생하지 않도록 **메모이제이션(Memoization)** 기법 적용을 강력히 권고합니다.

---
**최종 검토 (Designer to Developer):** 위 사양서에 명시된 모든 애니메이션과 인터랙션은 '소상공인의 불안 해소'라는 핵심 가치와 직결되므로, 개발팀은 기술적 구현 가능성보다 **사용자 경험의 드라마틱함(Dramatic UX)**을 최우선으로 고려하여 코드를 작성해야 합니다.