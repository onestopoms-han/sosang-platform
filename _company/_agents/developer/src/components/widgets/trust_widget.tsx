/**
 * Trust Widget Component (V1.0)
 * 디자인 가이드라인 V3.0 기반 색상 매핑 및 상태 렌더링 포함
 */

// 색상 상수 정의
const COLOR_PALETTE = {
  primary: '#004D66',      // 신뢰 배경
  success: '#3CB371',      // 성장/긍정
  warning: '#FF8C00',      // 주의/위험
  danger: '#DC143C',       // 심각/실패
};

type TrustState = 'high' | 'medium' | 'low';

interface TrustWidgetProps {
  score: number;        // 신뢰도 점수 (0-100)
  label?: string;      // 레이블 (선택적)
}

export function TrustWidget({ score, label = "신뢰도" }: TrustWidgetProps) {
  let state: TrustState;
  let barColor: string;
  let statusText: string;

  if (score >= 90) {
    state = 'high';
    barColor = COLOR_PALETTE.success;
    statusText = "높은 신뢰도";
  } else if (score >= 50) {
    state = 'medium';
    barColor = COLOR_PALETTE.warning;
    statusText = "주의 필요";
  } else {
    state = 'low';
    barColor = COLOR_PALETTE.danger;
    statusText = "심각한 위험";
  }

  return (
    <div style={{ padding: '16px', backgroundColor: COLOR_PALETTE.primary, borderRadius: '8px' }}>
      <h3>{label}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* 바 그래프 렌더링 */}
        <div style={{ 
          width: '100%', 
          height: '8px', 
          backgroundColor: '#333', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${score}%`, 
            height: '100%', 
            backgroundColor: barColor, 
            transition: 'width 0.5s ease-in-out',
            borderRadius: '4px'
          }} />
        </div>
        
        {/* 상태 텍스트 */}
        <span style={{ color: '#fff', fontWeight: 'bold' }}>
          {score}% ({statusText})
        </span>
      </div>
    </div>
  );
}