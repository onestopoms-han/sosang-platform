import React, { useState } from 'react';
import { RiskGradeColorMap } from '../utils/constants';

// Trust Widget 컴포넌트: 리스크 등급 (A/B/C) 에 따른 신뢰도 표시
interface TrustWidgetProps {
  riskGrade?: string; // 'A' | 'B' | 'C'
}

export const TrustWidget: React.FC<TrustWidgetProps> = ({ riskGrade = 'A' }) => {
  const getRiskColor = () => {
    return RiskGradeColorMap[riskGrade as keyof typeof RiskGradeColorMap] || '#ccc';
  };

  // 신뢰도 텍스트 및 아이콘 매핑
  const trustData = {
    A: { label: '높음', icon: '🛡️', color: '#2ECC71' },
    B: { label: '보통', icon: '⚠️', color: '#F1C40F' },
    C: { label: '낮음', icon: '🔥', color: '#E74C3C' },
  };

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        backgroundColor: `${getRiskColor()}20`, // 반투명 배경
        borderLeft: `4px solid ${getRiskColor()}`,
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span role="img" aria-label={`리스크 등급 ${riskGrade}`}>{trustData[riskGrade as keyof typeof trustData]?.icon}</span>
        <span 
          style={{ color: getRiskColor(), fontWeight: 600 }}
          title={`${riskGrade} 급 리스크`}
        >
          {trustData[riskGrade as keyof typeof trustData]?.label} 신뢰도
        </span>
      </div>

      <a 
        href="https://example.com/trust-source" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ fontSize: '12px', color: '#666' }}
      >
        출처 확인하기 →
      </a>
    </div>
  );
};