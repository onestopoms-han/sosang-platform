import React, { useState, useEffect, useMemo } from 'react';
import { useDashboardData } from '../hooks/useDashboardData'; // 가정: 데이터 훅에서 데이터를 가져옴
import { TransitionAnimation } from '../animations/MotionSpec'; // 가정: Designer가 제공한 애니메이션 Spec

interface StateTransitionCardProps {
  initialState: 'Blue_Crisis' | 'Amber_Recovery' | 'Gold_Mastery';
  data: {
    risk_level: string;
    uncertainty_reduction_score: number;
    current_state: 'Blue_Crisis' | 'Amber_Recovery' | 'Gold_Mastery';
    transition_progress: number;
  };
}

const StateTransitionCard: React.FC<StateTransitionCardProps> = ({ initialState, data }) => {
  const [currentState, setCurrentState] = useState(initialState);

  // 데이터 수신 시 현재 상태 업데이트 및 애니메이션 트리거 로직
      useEffect(() => {
    if (data.current_state !== currentState) {
      setCurrentState(data.current_state);
    }
  }, [data.current_state, currentState]);

  // Motion Spec 기반으로 실제 애니메이션 클래스/파라미터 결정
  const motionSpec = useMemo(() => {
    switch (currentState) {
      case 'Blue_Crisis':
        return TransitionAnimation.DeepBlueToAmber; // 위기에서 회복으로의 전환 시작
      case 'Amber_Recovery':
        return TransitionAnimation.AmberToGold; // 회복 단계에서의 안정감 표현
      case 'Gold_Mastery':
        return TransitionAnimation.GoldStabilize; // 최종 통제권 회복 상태
      default:
        return TransitionAnimation.Default;
    }
  }, [currentState]);

  // UI 렌더링 로직 (실제 CSS/Motion 적용은 MotionSpec에 의존)
  const statusClass = `state-${currentState}`;

      return (
    <div className={`transition-card ${statusClass}`}>
      <h3 className="text-xl font-bold">현재 상태: {currentState}</h3>
      <p>불확실성 감소율: {(data.uncertainty_reduction_score * 100).toFixed(1)}%</p>

      {/* Motion Spec 기반의 시각적 효과 적용 */}
      <div className={`motion-effect ${motionSpec}`}>
        {currentState === 'Blue_Crisis' && <div className="bg-blue-600 animate-pulse">위기 상태 (Deep Blue)</div>}
        {currentState === 'Amber_Recovery' && <div className="bg-amber-400 animate-fadeIn">회복 중 (Amber)</div>}
        {currentState === 'Gold_Mastery' && <div className="bg-yellow-500 animate-spin-slow">통제권 회복 (Gold)</div>}
      </div>

      <p className="mt-4 text-sm text-gray-600">다음 액션: {data.action_blueprint_completion > 0.8 ? '최적화 단계' : '진단 심화'}</p>
    </div>
  );
};

export default StateTransitionCard;