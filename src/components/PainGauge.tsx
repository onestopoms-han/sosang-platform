import React from 'react';

// Pain Gauge 컴포넌트: Pain Level (고요, 분노 등) 에 따른 시각적 표현
interface PainGaugeProps {
  painLevel?: number; // 0 ~ 100 (또는 'low' | 'medium' | 'high')
}

export const PainGauge: React.FC<PainGaugeProps> = ({ painLevel = 25 }) => {
  const getGaugeStyle = () => {
    if (painLevel < 40) return { backgroundColor: '#2ECC71', color: '#fff' }; // Low
    if (painLevel < 70) return { backgroundColor: '#F39C12', color: '#fff' }; // Medium
    return { backgroundColor: '#E74C3C', color: '#fff', animation: 'pulse 2s infinite' }; // High
  };

  const getLabel = () => {
    if (painLevel < 40) return '고요 / 불안';
    if (painLevel < 70) return '불안 / 고민';
    return '분노 / 절실';
  };

  // 게이지 바 길이 계산 (가상의 100 단위)
  const barWidth = Math.min(100, painLevel * 2); 

  return (
    <div 
      style={{
        position: 'relative',
        height: '40px',
        width: '300px',
        backgroundColor: '#f5f5f5',
        borderRadius: '20px',
        overflow: 'hidden',
        border: `1px solid #ddd`,
      }}
    >
      <div 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${barWidth}%`,
          ...getGaugeStyle(),
          transition: 'width 0.5s ease-in-out',
        }}
      />

      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          zIndex: 2,
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        {getLabel()}
      </div>

      <div 
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontWeight: 700,
          fontSize: '16px',
        }}
      >
        {painLevel}%
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};