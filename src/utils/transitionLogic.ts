export function calculateTransition(flag: string, kpis: { riskScore: number; timeSaved: number }): { emotion: 'Pain' | 'Relief' | 'Control', easing: string, factor: number } {
  // 이 함수는 EmotionFlowManager에서 호출되어 최종 흐름을 결정합니다.
  if (flag === 'A') {
    return { emotion: 'Relief', easing: 'easeOutCubic', factor: 1 };
  } else if (flag === 'B') {
    return { emotion: 'Pain', easing: 'easeInOutSine', factor: 1.2 }; // 위험도가 있으면 약간 더 느리게 불안감을 표현
  } else if (flag === 'C') {
    return { emotion: 'Control', easing: 'easeInElastic', factor: 1.5 }; // 통제권 회복은 탄력적으로
  }
  return { emotion: 'Pain', easing: 'easeInOutSine', factor: 1 };
}