import React from 'react';

// ── 위험도 스코어 → 등급 변환 (V3.0 스펙)
export type RiskLevel = 'critical' | 'warning' | 'safe';

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'warning';
  return 'safe';
}

const RISK_CONFIG = {
  critical: {
    label: '위험',
    icon: '🔴',
    bg: 'var(--risk-critical-bg)',
    border: 'var(--risk-critical-border)',
    text: 'var(--risk-critical-text)',
    badge: '위험',
  },
  warning: {
    label: '주의',
    icon: '🟡',
    bg: 'var(--risk-warning-bg)',
    border: 'var(--risk-warning-border)',
    text: 'var(--risk-warning-text)',
    badge: '주의',
  },
  safe: {
    label: '안정',
    icon: '🟢',
    bg: 'var(--risk-safe-bg)',
    border: 'var(--risk-safe-border)',
    text: 'var(--risk-safe-text)',
    badge: '정상',
  },
} as const;

interface TrustWidgetProps {
  score: number;           // 0–100 위험도 스코어
  shopName: string;        // 가게명
  sourceUrl?: string;      // 출처 링크 (선택)
}

export const TrustWidget: React.FC<TrustWidgetProps> = ({
  score,
  shopName,
  sourceUrl,
}) => {
  const level = getRiskLevel(score);
  const cfg = RISK_CONFIG[level];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderLeft: `4px solid ${cfg.text}`,
        borderRadius: '10px',
        gap: '12px',
        transition: 'var(--transition-base)',
        animation: 'fadeIn 0.35s ease both',
      }}
    >
      {/* 왼쪽: 아이콘 + 등급 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <span
          role="img"
          aria-label={`위험도 ${cfg.label}`}
          style={{ fontSize: '1rem', flexShrink: 0 }}
        >
          {cfg.icon}
        </span>
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '2px 10px',
              background: cfg.text,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.7rem',
              borderRadius: '9999px',
              letterSpacing: '0.06em',
              marginBottom: '2px',
            }}
          >
            {cfg.badge}
          </span>
          <div
            style={{
              fontSize: '0.78rem',
              color: 'var(--bds-text-secondary)',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '160px',
            }}
          >
            위험도 스코어: <strong style={{ color: cfg.text }}>{score}%</strong>
          </div>
        </div>
      </div>

      {/* 오른쪽: 출처 링크 */}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.72rem',
            color: 'var(--bds-text-muted)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--bds-forest)')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--bds-text-muted)')}
          title={`${shopName} 위험도 상세 보기`}
        >
          상세 보기 →
        </a>
      )}
    </div>
  );
};

export default TrustWidget;