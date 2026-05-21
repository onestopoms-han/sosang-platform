import React, { useState } from 'react';
import axios from 'axios';
import { DiagnosisInput, DiagnosisReportData } from '../types/diagnosis'; // 정의한 타입 임포트

// 이 컴포넌트는 디자인 사양서의 레이아웃을 반영하여 구현될 예정입니다.
const DiagnosisReportPage: React.FC = () => {
  const [inputData, setInputData] = useState<DiagnosisInput>({ vendorName: '', locationDetails: '', painPoints: [], desiredAction: '' });
  const [report, setReport] = useState<DiagnosisReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 백엔드 API 호출 (API 설계는 다음 단계에서 진행하되, 여기서는 통합 흐름을 준비합니다.)
      const response = await axios.post('/api/diagnosis/submit', inputData);
      setReport(response.data);
    } catch (err) {
      setError('리포팅 데이터 제출 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-report-container">
      <h1>AI 진단 리포트</h1>
      {/* Designer 사양서 기반의 Action Prescription 흐름 시각화 영역 */}
      <section className="action-prescription-flow">
        <h2>Action Prescription Flow</h2>
        {/* 실제 데이터가 채워질 영역 */}
        {report ? (
          <div>
            {report.actions.map((action, index) => (
              <div key={index} className={`action-step action-${action.step}`}>
                <h3>Step {action.step}: {action.title}</h3>
                <p>{action.description}</p>
                <div className="insight"><strong>Actionable Insight:</strong> {action.actionableInsight}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>진단 결과를 로드 중이거나 입력이 필요합니다.</p>
        )}
      </section>

      {/* 최종 리포트 및 시각화 영역 */}
      {report && (
        <section className="report-visualization">
          <h2>최종 결과 및 성장 로드맵</h2>
          {/* ROI 계산 결과 등 데이터 시각화 컴포넌트가 여기에 위치 */}
          <p>데이터 시각화 모듈이 여기에 통합될 예정입니다.</p>
        </section>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <h2>진단 입력</h2>
        {/* 디자인 사양서 기반의 폼 요소 배치 */}
        <div>
          <label>가게 이름:</label>
          <input type="text" name="vendorName" value={inputData.vendorName} onChange={(e) => setInputData({...inputData, vendorName: e.target.value})} required />
        </div>
        {/* ... 나머지 입력 필드 (LocationDetails, PainPoints 등) */}
        <button type="submit" disabled={loading}>
          {loading ? '처리 중...' : '진단 및 리포트 생성'}
        </button>
      </form>
    </div>
  );
};

export default DiagnosisReportPage;