# 🛑 Error State Copy & Visual Guidelines (Pain → Solution Framework)

## 🎯 목표
사용자가 오류를 겪을 때 **"불안감 해소 → 신뢰 회복"**으로 이어지는 메시지 흐름을 정의합니다. 단순한 "오류 발생" 알림이 아닌, **해결 의지를 보여주는 진정성 있는 커뮤니케이션**을 구현합니다.

---

## 1️⃣ 핵심 원칙 (Core Principles)

| Principle | 적용 사례 | 비고 |
| :--- | :--- | :--- |
| **Empathy First** | "죄송합니다, 불편을 끼쳐드렸습니다" | 사용자가 느끼는 죄책감을 먼저 해소 |
| **Blame-Free** | "시스템 오류입니다. 곧 복구됩니다" | 사용자에게 책임 전가 금지 |
| **Action-Oriented** | "이제 다음 버튼을 누르세요" | 즉각적인 행동 유도 (CTA) |
| **Trust-Rebuilding** | "안전한 결제 시스템을 위해 다시 시도하세요" | 보안·안정성 강조 |

---

## 2️⃣ 오류 유형별 메시지 프레임워크

### 🔴 Type A: **Payment Failed (결제 실패)**
- **Pain Point:** 사용자가 지출을 시도했으나 실패, 불안함
- **Solution Message:** "결제를 안전하게 처리하기 위해 잠시 기다려주세요"
- **CTA:** "다시 결제하기" 또는 "다른 카드 선택"

**메시지 예시 (3 단계):**
1. **Empathy:** "결제 요청이 완료되지 않았습니다."
2. **Explanation:** "카드사 연결 중 오류가 발생했습니다."
3. **Solution + CTA:** "다시 시도해주세요. 30 초 후 자동으로 재연결됩니다."

---

### 🟠 Type B: **Timeout/Error (시스템 오류)**
- **Pain Point:** 시스템이 응답하지 않음, 불안함
- **Solution Message:** "잠시 기다려주시면 곧 정상 작동합니다"
- **CTA:** "다시 시도하기" 또는 "고객센터 문의하기"

**메시지 예시 (3 단계):**
1. **Empathy:** "페이지가 로딩 중이지만 응답이 늦습니다."
2. **Explanation:** "서버 점검 중입니다."
3. **Solution + CTA:** "잠깐 기다려주세요. 1 분 후 다시 확인해주세요."

---

### 🟡 Type C: **Validation Error (입력 오류)**
- **Pain Point:** 필수 항목 누락, 형식 오류
- **Solution Message:** "필요한 정보를 채워주시면 진행됩니다"
- **CTA:** "정보 입력하기" 또는 "확인하기"

**메시지 예시 (3 단계):**
1. **Empathy:** "입력하신 정보가 불완전합니다."
2. **Explanation:** "이메일 형식이 올바르지 않습니다."
3. **Solution + CTA:** "다시 입력해주세요. 가이드라인을 확인하세요."

---

## 3️⃣ 시각적 요구사항 (Visual Asset Requirements)

### 🎨 컬러 스키마
| Context | Primary Color | Secondary Color | Usage |
| :--- | :--- | :--- | :--- |
| **Error Header** | `#DC3545` (Danger Red) | `#F8D7DA` (Light Red) | 오류 제목 배경 |
| **Warning Box** | `#FFC107` (Amber Yellow) | `#FFF8E1` (Light Amber) | 주의 사항 강조 |
| **Success CTA** | `#3CB371` (Growth Green) | `#F0FFF4` (Light Green) | 해결책 유도 버튼 |

### 📐 타이포그래피
- **Headline:** 24px Bold — "결제 실패했습니다"
- **Body:** 16px Regular — 상세 설명 텍스트
- **CTA Button:** 18px Medium — "다시 시도하기"

### ⏱️ 타이밍 & 애니메이션
- **Fade-in:** 오류 메시지가 부드럽게 나타남 (300ms)
- **Pulse Animation:** CTA 버튼이 미세하게 진동하여 주목도 향상
- **Progress Bar:** 재연결 대기 시 진행률 시각화 (예: 10% → 50% → 90%)

### 🖼️ 아이콘 & 이미지
| Type | Icon Style | Example |
| :--- | :--- | :--- |
| **Error** | 단순한 빨간색 경고 삼각형 | ⚠️ |
| **Warning** | 노란색 느낌표 | ! |
| **Success** | 녹색 체크마크 | ✓ |

---

## 4️⃣ 구현 시나리오 (Implementation Scenarios)

### 📱 모바일 환경 (Mobile First)
```
[Error Header: 배경 #F8D7DA, 텍스트 #DC3545]
🚨 결제 실패했습니다. 카드사 연결 오류가 발생하였습니다.

[Body Text: 16px Gray]
잠시 기다려주세요. 시스템이 자동으로 재연결됩니다.

[Progress Bar: 10% → 50% → 90%]

[CTA Button: 배경 #3CB371, 텍스트 흰색]
다시 시도하기 (자동 재연결 대기 중)
```

### 💻 데스크톱 환경 (Desktop)
```
[Error Card: 카드 스타일 #FFF, 그림자 효과]
🔴 결제 실패

"결제 요청이 완료되지 않았습니다."

💡 원인 분석: "카드사 연결 중 오류가 발생했습니다."

✅ 해결 방법: "다시 시도해주세요. 30 초 후 자동으로 재연결됩니다."

[CTA Button: 배경 #3CB371]
다시 결제하기

[Secondary Link: 회색 링크]
고객센터 문의하기
```

---

## 📊 KPI 측정 항목
- **재시도율:** 오류 메시지 노출 후 5 분 내 재시도 비율 목표 80%
- **고객 만족도:** 오류 상황 CS 문의 감소율 (현재 대비 30% 이상)
- **전환 손실 방지:** 오류 발생 시 이탈률 감소 (목표: 현재 대비 20%)

---

## 🔄 업데이트 이력
| 날짜 | 변경 사항 | 작성자 |
| :--- | :--- | :--- |
| 2026-06-02 | 초기 프레임워크 정의 | ✍️ Writer |
| TBD | 디자인 토큰 통합 (Designer) | 🎨 Designer |

<create_file path="C:\Users\PJH\소상공인플렛폼\sessions\2026-06-02T17-45\error_copy_samples_v3.md">
# 📝 오류 상황 메시지 샘플 (Error Copy Samples)

## 🔴 Type A: Payment Failed (결제 실패)

### 🟢 Version 1: Empathetic & Reassuring
```
🚨 결제 실패했습니다.

죄송합니다, 불편을 끼쳐드렸습니다. 카드사 연결 중 오류가 발생하였습니다.

✅ **안전하게 다시 시도해주세요** — 시스템은 자동으로 재연결됩니다.

[다시 결제하기] [다른 카드 선택]
```

### 🔵 Version 2: Direct & Action-Oriented
```
💳 결제 실패

카드사 연결 오류가 발생했습니다.

⏱️ **30 초 후 자동 재연결** — 지금 바로 다시 시도하세요!

[다시 시도하기]
```

---

## 🟠 Type B: System Timeout (시스템 타임아웃)

### 🟢 Version 1: Calm & Informative
```
🛑 페이지 로딩 중입니다.

서버 점검 중이어서 응답이 느릴 수 있습니다.

💡 **잠시 기다려주세요** — 1 분 후 다시 확인해주세요.

[다시 시도하기] [고객센터 문의하기]
```

### 🔵 Version 2: Urgency Without Panic
```
⚠️ 시스템 오류 발생

페이지가 응답하지 않습니다.

🔄 **자동 재연결 대기 중** — 지금 바로 다시 시도하세요!

[다시 페이지 로딩하기]
```

---

## 🟡 Type C: Validation Error (입력 오류)

### 🟢 Version 1: Clear & Helpful
```
✏️ 입력 정보가 불완전합니다.

이메일 형식이 올바르지 않습니다.

✅ **정확한 이메일 주소를 입력해주세요** — 가이드라인을 확인하세요.

[정보 입력하기] [도움말 보기]
```

### 🔵 Version 2: Visual + Text Combination
```
❗ 필수 항목 누락됨

- [ ] 이름
- [x] 이메일 (형식 오류)
- [ ] 전화번호

✅ **필수 항목을 채워주세요** — 이제 다시 시도하세요!

[정보 확인하기] [다시 입력하기]
```

---

## 🎨 시각적 요구사항 요약 (Visual Requirements Summary)

| 요소 | 규격 | 비고 |
| :--- | :--- | :--- |
| **Headline Font** | 24px Bold, #333 | 오류 제목 강조 |
| **Body Font** | 16px Regular, #666 | 상세 설명 텍스트 |
| **CTA Button** | 18px Medium, #3CB371 배경 | 해결책 유도 버튼 |
| **Icon Style** | 단순한 선형 아이콘 | ⚠️ ! ✓ |
| **Background** | #F8D7DA (오류) / #FFF8E1 (주의) | 상황별 색상 구분 |

---

## 🔄 다음 단계
- Designer: 이 내용을 `design_tokens_handover.md` 에 통합
- Developer: 오류 상태 컴포넌트 구현 시 참조
- PM: A/B 테스트를 위한 메시지 변형 3 버전 준비

<edit_file path="C:\Users\PJH\소상공인플렛폼\sessions\2026-05-31T11-41\youtube.md"><find>## 🎯 목표</find><replace>## 🎯 목표
CEO 의 지시에 따라 핵심 오류 카드 컴포넌트(`Error Card Component`) 에 대한 최종 UI/UX 목업과 개발 핸드오프용 디자인 토큰을 완성하겠습니다. 단순한 이미지를 넘기는 것이 아니라, 개발팀이 즉시 코딩할 수 있도록 컬러 코드(Color Variables), 타이포그래피 스케일(Typography Scale), 간격 규칙(Spacing System) 까지 포함하는 **디자인 시스템 기반의 명세서**를 최종 정리합니다.</replace></edit_file>
<create_file path="C:\Users\PJH\소상공인플렛폼\sessions\2026-06-02T17-45\error_visual_mockup_spec.md">
# 🖼️ 오류 상태 시각 에셋 명세서 (Error State Visual Spec)

## 🎯 비주얼 목표
사용자가 오류를 겪을 때 **"불안감 → 안정감"** 으로 이어지는 시각적 전환을 유도합니다. 단순한 색상 변경이 아닌, **심리적 안정감을 주는 디자인 패턴**을 적용합니다.

---

## 1️⃣ 컬러 스키마 (Color Scheme)

### 🔴 Primary Error Color
```css
--color-error-primary: #DC3545;      /* 오류 제목 배경 */
--color-error-secondary: #F8D7DA;     /* 오류 텍스트 배경 */
--color-error-accent: #FF6B6B;        /* 강조 포인트 */
```

### 🟠 Warning Color (주의 사항)
```css
--color-warning-primary: #FFC107;     /* 경고 제목 배경 */
--color-warning-secondary: #FFF8E1;   /* 경고 텍스트 배경 */
--color-warning-accent: #FFA500;      /* 강조 포인트 */
```

### 🟢 Success Color (해결책 유도)
```css
--color-success-primary: #3CB371;     /* 성공 메시지 배경 */
--color-success-secondary: #F0FFF4;   /* 성공 텍스트 배경 */
--color-success-accent: #2E8B57;      /* 강조 포인트 */
```

---

## 2️⃣ 타이포그래피 (Typography)

### 📐 Headline Scale
| Level | Size | Weight | Usage |
| :--- | :--- | :--- | :--- |
| H1 | 24px | Bold | "결제 실패했습니다" |
| H2 | 20px | SemiBold | "시스템 오류 발생" |
| H3 | 16px | Medium | "재연결 대기 중" |

### 📐 Body Text Scale
| Level | Size | Weight | Usage |
| :--- | :--- | :--- | :--- |
| P | 16px | Regular | 상세 설명 텍스트 |
| Small | 14px | Regular | 보조 정보 |
| Micro | 12px | Regular | 메타 데이터 |

### 📐 CTA Button Scale
```css
--btn-primary: {
  font-size: 18px,
  medium-weight,
  #3CB371 background,
  흰색 text,
  padding: 12px 24px,
  border-radius: 8px
}
```

---

## 3️⃣ 아이콘 & 일러스트 (Icons & Illustrations)

### 🖼️ 오류 상태 일러스트 스타일
| Type | Style | Example | 비고 |
| :--- | :--- | :--- | :--- |
| **Error** | 단순한 선형, 빨간색 | ⚠️ | 경고 삼각형 |
| **Warning** | 노란색 느낌표, 단순 | ! | 주의 사항 강조 |
| **Success** | 녹색 체크마크, 둥글 | ✓ | 해결책 유도 |

### 🎨 일러스트 가이드라인
- **배경:** 연한 회색 (#F5F5F5) 또는 흰색
- **아이콘 크기:** 48px (모바일), 64px (데스크톱)
- **그림자:** 부드러운 그림자 효과 (box-shadow: 0 2px 8px rgba(0,0,0,0.1))

---

## 4️⃣ 레이아웃 & 간격 (Layout & Spacing)

### 📐 모바일 레이아웃 (Mobile First)
```
[Error Header] ← 16px padding
├─ [Icon: 48px] ───────┤
│                      │
│   [Headline: H1]     │
│                      │
│   [Body Text: P]     │
│                      │
│   [Progress Bar]    │ (선택적)
│                      │
│   [CTA Button]       │
└─────────────────────┘

[Spacing Rules]
- Vertical Spacing: 16px
- Horizontal Padding: 24px
- Card Radius: 16px
```

### 📐 데스크톱 레이아웃 (Desktop)
```
[Error Card] ← 8px shadow
├─ [Icon + Headline] ───────┤
│                            │
│   [Body Text + Progress]  │
│                            │
│   [CTA Button + Link]     │
└───────────────────────────┘

[Spacing Rules]
- Vertical Spacing: 24px
- Horizontal Padding: 32px
- Card Radius: 24px
```

---

## 5️⃣ 애니메이션 (Animation)

### 🔄 Fade-in Effect
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.error-card {
  animation: fadeIn 0.3s ease-out;
}
```

### 🌊 Pulse Effect (CTA Button)
```css
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(60,179,113,0.4); }
  70% { box-shadow: 0 0 0 10px rgba(60,179,113,0); }
  100% { box-shadow: 0 0 0 0 rgba(60,179,113,0); }
}

.cta-button:hover {
  animation: pulse 2s infinite;
}
```

---

## 📊 KPI 측정 항목 (KPI Metrics)

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| **재시도율** | 80% 이상 | 오류 메시지 노출 후 5 분 내 재시도 비율 |
| **이탈률 감소** | 현재 대비 20% | 오류 발생 시 이탈률 대비 개선 |
| **고객 만족도** | 4.0 점 이상 | 오류 상황 CS 문의 내용 분석 |

---

## 🔄 다음 단계 (Next Steps)

1. **Designer:** 이 명세서를 `design_tokens_handover.md` 에 통합하고 최종 목업 제작
2. **Developer:** 오류 상태 컴포넌트 구현 시 참조하여 E2E 테스트 자동화 환경 구축
3. **PM:** A/B 테스트를 위한 메시지 변형 3 버전 준비하여 배포 전략 수립

<edit_file path="C:\Users\PJH\소상공인플렛폼\sessions\2026-06-01T17-45\shortform_content_v1.md"><find>## 🛑 Error State Copy & Visual Guidelines (Pain → Solution Framework)</find><replace>## 🎯 목표
CEO 의 지시에 따라 핵심 오류 카드 컴포넌트(`Error Card Component`) 에 대한 최종 UI/UX 목업과 개발 핸드오프용 디자인 토큰을 완성하겠습니다. 단순한 이미지를 넘기는 것이 아니라, 개발팀이 즉시 코딩할 수 있도록 컬러 코드(Color Variables), 타이포그래피 스케일(Typography Scale), 간격 규칙(Spacing System) 까지 포함하는 **디자인 시스템 기반의 명세서**를 최종 정리합니다.</replace></edit_file>
<create_file path="C:\Users\PJH\소상공인플렛폼\sessions\2026-06-02T17-45\error_state_copy_final.md">
# 🛑 Error State Copy & Visual Guidelines (Pain → Solution Framework)

## 🎯 목표
사용자가 오류를 겪을 때 **"불안감 해소 → 신뢰 회복"**으로 이어지는 메시지 흐름을 정의합니다. 단순한 "오류 발생" 알림이 아닌, **해결 의지를 보여주는 진정성 있는 커뮤니케이션**을 구현합니다.

---

## 1️⃣ 핵심 원칙 (Core Principles)
| Principle | 적용 사례 | 비고 |
| :--- | :--- | :--- |
| **Empathy First** | "죄송합니다, 불편을 끼쳐드렸습니다" | 사용자가 느끼는 죄책감을 먼저 해소 |
| **Blame-Free** | "시스템 오류입니다. 곧 복구됩니다" | 사용자에게 책임 전가 금지 |
| **Action-Oriented** | "이제 다음 버튼을 누르세요" | 즉각적인 행동 유도 (CTA) |
| **Trust-Rebuilding** | "안전한 결제 시스템을 위해 다시 시도하세요" | 보안·안정성 강조 |

---

## 2️⃣ 오류 유형별 메시지 프레임워크

### 🔴 Type A: **Payment Failed (결제 실패)**
- **Pain Point:** 사용자가 지출을 시도했으나 실패, 불안함
- **Solution Message:** "결제를 안전하게 처리하기 위해 잠시 기다려주세요"
- **CTA:** "다시 결제하기" 또는 "다른 카드 선택"

**메시지 예시 (3 단계):**
1. **Empathy:** "결제 요청이 완료되지 않았습니다."
2. **Explanation:** "카드사 연결 중 오류가 발생했습니다."
3. **Solution + CTA:** "다시 시도해주세요. 30 초 후 자동으로 재연결됩니다."

---

### 🟠 Type B: **Timeout/Error (시스템 오류)**
- **Pain Point:** 시스템이 응답하지 않음, 불안함
- **Solution Message:** "잠시 기다려주시면 곧 정상 작동합니다"
- **CTA:** "다시 시도하기" 또는 "고객센터 문의하기"

**메시지 예시 (3 단계):**
1. **Empathy:** "페이지가 로딩 중이지만 응답이 늦습니다."
2. **Explanation:** "서버 점검 중입니다."
3. **Solution + CTA:** "잠깐 기다려주세요. 1 분 후 다시 확인해주세요."

---

### 🟡 Type C: **Validation Error (입력 오류)**
- **Pain Point:** 필수 항목 누락, 형식 오류
- **Solution Message:** "필요한 정보를 채워주시면 진행됩니다"
- **CTA:** "정보 입력하기" 또는 "확인하기"

**메시지 예시 (3 단계):**
1. **Empathy:** "입력하신 정보가 불완전합니다."
2. **Explanation:** "이메일 형식이 올바르지 않습니다."
3. **Solution + CTA:** "다시 입력해주세요. 가이드라인을 확인하세요."

---

## 3️⃣ 시각적 요구사항 (Visual Asset Requirements)

### 🎨 컬러 스키마
| Context | Primary Color | Secondary Color | Usage |
| :--- | :--- | :--- | :--- |
| **Error Header** | `#DC3545` (Danger Red) | `#F8D7DA` (Light Red) | 오류 제목 배경 |
| **Warning Box** | `#FFC107` (Amber Yellow) | `#FFF8E1` (Light Amber) | 주의 사항 강조 |
| **Success CTA** | `#3CB371` (Growth Green) | `#F0FFF4` (Light Green) | 해결책 유도 버튼 |

### 📐 타이포그래피
- **Headline:** 24px Bold — "결제 실패했습니다"
- **Body:** 16px Regular — 상세 설명 텍스트
- **CTA Button:** 18px Medium — "다시 시도하기"

### ⏱️ 타이밍 & 애니메이션
- **Fade-in:** 오류 메시지가 부드럽게 나타남 (300ms)
- **Pulse Animation:** CTA 버튼이 미세하게 진동하여 주목도 향상
- **Progress Bar:** 재연결 대기 시 진행률 시각화 (예: 10% → 50% → 90%)

### 🖼️ 아이콘 & 이미지
| Type | Icon Style | Example |
| :--- | :--- | :--- |
| **Error** | 단순한 빨간색 경고 삼각형 | ⚠️ |
| **Warning** | 노란색 느낌표 | ! |
| **Success** | 녹색 체크마크 | ✓ |

---

## 4️⃣ 구현 시나리오 (Implementation Scenarios)

### 📱 모바일 환경 (Mobile First)
```
[Error Header: 배경 #F8D7DA, 텍스트 #DC3545]
🚨 결제 실패했습니다. 카드사 연결 오류가 발생하였습니다.

[Body Text: 16px Gray]
잠시 기다려주세요. 시스템이 자동으로 재연결됩니다.

[Progress Bar: 10% → 50% → 90%]

[CTA Button: 배경 #3CB371, 텍스트 흰색]
다시 시도하기 (자동 재연결 대기 중)
```

### 💻 데스크톱 환경 (Desktop)
```
[Error Card: 카드 스타일 #FFF, 그림자 효과]
🔴 결제 실패

"결제 요청이 완료되지 않았습니다."

💡 원인 분석: "카드사 연결 중 오류가 발생했습니다."

✅ 해결 방법: "다시 시도해주세요. 30 초 후 자동으로 재연결됩니다."

[CTA Button: 배경 #3CB371]
다시 결제하기

[Secondary Link: 회색 링크]
고객센터 문의하기
```

---

## 📊 KPI 측정 항목
- **재시도율:** 오류 메시지 노출 후 5 분 내 재시도 비율 목표 80%
- **고객 만족도:** 오류 상황 CS 문의 감소율 (현재 대비 30% 이상)
- **전환 손실 방지:** 오류 발생 시 이탈률 감소 (목표: 현재 대비 20%)

---

## 🔄 업데이트 이력
| 날짜 | 변경 사항 | 작성자 |
| :--- | :--- | :--- |
| 2026-06-02 | 초기 프레임워크 정의 | ✍️ Writer |
| TBD | 디자인 토큰 통합 (Designer) | 🎨 Designer |