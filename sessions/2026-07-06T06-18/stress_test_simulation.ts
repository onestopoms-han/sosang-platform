import { calculateROI } from './roiCalculator'; // 가정: 기존 ROI 계산 로직을 참조합니다.
import { DiagnosisOutputSchema } from './data_schema'; // 가정: 데이터 스키마를 참조합니다.

// --- Mock Data Setup ---
interface StressScenarioData {
    riskLevel: number;         // 0 (Low) to 100 (Critical)
    performanceIndex: number; // 0 (Poor) to 100 (Excellent)
    systemLatencyMs: number;  // 시스템 지연 시간 (오류 시뮬레이션용)
}

interface StressTestResult {
    calculatedROI: number;
    status: 'Success' | 'Failure';
    errorDetails?: string;
    stateTransitionLog: string[]; // 상태 변화 기록
}

/**
 * Trust Widget 및 PainGauge 통합 시뮬레이션을 위한 핵심 함수
 * @param inputData 테스트에 사용할 입력 데이터 (위기, 성능 지표)
 * @param isErrorSimulate 데이터 연동 오류를 시뮬레이션할지 여부
 * @returns 스트레스 테스트 결과 객체
 */
export function runStressTest(inputData: StressScenarioData, isErrorSimulate: boolean): StressTestResult {
    console.log("--- Starting Stress Test Simulation ---");
    let stateTransitionLog: string[] = [];
    let finalStatus: 'Success' | 'Failure' = 'Success';
    let errorDetails: string | undefined = undefined;

    try {
        // 1. 데이터 유효성 검사 (Schema Validation Check)
        if (inputData.riskLevel < 0 || inputData.riskLevel > 100 || inputData.performanceIndex < 0 || inputData.performanceIndex > 100) {
            throw new Error("Input data out of expected range [0, 100].");
        }

        // 2. 상태 변화 로직 시뮬레이션 (급격한 회복 테스트)
        const initialRisk = inputData.riskLevel;
        let transitionLog = [`Initial State: Risk=${initialRisk}, Performance=${inputData.performanceIndex}`];

        // 급격한 회복 시나리오 테스트: 50% 위기에서 10% 위험으로 급변
        if (inputData.riskLevel > 50 && inputData.performanceIndex > 80) {
            const recoveredRisk = initialRisk * 0.1; // 90% 감소 시뮬레이션
            transitionLog.push(`State Transition: Rapid Recovery detected. Risk decreased from ${initialRisk.toFixed(2)} to ${recoveredRisk.toFixed(2)}.`);
        } else {
             transitionLog.push(`State Transition: Stable state maintained.`);
        }

        // 3. ROI 계산 로직 실행 (핵심 로직 검증)
        const calculatedROI = calculateROI(inputData);

        // 4. 에러 핸들링 시뮬레이션 (데이터 연동 오류 테스트)
        if (isErrorSimulate) {
            throw new Error("API Data Linkage Failure: Failed to retrieve external performance metrics.");
        }

        // 5. 결과 집계 및 상태 업데이트
        stateTransitionLog.push(`Calculated ROI: ${calculatedROI.toFixed(2)}`);
        finalStatus = 'Success';

    } catch (error) {
        console.error("Stress Test Error Encountered:", error instanceof Error ? error.message : String(error));
        finalStatus = 'Failure';
        errorDetails = `Test Failed: ${error.message}`;
        stateTransitionLog.push(`Error Handled: ${errorDetails}`);
    }

    // 6. 최종 결과 반환
    return {
        calculatedROI: finalStatus === 'Success' ? calculateROI(inputData) : NaN,
        status: finalStatus,
        errorDetails: errorDetails,
        stateTransitionLog: stateTransitionLog
    };
}

// --- Test Execution ---
async function executeStressTest() {
    console.log("==============================================");
    console.log("🚀 BDS 플랫폼 스트레스 테스트 실행 시작");
    console.log("==============================================");

    // Scenario 1: 정상적인 시나리오 (Stable State)
    const scenario1Data: StressScenarioData = { riskLevel: 30, performanceIndex: 75, systemLatencyMs: 50 };
    const result1 = runStressTest(scenario1Data, false);
    console.log("\n[SCENARIO 1: Normal Operation]");
    console.log(JSON.stringify(result1, null, 2));

    // Scenario 2: 급격한 상태 변화 시나리오 (Rapid Recovery Test)
    const scenario2Data: StressScenarioData = { riskLevel: 60, performanceIndex: 85, systemLatencyMs: 100 };
    const result2 = runStressTest(scenario2Data, false);
    console.log("\n[SCENARIO 2: Rapid Recovery Simulation]");
    console.log(JSON.stringify(result2, null, 2));

    // Scenario 3: 데이터 연동 오류 시나리오 (Error Handling Test)
    const scenario3Data: StressScenarioData = { riskLevel: 90, performanceIndex: 40, systemLatencyMs: 500 };
    const result3 = runStressTest(scenario3Data, true);
    console.log("\n[SCENARIO 3: Data Linkage Failure Simulation]");
    console.log(JSON.stringify(result3, null, 2));

    console.log("\n==============================================");
    console.log("✅ 스트레스 테스트 완료");
    console.log("==============================================");
}

executeStressTest();