import React, { useEffect, useRef, useState } from 'react';
import { getRiskLevel, type RiskLevel } from './TrustWidget';

// ── 상태 정의
type PainState = 'Anxiety' | 'Relief' | 'Control';

// ── 위험도 → 게이지 색상
const GAUGE_COLORS: Record<RiskLevel, { solid: string; glow: string; label: string }> = {
  critical: { solid: 'var(--risk-critical-solid)', glow: 'var(--risk-critical-glow)', label: '위험' },
  warning:  { solid: 'var(--risk-warning-solid)',  glow: 'var(--risk-warning-glow)',  label: '주의' },
  safe:     { solid: 'var(--risk-safe-solid)',      glow: 'var(--risk-safe-glow)',      label: '안정' },
};

// ── 상태 → PainState 매핑 (score 기반)
function scoreToState(score: number): PainState {
  if (score >= 80) return 'Anxiety';
  if (score >= 60) return 'Relief';
  return 'Control';
}

// ── SVG 원형 게이지 계산
const SIZE = 52;
const STROKE = 5;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

interface PainGaugeProps {
  score: number;           // 0–100 위험도 스코어
  animated?: boolean;      // 실시간 애니메이션 여부
  size?: number;           // px 단위 크기 (기본 52)
}

const PainGauge: React.FC<PainGaugeProps> = ({ score, animated = false, size = SIZE }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const animRef = useRef<number | null>(null);
  const prevScore = useRef(0);

  // 점수 변경 시 숫자 카운트업 애니메이션
  useEffect(() => {
    const start = prevScore.current;
    const end = score;
    const duration = 600;
    const startTime = performance.now();

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        prevScore.current = end;
      }
    };

    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [score]);

  const level = getRiskLevel(score);
  const cfg = GAUGE_COLORS[level];
  const strokeDashoffset = CIRCUMFERENCE * (1 - score / 100);

  // size 비율 계산
  const s = size;
  const stroke = STROKE * (s / SIZE);
  const r = (s - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const fontSize = s * 0.28;

  return (
    <div
      style={{ position: 'relative', width: s, height: s, flexShrink: 0 }}
      title={`위험도: ${score}% (${cfg.label})`}
    >
      <svg
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* 배경 트랙 */}
        <circle
          cx={s / 2}
          cy={s / 2}
          r={r}
          fill="none"
          stroke="#E8E2D9"
          strokeWidth={stroke}
        />
        {/* 진행 아크 */}
        <circle
          cx={s / 2}
          cy={s / 2}
          r={r}
          fill="none"
          stroke={cfg.solid}
          strokeWidth={stroke}
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s ease',
            filter: animated ? `drop-shadow(0 0 4px ${cfg.solid})` : 'none',
          }}
        />
      </svg>

      {/* 중앙 숫자 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: 800,
            color: cfg.solid,
            lineHeight: 1,
            fontFamily: 'Inter, sans-serif',
            transition: 'color 0.4s ease',
          }}
        >
          {displayScore}
        </span>
        <span
          style={{
            fontSize: `${fontSize * 0.55}px`,
            color: 'var(--bds-text-muted)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          %
        </span>
      </div>

      {/* 위험 시 pulse ring */}
      {level === 'critical' && (
        <div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: `2px solid var(--risk-critical-solid)`,
            opacity: 0.3,
            animation: 'pulse-ring 2s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default PainGauge;