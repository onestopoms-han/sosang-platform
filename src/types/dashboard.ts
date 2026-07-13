interface RiskLevel {
  level: 'Critical' | 'Caution' | 'Stable';
  color: 'red' | 'yellow' | 'green'; // Designer의 Color Palette 적용
  alertMessage: string; // Critical일 때 표시될 핵심 경고 메시지
}

interface PLRIData {
  score: number;
  level: RiskLevel['level'];
  details: Record<string, any>; // 세부 리스크 항목 (예: 재무, 운영, 마케팅)
}

interface SolutionPackage {
  id: string;
  name: string;
  cost: number;
  benefit: string; // premium_benefit에 해당
  actionType: 'Coaching' | 'Consulting';
}

interface DashboardState {
  riskData: PLRIData;
  storyFlow: {
    currentStep: number;
    nextAction: string;
    requiredGuidance: string;
  };
  availablePackages: SolutionPackage[];
}