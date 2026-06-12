# 💻 Skeleton Loader & Fallback 로직 구현 — Actionable Steps V1.0

## 🎯 목표
Trust Widget / PainGauge 컴포넌트 구현 시, **Skeleton Loading**과 **Fallback 로직**을 디자인 시스템 토큰(색상, 폰트, 여백) 을 100% 반영하여 즉시 작동하는 코드를 작성하고 개발팀이 바로 적용할 수 있는 명세를 제공합니다.

## 📋 작업 흐름 (Actionable Steps)

### ✅ 단계 1: 디자인 토큰 및 스펙 확보
- [ ] **TrustGauge_PainGauge_Visual_Consistency_Checklist_v1.0.md**를 다시 읽어보며 다음 토큰을 확인합니다:
  - `--skeleton-color` (로딩 중 배경색, 보통 회색 또는 브랜드의 Muted Color)
  - `--fallback-text-color` (Fallback 시 표시될 텍스트 색상)
  - `--component-padding`, `--border-radius`, `--font-family` (컴포넌트 기본 스타일)
- [ ] **Designer 의 Final Handoff Spec**에서 다음을 확인합니다:
  - Skeleton Loader 가 활성화/비활성화 시 전환하는 애니메이션 타이밍 (`transition: all 0.6s ease`)
  - Fallback 상태가 나타날 때의 UI 피드백 (예: `⚠️ 데이터 로딩 실패, 기본값 적용 중...`)

### ✅ 단계 2: 초기 코드 구조 설계 및 작성
- [ ] **React 컴포넌트 (`TrustWidgetSkeleton.tsx`, `PainGaugeSkeleton.tsx`)**를 생성합니다.
- [ ] 다음 구조로 구현합니다 (디자인 토큰 적용):

```tsx
// TrustWidgetSkeleton.tsx
import { Skeleton, Typography, Box } from '@mui/material'; // 또는 자체 컴포넌트 스타일 시스템
import { ThemeProvider } from '../styles/theme'; // 디자인 토큰 적용

const TrustWidgetSkeleton = () => (
  <Box sx={{ p: 3, borderRadius: '12px', background: '#f5f5f5' }}> // Skeleton Color
    <Typography variant="h6" gutterBottom> // Fallback Text
      신뢰도 데이터 로딩 중...
    </Typography>
    <Skeleton animation="wave" variant="rectangular" height={40} />
  </Box>
);

export default TrustWidgetSkeleton;
```

- [ ] **Fallback 로직**을 적용합니다:
  - API 응답 지연 또는 에러 발생 시 `useState` 및 `useEffect` 로 데이터를 감지하고, `fallbackValue`로 대체합니다.
  - Fallback 상태일 때 UI 를 통해 사용자에게 명시적으로 안내합니다 (예: `⚠️ 데이터 연동 오류`).

### ✅ 단계 3: 단위 테스트 및 검증
- [ ] **Unit Test**를 작성하여 다음 시나리오를 검증합니다:
  1. Skeleton Loading 이 0.6 초 동안 애니메이션되어 나타난 후 실제 데이터로 전환되는지 확인.
  2. API 호출 실패 시 Fallback 텍스트와 UI 가 즉시 나타나는지 확인.
  3. 디자인 토큰 (색상, 여백, 폰트) 을 실제 컴포넌트 렌더링 결과와 비교하여 일관성 유지 검증.

### ✅ 단계 4: 개발팀 전달 및 문서화
- [ ] **README.md**에 다음 내용을 포함합니다:
  - `TrustWidgetSkeleton` / `PainGaugeSkeleton` 의 사용법 (예: `<TrustWidgetSkeleton />`)
  - 디자인 토큰 적용 예시와 실제 스크린샷 (예: 로딩 중 상태, Fallback 상태)
- [ ] **Git**으로 커밋하여 팀이 바로 사용할 수 있도록 제출합니다.

## 📌 추가 참고 사항
- 이 단계에서 필요한 디자인 토큰 (`--skeleton-color`, `--fallback-text-color`) 은 `design_system_kit_v1.0.md` 또는 `BDS_Final_Handoff_Checklist_V3.0.md` 에서 확인 가능합니다.
- Fallback 로직 구현 시 **API 응답 시간**과 **에러 처리**를 고려하여, 사용자가 경험할 수 있는 디폴트 상태를 최소화하는 것이 중요합니다.

---
**준비 완료!** 다음 단계는 실제 코드를 작성하고 테스트하는 것입니다. 🚀