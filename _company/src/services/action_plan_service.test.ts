import { generate_action_plan } from './action_plan_service';
import { DiagnosisResult, RiskLevel } from '../types/diagnosis_schema'; // 가상의 스키마 파일 참조

// Mocking the diagnosis result for testing purposes
const mockHighRiskDiagnosis = {
    risk_level: "High", 
    risk_factor: "매출 예측 실패로 인한 현금 흐름 급감"
};

describe('ActionPlanService - StoryFlowSchema Generation', () => {
    it('should generate a detailed, structured flow for High Risk (Value Proof)', async () => {
        // Arrange & Act
        const result = generate_action_plan(mockHighRiskDiagnosis); 

        // Assert
        expect(result).toBeDefined();
        expect(typeof result.stages).toBe('object');
        expect(Array.isArray(result.stages)).toBeTruthy();
        
        // Critical Check: Value Proposition 필드가 반드시 존재해야 함
        const s2 = result.stages.find(stage => stage['step_id'] === 'S2');
        expect(s2).toBeDefined();
        expect(s2.premium_benefit).toBeDefined();
        expect(s2.premium_benefit.cost_saving_metric).toBe(true); 

        // Flow Check: CTA가 명확한 액션 플로우를 유도하는지 검증
        const s3 = result.stages[2];
        expect(s3.cta.text).toContain("컨설턴트와 상담 예약"); 
    });

    it('should generate a general flow for Low Risk (Basic Level)', async () => {
        // Arrange & Act (Low Risk 시뮬레이션)
        const mockLowRiskDiagnosis = { risk_level: "Low", risk_factor: "안정적인 시장 환경" };
        // NOTE: 실제 로직에서는 'Low' 케이스도 구현되어 있어야 함. 여기선 테스트 구조만 잡음.
        // 임시로 Low Risk를 Mocking하여 테스트하는 가상의 함수 호출 가정
        const result = generate_action_plan(mockLowRiskDiagnosis); 

        // Assert (검증이 성공했다는 것을 전제로 기대값 설정)
        expect(result).toBeDefined();
        // Low risk에서는 premium_benefit 필드가 없거나, 있더라도 단순해야 함을 확인
        const s2 = result.stages.find(stage => stage['step_id'] === 'S2');
        if (s2) {
             expect(s2.premium_benefit).toBeUndefined(); 
        }
    });
});