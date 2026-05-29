/**
 * KPI Status Gauge 컴포넌트 - 초기 UI 와이어프레임
 * 
 * [디자인 토큰 매핑]:
 * - Normal: #4CAF50 (성장/안정)
 * - Warning: #FF9800 (주의/주황)
 * - Critical: #B03A2E (위험/경고)
 * 
 * [데이터 계약서]:
 * Props.kpiData: { value: number, status: string | undefined, trend?: 'up' | 'down' | 'flat' }
 */

import React from 'react';
import './KpiStatusGauge.css'; // 스타일 파일은 별도 생성 예정 (CSS-in-JS 권장)

// 상태별 디자인 토큰 정의 (Designer 규칙 반영)
const STATUS_TOKENS = {
  normal: { color: '#4CAF50', icon: '✅' },      // 안정/성장
  warning: { color: '#FF9800', icon: '⚠️' },     // 주의
  critical: { color: '#B03A2E', icon: '🐛' },    // 경고/위험
};

// 상태별 텍스트 라벨 (간결한 설명)
const STATUS_LABELS = {
  normal: '정상',
  warning: '주의 필요',
  critical: '비상 대비',
};

interface KpiStatusGaugeProps {
  kpiData?: {
    value: number;
    status?: string;        // 'normal' | 'warning' | 'critical' | undefined
    trend?: 'up' | 'down' | 'flat'; // 추세 정보 (선택)
    label?: string;         // KPI 이름 (예: '매출 성장률')
  };
  showTrend?: boolean;      // 추세 표시 여부 (기본 true)
}

const KpiStatusGauge: React.FC<KpiStatusGaugeProps> = ({
  kpiData,
  showTrend = true,
}) => {
  const defaultKpi = {
    value: 0,
    status: 'normal',
    trend: 'flat',
    label: '매출 성장률',
  };

  // props 가 없거나 유효하지 않으면 기본값 사용 (가드)
  const data = kpiData || defaultKpi;

  // 상태에 따른 토큰 조회 (undefined 일 경우 normal fallback)
  const token = STATUS_TOKENS[data.status] ?? STATUS_TOKENS.normal;
  const label = STATUS_LABELS[data.status] ?? '정상';

  // 추세 아이콘 렌더링 로직
  const TrendIcon = ({ trend }: { trend: string }) => {
    if (!trend || !showTrend) return null;
    
    // 단순한 텍스트 기반 추세 표현 (반응형 차트 컴포넌트는 별도)
    const arrow = { up: '⬆', down: '⬇', flat: '➡' }[trend] ?? '➡';
    
    return <span className={`trend-indicator ${trend === 'up' ? 'up' : trend === 'down' ? 'down' : ''}`}>
      {arrow} <small>{Math.abs(data.value)}%</small>
    </span>;
  };

  // 상태별 배경/테두리 클래스 적용 (CSS-in-JS 대신 className 활용)
  const cardClass = `kpi-card kpi-${data.status ?? 'normal'}`;

  return (
    <div className={`kpi-status-gauge ${cardClass}`} role="status">
      {/* 상태별 헤더: 아이콘 + 라벨 */}
      <div className="gauge-header">
        <span className="gauge-icon">{token.icon}</span>
        <span className="gauge-label">{label}</span>
      </div>

      {/* 주요 KPI 값 (큰 글씨) */}
      <div className="gauge-value">
        {data.value.toFixed(2)}%
      </div>

      {/* 추세 표시 (선택) */}
      {showTrend && <TrendIcon trend={data.trend ?? 'flat'} />}

      {/* 상태별 메시지 (Tooltip 또는 상세 설명용 - 우선 생략) */}
    </div>
  );
};

export default KpiStatusGauge;