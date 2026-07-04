import { PainGauge } from './components/PainGauge'
import { TrustWidget } from './components/TrustWidget'

function App() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
    }}>
      <header style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>
          🛡️ BDS 소상공인 플랫폼
        </h1>
        <p style={{ color: '#888', fontSize: '14px' }}>
          기술적 안정성을 'Proof of Trust'로 시각화
        </p>
      </header>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#333' }}>
          📊 Pain Gauge — 위기감 시각화
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PainGauge painLevel={25} />
          <PainGauge painLevel={55} />
          <PainGauge painLevel={85} />
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#333' }}>
          🛡️ Trust Widget — 신뢰도 표시
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TrustWidget riskGrade="A" />
          <TrustWidget riskGrade="B" />
          <TrustWidget riskGrade="C" />
        </div>
      </section>
    </div>
  )
}

export default App
