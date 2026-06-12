# ✨ BDS 플랫폼 핵심 컴포넌트 시스템 명세 (V2.0)

## 🎯 목표: TrustWidget & PainGauge의 완벽한 구현 사양서
이 문서는 시각적 프로토타입(Visual Metric Spec)과 기술 요구사항(Data Schema)을 통합하여, 개발팀이 토큰 기반으로 컴포넌트를 구축할 수 있도록 하는 **최종 디자인 시스템 가이드**입니다.

## 1. 핵심 컴포넌트 개요
*   **컴포넌트명:** TrustGauge / PainGauge (통합: `BDS_MetricGauge`)
*   **기능:** 소상공인의 신뢰도(Trust) 및 어려움 지수(Pain)를 시각적 토큰으로 측정하여 표시.
*   **사용 환경:** 플랫포옴 대시보드, 콘텐츠 카드 등 모든 데이터 노출 영역.

## 2. 시스템 Props 정의 (개발팀 가이드)
| Prop Name | Type | Description | 필수 여부 | 참조 사양서 |
| :--- | :--- | :--- | :--- | :--- |
| `gaugeType` | String | 'Trust' or 'Pain' | O | TrustGauge/PainGauge Spec |
| `status` | Enum | 'A'(Optimal), 'B'(Caution), 'C'(Critical) | O | Visual Metric Spec |
| `dataValue` | Number | 현재 측정된 수치 (0~100) | O | Data Schema V2.0 |
| `loadingState` | Enum | 'Ready', 'Skeleton', 'Fallback' | O | Data Schema V2.0 |

## 3. 디자인 토큰 매핑 규칙 (Design Token Mapping Rules)
모든 시각적 속성은 아래의 토큰 체계를 따릅니다.

### A. Color Tokens (`$color-*`)
| 상태/요소 | 목적 | Token Name | HEX Value | 적용 범위 |
| :--- | :--- | :--- | :--- | :--- |
| **Trust (A)** | 최적의 신뢰 | `$color-trust-optimal` | #007bff | TrustGauge 배경, 성공 아이콘 |
| **Pain (C)** | 심각한 어려움 | `$color-pain-critical` | #dc3545 | PainGauge 경고 표시 영역 |
| **Base** | 기본 텍스트/배경 | `$color-text-primary`, `$color-bg-default` | #333, #f8f9fa | 모든 컴포넌트 일반 요소 |

### B. Typography Tokens (`$font-*`)
*   **제목 (H2):** `$font-size-lg` (24px), `$font-weight-bold`
*   **본문:** `$font-size-md` (16px), `$line-height-relaxed`

## 4. 상태별 레이아웃 및 컴포넌트 정의 (State Flow Definition)

### State 1: Ready (정상 로드 상태) - 기본 프로토타입
*   **레이아웃:** [제목] -> [게이지 바 시각화 영역] -> [수치 표시 및 설명 카드]
*   **Action:** `dataValue`에 따라 게이지 바의 색상이 `$color-trust-*` 또는 `$color-pain-*`로 동적으로 변경되어야 함.

### State 2: Skeleton (데이터 로딩 중) - Placeholder 처리
*   **토큰 적용:** 모든 콘텐츠 영역은 `<div class="skeleton-placeholder"></div>`를 사용해야 하며, 이 컴포넌트는 **모든 주요 요소의 크기(Width/Height)**와 **배치 여백(Margin/Padding)**을 정확히 모방해야 함.
*   **기술 요구사항:** 로딩 애니메이션은 부드러운 그라데이션 효과(`gradient-loading`)를 사용하며, 2초 이내에 다음 상태로 전환되어야 함.

### State 3: Fallback (데이터 수집 실패) - 대안 표시
*   **토큰 적용:** 데이터가 아예 존재하지 않거나 API 연결이 끊겼을 경우, 가장 직관적인 **정적 이미지 또는 메시지 카드**를 노출.
*   **메시지 구성:** "현재 데이터를 불러올 수 없습니다. [재시도] 버튼을 눌러주세요." (버튼 클릭 시 재요청 로직 트리거).