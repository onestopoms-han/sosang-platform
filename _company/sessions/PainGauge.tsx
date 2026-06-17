import React, { useState, useEffect } from 'react';
import { Gauge as GaugeIcon } from 'lucide-react'; // 예시 아이콘 임포트

// --- Type Definitions (명세 기반) ---
interface PainGaugeProps {
  initialScore: number;
  painLevel: 'Low' | 'Medium' | 'High';
  worryLevel: 'Low' | 'Medium' | 'High';
  unitName?: string; // 기본값: "점"
}

// --- Mock API Interface (Trust Widget 연동용) ---
interface TrustWidgetData {
  trustScore: number;
  satisfactionRate: number;
}

const PainGauge: React.FC<PainGaugeProps> = ({ 
  initialScore, 
  painLevel, 
  worryLevel, 
  unitName = "점" 
}) => {
  // --- State Management (명세 기반 상태) ---
  const [score, setScore] = useState(initialScore);
  const [loading, setLoading] = useState(true);

  // --- Mock API 연동 로직 (Trust Widget 연동 시뮬레이션) ---
  
  // 데이터 로드 시뮬레이터 (백엔드에서 실제로 호출되는 API 응답 구조를 모방)
  useEffect(() => {
    const loadMockData = async () => {
      try {
        // 실제 API 호출 예시: const response = await fetch('/api/trust-widget/data');
        
        // Mock 데이터 생성 로직 (백엔드 로직과 연동되는 경우의 예)
        // Pain Level 이 'High' 라면 점수가 자연스럽게 낮아지는 식의 간단한 상관관계 시뮬레이션
        let mockTrustData: TrustWidgetData = {
          trustScore: Math.round(100 - (score * 2)), 
          satisfactionRate: 85,
        };

        if (painLevel === 'High') {
            mockTrustData.trustScore -= 10; // 고통이 높을수록 신뢰도 하락 시뮬레이션
            mockTrustData.satisfactionRate = Math.max(60, mockTrustData.satisfactionRate - 5);
        }

        // 상태 업데이트 (실제 API 연동일 때는 setState 대신 직접 데이터 사용)
        setScore(mockTrustData.trustScore + score / 2); // 점수 반영 시뮬레이션
      } catch (error) {
        console.error("Mock API 연결 실패:", error);
        // 에러 핸들링 로직 (가드 적용)
      } finally {
        setLoading(false);
      }
    };

    loadMockData();
  }, [score, painLevel]); // 의존성 배열: score 이 변경되면 시뮬레이션 재실행

  // --- 컴포넌트 렌더링 로직 (명세 기반 UI) ---
  
  const renderGauge = () => {
    if (loading) return <div className="text-gray-500">로딩 중...</div>;
    
    // 색상 및 시각적 요소 매핑 (Designer 의 Color Palette 적용)
    const painColorMap: Record<string, string> = {
      'Low': '#3CB371',   // Growth Green
      'Medium': '#FFA500', // Warning Orange
      'High': '#E53935',  // Pain Red
    };

    const worryColorMap: Record<string, string> = {
      'Low': '#42A5F5',
      'Medium': '#AB47BC',
      'High': '#EF5350',
    };

    return (
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <GaugeIcon size={24} /> Pain Gauge
        </h2>

        {/* 메인 게이지 UI */}
        <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden mb-4">
          {/* Progress Bar 시뮬레이션 (실제 CSS Grid/Flex 활용) */}
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${painColorMap[painLevel]}`}
            style={{ width: `${Math.min(100, Math.max(10, score))}%` }} // 점수에 따른 바 길이
          />
          
          {/* 현재 수치 표시 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
            {score} {unitName}
          </div>
        </div>

        {/* 레벨 정보 및 상태 */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-md border-l-4" style={{ borderColor: painColorMap[painLevel] }}>
            <span className="text-sm text-gray-500 block">Pain Level</span>
            <span className="font-semibold capitalize">{painLevel}</span>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md border-l-4" style={{ borderColor: worryColorMap[worryLevel] }}>
            <span className="text-sm text-gray-500 block">Worry Level</span>
            <span className="font-semibold capitalize">{worryLevel}</span>
          </div>

          {/* Trust Widget 연동 데이터 미리보기 (Mock Data) */}
          <div className="col-span-2 bg-blue-50 p-3 rounded-md border-l-4 border-blue-300 mt-2">
            <h3 className="text-sm font-bold text-blue-800 mb-1">Trust Widget 연동 데이터 (예시)</h3>
            <div className="flex justify-between text-xs text-gray-600">
              <span>신뢰도 점수: {mockTrustData.trustScore}</span>
              <span>만족도: {mockTrustData.satisfactionRate}%</span>
            </div>
          </div>
        </div>

        {/* 상태 메시지 (명세에 따른 Feedback) */}
        <p className="text-sm text-gray-500 mt-4">
          Pain Level이 {'"High"'}일 경우 신뢰도 점수가 하락하는 경향이 관찰되었습니다.
        </p>
      </div>
    );
  };

  return renderGauge();
};

export default PainGauge;