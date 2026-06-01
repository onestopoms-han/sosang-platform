# 🖼️ BDS 소상공인 플랫폼: 오류 카드 컴포넌트 최종 디자인 시스템 가이드 (v3.0)

## 1. 개요 및 목적
*   **컴포넌트명:** `ErrorCard`
*   **목적:** 플랫폼의 기술적 오류 상황에서 사용자의 불안감을 해소하고, BDS가 제공하는 신뢰성(Trust)과 지원 의지(Support)를 시각적으로 전달하며 다음 행동을 유도한다.
*   **핵심 원칙:** Pain (위기/경고) → 공감 (인정) → Solution (대안 제시 및 CTA)

## 2. 컴포넌트 구조 (Props 기반 설계)
`ErrorCard`는 단일 컴포넌트로 구현되며, `errorType`, `titleCopy`, `painCopy`, `solutionCopy`, `ctaText`, `onActionClick` 등의 Props를 통해 상태별 메시지를 동적으로 받아 처리합니다.

### 2.1. 디자인 토큰 업데이트 (Design Tokens)
| 토큰 명 | 용도 | 이전 값 | **최종 값** | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| `--color-error-bg` | 기본 배경색 | #FEECEE | `#FFF8FA` (라이트 핑크) | 강한 경고색 회피, 공감적 어조 반영. |
| `--color-pain-border` | Pain 영역 테두리 | `Danger Red (#FF4757)` | **`#FFA0A0`** (옅은 경고 분홍) | 지나친 위기감을 줄여 안정성 확보. |
| `--color-solution-bg` | Solution/CTA 배경색 | `#E9F7EF` | **`#CCFFDD`** (안정 녹색 계열) | 해결책 제시 영역에 희망적 느낌 부여. |
| `--icon-error-primary` | 기본 오류 아이콘 | ⚠️ (Warning) | **🔌 (Plug/Connection)** 또는 **ℹ️ (Information)** | 기술적 문제임을 상징하는 중립적 아이콘 사용. |

### 2.2. 레이아웃 및 시각적 흐름
1.  **Header (Pain State):**
    *   아이콘 (`--icon-error-primary`) + 제목 (`titleCopy`): **가장 먼저 눈에 띄는 경고 메시지.**
    *   배경: `--color-error-bg`를 적용하여 시각적 분리.
2.  **Body (Empathy & Pain Recognition):**
    *   Writer 카피의 `Pain Copy`: "지금... 이 부분이 불편하셨죠? 저희도 알고 있습니다." 등 사용자의 감정을 언급하는 공감 문구 배치.
3.  **Solution Block (Transition Point):**
    *   배경: `--color-solution-bg`를 적용하여 시각적 전환점을 만듦.
    *   `Solution Copy`: "하지만 저희가 이 문제를 해결하기 위해..."와 같이 문제의 해결 가능성을 제시하며 톤을 전환.
4.  **Footer (CTA - Action):**
    *   구체적인 `ctaText` 및 버튼 (`onActionClick`) 배치.

## 3. 상태별 Mockup 시나리오 구현 예시 (Payment Failure)

| 영역 | 요소 | Writer 카피 적용 | 디자인 토큰 활용 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Header** | 아이콘/제목 | "결제 처리에 문제가 발생했어요." | `--icon-error-primary`, `--color-pain-border` | 간접적인 경고. |
| **Pain (불안 인정)** | 본문 1 | *("지급이 필요한데... 불안하셨죠?")* | 일반 텍스트 (공감적 어조) | 사용자의 감정을 먼저 읽어주는 것이 핵심. |
| **Solution 전환** | 본문 2/배경 | *"시스템 점검으로 인해 일시적으로 차단되었습니다."* | `--color-solution-bg` 적용 및 글자 크기 증가 | 시각적인 배경 변화로 심리적 안정감을 제공. |
| **CTA (행동 유도)** | 버튼 | '다시 결제하기' / '고객센터 문의' | Primary Button, `--color-primary` | 사용자가 취해야 할 가장 확실한 다음 액션만 남김. |

---
*(이하, 각 오류 상황별(Service Down, Loading Delay 등)로 위 구조를 채우는 상세 목업과 토큰 매핑표가 이어짐)*