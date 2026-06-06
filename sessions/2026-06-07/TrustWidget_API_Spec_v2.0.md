# ⚙️ Trust Widget Component API Specification (v2.0)
## Overview
본 문서는 BDS 소상공인 플랫폼의 핵심 신뢰 구축 요소인 'Trust Widget' 컴포넌트의 개발팀(Front-end Developer) 및 백엔드 엔지니어링 팀을 위한 최종 인터페이스 명세입니다. 시각적 스펙(v1.1)과 별개로, 이 문서는 **컴포넌트가 요구하는 데이터 구조와 상태별 동작 로직**에 집중합니다.

## 🎯 1. 컴포넌트 목표 및 사용 원칙
*   **목표:** 플랫폼의 기술 안정성을 수치화하고, 사용자에게 직관적이고 감성적으로 전달하여 신뢰도를 구축한다.
*   **반응형 디자인:** 모든 상태는 반응형(Responsive)을 지원해야 하며, 모바일/태블릿 환경에서 텍스트와 지표가 명확하게 보여야 한다.

## ✨ 2. 컴포넌트 Props 정의 (Interface Definition)
`TrustWidget`은 최소한 다음의 3가지 필수 Prop과 선택적 메시지 Prop을 받아야 합니다.

| Name | Type | Required | Description | Example Value | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `status` | Enum (`'SUCCESS'`, `'WARNING'`, `'ERROR'`, `'LOADING'`) | O | 현재 위젯의 상태를 결정하는 핵심 값. 스타일 및 로직 분기를 담당한다. | `'SUCCESS'` | 필수 |
| `data` | Object | O | 상태에 따른 실시간 지표 데이터를 담는 객체. (구조는 Status 별 다름) | `{...}` | 필수 |
| `primaryMessage` | String | X | 위젯 상단 또는 하단에 표시되는 메인 감성 메시지 (예: "데이터 기반 성장 컨설팅"). | `"안심하고 투자하세요."` | 선택적 |

---

## 📊 3. 상태별 데이터 구조 및 로직 명세 (State-Specific Data Contracts)

### 🟢 State 1: Success (`status: 'SUCCESS'`)
가장 이상적인 안정성 지표를 보여줄 때의 계약.

**A. Input Props:**
*   `data`: `{ successRate: number, uptimeDays: number, avgLatencyMs: number }`
    *   `successRate`: (0.0 ~ 1.0) 플랫폼 성공 거래율 (예: 0.999).
    *   `uptimeDays`: (number) 서비스 연속 가동 일수 (예: 365).
    *   `avgLatencyMs`: (integer) 평균 응답 지연 시간 (밀리초 단위, 낮을수록 좋음).
*   **Success Message Logic:** `successRate`가 높고, `uptimeDays`가 길면 '압도적인 안정성' 강조.

**B. Output/Display Contract:**
*   Primary Metric: Success Rate (%)를 가장 크게 표시 (예: 99.9%).
*   Sub-Metrics: Uptime Days 및 Latency 값을 부가 정보로 제공.

### 🟡 State 2: Warning (`status: 'WARNING'`)
일시적인 불안정성 또는 개선이 필요한 지표를 보여줄 때의 계약. (신뢰도 하락 메시지)

**A. Input Props:**
*   `data`: `{ successRateDeviation: number, recentFailureCount: number, latencyTrend: string }`
    *   `successRateDeviation`: (number) 평균 성공률 대비 편차 (%) (예: -1.5).
    *   `recentFailureCount`: (integer) 최근 24시간 내 오류 발생 건수.
    *   `latencyTrend`: ('INCREASING' | 'DECREASING' | 'STABLE') 지연 시간의 변화 추이.
*   **Warning Message Logic:** 데이터가 평균보다 낮아졌음을 사용자에게 직관적으로 경고하는 톤을 유지해야 합니다.

### 🔴 State 3: Error (`status: 'ERROR'`)
서비스 이용 불능 또는 심각한 시스템 문제 발생 시의 계약. (최악의 경우 대비)

**A. Input Props:**
*   `data`: `{ errorCode: string, errorMessage: string, recoveryTimeEstimateMinutes: number }`
    *   `errorCode`: (string) 백엔드에서 정의된 표준 오류 코드 (예: `E_SERVICE_OUTAGE`).
    *   `errorMessage`: (string) 사용자에게 보여줄 일반적인 오류 설명.
    *   `recoveryTimeEstimateMinutes`: (integer) 예상 복구 시간 (분). **(필수)**

**B. Output/Display Contract:**
*   최우선 메시지: "서비스 이용에 어려움이 있습니다." 등의 공감적 문구.
*   기술 정보: `errorCode`와 함께 간결한 설명 제공. 개발팀은 이 코드를 기반으로 Fallback 로직을 구현해야 함.

### ⚙️ State 4: Loading (`status: 'LOADING'`)
데이터를 불러오는 과정 중의 계약.

**A. Input Props:**
*   `data`: `{ loadingProgress: number }`
    *   `loadingProgress`: (0 ~ 1) 로딩 완료율 (퍼센트). **(선택적)**
*   **Logic:** 최소한의 시각적 피드백과 함께 "데이터를 불러오는 중입니다..."와 같은 상태 문구를 표시한다.

---

## 🛠️ 4. 개발자를 위한 컴포넌트 구현 가이드라인 (Implementation Guide)

1.  **API Endpoint 가정:** `GET /api/v1/trustwidget`
2.  **Required Payload Format:** 모든 데이터는 JSON 형식으로 요청되어야 합니다.
3.  **Fallback Design:** API 호출 실패(HTTP 500 등) 시, Error State (`status: 'ERROR'`)를 자동으로 활성화하고 사용자에게 **"시스템 점검 중입니다. 잠시 후 다시 확인해주세요."**라는 메시지를 보여주는 로직을 구현해야 합니다.
4.  **디자인 시스템 적용:** 모든 컴포넌트는 `DesignSystem/Trust_Element_Design_System_V2.0.md`에 정의된 색상 코드와 타이포그래피를 100% 준수해야 합니다.