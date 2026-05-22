import { DiagnosisInput, DiagnosisResult, ApiError } from '../types/diagnosis';

/**
 * @description 진단 서비스의 핵심 로직을 캡슐화하는 모듈.
 * 실제로는 FastAPI 백엔드와 통신하며 복잡한 비즈니스 로직(AI 모델 호출 등)이 수행됩니다.
 */
export const getDiagnosisResult = async (input: DiagnosisInput): Promise<DiagnosisResult> => {
    // 💡 TODO: 여기에 실제 API 호출 로직 (e.g., axios.post('/api/v1/diagnose', input)) 이 들어갑니다.

    if (!input.annualRevenueEstimate || input.annualRevenueEstimate < 1000) {
        throw new Error("유효한 연매출액 추정치가 필요합니다."); // 임시 예외 처리
    }

    // [테스트용 더미 데이터 반환] - 실제 백엔드 테스트 시 이 부분이 대체됩니다.
    console.log(`[Mock Diagnosis Engine]: ${input.businessSector} 사업에 대한 진단 시작...`);
    await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

    return {
        success: true,
        diagnosisId: `DIAG-${Date.now()}`,
        estimatedPotentialLossAmount: Math.floor(Math.random() * 1000000) + 500000, // 50만원 ~ 150만원 사이 임의 손실액
        lossDetailBreakdown: {
            '운영비효율': {
                description: "재고 관리 비효율로 인한 월간 재료 폐기 리스크가 높습니다.",
                potentialCost: Math.floor(Math.random() * 1000) + 50, // 5만원 ~ 100만원 사이 비용
            },
            '디지털전환부재': {
                description: "온라인 채널 최적화 부족으로 잠재 고객 접근성이 낮습니다.",
                potentialCost: Math.floor(Math.random() * 300) + 50, // 5만원 ~ 35만원 사이 비용
            },
            '마케팅성과미흡': {
                description: "광고비를 집행해도 성과 추적이 안 되는 구조입니다.",
                potentialCost: Math.floor(Math.random() * 200) + 50, // 5만원 ~ 25만원 사이 비용
            }
        },
        recommendedActionPlanSummary: "가장 먼저 재고 관리 시스템 도입을 통해 잠재 손실액을 줄이는 것이 시급합니다."
    };
};

// 에러 처리 예시 함수 (API 호출 실패 대응)
export const handleDiagnosisError = (error: Error): ApiError => {
    console.error("진단 API 호출 중 오류 발생:", error);
    return {
        errorCode: 400,
        message: `진단 요청 처리에 문제가 생겼습니다. (${error.message})`,
        field: 'diagnosisInput'
    };
}