/**
 * StoryFlowSchema 기반의 데이터 구조 및 상태 관리를 위한 TypeScript 인터페이스.
 * 핵심: 스토리라인 단계(Step)와 각 단계에서 필요한 액션 플랜을 명시합니다.
 */

export type FlowStatus = 'INITIAL' | 'SUCCESS' | 'FAILURE';

// 1. 개별 코칭 단계를 정의하는 스키마
export interface CoachingStep {
    stepId: string; // 고유 ID (예: STEP_01)
    title: string; // 사용자에게 보이는 단계 제목
    description: string; // 이 단계의 주요 내용 설명
    contentSchema: Record<string, any>; // 해당 단계에서 필요한 상세 데이터 구조 (예: 진단지표, 설문 응답 등)
    requiredInputFields: string[]; // 필수 입력 필드 목록
}

// 2. 전체 스토리 흐름을 정의하는 메인 스키마
export interface StoryFlow {
    overallGoal: string; // 서비스의 궁극적인 목표 (예: 손실 최소화)
    steps: CoachingStep[]; // 순서대로 배열된 모든 코칭 단계 목록
    premiumValueProposition?: {
        benefitMessage: string; // Premium 혜택을 감성적으로 전달할 문구
        roiDataTemplate: string; // ROI 계산에 필요한 기본 데이터 구조 정의 (예시)
    }
}

// 3. API 응답 및 상태 관리를 위한 전역 타입
export interface StoryFlowResponse {
    status: FlowStatus; // 현재 흐름의 성공/실패 여부
    data?: StoryFlow; // 성공 시, 전체 스토리 데이터
    error?: {
        code: string; // 오류 코드 (예: INPUT_VALIDATION_FAIL)
        message: string; // 사용자에게 보여줄 메시지 (Designer 가이드라인 반영)
        suggestedAction: string; // 다음 행동 제안 (예: '재진단하기' 버튼 활성화)
    };
}

// 4. 컴포넌트 상태 관리용 타입
export interface StoryFlowState {
    currentStepIndex: number | null;
    isSubmitting: boolean;
    flowData: StoryFlow | null;
}