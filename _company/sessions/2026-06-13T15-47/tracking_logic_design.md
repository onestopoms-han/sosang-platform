<find>## 1️⃣ Pilot 참여 대상 소상공인 선정 기준</find><replace>---
# 🎯 BDS소상공인플렛폼 — Pilot 프로그램 핵심 인터랙션 지점별 데이터 추적 로직 (Design Spec V1.0)

## 0️⃣ 개요

- **목표**: Pilot 프로그램 참여 소상공인의 '실제 행동 변화'를 측정하여 성공 지표 정의
- **범위**: User Onboarding → Dashboard Access → Risk Alert Engagement → Action Plan Execution → Conversion
- **원칙**: 데이터 최소 수집, 최대 가치 추출 (GDPR 준수를 위한 Privacy by Design)

## 1️⃣ 핵심 인터랙션 지점 및 추적 요구사항

| ID | 지점명 | 이벤트 유형 | 캡처 데이터 필드 | 목적 |
|----|--------|-------------|------------------|------|
| IP-01 | **Onboarding 완료** | `user_registered` event | user_id, shop_name, registration_source, ip_address, device_type | 전환율 (Registration → Active User) 측정 |
| IP-02 | **Dashboard 첫 접근** | `dashboard_viewed` event | user_id, session_start_time, viewed_widgets, dwell_time | 사용자 활성화 (Activation) 지표 |
| IP-03 | **리스크 알림 클릭** | `alert_engaged` event | alert_id, severity_level, action_taken, time_to_action | 리스크 인식도 → 행동 전환율 분석 |
| IP-04 | **AI 추천 받아보기** | `recommendation_consumed` event | recommendation_type (risk/reward), ai_model_version, user_feedback (like/dislike) | AI 신뢰도 및 정확도 개선 피드백 |
| IP-05 | **액션 플랜 생성/수정** | `action_plan_modified` event | plan_id, modification_type (create/edit/delete), impact_score | 실제 행동 변화 유도 성공률 측정 |
| IP-06 | **결제 시도** | `payment_initiated` event | payment_method, amount, success/failure, error_reason | 수익성 (MRR) 지표 연결 |

> **주의**: 모든 이벤트는 `event_id`, `timestamp (ISO8601)`, `user_id`, `session_id` 필드 포함 (Analytics Schema 표준 준수). IP-03과 IP-04 는 'AI 모델 신뢰도' 측정용 별도 메트릭으로 활용.

## 2️⃣ 데이터 스키마 설계 (Pydantic V2 기준)
</replace>