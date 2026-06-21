// types.ts — TrustWidget 과 PainGauge 의 타입 정의 (V3.0 반영)

export type TrustLevel = 'low' | 'medium' | 'high';

export interface TrustWidgetProps {
  trustScore: number; // 1~5 점
  level?: TrustLevel; // 상태별 레벨 (디자인 명세에 따라 매핑)
}

// 색상 매핑 (Deep Blue 기반)
export const trustColorMap: Record<TrustLevel, string> = {
  low: '#007bff',    // 파랑 (신뢰도 낮음)
  medium: '#17a2b8', // 연한 청록 (신뢰도 중)
  high: '#2e8bc0',   // 진한 남색 (신뢰도 높음 — Deep Blue)
};

// 신호등 로직 (PainGauge 관련)
export type CrisisLevel = 'green' | 'yellow' | 'red';

export interface PainGaugeProps {
  crisisIndicators: Array<{
    type: 'inventory' | 'priceFluctuation';
    value: number; // 중립점 기준 -100 ~ 100
  }>;
}

// 위기 수준 계산 로직 (간단한 예제)
export function calculateCrisisLevel(indicators: Array<{ type: string; value: number }>): CrisisLevel {
  const criticalValue = -80; // 재고 부족 기준
  let lowest = Infinity;
  
  indicators.forEach(({ type, value }) => {
    if (type === 'inventory' && value < criticalValue) {
      lowest = Math.min(lowest, value);
    } else if (type === 'priceFluctuation' && value < -10) {
      lowest = Math.min(lowest, value * 2); // 가격 하락은 더 큰 위험으로 간주
    }
  });

  if (lowest >= criticalValue || lowest > 50) return 'green';
  if (lowest >= criticalValue - 30 && lowest <= criticalValue + 10) return 'yellow';
  return 'red';
}