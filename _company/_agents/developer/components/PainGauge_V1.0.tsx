<create_content>/**
 * Pain Gauge Component v1.0
 * 
 * Displays a gauge that shows the Safety Margin (SM) score and corresponding pain_level.
 * Color-coded: red for critical, yellow for warning, green for normal.
 */

import React from 'react';

// Default mock data when API is unavailable
const defaultMockData = {
  sm_score: 72.5,
  pain_level: 'warning',
};

interface PainGaugeProps {
  /** SM score (0–100) – can be null to show placeholder */
  smScore?: number | null;
  /** PAIN level string – should match API response */
  painLevel?: string | null;
}

// Scale thresholds from API spec v1.0
const SCALE = {
  critical: { threshold: 30, color: '#FF4500', label: 'Critical' },
  warning:  { threshold: 70, color: '#FFFF00', label: 'Warning' },
  normal:   { threshold: null,   color: '#00C851', label: 'Normal' },
};

/**
 * Determine the gauge state from SM score (0–100)
 */
function getGaugeState(score: number): { level: string; color: string; label: string } | null {
  if (score === null || isNaN(score)) return null;
  
  // Use thresholds: critical <30, warning 30-70, normal >70
  const isCritical = score < 30;
  const isWarning = score >= 30 && score <= 70;
  
  if (isCritical) return { level: 'critical', color: '#FF4500', label: 'Critical' };
  if (isWarning) return { level: 'warning', color: '#FFFF00', label: 'Warning' };
  return { level: 'normal', color: '#00C851', label: 'Normal' };
}

/**
 * Gauge Component
 */
export const PainGauge: React.FC<PainGaugeProps> = ({ smScore, painLevel }) => {
  // If no score provided, show placeholder UI
  if (smScore === undefined || painLevel === undefined) {
    return (
      <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <p>No data available. Connect to the API endpoint `/kpi/safety-margin`.</p>
        <p>Use mock data from `mock_kpi_response.json` for offline testing.</p>
      </div>
    );
  }

  const state = getGaugeState(smScore);
  
  // If state is null (invalid score), fallback to placeholder
  if (!state) {
    return <div>Invalid data. Check API response format.</div>;
  }

  // Compute progress: percentage from minimum threshold to maximum (100)
  const minThreshold = 30; // lowest warning
  const maxScore = 100;
  const progress = Math.min(Math.max((smScore - minThreshold) / (maxScore - minThreshold), 0), 1);

  return (
    <div style={{ maxWidth: '400px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Safety Margin Gauge</h3>
      
      {/* SVG-based gauge */}
      <svg width="100%" height="256" viewBox="0 0 400 256">
        {/* Background arc (full circle) */}
        <path d="M 200,80 a 120,120 0 1,1 0,240 a 120,120 0 1,1 0,-240" 
              fill="none" stroke="#e0e0e0" strokeWidth="16" />
        
        {/* Progress arc */}
        <path d={`M ${200 - 120},80 a 120,120 0 1,0 ${((progress * Math.PI) / (Math.PI)) * 240},0`} 
              fill="none" stroke={state.color} strokeWidth="16" />
        
        {/* Label */}
        <text x="200" y="50" textAnchor="middle" fontSize="16" fontWeight="bold">
          {smScore.toFixed(1)} / 100
        </text>
        
        {/* Status label */}
        <text x="200" y="300" textAnchor="middle" fontSize="14" 
              fill={state.color}>
          {state.label}
        </text>
      </svg>

      {/* Additional info below gauge */}
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: state.color, fontWeight: 'bold' }}>{state.label}</span>
        <span style={{ fontSize: '12px', color: '#666' }}>v{require('os').hostname()}</span>
      </div>
    </div>
  );
};

export default PainGauge;
</create_content>