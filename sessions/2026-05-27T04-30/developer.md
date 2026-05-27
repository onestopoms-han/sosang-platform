# 📝 PRSR 기반 동적 요금제 테스트 시나리오 구체화 (V1.0)

## 1. 개요
동적 요금제(Tiered Stability Pricing) 로직의 신뢰성을 검증하기 위해 정상, 경계, 예외 상황을 모두 커버하는 테스트 시나리오 3 가지를 정의합니다. 이 문서가 실제 개발 단계에서 백엔드-프론트엔드 통합 테스트에 사용됩니다.

## 2. 테스트 시나리오 상세

### 시나리오 A: 정상 흐름 (티어 상승)
- **목표:** PRSR이 티어 기준을 초과할 때, 사용자에게 자동 업그레이드 제안이 전달되고 결제가 성공하는지 확인합니다.
- **입력 데이터:** `prsr_score=95`, `user_tier='Basic'`, `target_pricing='Premium'`
- **예상 로직:** 
  ```python
  if prsr_score >= PREMIUM_THRESHOLD:
      trigger_upgrade_proposal(user, 'Premium')
      process_payment('Premium', user.payment_method)
  ```
- **검증 기준:** 제안 UI 가 표시되고 결제 API 가 성공적으로 호출됨.

### 시나리오 B: 경계 흐름 (티어 유지/하강)
- **목표:** PRSR이 티어 하한선 근처에서 변동될 때, 사용자가 현재 티어를 유지할지 업그레이드를 거부하는지 확인합니다.
- **입력 데이터:** `prsr_score=78`, `user_tier='Basic'`, `target_pricing='Premium'` (티어 간격 80점)
- **예상 로직:** 
  ```python
  if PREMIUM_THRESHOLD - 15 <= prsr_score < PREMIUM_THRESHOLD:
      show_maintenance_message("안정성 유지 중. 다음 목표: 95 점")
      # 스태그네이션 방지 로직: 가격 할인 적용 여부 확인
  ```
- **검증 기준:** UI 가 "안정성 유지" 메시지 표시하고, 가격 할인이 적용되는지 확인합니다.

### 시나리오 C: 시스템 장애 (Fallback)
- **목표:** LLM 호출 실패 또는 서버 오버로딩 시, 동적 요금 로직이 fallback 상태로 전환되는지 확인합니다.
- **입력 데이터:** `llm_call_failure=True`, `server_load=95%`
- **예상 로직:** 
  ```python
  if llm_call_failure or server_load > 90:
      switch_to_static_pricing('Basic')
      log_alert("System overload, fallback to static pricing")
  ```
- **검증 기준:** UI 가 "안정성 점검 중" 메시지 표시하고, 기존 기본 요금제로 전환됨.

## 3. 시나리오 실행 계획
1. 백엔드 API (`/pricing/dynamic`) 에 테스트 데이터 주입.
2. 프론트엔드 컴포넌트가 각 시나리오별 UI 를 렌더링하는지 확인.
3. 결제 연동 로직이 정상 동작하는지 모니터링.

---
*작성자: 코다리 (Developer Agent)*  
*업데이트: 2026-05-27T04:30*