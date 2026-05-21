interface BusinessData {
  // 소상공인 기본 정보 (신뢰 구축 섹션용)
  businessName: string;
  industry: string;
  location: string;
  currentRevenue: number; // 현재 매출 데이터
  targetRevenue: number; // 목표 매출 데이터

  // ROI 계산에 필요한 핵심 입력값 (Input Data for Simulation)
  inputData: {
    costOfGoodsSold: number; // 상품 원가
    operationalExpenses: number; // 운영 비용 (인건비, 임대료 등)
    marketingSpend: number; // 마케팅 지출액
    estimatedGrowthRate: number; // 예상 성장률 (사용자 입력 또는 시뮬레이션 결과 기반)
  };

  // KPI 목표 설정 (Goal Setting Section용)
  kpiGoals: {
    targetAOV: number; // 목표 평균 거래액
    targetProfitMargin: number; // 목표 이익률 (%)
    desiredGrowthMonths: number; // 원하는 성장 기간 (월 단위)
  };

  // 최종 시뮬레이션 결과 (Roadmap 시각화 및 CTA 연결용)
  simulationResult: {
    estimatedROI: number; // 예상 투자 수익률
    growthPath: {
      stageA_Diagnosis: { status: 'completed' | 'pending', details: string };
      stageB_Analysis: { status: 'completed' | 'pending', details: string };
      stageC_Roadmap: { status: 'completed' | 'pending', details: string };
      stageD_Execution: { status: 'completed' | 'pending', details: string };
    };
  };
}

// API 응답에 사용될 최종 데이터 구조
interface SimulationResponse extends BusinessData {
  roadmapStatus: {
    overallStatus: 'success' | 'failure';
    growthMessage: string; // Growth Green 강조 메시지
  };
}