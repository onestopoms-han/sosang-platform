# [최종 검토 보고서] KPI Gauge와 Action Plan Card 간의 시각적/데이터 흐름 연결 (Final Handover Report)

## 🎯 목적
개발팀 및 기획팀에게, 시스템 내 '진단(KPI Gauge)' $\rightarrow$ '문제 인식(경고색 변화)' $\rightarrow$ '해결책 제시(Action Plan Card)'로 이어지는 **사용자 경험(UX)의 감정적 흐름**을 명확히 전달하고 데이터 계약을 확정한다.

## 🌐 1. 시각적 플로우 (Visual Flow: Pain $\to$ Solution 여정)
*   **원칙:** KPI Gauge의 상태 변화가 Action Plan Card의 **색상 및 내용**에 즉시 영향을 주어야 한다.
*   **경로:**
    1.  **(Pain)** 사용자가 로그인/대시보드 진입 → `KPI Gauge`를 통해 주요 지표(예: 부채 비율) 확인 $\to$ 상태가 '위험' 또는 '주의' 색상으로 표시된다. (🚨 경고 신호 발생)
    2.  **(Insight)** 시스템이 데이터 분석을 완료했음을 시각적으로 인지시킨다 (잠시의 로딩 애니메이션).
    3.  **(Solution)** KPI Gauge 바로 아래/옆에 `Action Plan Card`가 **부드럽게 등장(Slide-Up & Fade-In)**하며, 경고 신호와 대비되는 '안정적이고 실행 가능한' 톤앤매너로 사용자에게 해결책을 제안한다.
*   **모션 디자인 적용:** 이 전환 과정에는 `BDS_MotionDesignSystem_v1.md`에 정의된 **Emotional Transition Pattern (Warning $\to$ Calm)** 모션을 필수적으로 적용해야 한다.

## ⚙️ 2. 데이터 계약 및 연결 로직 (Data Contract & Logic)
Action Plan Card는 단순히 고정된 내용이 아니라, KPI Gauge의 특정 값이 임계점(Threshold)을 벗어날 때 **조건부로 활성화**되어야 한다.

| 트리거 지표 (KPI Variable) | 측정 단위 | 임계치 조건 (Condition) | Action Plan 카드 노출 여부 | 표시할 핵심 카피/제목 예시 |
| :--- | :--- | :--- | :--- | :--- |
| `Debt_Ratio` (부채 비율) | % | `> 0.7` (매우 높음) | O (필수 노출) | **[자금 순환 개선]** 정부 지원 정책 컨설팅 서비스 신청하기 |
| `Sales_Stability` (매출 안정성) | 점수/100 | `< 50` (하위권) | O (높음 우선 노출) | **[운영 전략 재점검]** 지역 상인 네트워크 공동 마케팅 참여 제안 |
| `Market_Adaptability` (시장 적응력) | 지표값 | N/A (특정 값 부재 시) | X (비활성화) | Action Plan 카드 전체를 숨김. 대신 '추가 데이터 입력 요청' 문구만 노출. |

## ⚠️ 최종 개발 유의사항
1.  **데이터 우선순위:** 만약 여러 개의 액션 카드가 노출되어야 할 경우, **가장 위험도가 높은 KPI에 연결된 Action Plan Card**를 최상단에 배치하여 사용자의 시선을 즉각적으로 집중시켜야 한다.
2.  **API Endpoint:** 액션 버튼 클릭은 `POST /api/action-plan/submit` 엔드포인트로 전송되어 해당 서비스의 신청 과정으로 이동해야 함을 개발팀에 명확히 인지시킨다.