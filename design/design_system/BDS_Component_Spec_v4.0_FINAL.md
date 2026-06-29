# 🛡️ BDS 컴포넌트 디자인 시스템 명세서 (V4.0 - 최종 확정본)

**대상 컴포넌트:** Trust Widget & PainGauge
**목표:** 모든 개발자가 참조할 수 있는 단일 진실 공급원(Single Source of Truth) 제공.
**작성 일자:** 2026-06-11 (최종 확정)
**참조 파일:** BDS_Component_System_Spec_v3.0, Writer Reels Script

## 🎨 1. 공통 디자인 토큰 및 원칙

| 요소 | 정의 | 값/규칙 | 적용 의도 |
| :--- | :--- | :--- | :--- |
| **Primary Color** (브랜드 핵심) | 신뢰, 전문성 | `#004D66` (Deep Blue) | Trust Widget의 주조색. 데이터 출처 명시 시 사용. |
| **Secondary Color** (성장/긍정) | 성장, 기회 | `#3CB371` (Growth Green) | 긍정적인 결과(Low Risk) 및 성공적 CTA에 사용. |
| **Risk High State** (위험) | 즉각적인 주의 필요 | `#D9534F` (Danger Red) | 리스크 A 등급, 불안 유도 시 강조 색상. |
| **Risk Mid State** (주의) | 중간 점검 필요 | `#f0ad4e` (Warning Orange) | 리스크 B 등급, 정보 제공 및 경고성 메시지. |
| **Risk Low State** (안전) | 안정적 신뢰 영역 | `#5cb85c` (Success Green) | 리스크 C 등급, 안전마진 확보 강조. |
| **Typography** | 기본 폰트 시스템 | Noto Sans KR / Pretendard (선택 가능) | 가독성을 최우선으로 하며, 제목은 Bold 처리. |

## ✨ 2. Trust Widget Component Spec

**기능:** 외부 데이터/출처를 기반으로 신뢰도를 시각적으로 제시하는 위젯.
**핵심 원칙:** 출처(Source) 명시가 필수이며, 디자인에 **'신뢰성 가중치'** 부여.

| 속성 | 세부 디자인 지침 | 개발자 핸드오버 노트 |
| :--- | :--- | :--- |
| **레이아웃 (L)** | 16:9 비율의 카드형 UI. 상단에 출처 로고/이름, 하단에 신뢰 점수(%) 표시. | `Container` 컴포넌트 사용. 최대 너비 제한(`max-width: 800px`). |
| **상태 기반 디자인** | 데이터가 불안정하거나 불명확할 경우, Primary Blue 대신 Light Grey 배경을 적용하고 "데이터 검증 필요" 레이블 노출. | API 연동 시 `data_status` 필드를 체크하여 UI 조건 분기 필수. |
| **핵심 액션 (CTA)** | 위젯 하단에 '원문 확인' 버튼 배치. Primary Blue를 사용하여 가장 높은 클릭 유도율 확보. | Link 컴포넌트 사용 권장. 마우스 오버 시 Depth 효과 추가. |

## ⚠️ PainGauge Component Spec

**기능:** 소상공인이 느끼는 어려움(Pain Point)을 측정하고, 이를 해결책으로 연결하는 게이지 형태의 UI.
**핵심 원칙:** 감정적 동요(불안)를 포착하여 **'해결 욕구'** 자극 후, BDS 솔루션으로 유도.

| 속성 | 세부 디자인 지침 | 개발자 핸드오버 노트 |
| :--- | :--- | :--- |
| **게이지 구조 (G)** | 0% ~ 100%의 가로 막대 게이지 형태. 현재 Pain Point 위치(%)를 빨간색 점으로 표시. | SVG 또는 Canvas 기반 구현 권장. 실시간 데이터 반영 시 애니메이션 필수. |
| **리스크 매핑 규칙** | 🔴 (Red/A) > 🟠 (Orange/B) > 🟢 (Green/C). 게이지 색상은 리스크 레벨에 따라 부드럽게 변해야 함. | `background-color`의 HSL 값 변화를 활용하여 자연스러운 그라데이션 구현. |
| **결과 섹션 연동** | PainGauge가 높은 위험(A)을 지적하면, 바로 아래에 "해결책 (BDS 솔루션)" 카드가 노출되어야 함. (최대 150px 간격 유지). | 사용자 흐름(`User Journey`)상 필수적인 시퀀스 디자인 요소. |

---
**[첨부] 최종 에셋 핸드오버 체크리스트:**
*   ✅ Trust Widget: Primary Blue 아이콘 세트, Gradient 배경 패턴 (3종)
*   ✅ PainGauge: 10단계 리스크 레벨별 색상 팔레트 및 그래프 데이터 포인트 (JSON 형식 제공 예정).