// src/types/diagnosis.ts
/**
 * @description 진단 서비스 API 요청 및 응답을 위한 타입 정의서 (Pydantic/TypeScript Contract)
 * 이 파일은 프론트와 백엔드가 지켜야 할 데이터의 계약서를 역할합니다.
 */

export type LossCategory = '운영비효율' | '디지털전환부재' | '마케팅성과미흡';

/**
 * @description 사용자가 진단 요청을 보낼 때 필요한 입력 데이터 스키마
 * 이 필드들은 랜딩 페이지의 폼(Form)에서 수집되어야 합니다.
 */
export interface DiagnosisInput {
    // 필수 정보: 소상공인의 사업 유형 및 규모를 파악하여 진단의 기초 데이터를 확보합니다.
    businessSector: string; // 예: 식음료, 의류, 서비스 등
    annualRevenueEstimate?: number; // 연간 추정 매출액 (숫자)
    operationalStaffCount: number; // 상주 인원 수
    currentChallengeFocus: LossCategory; // 현재 가장 심각하게 느끼는 손실 유형
}

/**
 * @description 진단 엔진이 반환하는 결과 데이터 스키마
 * 이 데이터를 기반으로 랜딩 페이지의 '결과 섹션'을 렌더링합니다.
 */
export interface DiagnosisResult {
    success: boolean; // 요청 성공 여부
    diagnosisId: string; // 고유한 진단 식별자 (추적용)
    estimatedPotentialLossAmount: number; // 잠재 손실액 (가장 강조되어야 할 숫자)
    lossDetailBreakdown: Record<LossCategory, {
        description: string; // 해당 리스크에 대한 설명
        potentialCost: number; // 추정 비용 (예: 월 평균 250만원)
        mitigationScore?: number; // 현재 상태 대비 개선 가능성 점수 (1~100)
    }>;
    recommendedActionPlanSummary: string; // 가장 우선순위가 높은 액션 플랜 요약문
}

/**
 * @description API 호출 실패 시 발생하는 오류 구조 정의
 */
export interface ApiError {
    errorCode: number;
    message: string;
    field?: string; // 어떤 필드에서 에러가 났는지 지정 (유효성 검증용)
}