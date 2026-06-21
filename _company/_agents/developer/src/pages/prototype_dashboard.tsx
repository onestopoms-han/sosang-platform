import { TrustWidget } from '../components/widgets/trust_widget';
import { PainGauge } from '../components/widgets/pain_gauge';

// 초기 시뮬레이션 데이터 (API 연동 시 이 부분을 교체)
const INITIAL_DATA = {
  trustScore: 95,      // 신뢰도 점수
  riskLevel: 82,       // 위험도 지표
};

export function PrototypeDashboard() {
  const data = INITIAL_DATA;

  return (
    <div style={{ 
      padding: '32px', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f5f7fa'
    }}>
      <h1>핵심 대시보드 프로토타입</h1>
      
      <p style={{ marginBottom: '24px', color: '#666' }}>
        아래 컴포넌트들은 실시간 데이터 상태 변화에 반응하도록 설계되었습니다.
        (예를 들어, Trust Score 가 90% 이상일 때 Growth Green 색상 적용)
      </p>

      {/* 위젯 렌더링 */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <TrustWidget score={data.trustScore} />
        <PainGauge riskLevel={data.riskLevel} actionPrompt="성장을 위해 행동하세요" />
      </div>

      {/* 상태 로그 (디버깅용) */}
      <pre style={{ 
        marginTop: '32px', 
        backgroundColor: '#fff', 
        padding: '16px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}