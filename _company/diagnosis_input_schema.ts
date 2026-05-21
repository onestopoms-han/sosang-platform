export interface DiagnosisInputSchema {
  // 1. 기본 진단 정보 (AI 엔진 입력)
  businessContext: {
    industry: string; // 예: 소상공인, 요식업 등
    painPoints: string[]; // 현재 겪고 있는 핵심 어려움 목록
    currentPerformanceMetrics: Record<string, number>; // 매출, 운영비 등 수치 데이터
  };

  // 2. Action Prescription 요구사항 (핵심 출력 구조)
  actionPrescriptionGoals: {
    goalType: 'Growth' | 'Efficiency' | 'Marketing' | 'Finance'; // 목표 유형 정의
    targetOutcome: string; // 달성하고자 하는 최종 결과 (예: 마케팅 효율 20% 개선)
    requiredActionSteps: Array<{
      stepId: number;
      description: string; // 구체적인 행동 지침
      estimatedEffort: 'Low' | 'Medium' | 'High'; // 예상 노력 수준
      requiredResources: string[]; // 필요한 자원 (예: 광고 예산, 시간)
    }>; // 실행 계획의 단계별 상세 지침

    // 3. ROI 및 수익화 연계 정보 (수익화 유도 핵심)
    potentialImpact: {
      estimatedROI: number; // 예상 투자 대비 수익률 (%)
      timeToAchieve: string; // 목표 달성 예상 시간 (예: 90일)
      monetaryValue: number; // 이 행동을 통해 얻을 수 있는 잠재적 금액 가치
    }
  };

  // 4. 사용자 환경 정보 (Contextualization)
  userProfile: {
    businessType: string; // 소상공인 유형 (예: 식당, 온라인 쇼핑몰)
    currentStage: 'Beginner' | 'Intermediate' | 'Advanced'; // 현재 역량 수준
  };
}