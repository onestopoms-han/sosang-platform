// KPI 및 ROI 계산 로직 구현 시작 (TypeScript)

interface RoiData {
    revenue: number;
    cost: number;
}

/**
 * ROI를 시뮬레이션하는 함수. 데이터 무결성 검증 포함.
 * @param data - 수익과 비용 데이터 객체
 * @returns ROI 백분율 및 CLV 추정치
 */
export function calculateRoiAndLTV(data: RoiData): { roi: number; clv: number; isValid: boolean } {
    // 1. 데이터 무결성 검증 (Validation)
    if (typeof data.revenue !== 'number' || typeof data.cost !== 'number' || data.revenue < 0 || data.cost < 0) {
        console.error("Data Integrity Error: Revenue or Cost is not a positive number.");
        return { roi: 0, clv: 0, isValid: false };
    }

    // 2. ROI 계산 (ROI Simulation)
    const roi = ((data.revenue - data.cost) / data.cost) * 100;

    // 3. CLV 추정 (Lifetime Value Estimation - 단순화된 가정)
    // 실제 CLV는 복잡한 예측 모델이 필요하나, 여기서는 단순화를 위해 평균 구매 주기를 임시로 설정합니다.
    const avgPurchaseCycle = 6; // 예시: 6개월 주기 가정
    const avgOrderValue = data.revenue / avgPurchaseCycle;

    const clv = avgPurchaseCycle * (data.revenue / 12); // 연간 수익 기반 추정

    // 4. 최종 유효성 검증 (Final Check)
    if (roi < -50) {
        console.warn(`Warning: Negative ROI detected: ${roi.toFixed(2)}%. Cost significantly exceeds revenue.`);
    }

    return {
        roi: parseFloat(roi.toFixed(2)),
        clv: parseFloat(clv.toFixed(2)),
        isValid: true,
    };
}