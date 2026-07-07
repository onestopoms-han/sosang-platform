/**
 * Emotion Flow Manager API Data Models
 * 기반: Pain $\to$ Relief $\to$ Control 상태 머신 로직 지원
 */

// 1. 진단 입력 데이터 (Pain Score 계산기용)
export interface SMEInputData {
  ownerName: string; // 소상공인 이름 또는 식별자
  financialRiskScore: number; // 재무적 위험 점수 (0-100)
  timeConstraintIndex: number; // 시간 제약 지수 (0-100)
  uncertaintyLevel: number; // 불확실성 수준 (0-100)
  currentEmotionState: 'Pain' | 'Relief' | 'Control'; // 현재 감정 상태
}

// 2. 상태 전환 요청 데이터 (상태 전환 로직 검증기용)
export interface TransitionRequest {
  fromState: SMEInputData['currentEmotionState']; // 시작 상태
  toState: SMEInputData['currentEmotionState'];     // 목표 상태
  contextualMetrics: {
    painReductionMetric: number; // Pain Score 감소 정도 (%)
    actionCompletionRate: number; // 실행 완료율 (%)
    timeElapsed: number;         // 경과 시간 (분)
  };
}

// 3. 액션 블루프린트 출력 데이터 (Action Blueprint 생성 API용)
export interface ActionBlueprint {
  blueprintId: string;
  summary: string; // 요약 제목
  steps: {
    stepNumber: number;
    description: string; // 구체적인 행동 지침
    requiredAction: 'Research' | 'Implement' | 'Analyze' | 'Execute'; // 요구되는 행동 유형
    estimatedTime: number; // 예상 소요 시간 (분)
    successCondition: string; // 성공 판단 기준 (예: "ROI > 10%")
  }[];
  requiredMetrics: {
    targetPainReduction: number; // 목표 Pain Score 감소치
    targetActionCompletionRate: number; // 목표 실행 완료율
  };
}

// API 응답 예시를 위한 더미 데이터 구조 (JSON Schema의 실제 출력 형태)
export interface ApiResponse {
  status: 'success' | 'error';
  data: any; // 실제 결과물에 따라 유연하게 사용될 수 있음
  message?: string;
  error?: string;
}