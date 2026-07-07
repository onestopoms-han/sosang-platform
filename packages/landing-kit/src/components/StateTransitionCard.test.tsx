<![CDATA[
import React from 'react';
import { render, screen } from '@testing-library/react';
import StateTransitionCard from './StateTransitionCard';
import '@testing-library/jest-dom';

describe('StateTransitionCard E2E Integration Test', () => {
  // 테스트 케이스 1: 초기 상태 (Deep Blue)
  test('should initialize correctly in Deep Blue state', () => {
    const initialUncertainty = 10;
    render(<StateTransitionCard initialState="Blue" uncertaintyLevel={initialUncertainty} />);

    // 초기 상태 확인
    expect(screen.getByText(/Current State: Blue/i)).toBeInTheDocument();
    // 진행 바가 최소값으로 시작하는지 확인 (시각적 검증)
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 0%');
  });

  // 테스트 케이스 2: 중간 단계 (Blue -> Indigo 전환 시점)
  test('should transition to Deep Indigo when uncertainty reaches 50%', () => {
    const uncertainty = 50;
    render(<StateTransitionCard initialState="Blue" uncertaintyLevel={uncertainty} />);

    // 상태가 Indigo로 바뀌었는지 확인 (핵심 로직 검증)
    expect(screen.getByText(/Current State: Indigo/i)).toBeInTheDocument();
    // 진행 바가 50%에 가까워졌는지 확인
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 50%'); // 50% 진입 확인
  });

  // 테스트 케이스 3: 최종 상태 도달 (Amber) - 임계치 검증
  test('should transition to Gold-Amber when uncertainty reaches the final threshold (95%)', () => {
    const finalUncertainty = 95; // Session에서 정의된 최종 임계치
    render(<StateTransitionCard initialState="Indigo" uncertaintyLevel={finalUncertainty} />);

    // 최종 상태가 Amber로 바뀌었는지 확인 (최종 결과 검증)
    expect(screen.getByText(/Current State: Amber/i)).toBeInTheDocument();
    // 진행 바가 100%에 도달했는지 확인
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 100%'); // 100% 달성 확인
  });

  // 테스트 케이스 4: 경계값 검증 (70% 임계치)
  test('should handle the transition logic correctly at the intermediate threshold (70%)', () => {
    const uncertainty = 70; // 중간 단계 임계치
    render(<StateTransitionCard initialState="Indigo" uncertaintyLevel={uncertainty} />);

    // Indigo 상태에서 Amber로 전환이 시작되었는지 확인
    expect(screen.getByText(/Current State: Indigo/i)).toBeInTheDocument();
    // 진행 바가 중간 값으로 설정되어 부드러운 애니메이션을 유도하는지 검증 (로직의 미묘한 조정 확인)
    const progressBar = screen.getByRole('progressbar');
    // 70%에서 시작하여 Amber로 가는 과정이 UI에 반영되는지 확인
    expect(progressBar).toHaveStyle('width: 100%'); // 로직상 임계치 도달 시 최종 상태로의 흐름을 강제하는지 검증
  });

  // 테스트 케이스 5: 최대값 초과 처리 (Robustness Check)
  test('should handle uncertainty level above 100 without crashing', () => {
    const highUncertainty = 150;
    render(<StateTransitionCard initialState="Blue" uncertaintyLevel={highUncertainty} />);

    // 상태가 Amber로 최종 확정되었는지 확인
    expect(screen.getByText(/Current State: Amber/i)).toBeInTheDocument();
  });
});
]]>