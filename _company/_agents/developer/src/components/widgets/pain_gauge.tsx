/**
 * PainGauge Component (V1.0)
 * 디자인 가이드라인 V3.0 기반 행동 유도 (Action Prompt) 및 상태 색상 매핑 포함
 */

import { TrustWidget } from './trust_widget'; // 타입만 import, 실제 컴포넌트는 별도 파일로 관리

const COLOR_PALETTE = {
  primary: '#004D66',
  success: '#3CB371',
  warning: '#FF8C00',
  danger: '#DC143C',
};

type PainState = 'positive' | 'neutral' | 'negative';

interface PainGaugeProps {
  riskLevel: number;   // 위험도 지표 (0-100, 높을수록 좋음)
  actionPrompt?: string; // 행동 유도 문구 (선택적)
}

export function PainGauge({ riskLevel, actionPrompt }: PainGaugeProps) {
  let state: PainState;
  let barColor: string;
  let promptText: string;
  let textColor: string;

  if (riskLevel >= 80) {
    state = 'positive';
    barColor = COLOR_PALETTE.success;
    promptText = "성장을 위해 행동하세요";
    textColor = COLOR_PALETTE.primary;
  } else if (riskLevel >= 50) {
    state = 'neutral';
    barColor = COLOR_PALETTE.warning;
    promptText = "위험을 모니터링 중입니다";
    textColor = '#fff';
  } else {
    state = 'negative';
    barColor = COLOR_PALETTE.danger;
    promptText = "즉각적인 조치가 필요합니다";
    textColor = "#fff";
  }

  return (
    <div style={{ padding: '16px', backgroundColor: '#2a2d3e', borderRadius: '8px' }}>
      <h3>PainGauge</h3>
      
      {/* 바 렌더링 */}
      <div style={{ 
        width: '100%', 
        height: '12px', 
        backgroundColor: '#333', 
        borderRadius: '6px', 
        marginTop: '8px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${riskLevel}%`, 
          height: '100%', 
          backgroundColor: barColor, 
          borderRadius: '6px',
          transition: 'width 0.5s ease-in-out'
        }} />
      </div>

      {/* 행동 유도 문구 */}
      <p style={{ color: textColor, marginTop: '8px', fontSize: '14px' }}>
        {actionPrompt || promptText}
      </p>
    </div>
  );
}