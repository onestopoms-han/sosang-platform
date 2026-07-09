import React, { useState, useEffect, useCallback } from 'react';

// 타입 정의 (API 스키마 및 UX 흐름 기반)
type PainState = 'Anxiety' | 'Relief' | 'Control';

interface PainGaugeProps {
  initialData: {
    painScore: number; // 0-100 범위의 초기 불안 점수
    stage: PainState; // 현재 상태 (Anxiety, Relief, Control)
    progress?: number; // 애니메이션 진행률 (0.0 ~ 1.0)
  };
  animationParams: {
    [key: string]: any; // Designer에서 정의된 Easing Curve 및 기타 파라미터
  };
}

const PainGauge: React.FC<PainGaugeProps> = ({ initialData, animationParams }) => {
  const [currentState, setCurrentState] = useState<PainState>(initialData.stage);
  const [progress, setProgress] = useState(0); // 0에서 1까지의 진행률

  // 데이터가 변경될 때 상태와 진행률 업데이트 로직
  useEffect(() => {
    if (currentState === 'Anxiety') {
      setProgress(initialData.progress || 0);
    } else if (currentState === 'Relief') {
      // 불안에서 안도로의 전환 시뮬레이션
      setProgress(1 - initialData.progress || 0);
    } else if (currentState === 'Control') {
      // 안도에서 통제권 회복으로의 전환 시뮬레이션
      setProgress(initialData.progress || 1);
    }
  }, [currentState, initialData.progress]);

  // 외부로부터 상태를 받아 강제로 업데이트하는 함수 (API 연동용)
  const updateState = useCallback((newState: PainState, newProgress: number) => {
    setCurrentState(newState);
    setProgress(newProgress);
  }, []);


  // 시각적 표현을 위한 스타일 및 애니메이션 로직 (Designer의 파라미터 적용)
  const gaugeStyle: React.CSSProperties = {
    transition: 'all 0.8s ease-in-out', // 기본 전환 속도
    transform: `scale(${(progress * 100)}%)`,
    backgroundColor: currentState === 'Anxiety' ? '#ff6b6b' : 
                      currentState === 'Relief' ? '#4ecdc4' : 
                      '#6b6b6b',
    boxShadow: `0 0 20px ${currentState === 'Anxiety' ? 'rgba(255, 107, 107, 0.8)' : currentState === 'Relief' ? 'rgba(78, 205, 196, 0.8)' : 'rgba(107, 107, 107, 0.8)'}`,
    width: '100%',
    height: '300px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  // Designer에서 정의된 Easing Curve 및 파라미터 적용 (예시)
  const animationClass = `pain-gauge-${currentState}`;


  return (
    <div className={`pain-gauge ${animationClass}`} style={gaugeStyle}>
      {/* 중앙 텍스트는 현재 상태를 명확히 표시 */}
      <div style={{ marginBottom: '10px' }}>
        Pain Journey: {currentState}
      </div>
      {/* 진행률 시각화 (실제 애니메이션은 CSS transition에 의해 제어됨) */}
      <div style={{ width: '80%', height: '40px', backgroundColor: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progress}%`, 
            backgroundColor: currentState === 'Anxiety' ? '#ff6b6b' : (currentState === 'Relief' ? '#4ecdc4' : '#6b6b6b'),
            transition: `width 0.8s cubic-bezier(${animationParams.easingCurve || 'ease-in-out'})` // 핵심 애니메이션 적용
          }}
        />
      </div>
    </div>
  );
};

export default PainGauge;