# 💰 Action Plan 기능: WTP 극대화 전략 메모 (V2.0)

## 목표
사용자에게 '결제'가 아닌 '손실 방지 투자'로 인지시키고, 유료 전환율(Conversion Rate)을 극대화한다.

## 핵심 원칙
1. **Loss Aversion First:** 잠재적 손실 비용을 가장 크고 충격적으로 제시한다. (Stage A)
2. **Value Decomposition:** Action Plan의 모든 단계별 절감 가치를 숫자로 쪼개 보여준다. (Stage B)
3. **Anchor & Urgency:** 가격은 '비용'이 아닌 '보험료/최소 투자금액'으로 프레이밍하고, 희소성(Scarcity)과 긴급성(Urgency)을 부여한다. (Stage C)

## 📝 주요 개선 사항 (To Designer/Dev Team)
### 1. UI/UX 흐름 강화
*   **Stage A:** 최악의 시나리오(Worst Case)를 기준으로 삼아, 플렛폼 가입 전 상태와 비교하는 대형 손실 차트를 도입한다.
*   **Stage B:** 각 기능별 절감 효과(시간/비용)를 누적하여 '총 예상 회수 가능 가치'를 숫자로 계산하고, 이를 가격 제시의 근거로 활용한다.

### 2. 가격 제시 방식 (WTP Maximization)
*   단일 가격 대신 **[Basic / Standard / Premium]**의 3단계 티어 구조를 도입하여 표준 옵션(Standard)이 가장 매력적으로 보이도록 설계한다.
*   가격 문구는 **"OOO원 결제" $\rightarrow$ "잠재적 손실 [XXX만원]을 막기 위한 최소 투자금액"**으로 변경한다.

### 3. 개발 및 측정 (KPI 강화)
*   백엔드에 `user_abandonment_point` 로그를 추가하여, 사용자가 어느 단계에서 이탈하는지(A, B, C 중)와 그 직전 메시지를 매핑한다.
*   API 엔드포인트로 **'예상 최소 수익액(Estimated Minimum Gain)'**을 계산하여 보여주는 로직을 추가한다.