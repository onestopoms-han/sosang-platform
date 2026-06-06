# Trust Widget: 최종 개발 컴포넌트 스펙 (V3.0)

**작성자:** 🎨 Designer (Lead Designer)
**검토/승인 요청:** 💻 Codari (개발팀), CEO
**목표:** 기술적 안정성을 증명하는 인터랙티브 위젯의 최종 구현 가이드라인 확정. 모든 디자인 요소는 코다리가 제시한 API 스펙에 종속됨.

## 1. 개요 및 목표
Trust Widget은 BDS 플랫폼 사용자가 느끼는 '소상공인 사업 운영의 불안감'을 해소하고, **BDS가 제공하는 서비스와 기술적 안정성에 대한 신뢰**를 시각적으로 증명하는 핵심 컴포넌트이다.

*   **핵심 메시지:** "데이터로 증명된 성공률과 재시도율이 당신의 비즈니스를 안전하게 만듭니다."
*   **사용 흐름 (UX Flow):** 페이지 로딩 시 → 실시간 지표 표시 (Loading State) → 주요 KPI 값 하이라이트 → 상세 데이터 섹션으로 연결 유도.

## 2. 디자인 시스템 컴포넌트 사양 (Visual Specs)

| 요소 | 규격/규칙 | 색상 코드 (HEX) | 적용 원칙 |
| :--- | :--- | :--- | :--- |
| **Primary Color** | 핵심 강조색, 데이터 상승 추세 | `#004D66` (Deep Blue) | 신뢰감 구축. 헤더 및 버튼 배경에 사용. |
| **Secondary Color** | 성공/안정성 지표 | `#3CB371` (Growth Green) | 긍정적인 KPI 값, 목표 달성 구간 강조. |
| **Warning/Alert** | 데이터 불안정 또는 주의 필요 | `#FF8C00` (Warning Orange) | 재시도율(Retry Rate) 등 개선이 필요한 지표에 사용. |
| **Typography** | Pretendard (가독성 최우선), H1: 32px, Body: 16px | N/A | 데이터 값은 가장 큰 크기로 강조하며 배치. |

### [Component State 정의]
컴포넌트는 최소한 다음의 세 가지 상태를 반드시 처리해야 함.

1.  **Loading State (필수):** API 호출 중임을 알림. '데이터 로딩 중...' 문구와 함께 스켈레톤 UI(Skeleton UI) 형태가 나타나야 함.
2.  **Error State (필수):** 데이터 전송 실패 시, 사용자에게 친절하게 오류 메시지("임시로 데이터를 불러올 수 없습니다. 잠시 후 다시 확인해주세요.")를 제공하고 재시도 버튼을 활성화해야 함.
3.  **Default State:** API 호출 성공 시 정상적으로 표시되는 상태.

## 3. 데이터 구조 및 인터랙션 명세 (Technical Specs)

본 위젯의 모든 값은 코다리가 정의한 `PM_Dashboard_Status_Variables_v1` 스키마를 따르며, 반드시 다음 로직을 준수해야 합니다.

### A. API 엔드포인트
*   **Endpoint:** `/api/dashboard/status-metrics`
*   **Method:** GET
*   **Request Body:** 없음 (혹은 `?platform_id=BDS`)
*   **Expected Response Type:** JSON 객체 (Codari 스펙 참조)

### B. KPI 데이터 매핑 및 로직 (핵심)

| 지표명 | API Key (예상) | 표시 형식 | 디자인 강조 원칙 | 구현 로직 예시 |
| :--- | :--- | :--- | :--- | :--- |
| **성공률** | `success_rate` | X.X% (숫자 + 단위) | Deep Blue 배경, Growth Green 텍스트로 가장 크게 표시. | 값의 변화량(%)을 계산하여 전/후에 화살표 아이콘 추가 (`↑`, `↓`). |
| **재시도율** | `retry_rate` | X.X% (숫자 + 단위) | 경고색 배경, Warning Orange 텍스트 사용. | 이 값이 일정 임계치(예: 60%)를 넘을 경우, "개선 필요" 배지 표시. |
| **총 거래 건수** | `total_transactions` | N건 (숫자 + 단위) | 일반적인 데이터 카드로 처리. | 누적 합계를 보여주며, 가장 최근 증가분을 강조 (Delta Display). |

### C. 컴포넌트 레이아웃 및 인터랙션
1.  **Top Section:** 세 가지 핵심 KPI 카드(`성공률`, `재시도율`, `총 거래 건수`)가 가로 정렬되어 배치됨. 각 카드는 직관적인 아이콘과 수치를 포함해야 함.
2.  **Interaction (Hover/Click):** 사용자가 특정 KPI 카드(예: 성공률)에 마우스를 올리거나 클릭하면, 해당 지표의 **데이터 정의와 의미를 설명하는 툴팁 또는 상세 모달이 나타나야 함.** 이 과정은 신뢰성 강화를 목표로 함.
3.  **Pseudo-Code (React 예시):**

```jsx
// TrustWidget.js (Conceptual Code Structure)
function TrustWidget({ data, isLoading }) {
    if (isLoading) return <SkeletonLoader type="widget" />;
    if (!data || !data.success_rate) return <ErrorState onRetry={() => fetchData()} />;

    return (
        <div className="trust-widget-container">
            {/* 1. KPI Cards */}
            <KPI_Card title="성공률" value={data.success_rate} color="green" />
            <KPI_Card title="재시도율" value={data.retry_rate} color="orange" />
            {/* ... other KPIs */}

            {/* 2. 상세 설명 섹션 (Interactivity) */}
            <div className="detail-section">
                <h2>데이터 기반 안정성 확보</h2>
                <p>이 수치들은 BDS 플랫폼의 실제 트랜잭션 데이터에서 유래합니다.</p>
            </div>
        </div>
    );
}
```

## 4. 승인 요청 및 후속 조치 (Action Items)
1.  **Codari:** 본 사양서에 명시된 모든 API Key와 Data Format이 기술적으로 구현 가능한지 최종 검토하고, 필요 시 수정 사항을 반영하여 확정해주십시오.
2.  **CEO:** 디자인 시스템의 핵심 가치가 데이터 기반 증명에 맞춰졌는지 최종 승인해주십시오.