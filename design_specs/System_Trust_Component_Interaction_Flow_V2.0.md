# 🛡️ System Trust Component: 상호작용 컴포넌트 명세서 (V2.0)

**담당:** Designer (Lead Design & UX Flow)
**협업:** Codari (Backend API Schema), 개발팀 (Frontend 구현)
**목표:** 결제 실패와 같은 기술적 오류 상황에서 사용자의 불안감을 '시스템의 자동 복구 능력'이라는 신뢰로 전환시키는 상호작용 로직 정의.

## 1. 컴포넌트 개요 및 흐름도 (Flow Overview)
본 컴포넌트는 단일 화면이 아닌, 사용자 트랜잭션 과정 중 특정 오류(Payment Failure) 발생 지점에 삽입되는 **상태 기반 컨테이너**입니다.

| 단계 | 이벤트 트리거 (Input) | 시스템 상태 (State) | 디자인 목표 (Output Goal) | 주요 API 스키마 반영 영역 |
| :---: | :---: | :---: | :---: | :---: |
| **S0** | (성공적 진입) | 초기 로딩/대기 | - | N/A |
| **S1** | `transaction_failed` | 🚨 Critical Zone (최악의 실패) | 문제 발생 인지 $\rightarrow$ *안심 유도* | `failure_reason`, `retry_allowed: False` |
| **S2** | `retry_attempted` | ⚠️ Warning Zone (일시적 문제) | 원인 분석 및 대안 제시 $\rightarrow$ *행동 요청* | `error_code`, `suggested_action` |
| **S3** | `recovery_success` | ✅ Optimal Zone (자동 복구 성공) | 신뢰 구축 완료 $\rightarrow$ *다음 단계 안내* | `recovery_score: High`, `next_step_api: payment_success` |

## 2. 상태별 상세 디자인 명세 및 로직 연결
### State S1: Critical Zone - 즉각적 오류 인지 (Failure)
*   **API 스키마 요구사항:** 최소한의 실패 정보만 전달 (`failure_reason`, `timestamp`).
*   **디자인 전략:** 사용자에게 "당신이 틀린 것이 아니다"라는 메시지를 최우선으로 제공.
    1.  **헤드라인 (H1):** 공감적 문구 사용 ("잠시 시스템 점검이 필요합니다." 또는 "걱정하지 마세요, 복구 중입니다.")
    2.  **핵심 정보:** 실패 원인 요약 및 트랜잭션 ID 제시 (디버깅 용이성 확보).
    3.  **Action Button:** *Retry* 버튼 비활성화. 대신 **'전문 상담원 연결하기' (Manual Link)** 또는 **'다른 결제 수단 시도하기' (Fallback)** 링크 제공.
    4.  **시각 요소:** Red 계열의 경고 색상(Error Color)을 사용하되, 배경 전체에 불안감을 주지 않도록 최소화하고, *시스템이 작동 중*이라는 애니메이션/로딩 표시를 삽입.

### State S2: Warning Zone - 대안 제시 및 행동 유도 (Recovery Attempt)
*   **API 스키마 요구사항:** 시스템 진단 정보 전달 (`error_code`, `suggested_action` 목록).
*   **디자인 전략:** 실패 원인을 기술적 문제가 아닌 '일시적인 과정'으로 프레임 재설정.
    1.  **Loss Gauge Integration:** Loss Gauge의 '경제적 생존 전략' 관점 적용 (예: "지금은 잠시 쉬어가는 것이 가장 강력한 생존 전략입니다.").
    2.  **정보 전달:** 실패 원인(Error Code)을 일반 용어로 풀어서 설명하고, **명확하게 2~3가지 행동 대안** 제시 (e.g., 다른 카드 사용, 시간차 재시도, 상담 요청).
    3.  **System Trust Component 활성화:** 이 상태에서부터 PRSR/ERT 지표를 기반으로 한 '복구 진행률 바'가 시각적으로 증가하며 신뢰도를 구축해야 함.

### State S3: Optimal Zone - 성공적인 복구 (Success)
*   **API 스키마 요구사항:** 시스템 안정성 점수 및 다음 단계 API 호출 (`next_step_api`).
*   **디자인 전략:** 오류 발생 과정 자체를 '시스템의 높은 신뢰도'로 포장.
    1.  **피드백 메시지:** "자동 복구에 성공했습니다! 저희 시스템은 이런 상황을 위해 설계되었습니다."와 같이 능동적인 문구 사용.
    2.  **신뢰 지표 강조:** `Recovery Sequence Score`를 시각적으로 가장 크게 보여주고, 이 과정이 얼마나 빠르고 안정적이었는지 수치화하여 전달.
    3.  **다음 CTA:** 성공적으로 결제를 완료하는 다음 단계(예: 마이페이지 이동)로의 버튼을 명확하게 배치.

## 3. 컴포넌트 구현 시 기술 가이드라인 (Technical Handover)

1.  **API 연동 최우선:** 모든 상태 전환은 반드시 백엔드 API 응답에 의존해야 합니다. UI는 데이터의 반영체여야 합니다.
2.  **Atomic Design 적용:** 시스템 트러스트 컴포넌트 내에서 사용되는 '복구 진행률 바', '오류 아이콘', '경고 메시지 뱃지' 등은 모두 독립적인 Atomics Component로 분리하여 재사용성을 확보합니다. (ex: `<RecoveryProgressBar data-score={...}/>`)
3.  **A/B 테스트 준비:** V2.0 명세서에 포함된 모든 문구와 레이아웃 변화는 A/B 테스트 매트릭스(V2.0)를 참조하여 구현 가능해야 합니다.