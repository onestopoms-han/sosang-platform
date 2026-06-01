# 💎 Payment Failure Screen V3.0: Premium Upsell Mockup & Logic Guide

## 1. 디자인 목표 및 컨셉 (UX/UI)
*   **Goal:** 실패 경험을 단순한 오류 처리에서, **'더 안정적인 성공으로 업그레이드할 기회(Opportunity)'**로 전환시킨다.
*   **Tone:** 공감적이고 전문적이며, 해결책 지향적이다. '실패했다'가 아닌, '아직 최적의 방법이 아니다'라는 인식을 심어준다.

## 2. 핵심 컴포넌트 정의: Premium Offer Card (신규)
| 컴포넌트명 | 설명 및 기능 | 디자인 요소 (Color/Font) | 배치 위치 |
| :--- | :--- | :--- | :--- |
| **Premium Offer Card** | 실패 원인 분석 후, '더 나은 성공률'을 보장하는 패키지를 제시. | 배경: `#FFF8F8` (Soft Red). 테두리: `2px solid #FF6B6B`. 강조 폰트: Bold/Semi-Bold. | 기존 재시도 버튼 직상단 또는 최상단 섹션 분리. |
| **Advanced Retry Logic** | *기술적 안정성*을 보장하는 업그레이드 옵션. (ex: 24시간 내 최대 N회 시도, 비활성 시간대 자동 스케줄링) | 메인 컬러 강조 (`#007AFF`). 핵심 숫자(`+1.5%`)를 크게 표시하여 가치 인식. | 프리미엄 패키지 설명 섹션. |
| **Priority Support** | *신뢰*를 보장하는 인적 지원 옵션. (ex: 전담 컨설팅 연결, 실시간 오류 진단) | 서브 컬러 강조 (`#34C759`). '전용' 느낌을 주는 아이콘(🛡️) 사용. | 프리미엄 패키지 설명 섹션 하단. |

## 3. 시나리오 기반 레이아웃 (Wireframe Logic)
1.  **[Header]**: "결제에 실패했습니다." (Red Alert, 공감 문구)
2.  **[Failure Reason Diagnosis]**: **(새로운 섹션)** "실패 원인: [네트워크 불안정/카드사 정책 변화 등 구체적 진단 제공]." → 신뢰도 확보 단계.
3.  **[Premium Offer Card - 핵심 영역]**: "더 높은 성공률이 필요하신가요? 안정성 패키지로 업그레이드하세요." (강력한 CTA 유도)
    *   ✅ Advanced Retry Logic (+1.5% 안정성 보장)
    *   🛡️ Priority Support (+2.0% 전담 컨설팅 지원)
4.  **[Action Buttons]**:
    *   Primary Button: **[패키지 결제 및 재시도 (Premium)]** → 최우선 CTA
    *   Secondary Button: [일반 재시도 (Basic)] → 기존 대비 시각적 위계를 낮춤