# 🖼️ 오류 상태 시각 에셋 명세서 (Error State Visual Spec)

## 🎯 비주얼 목표
사용자가 오류를 겪을 때 **"불안감 → 안정감"** 으로 이어지는 시각적 전환을 유도합니다. 단순한 색상 변경이 아닌, **심리적 안정감을 주는 디자인 패턴**을 적용합니다.

---

## 1️⃣ 컬러 스키마 (Color Scheme)
```css
--color-error-primary: #DC3545;      /* 오류 제목 배경 */
--color-error-secondary: #F8D7DA;     /* 오류 텍스트 배경 */
--color-error-accent: #FF6B6B;        /* 강조 포인트 */

--color-warning-primary: #FFC107;     /* 경고 제목 배경 */
--color-warning-secondary: #FFF8E1;   /* 경고 텍스트 배경 */
--color-warning-accent: #FFA500;      /* 강조 포인트 */

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