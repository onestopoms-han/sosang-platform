// KPI Gauge 컴포넌트: React 기반 상태 머신 구현 (프론트엔드 팀용)
// - 실제 동작 스크린샷과 함께 목업 제작에 필요한 애니메이션 로직을 포함합니다.

import React, { useState, useEffect } from 'react';
import type { DiagnosisData } from './types/diagnosis';

interface KPI_GaugeProps {
  diagnosis: DiagnosisData; // 백엔드에서 생성한 데이터 (Simulator 와 연동)
}

const KPI_Gauge: React.FC<KPI_GaugeProps> = ({ diagnosis }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // 상태 머신 로직: Empty → Loading → Normal/Warning/Error
  useEffect(() => {
    if (!diagnosis) return;
    
    // 초기 로딩 시뮬레이션 (시스템 안정성 매트릭스 기준 2 초 대기)
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(loadTimer);
  }, [diagnosis]);

  // 상태별 스타일 매핑 (시스템 안정성 매트릭스 기준)
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'NORMAL': return { backgroundColor: '#2ECC40', color: '#FFFFFF' };
      case 'WARNING': return { backgroundColor: '#FF9F1C', color: '#FFFFFF', animation: 'pulse 1.5s infinite'; };
      case 'ERROR': return { backgroundColor: '#EE5253', color: '#FFFFFF', animation: 'shake 0.5s infinite' };
      default: return { backgroundColor: '#333333', color: '#FFFFFF' };
    }
  };

  if (!isLoaded) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#004D66', borderRadius: '8px' }}>
        <div className="spinner"></div> {/* 스피너 */}
        <p>시스템 초기화 중...</p>
      </div>
    );
  }

  // 상태에 따른 렌더링
  const { status, message } = diagnosis;
  
  return (
    <div className="kpi-gauge" style={getStatusStyle(status)}>
      <h2>{status}</h2>
      <p>{message}</p>
      
      {/* KPI Gauge 컴포넌트: 상태에 따라 다른 애니메이션 및 시각적 요소 */}
      {status === 'NORMAL' && (
        <>
          <div className="gauge-needle" style={{ transform: `rotate(${diagnosis.kpi_value * 3.6}deg)` }}></div>
          <p>현재 KPI: {diagnosis.kpi_value.toFixed(2)}</p>
        </>
      )}
      
      {status === 'WARNING' && (
        <>
          <div className="warning-alert">⚠️ 손실 위험 감지</div>
          <p>{message}</p>
        </>
      )}

      {status === 'ERROR' && (
        <>
          <div className="error-banner">❌ 시스템 오류 발생</div>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default KPI_Gauge;