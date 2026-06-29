<file_content>
# Trust Widget & 기술 안정성 지표 시각화 로직 명세서 (V1.0)

## 1. 개요
- **목적:** 소상공인플렛폼에서 제공하는 기술 안정성 및 신뢰도를 시각적으로 증명하는 `Trust Widget`의 API 구조와 프론트엔드 연동 로직을 정의합니다.
- **대상:** 개발팀 (백엔드, 프론트엔드)
- **연동 기준:** Designer 의 `Onboarding_Flow_V1.0_Spec.md`, `Deep Blue/Warning Orange` 디자인 시스템

---

## 2. API 스키마 정의 (`Dashboard_API_Response_Schema_v1.0`)

### 2.1. Trust Widget 주요 지표 (Real-time Metrics)
백엔드가 프론트엔드로 반환해야 할 핵심 데이터 구조입니다.

```typescript
interface DashboardMetrics {
  // 1. 기술 안정성 지표 (기술적 증명)
  stability_score: number;           // 0-100 점, 시스템 가동률 및 처리 속도 기반
  success_rate_24h: number;         // 지난 24 시간 성공 처리율 (%)
  
  // 2. 신뢰도 지표 (비즈니스 결과 증명)
  retry_rate: number;               // 재시도 성공율 (안정성을 보여주는 핵심 지표)
  average_resolution_time_ms: number; // 평균 처리 시간
  
  // 3. 실시간 상태 (상황별 메시지)
  current_status: 'stable' | 'warning' | 'critical'; // 현재 시스템 상태
  status_message: string;           // 상황별 사용자 친화적 메시지
  
  // 4. 신뢰 증빙 데이터 (가상 데이터 또는 실제 집계)
  verified_partner_count: number;   // 검증된 파트너사 수 (신뢰도 강화)
  security_certifications: string[];// 보안 인증 목록 (SSL, ISO 등)
}

// 예시 응답 객체
{
  "stability_score": 98.5,
  "success_rate_24h": 99.12,
  "retry_rate": 0.987, // 98.7% 성공
  "average_resolution_time_ms": 1200,
  "current_status": "stable",
  "status_message": "시스템이 정상적으로 운영 중입니다.",
  "verified_partner_count": 452,
  "security_certifications": ["ISO 27001", "PCI DSS"]
}
```

### 2.2. API 엔드포인트 및 호출 규칙
- **GET `/api/v1/dashboard/metrics`** — 위 스키마에 따른 JSON 데이터 반환
- **Response Code:** `200 OK` (정상), `503 Service Unavailable` (시스템 불안정 시)

---

## 3. 프론트엔드 연동 로직 및 상태 관리 (`TrustWidget.tsx`)

### 3.1. 컴포넌트 구조
```tsx
interface Props {
  metrics: DashboardMetrics; // API 에서 받은 데이터
}

export default function TrustWidget({ metrics }: Props) {
  const [isStable, setIsStable] = useState(metrics.current_status === 'stable');

  useEffect(() => {
    // 상태 변경 시 UI 업데이트 (예: 컬러바, 메시지 텍스트 변경)
    if (metrics.stability_score > 90) setIsStable(true);
    else setIsStable(false);
  }, [metrics]);

  return (
    <div className="trust-widget-container">
      {/* 1. 안정성 점수 및 상태 표시 */}
      <div className={`status-indicator ${isStable ? 'stable' : 'warning'}`}>
        {metrics.stability_score}% 안정성 유지
        <span>{metrics.status_message}</span>
      </div>

      {/* 2. 신뢰도 지표 카드 */}
      <div className="metric-cards">
        <MetricCard label="24h 성공률" value={`${metrics.success_rate_24h}%`} />
        <MetricCard label="재시도 성공률" value={`${(metrics.retry_rate * 100).toFixed(2)}%`} />
      </div>

      {/* 3. 증빙 데이터 (파트너사, 보안 인증) */}
      <div className="certifications">
        {metrics.security_certifications.map(cert => (
          <img key={cert} src={`cert-${cert}.svg`} alt={cert} />
        ))}
        <span>검증된 파트너: {metrics.verified_partner_count} 곳</span>
      </div>
    </div>
  );
}
```

### 3.2. 상태별 디자인 규칙 (Designer 와이어프레임 연동)
| 시스템 상태 | 안정성 점수 범위 | UI 색상 (Deep Blue 기반) | 메시지 텍스트 | 행동 유도 (CTA) |
|------------|------------------|---------------------------|----------------|-----------------|
| **Stable**  | ≥ 90              | `#0F3D75` (강한 블루)     | "시스템이 정상적으로 운영 중입니다." | "지금 바로 서비스를 시작하세요" |
| **Warning** | 70 ~ < 90         | `#FF8C00` (경고 오렌지)   | "일부 지연이 발생할 수 있습니다. 재시도 후 확인하세요." | "3 분 뒤에 다시 시도해보세요" |
| **Critical**| < 70              | `#DC2626` (빨강)           | "시스템 점검 중입니다. 나중에 다시 방문해주세요." | "공식 공지사항을 확인해주세요" |

---

## 4. 개발팀 전달용 체크리스트

- [ ] 백엔드 API 응답 스키마 (`DashboardMetrics`) 를 `Postman Collection` 으로 테스트 완료
- [ ] 프론트엔드 컴포넌트가 상태 변경 시 `useEffect` 로직이 정상 작동하는지 확인
- [ ] 디자인 시스템 규칙 (색상, 폰트) 과 일관성을 유지하는지 검증
- [ ] `Onboarding_Flow_V1.0_Spec.md` 에서 정의한 UX 흐름과 일치하는지 최종 검토

---

## 5. 다음 단계
- **개발팀:** 위 명세를 바탕으로 API 구현 및 컴포넌트 개발 착수
- **Designer:** 위 컬러 규칙에 따른 실제 UI Mockup 제작 (Figma 파일 연동)
</file_content>