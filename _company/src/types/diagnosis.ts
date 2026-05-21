interface ActionPrescription {
  step: number;
  title: string;
  description: string;
  actionableInsight: string; // 사용자가 취해야 할 구체적인 행동
}

interface DiagnosisReportData {
  diagnosisId: string;
  inputSchema: any; // diagnosis_input_schema.ts에서 정의된 스키마를 참조할 부분
  actions: ActionPrescription[];
  summary: string;
  visualizationData: any; // ROI 시뮬레이션 결과 등 시각화 데이터
}

interface DiagnosisInput {
  // diagnosis_input_schema.ts 기반으로 실제 입력 필드를 정의해야 함
  vendorName: string;
  locationDetails: string;
  painPoints: string[];
  desiredAction: string;
}