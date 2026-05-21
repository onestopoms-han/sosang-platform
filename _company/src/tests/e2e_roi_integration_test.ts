import { test, expect } from 'vitest';
import { roiCalculator } from '../services/roiCalculator';
import { dataSchema } from '../types/data_schema';

// Mock Data Setup (SIT 기반 시나리오)
const mockInputData = {
  revenue: 100000, // 예시 데이터
  costOfAcquisition: 20000,
  customerRetentionRate: 0.75,
  growthRate: 0.15,
};

// Mock Expected Output (디자인 및 명세 기반)
const expectedResult = {
  roi: 1.5, // 기대되는 ROI 값 (예시)
  roadmapData: [
    { stage: 'Acquisition', value: 20 },
    { stage: 'Retention', value: 30 },
    { stage: 'Growth', value: 50 },
  ],
};

test('End-to-End ROI Calculation and Visualization Test Suite', () => {
  // 1. Input Data Validation Check (데이터 스키마 기반 검증)
  expect(dataSchema.requiredFields).toHaveLength(4); // 최소 필드 존재 여부 확인
  expect(mockInputData.revenue).toBeGreaterThan(0);

  // 2. ROI Calculation Logic Test (핵심 로직 검증)
  const calculatedROI = roiCalculator.calculateROI(mockInputData);
  
  // 기대값과 실제값 비교 (SIT에서 요구한 핵심 로직 검증)
  expect(calculatedROI).toBeCloseTo(expectedResult.roi, 2); // ROI 계산 결과 정확성 확인

  // 3. Data Flow Integration Test (데이터 흐름 통합 검증)
  const roadmap = roiCalculator.generateRoadmap(mockInputData);
  
  expect(roadmap.length).toBe(3); // 로드맵 단계 개수 확인
  expect(roadmap[0].stage).toBe('Acquisition'); // 초기 단계의 정확성 확인

  // 4. Final Visualization Data Check (UI/UX 명세 기반 최종 데이터 구조 검증)
  const finalVisualizationData = {
    roi: calculatedROI,
    roadmap: roadmap,
  };

  expect(finalVisualizationData.roi).toBeGreaterThan(1); // ROI가 합리적인 범위인지 확인
  expect(finalVisualizationData.roadmap[2].value).toBe(50); // 최종 성장 단계 값의 정확성 확인
});