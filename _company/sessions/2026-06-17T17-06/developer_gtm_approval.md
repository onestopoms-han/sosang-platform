# 🛠️ BDS 소상공인플렛폼: 개발 스프린트 우선순위 승인서 (GTM 연계)

**승인일**: 2026. 6. 18  
**요청자**: 현빈 (비즈니스 전략가)  
**수신팀**: 코다리 (개발팀)  

## 1. 승인 배경
MVP 출시를 위한 GTM 실행 계획과 초기 KPI 설정이 완료되었습니다. 개발팀은 이 계획에 맞춰 **PainGauge 데이터 연동 강화** 및 **온보딩 UX 개선**을 다음 스프린트 우선순위로 선정합니다.

## 2. 구체적 기술 요구사항

### 2.1 PainGauge API 연동 (엔드포인트)
- **GET `/api/pain-gauge/v1/sync`**: 
    - 입력: `user_id`, `business_type`  
    - 출력: `{ "score": int, "categories": ["재고", "마케팅"] }`  
- **POST `/api/pain-gauge/v1/analyze`**: 
    - 입력: `business_data` (JSON)  
    - 출력: `pain_analysis_result`  

### 2.2 온보딩 UX 개선
- **AI 진단서 발급 후**: 
    - 프론트엔드: PainGauge 데이터를 차트로 시각화 (`<div class="pain-gauge-chart">`)  
    - 백엔드: `/api/onboarding/v1/guide/{user_id}` 엔드포인트 추가  
- **반응형 UI**: 
    - 모바일 우선 설계 (사용자 행동 로그 수집)  
    - `PainGauge` 데이터 시각화 시 `d3.js` 또는 `Chart.js` 사용  

### 2.3 MVP 출시 전 필수 작업
- **온보딩 페이지**: AI 진단서 발급 → PainGauge 연동 → 맞춤형 가이드 제공  
- **결제 시스템**: AOV(평균 주문 가치) 추적 변수 추가 (`/api/payment/v1/aov`)  
- **이탈 방지**: Churn Rate(이탈율) 모니터링을 위한 로그 수집  

## 3. 승인 절차
1. 현빈 (CEO) 과 개발팀长在 `sessions/2026-06-17T17-06/business_gtm_plan_final.md` 를 검토  
2. **승인**: CEO 서명 후 개발팀에 파일 전달  
3. **실행**: 코다리 팀이 다음 스프린트 작업 시작 (2026. 6. 25 까지)  

---