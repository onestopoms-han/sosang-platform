# Trust Widget 최종 컴포넌트 스펙 (Developer Handoff V3.1)
## 🎯 목적 및 정의
*   **목적:** 소상공인 사용자에게 플랫폼의 기술적 안정성(Trust)을 데이터 기반으로 시각화하여 신뢰를 구축하는 인터랙티브 UI/UX 컴포넌트.
*   **개발 상태:** 최종 승인 (Final Handoff). 이 스펙에 따라 프론트엔드 개발 착수.
*   **핵심 원칙:** 모든 지표는 감성적 가치(불안감 해소)로 변환되어야 하며, 기술 명세와 시각화 로직 간의 100% 정합성을 유지해야 함.

## 🛠️ 1. 컴포넌트 구조 및 레이아웃 (Design System Layer)
*   **컴포넌트명:** TrustWidget (재사용 가능/Modular Component)
*   **레이아웃:** Flexbox 기반, 반응형(Mobile First).
*   **색상 팔레트:**
    *   Primary: Deep Blue (#004D66) - 신뢰성 기본 배경/헤더.
    *   Secondary: Growth Green (#3CB371) - 긍정적 지표, 성공 강조(Success State).
    *   Accent: Warning Orange (#FF9800) - 주의/개선 필요 영역 (Alert State).
    *   Text: #333333.
*   **폰트:** [지정된 웹 폰트명] (예: Pretendard, Noto Sans KR)

## ⚙️ 2. 데이터 및 API 스펙 (Kodari Integration Layer)
*   **API 엔드포인트:** `/api/v1/trust_dashboard_status`
*   **요청 방식:** GET
*   **데이터 포맷:** JSON (최신 Schema: PM_Dashboard_Status_Variables_v1.md 준수)

```json
{
  "timestamp": "YYYY-MM-DDTHH:mm:ssZ",
  "success_rate_pct": 95.2, // 기술적 안정성 지표 (실제 성공률 %)
  "retry_rate_pct": 80.1,   // 시스템 재시도율 (%)
  "latency_avg_ms": 450,    // 평균 응답 속도 (밀리초)
  "uptime_daily_pct": 99.9, // 일일 가동률 (%)
  "transaction_count_24h": "N/A" // 거래 건수 (최신 업데이트된 데이터 유형 명시 필요)
}
```

## ✨ 3. 인터랙션 및 시각화 로직 (UX Flow & State Management)

### A. 초기 로딩 상태 (Loading State)
*   **로직:** API 호출 시작 즉시 표시.
*   **UI:** Deep Blue 배경의 Skeleton Loader 사용. '실시간 데이터 분석 중...' 텍스트와 함께 네 개의 지표 영역(Success, Retry, Latency, Uptime)에 스켈레톤 박스 표시.
*   **애니메이션:** 부드러운 그리드 애니메이션 효과 적용 (데이터 로딩 느낌).

### B. 성공/정상 상태 (Normal/Success State - Growth Green Dominance)
*   **로직:** 모든 지표가 일정 기준치(Threshold) 이상일 경우.
*   **UI:**
    1.  **헤드라인 영역:** "안심하고 거래하세요. 실시간 안정성 데이터 기반 증명." (Growth Green 강조).
    2.  **지표 시각화:** 각 지표별로 **게이지 차트(Gauge Chart)**와 **추이 그래프(Line Graph)**를 동시에 표시.
        *   *게이지:* 현재 수치와 목표 범위(예: 성공률 95% 이상)를 원형 게이지로 직관적으로 표현 (Growth Green 바).
        *   *그래프:* 지난 7일간의 변화 추이를 부드러운 라인 그래프로 표시.
    3.  **핵심 메시지:** "지난 24시간 동안 [Success Rate] 성공률을 기록하며, 업계 최고 수준의 안정성을 증명했습니다." (숫자 강조).

### C. 경고/개선 필요 상태 (Warning/Alert State - Warning Orange Dominance)
*   **로직:** 특정 지표가 위험 임계치(Threshold) 이하일 경우 (예: `success_rate_pct` < 90% 또는 `latency_avg_ms` > 800ms).
*   **UI:**
    1.  **헤드라인 영역:** "⚠️ 시스템 점검 및 개선이 필요한 영역입니다." 경고 메시지 박스(Warning Orange 배경)를 최상단에 배치.
    2.  **문제 지표 강조:** 위험한 지표에 대해 가장 큰 크기로 붉은색 또는 Warning Orange로 표시하고, **'개선 필요 사유 분석 중...'** 문구를 추가하여 신뢰도를 유지하되 경고하는 톤앤매너를 확립.
    3.  **사용자 안내:** "더 나은 서비스를 위해 [BDS]가 노력하고 있습니다. 관련 정보를 참고해 주세요." (불안감을 완화하는 부가적 메시지 필수).

### D. 기술 구현 시 주의사항 (Implementation Notes)
1.  **Latency Handling:** 지연 시간(latency_avg_ms)이 측정되는 순간, UI에 '데이터 수집 중...' 등의 미묘한 애니메이션을 넣어 시스템이 살아있음을 인지시키는 것이 중요합니다.
2.  **Data Update Frequency:** 모든 지표는 5초 단위로 실시간 업데이트되며, 이 업데이트 과정 자체를 사용자에게 가시화하는 로직(예: 카운트다운 타이머 또는 마이크로 애니메이션)을 추가할 것을 권고합니다.