<file>
# 🎨 Trust Widget & PainGauge Final Code Spec
**Date:** 2026-06-17  
**Owner:** Developer Agent  
**Status:** Ready for Implementation (MVP Launch)

## 1. 개요 (Overview)
- **목적:** 60 초 영상 스크립트에서 정의된 UI 컴포넌트 동작 시나리오를 코드 구현에 반영하기 위한 데이터 및 상태 전환 로직 정의.
- **대상 컴포넌트:** `TrustWidget`, `PainGauge`
- **핵심 기능:**
    - 신뢰감 (Trust Widget) 과 위기감 (PainGauge) 을 시각적으로 명확히 표현.
    - 실시간 데이터 흐름에 따라 컴포넌트 상태를 자동 전환.

## 2. 상태 머신 및 데이터 플로우 정의 (State Machine & Data Flow)

### TrustWidget (신뢰감 표시)
- **초기 상태:** `neutral` (회색, 기본값)
- **전환 조건:**
    - `trust_building`: 위험 신호가 감지될 때 (PainGauge 에서 Red State 로 전환 시).
    - `trust_established`: AI 가 해결책을 제시하고 위험이 감소할 때 (Green State 로 전환 시).
- **UI 변경 사항:**
    - 배경색: 회색 → 파란색 (Deep Blue) → 초록색 (Growth Green).
    - 아이콘: 경고 삼각형 → 체크 마크 → 별.
    - 텍스트: "위험 감지" → "신뢰 구축 중" → "신뢰 확립".

### PainGauge (위기감 표시)
- **초기 상태:** `neutral` (회색, 기본값)
- **전환 조건:**
    - `alert`: 사용자가 위험을 인지할 때 (Red State 로 전환 시).
    - `solution`: AI 가 해결책을 제시하고 위험이 감소할 때 (Green State 로 전환 시).
- **UI 변경 사항:**
    - 배경색: 회색 → 빨간색 → 초록색.
    - 아이콘: 경고 삼각형 → 불꽃 → 불꽃 + 체크 마크.
    - 텍스트: "위험 신호" → "해결책 제시 중" → "신뢰 회복".

## 3. Mock API 응답 예시 (Mock API Response Example)

```json
{
  "status": "success",
  "data": {
    "trustWidget": {
      "state": "neutral", // neutral, trust_building, trust_established
      "message": "",
      "icon": ""
    },
    "painGauge": {
      "state": "alert", // alert, solution, resolved
      "message": "",
      "icon": ""
    }
  }
}
```

## 4. 구현 시 고려사항 (Implementation Notes)
- **UI/UX 일관성:** 실제 플랫폼 UI 컴포넌트와 일치하는 색상, 아이콘, 텍스트를 사용.
- **감정 흐름:** 위기감 (PainGauge) → 신뢰 회복 (Trust Widget) → 해결 및 성장의 흐름을 자연스럽게 유도.
- **가시화 요소:** 실제 플랫폼 UI 컴포넌트 (Trust Widget, PainGauge) 를 사용하여 시각적 일관성을 유지.

## 5. 개발 일정 (Development Schedule)
- **2026-06-18:** 상태 머신 및 데이터 플로우 정의 완료.
- **2026-06-19:** Mock API 응답 예시 정의 및 통합 명세서 작성.
- **2026-06-20:** 실제 코드 구현 시작.
- **2026-06-25:** 컴포넌트 로직과 데이터 구조 확인.
- **2026-06-30:** 개발 완료 및 QA 테스트.

## 6. 다음 단계
- 코다리 (Designer) 에게 통합 명세서 (`Integration_Prototype_Spec.md`) 와 컴포넌트 매뉴얼 (`BDS_DesignSystem_ComponentManual_v1.0.md`) 을 제공하여 실제 목업 디자인을 적용할 수 있도록 지원.