import React, { useState } from 'react';
import { DiagnoseForm } from '@/components/DiagnoseForm'; // 추후 구현될 폼 컴포넌트
import { DiagnosisReport } from '@/types/diagnosis'; // diagnosis_input_schema에서 유추된 타입
import { fetchDiagnosisData } from '@/lib/api/diagnosisApi'; // 추후 API 호출 함수

interface DiagnosisPageProps {
  initialFormData?: Partial<DiagnosisReport>;
}

const DiagnosisPage: React.FC<DiagnosisPageProps> = ({ initialFormData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: Partial<DiagnosisReport>) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 실제 API 호출 로직 구현 (백엔드 연동)
      // const data = await fetchDiagnosisData(formData); 
      
      // Mocking API response for structural setup
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      const mockData = { 
        status: 'success', 
        report: { 
          summary: `AI 진단 결과입니다. ${formData.businessName}님의 성장을 위한 핵심 액션 플랜이 도출되었습니다.`,
          actionPrescription: ['액션 1', '액션 2'],
          roiSimulation: { calculatedROI: 1.5, projection: 'High Growth' }
        }
      };
      setReport(mockData.report);

    } catch (err) {
      setError('진단 데이터 로드 중 오류가 발생했습니다.');
      console.error('Diagnosis API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* AI_Diagnosis_Final_Design_Spec.md 기반의 Hero Section */}
      <header className="text-center mb-12 border-b pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">소상공인 AI 진단 리포팅</h1>
        <p className="text-xl text-gray-600">데이터 기반의 실행 가능한 성장 계획을 즉시 확보하세요.</p>
      </header>

      {/* Input Section (Design Spec 반영) */}
      <section className="bg-white shadow-xl rounded-lg p-6 mb-8 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">1단계: 사업 정보 입력</h2>
        {/* TODO: DiagnoseForm 컴포넌트 통합 */}
        <div className="space-y-4">
            {/* 여기에 Form 컴포넌트가 위치할 예정입니다. */}
            <p>입력 필드 구조는 diagnosis_input_schema.ts를 기반으로 설계됩니다.</p>
            {/* <DiagnoseForm onSubmit={handleSubmit} initialData={initialFormData} /> */}
        </div>
      </section>

      {/* Report Section (Design Spec 반영) */}
      {report && (
        <section className="bg-white shadow-xl rounded-lg p-6 border border-green-100">
          <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-3">2단계: AI 진단 리포트</h2>
          
          {/* Action Prescription & Visualization (Design Spec 반영) */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-lg mb-2 text-blue-800">핵심 요약</h3>
                <p className="text-gray-700">{report.summary}</p>
            </div>
            <div className="md:col-span-2 space-y-4">
                {/* Action Prescription Visualization */}
                <h3 className="font-bold text-lg mb-2 text-green-800">실행 계획 (Action Prescription)</h3>
                <ul className="list-disc list-inside ml-2 space-y-2">
                    {report.actionPrescription?.map((action, index) => (
                        <li key={index} className="text-gray-700">{action}</li>
                    ))}
                </ul>

                {/* ROI Visualization */}
                <h3 className="font-bold text-lg mb-2 text-yellow-800">ROI 시뮬레이션</h3>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                    <p className="text-xl font-extrabold text-yellow-900">계산된 ROI: {report.roiSimulation?.calculatedROI || 'N/A'}</p>
                    <p className="text-sm mt-1 text-gray-600">{report.roiSimulation?.projection || '정보 없음'}</p>
                </div>
            </div>
          </div>
        </section>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          오류: {error}
        </div>
      )}
    </div>
  );
};

export default DiagnosisPage;