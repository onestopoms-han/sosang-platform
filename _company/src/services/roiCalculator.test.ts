// src/services/roiCalculator.test.ts
import { calculateROI } from './roiCalculator'; // Assume this function is exported

describe('ROI Calculator Service (Value Proof Core)', () => {
    // 1. Base Case Test: 기본적인 데이터로 ROI가 정상 계산되는지 검증
    it('should return a positive and calculable ROI score for basic data', async () => {
        const mockInput = {
            diagnosis_score: 0.7, // Example score
            user_activity_data: ['A', 'B'],
            period_days: 30
        };
        // 기대하는 결과 값 (Mocked value)을 설정하고 테스트합니다.
        const expectedScore = 50; 
        await expect(calculateROI(mockInput)).resolves.toBeGreaterThanOrEqual(expectedScore);
    });

    // 2. Premium Uplift Test: 프리미엄 기능 추가가 ROI를 극적으로 높이는지 검증
    it('should significantly boost ROI score when premium value proposition is included', async () => {
        const mockInputPremium = {
            diagnosis_score: 0.7,
            user_activity_data: ['A', 'B'],
            period_days: 30,
            premium_benefit: "Average time saved: 15 hours/month" // The key differentiator
        };
        // Premium 추가 시 점수가 크게 상승해야 함을 검증합니다.
        const expectedPremiumScore = 90; 
        await expect(calculateROI(mockInputPremium)).resolves.toBeGreaterThanOrEqual(expectedPremiumScore);
    });

    // 3. Edge Case Test: 필수 입력 데이터가 누락되었을 때 안전하게 처리하는지 검증 (Fail-safe)
    it('should handle missing required data gracefully and report an error or default value', async () => {
        const mockInputMissing = {
            diagnosis_score: null, // Null input for critical field
            user_activity_data: ['A'],
            period_days: 30
            // premium_benefit 누락은 허용되나, diagnosis_score는 필수임.
        };
        // Critical failure 시에는 Promise rejection이 발생하거나 명시된 기본값을 반환해야 함.
        await expect(calculateROI(mockInputMissing)).rejects.toThrow('Diagnosis score is required.'); 
    });
});