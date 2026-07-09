import React, { useState, useEffect, useMemo } from 'react';

// 타입 정의: 백엔드 응답 스키마를 기반으로 상태와 색상을 관리하기 위함
interface RiskData {
  overall_risk_score: number; // 0 to 100
  risk_tier: 'Low' | 'Medium' | 'High' | 'Critical';
  guidelines: {
    Low: string;
    Medium: string;
    High: string;
    Critical: string;
  };
}

interface RiskGaugeProps {
  initialScore: number; // 초기 점수 (API에서 받을 값)
  isLoading: boolean; // 로딩 상태
}

// 색상 매핑 로직 정의: 불안(Deep Blue) $\rightarrow$ 통제감 회복(Growth Green)의 감성적 흐름 반영
const getColorAndGuideline = (score: number, guidelines: RiskData['guidelines']) => {
  let colorClass = 'bg-gray-400'; // 기본값: 불안/중립 상태
  let message = '데이터 로딩 중...';

  if (score <= 20) {
    // Low Risk: 통제감 회복 시작 (Growth Green 계열)
    colorClass = 'bg-green-500';
    message = guidelines.Low;
  } else if (score <= 50) {
    // Medium Risk: 주의/균형 상태 (Yellow/Amber 계열)
    colorClass = 'bg-yellow-500';
    message = guidelines.Medium;
  } else if (score <= 80) {
    // High Risk: 경고 상태 (Orange/Red 계열)
    colorClass = 'bg-orange-500';
    message = guidelines.High;
  } else {
    // Critical Risk: 심각한 위험 (Deep Red 계열)
    colorClass = 'bg-red-600';
    message = guidelines.Critical;
  }

  return { colorClass, message };
};


const RiskGaugeWidget: React.FC<RiskGaugeProps> = ({ initialScore, isLoading }) => {
  const [currentScore, setCurrentScore] = useState(initialScore);
  const [statusMessage, setStatusMessage] = useState('점수 로딩 중...');

  // 데이터가 성공적으로 로드되면 점수를 업데이트하고 상태 메시지를 설정하는 효과 구현
  useEffect(() => {
    if (!isLoading && initialScore !== undefined) {
      // 실제 환경에서는 이 부분에서 API 호출 결과를 받아와야 하지만, 여기서는 Props로 받은 초기값을 기준으로 시각화 로직을 실행합니다.
      setStatusMessage(`현재 위험 점수: ${initialScore}%`);
    }
  }, [initialScore, isLoading]);

  // 현재 점수에 따른 색상 및 메시지 계산
  const { colorClass, message } = useMemo(() => getColorAndGuideline(currentScore, {
    Low: '최적의 통제감 회복 단계',
    Medium: '균형을 찾고 다음 행동을 계획하세요.',
    High: '즉각적인 리스크 관리가 필요합니다.',
    Critical: '위기 대응 프로토콜을 즉시 실행하세요.',
  }), [currentScore]);

  // 시각적 애니메이션 로직 (점수가 변경될 때 부드러운 변화를 위해)
  const animationClass = currentScore > 50 ? 'animate-pulse' : '';

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg border-t-4 transition-all duration-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex justify-between items-center">
        리스크 게이지: {currentScore}%
        <span className={`text-sm font-semibold px-3 py-1 rounded-full text-white ${colorClass.replace('bg-', 'text-')}`}>
          {message}
        </span>
      </h3>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
          <span className="ml-3 text-lg text-indigo-600">데이터 로딩 중...</span>
        </div>
      ) : (
        <>
          {/* Risk Gauge Visual Representation */}
          <div className={`w-full h-8 bg-gray-200 rounded-full mb-4 overflow-hidden transition-all duration-700 ${colorClass}`}>
            <div 
              className={`h-full transition-all duration-1000 ease-in-out ${animationClass}`} 
              style={{ width: `${currentScore}%` }}
            ></div>
          </div>

          {/* Risk Tier Details */}
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-700 border-b pb-2">현재 위험 등급: <span className={`font-bold ${colorClass.replace('bg-', 'text-')}`}>{statusMessage}</span></p>
            <p className="text-sm text-gray-600">
              {message}
            </p>
          </div>

          {/* Call to Action (다음 행동) */}
          <button 
            className={`mt-6 w-full py-3 font-semibold rounded-lg transition duration-300 shadow-md 
              ${colorClass.replace('bg-', 'text-')} 
              hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={() => console.log(`Action Flow Triggered for score: ${currentScore}`)}
          >
            다음 행동 플로우 시작하기
          </button>
        </>
      )}
    </div>
  );
};

export default RiskGaugeWidget;