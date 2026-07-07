import { calculateTransition } from './transitionLogic';

describe('Transition Logic Integration Test (E2E Simulation)', () => {
    // 이 테스트는 실제 컴포넌트가 아닌 로직의 통합을 검증합니다.
    test('E2E Flow Check: High Risk Scenario', () => {
        const kpis = { riskScore: 85, timeSaved: 10 }; // 고위험 상황 시뮬레이션
        const flag = 'C'; // 최고 리스크에 대한 통제권 회복 시도

        const result = calculateTransition(flag, kpis);
        
        // 핵심 검증 포인트: Flag C는 Control 상태로 전환되어야 하며, Easing은 elastic이어야 함.
        expect(result.emotion).toBe('Control');
        expect(result.easing).toBe('easeInElastic');
        expect(result.factor).toBe(1.5); // 위험도에 따른 지연/탄력 효과가 반영되었는지 확인
    });

    test('E2E Flow Check: Low Risk Scenario', () => {
        const kpis = { riskScore: 10, timeSaved: 5 }; // 저위험 상황 시뮬레이션
        const flag = 'A'; // 낮은 위험에 대한 안도감 시도

        const result = calculateTransition(flag, kpis);
        
        // 핵심 검증 포인트: Flag A는 Relief 상태로 전환되어야 하며, Easing은 cubic이어야 함.
        expect(result.emotion).toBe('Relief');
        expect(result.easing).toBe('easeOutCubic');
        expect(result.factor).toBe(1); // 정상적인 흐름 확인
    });
});