<file>
# 🎨 Integration Prototype Spec Final (Trust Widget & PainGauge)
**Date:** 2026-06-17  
**Owner:** Designer Agent  
**Status:** Ready for Implementation (MVP Launch)

## 1. 개요 (Overview)
- **목적:** 코다리 개발팀이 구현할 UI 컴포넌트 (`TrustWidget`, `PainGauge`) 의 시각적 디자인을 최종 확정하고, 실제 목업으로 제작하기 위한 명세서 작성.
- **타겟:** BDS 플랫폼 사용자를 위한 신뢰감 (Trust) 과 위기감 (Pain) 을 시각적으로 표현하는 컴포넌트.
- **핵심 기능:**
    - 실제 플랫폼 UI 컴포넌트와 일치하는 색상, 아이콘, 텍스트를 사용하여 시각적 일관성 유지.
    - 감정 흐름 (위기감 → 신뢰 회복 → 해결 및 성장) 을 자연스럽게 유도.

## 2. 디자인 시스템 적용 (Design System Integration)
- **Deep Blue (#0F3D5E):** 신뢰감을 위한 배경색 및 주요 요소 색상.
- **Growth Green (#4CAF50):** 성장과 긍정적인 변화를 위한 포인트 색상.
- **Alert Red (#FF5722):** 위기감과 위험 신호를 위한 경고 색상.

## 3. 컴포넌트 디자인 가이드라인 (Component Design Guidelines)

### TrustWidget (신뢰감 표시)
- **초기 상태:** 회색 배경, 기본 텍스트 "신뢰 구축 중"
- **전환 조건:**
    - `trust_building`: 파란색 배경, 아이콘: 경고 삼각형 → 체크 마크.
    - `trust_established`: 초록색 배경, 아이콘: 별.
- **UI 변경 사항:**
    - 배경색: 회색 → 파란색 (Deep Blue) → 초록색 (Growth Green).
    - 텍스트: "위험 감지" → "신뢰 구축 중" → "신뢰 확립".

### PainGauge (위기감 표시)
- **초기 상태:** 회색 배경, 기본 텍스트 "위기 신호 감지"
- **전환 조건:**
    - `alert`: 빨간색 배경, 아이콘: 경고 삼각형 → 불꽃.
    - `solution`: 초록색 배경, 아이콘: 불꽃 + 체크 마크.
- **UI 변경 사항:**
    - 배경색: 회색 → 빨간색 (Alert Red) → 초록색 (Growth Green).
    - 텍스트: "위험 신호" → "해결책 제시 중" → "신뢰 회복".

## 4. Mock API 응답 예시 (Mock API Response Example)

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

## 5. 개발 일정 (Development Schedule)
- **2026-06-18:** 상태 머신 및 데이터 플로우 정의 완료.
- **2026-06-19:** Mock API 응답 예시 정의 및 통합 명세서 작성.
- **2026-06-20:** 실제 목업 디자인 제작 시작.
- **2026-06-25:** 컴포넌트 로직과 데이터 구조 확인.
- **2026-06-30:** 개발 완료 및 QA 테스트.

## 6. 다음 단계
- 코다리 (Developer) 에게 통합 명세서 (`Integration_Prototype_Spec.md`) 와 컴포넌트 매뉴얼 (`BDS_DesignSystem_ComponentManual_v1.0.md`) 을 제공하여 실제 목업 디자인을 적용할 수 있도록 지원.