import React from 'react';
import { RiskLevel } from '../types/dashboard';

interface RiskKpiCardProps {
  risk: RiskLevel;
  title: string;
  value: string | number;
}

const RiskKpiCard: React.FC<RiskKpiCardProps> = ({ risk, title, value }) => {
  // Designer의 Red Tone 원칙을 반영하여 동적 스타일 적용
  const cardClasses = `risk-card risk-${risk.color}`;

  return (
    <div className={cardClasses}>
      <h3>{title}</h3>
      <p className="value">{value}</p>
      {risk.level === 'Critical' && (
        <div className="alert-critical">
          🚨 {risk.alertMessage} - 즉시 조치 필요!
        </div>
      )}
    </div>
  );
};

export default RiskKpiCard;