# KPI 기반 Pain Point 시각화 분석 v1.0

## 🎯 목표
소상공인이 겪는 가장 시급한 불안을 3 가지 핵심 KPI 로 매핑하고, 이를 시스템 안정성 지표 (Critical/Warning) 로 변환하여 디자인팀이 즉시 사용할 수 있는 비주얼 스펙을 제공합니다.

## 📊 선정된 핵심 KPI 및 비즈니스 로직

| KPI | Pain Point 연결성 | 상태 정의 (임계값 기준) | 시각적 신호 (디자인 방향) |
|-----|-------------------|-------------------------|---------------------------|
| **Daily_Revenue_Variance**<br>(일별 매출 편차) | 재정이 바닥나고 현금 흐름이 안 좋아서 당장 문을 닫을 위기. | `Normal`: -10% 이내<br>`Warning`: -10 ~ -20%<br>`Critical`: -20% 초과 | 💸 **빨간색 Pulse** + "매출 급감" 아이콘<br>배경: Critical 시 붉은색 배경에 흰 글씨로 숫자 표시.<br>애니메이션: 숫자가 빠르게 깜빡임. |
| **Supply_Chain_Risk_Index**<br>(공급망 리스크 지수) | 원자재 부족, 배송 지연 등 인프라 문제로 인한 생산 차질. | `Normal`: 0 ~ 30<br>`Warning`: 31 ~ 50<br>`Critical`: 51 초과 | 📦 **노란색 Shake** + "공급 지연" 아이콘<br>배경: Warning 시 노란색 배경에 회색 글씨.<br>Critical 시 붉은색 배경에 흰 글씨로 숫자 표시.<br>애니메이션: 수치가 상승할수록 하얀 배경에 붉은색 선이 번지듯 표시. |
| **Customer_Loss_Predicted_Value**<br>(고객 이탈 예측 가치) | 고객 이탈로 인한 고정비 부담 증가, 브랜드 신뢰 하락. | `Normal`: 0 ~ 5% 예상<br>`Warning`: 6 ~ 10% 예상<br>`Critical`: 11% 초과 | 👥 **파란색 Gradient** + "손실 경고" 아이콘<br>배경: Critical 시 검은색 배경에 흰 글씨로 숫자 표시.<br>애니메이션: 하강하는 그래프와 함께 손실이 증가할수록 빨간색 선이 번지듯 표시. |

## 🎨 디자인 스펙 및 토큰 적용 가이드
- **Critical 상태:** `background-color: #ff4d4f` (빨간색) + `font-color: white`
- **Warning 상태:** `background-color: #faad14` (노란색) + `font-color: black`
- **Normal 상태:** `background-color: #52c41a` (초록색) + `font-color: white`

## 🔍 다음 단계
1.  **Designer:** 위 스펙을 반영하여 `Design_Token_Master_Spec_v2.0.md` 에 KPI 관련 토큰을 추가하고, 실제 화면에서 어떻게 배치될지 간단한 와이어프레임 스케치를 작성합니다.
2.  **코다리:** 개발 로고와 백엔드 API 스펙 (예: `/api/kpi/status`) 이 위 KPI 로직과 일치하는지 검증하고, 컴포넌트 구현 우선순위를 재설정합니다.

---