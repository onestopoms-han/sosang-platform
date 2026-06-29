/**
 * Pain Gauge 컴포넌트 (BDS_Design_System V1.0 적용)
 * - Red/Yellow/Green 스케일 기반 위험도 시각화
 * - 사용자 참여 유도형 인터랙션预留
 */

import React, { useEffect, useState } from 'react';
import './PainGauge.css'; // 스타일 파일이 별도로 생성됨

interface PainGaugeProps {
  painScore: number; // 0.0 ~ 1.0 (위험도: 낮음=0, 높음=1)
  label?: string;
}

export const PainGauge: React.FC<PainGaugeProps> = ({ painScore, label }) => {
  const getPainColorClass = (score: number): string => {
    if (score <= 0.3) return 'bg-pain-green'; // 안전 영역
    if (score < 0.7) return 'bg-pain-yellow'; // 경고 영역
    return 'bg-pain-red'; // 위험 영역
  };

  const colorClass = getPainColorClass(painScore);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`pain-gauge ${colorClass} ${mounted ? 'fade-in' : ''}`}>
      <span className="gauge-label">{label}</span>
      <svg viewBox="0 0 120 60" className="gauge-svg">
        {/* 배경圆弧 */}
        <path d="M 5,30 A 25,25 0 0,1 115,30" fill="none" stroke="#e0e0e0" strokeWidth="8" strokeLinecap="round"/>
        {/* 진행圆弧 (동적) */}
        <path 
          d={`M 5,30 A 25,25 ${painScore * 180} 0 0,1 ${115 - Math.sin(painScore * Math.PI).toFixed(4) * 25},${30 - Math.cos(painScore * Math.PI).toFixed(4) * 25}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinecap="round"
          className="gauge-path"
        />
        {/* 포인트 (위험도 표시) */}
        <circle cx={10 + Math.sin(painScore * Math.PI).toFixed(4) * 25} cy={30 - Math.cos(painScore * Math.PI).toFixed(4) * 25} r="4" fill="#ffffff" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
  );
};

/**
 * Pain Gauge 스타일 (CSS) - BDS_Design_System 적용
 */