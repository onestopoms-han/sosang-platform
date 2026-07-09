import React, { useState } from 'react';
import PainGauge from './components/PainGauge';

// Mock 데이터 및 설정 (실제 API 호출을 대체)
const initialData = {
  painScore: 75, // 초기 불안 점수
  stage: 'Anxiety', // 시작 상태
  progress: 0.2, // 초기 진행률
};

const animationParams = {
  easingCurve: 'cubic-bezier(0.4, 0, 0.2, 1)', // Designer에서 정의된 Easing Curve 예시
};

function App() {
  const [data, setData] = useState(initialData);

  // 시뮬레이션 함수: 상태 전환 및 진행률 업데이트
  const simulateJourney = (newState: 'Anxiety' | 'Relief' | 'Control', newProgress: number) => {
    setData(prevData => ({
      ...prevData,
      stage: newState,
      progress: newProgress,
    }));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>PainGauge v2.0 Prototype</h1>
      <p>현재 상태: {data.stage}</p>
      <hr />
      {/* PainGauge 컴포넌트 렌더링 */}
      <PainGauge 
        initialData={{ painScore: data.painScore, stage: data.stage, progress: data.progress }} 
        animationParams={animationParams}
      />
      <div style={{ marginTop: '30px' }}>
        <h2>시뮬레이션 컨트롤</h2>
        <button onClick={() => simulateJourney('Relief', 0.5)}>불안 $\to$ 안도 (50% 전환)</button>
        <button onClick={() => simulateJourney('Control', 1.0)}>안도 $\to$ 통제권 회복 (완료)</button>
      </div>
    </div>
  );
}

export default App;