/**
 * Trust Widget 컴포넌트 (BDS_Design_System V1.0 적용)
 * - Red/Yellow/Green 스케일 기반 신뢰도 시각화
 * - 상태 전환 애니메이션 연동 (CSS transition 포함)
 */

import React, { useEffect, useState } from 'react';
import './TrustWidget.css'; // 스타일 파일이 별도로 생성됨

interface TrustWidgetProps {
  trustScore: number; // 0.0 ~ 1.0
  label?: string;
}

export const TrustWidget: React.FC<TrustWidgetProps> = ({ trustScore, label }) => {
  // 상태 기반 색상 클래스 결정 (임계값: 0.3 Red -> 0.7 Yellow -> Green)
  const getTrustColorClass = (score: number): string => {
    if (score <= 0.3) return 'bg-trust-red';
    if (score < 0.7) return 'bg-trust-yellow';
    return 'bg-trust-green';
  };

  // 현재 색상 클래스
  const colorClass = getTrustColorClass(trustScore);

  // 애니메이션 상태 (최초 렌더링 시 스냅백 방지)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`trust-widget ${colorClass} ${mounted ? 'fade-in' : ''}`}>
      <span className="widget-label">{label}</span>
      <div className="widget-bar">
        <div 
          className="widget-fill" 
          style={{ width: `${trustScore * 100}%` }} 
          aria-valuenow={trustScore}
          role="progressbar"
        ></div>
      </div>
    </div>
  );
};

/**
 * Trust Widget 스타일 (CSS) - BDS_Design_System 적용
 */