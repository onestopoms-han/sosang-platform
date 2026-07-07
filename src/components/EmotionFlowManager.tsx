import React, { useState, useEffect, useCallback } from 'react';
import { interpolate } from '../utils/easing'; // Easing 함수가 정의된 유틸리티 파일 가정
import { calculateTransition } from '../utils/transitionLogic'; // 상태 전환 로직이 정의된 파일 가정

interface EmotionFlowState {
  currentEmotion: 'Pain' | 'Relief' | 'Control';
  status: 'Pending' | 'Active' | 'Complete';
  guidanceFlag: string; // API로부터 받는 감성 안내 플래그 (A, B, C 등)
  kpiData: { riskScore: number; timeSaved: number };
}

interface EmotionFlowManagerProps {
  initialKpiData: { riskScore: number; timeSaved: number };
  guidanceFlag: string;
}

const EmotionFlowManager: React.FC<EmotionFlowManagerProps> = ({ initialKpiData, guidanceFlag }) => {
  const [state, setState] = useState<EmotionFlowState>({
    currentEmotion: 'Pain',
    status: 'Pending',
    guidanceFlag: guidanceFlag || 'A', // 기본값 설정
    kpiData: initialKpiData,
  });

  // KPI 및 플래그에 따른 감성 상태 계산 로직
  const calculateFlow = useCallback((flag: string, kpis: { riskScore: number; timeSaved: number }) => {
    let nextEmotion: 'Pain' | 'Relief' | 'Control';
    let easing: 'easeInOutSine' | 'easeOutCubic' | 'easeInElastic';

    // 1. Guidance_Flag에 따른 기본 상태 결정 (API 기반)
    switch (flag) {
      case 'A': // Low Risk / Quick Win
        nextEmotion = 'Relief';
        easing = 'easeOutCubic';
        break;
      case 'B': // Moderate Risk / Action Needed
        nextEmotion = 'Pain';
        easing = 'easeInOutSine';
        break;
      case 'C': // High Risk / Control Required
        nextEmotion = 'Control';
        easing = 'easeInElastic';
        break;
      default:
        nextEmotion = 'Pain';
        easing = 'easeInOutSine';
    }

    // 2. KPI 기반 동적 보정 (감성 증폭)
    // riskScore가 높을수록 Pain 구간의 강도를 강조하고, timeSaved가 높을수록 Relief/Control로 빠르게 전환하도록 조정
    const transitionFactor = kpis.riskScore > 70 ? 1.5 : 1; // 위험도가 높으면 전환 속도 가속화
    
    return { emotion: nextEmotion, easing: easing, factor: transitionFactor };
  }, []);

  // 상태 업데이트 및 애니메이션 적용 로직 (실제 UI 구현 시)
  useEffect(() => {
    const flowResult = calculateFlow(state.guidanceFlag, state.kpiData);
    
    setState(prevState => ({
      ...prevState,
      currentEmotion: flowResult.emotion,
      status: 'Active',
      // 실제 CSS Transition에 사용될 값 (이 부분은 실제 스타일 객체로 변환되어야 함)
      transitionEasing: flowResult.easing, 
      transitionFactor: flowResult.factor,
    }));
  }, [state.guidanceFlag, state.kpiData, calculateFlow]);

  return (
    <div className={`emotion-flow-manager ${state.currentEmotion.toLowerCase()}`}>
      <h2>{state.currentEmotion} Flow</h2>
      <p>Guidance: {state.guidanceFlag}</p>
      <div style={{ 
        transition: `all 0.8s ease-in-out`, // 실제 CSS transition은 이 값들을 기반으로 설정됨
        backgroundColor: state.currentEmotion === 'Pain' ? '#F48D52' : state.currentEmotion === 'Relief' ? '#64B5F6' : '#48BB78',
        color: '#fff',
        padding: '20px',
        borderRadius: '10px'
      }}>
        {state.currentEmotion === 'Pain' && <p>불안 상태 - {state.kpiData.riskScore}% 위험</p>}
        {state.currentEmotion === 'Relief' && <p>안도 상태 - 시간 절약 효과: {state.kpiData.timeSaved}h</p>}
        {state.currentEmotion === 'Control' && <p>통제권 회복 - 다음 행동 지침을 확인하세요!</p>}
      </div>
    </div>
  );
};

export default EmotionFlowManager;