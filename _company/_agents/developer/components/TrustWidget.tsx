<![CDATA[/**
 * BDS 플랫폼 - Trust Widget 컴포넌트 (최종 검증 버전)
 * 
 * 목적: 소상공인의 '안전마진' 가치를 시각적으로 전달하며, 신뢰를 구축하는 UI 요소
 * 디자인 시스템 적용: Deep Blue (#004D66), Growth Green (#3CB371), Warning Orange (#FF8C00)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Loader2, XCircle } from 'lucide-react';

// 타입 정의
interface TrustMetricData {
  title: string;      // 지표명 (예: "안전마진 확보율")
  value?: number;     // 현재 값 (예: "95.3%")
  target?: number;    // 목표값 (선택)
  trend?: 'up' | 'down' | 'stable'; // 추세 방향
}

interface TrustWidgetProps {
  /** 초기 데이터 (없으면 로딩 상태 진입) */
  initialData?: Partial<TrustMetricData>;
  
  /** 데이터 자동 새로고침 주기 (ms, null = 수동) */
  autoRefreshInterval?: number;
  
  /** 에러 핸들러 (에러가 발생했을 때 호출됨) */
  onError?: (error: Error) => void;
  
  /** 로딩 시 표시할 커스텀 메시지 (선택) */
  loadingMessage?: string;

  /** 컴포넌트 활성화 여부 (false 로 설정 시 렌더링 제외) */
  enabled?: boolean;
}

// 기본 에러 클래스
const DefaultError = ({ message, type = 'error' }: { message: string; type?: 'error' | 'warning' }) => (
  <div className={`flex items-center gap-2 p-3 rounded-lg ${type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700'}`}>
    {type === 'error' ? <XCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
    <span>{message}</span>
  </div>
);

// 로딩 상태 컴포넌트 (애니메이션 포함)
const LoadingSkeleton = ({ message = "데이터를 불러오는 중입니다..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <Loader2 className="w-8 h-8 text-[#3CB371] animate-spin mb-4" />
    <p className="text-gray-500">{message}</p>
  </div>
);

// 성공/실패 상태 컴포넌트 (애니메이션 및 CTA 포함)
const ResultState = ({ 
  data, 
  isLoading: loading, 
  isError: error 
}: { 
  data?: Partial<TrustMetricData>; 
  isLoading: boolean; 
  isError: boolean; 
}) => {
  const [mounted, setMounted] = useState(false);

  // 마운트 시 애니메이션 시작
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`transition-all duration-500 ease-in-out ${error ? 'opacity-100' : mounted ? 'opacity-100' : 'opacity-0'} transform ${error ? 'scale-100' : mounted ? 'scale-100' : 'scale-95'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#3CB371] font-medium text-sm">{data?.title || '신뢰도 지표'}</span>
        {data?.trend === 'up' && (
          <CheckCircle2 className="w-5 h-5 text-[#3CB371]" aria-label="향상됨" />
        )}
      </div>

      {/* 데이터 값 표시 */}
      {data?.value !== undefined ? (
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#004D66] tracking-tight animate-count-up">
            {Number(data.value).toLocaleString(undefined, { 
              minimumFractionDigits: 1, 
              maximumFractionDigits: 2 
            })}%
          </span>
          <span className="text-sm text-gray-500 ml-2">현재</span>
        </div>
      ) : error ? (
        // 에러 상태에서는 데이터 대신 에러 메세지 표시
        <DefaultError message={data?.title || '데이터에 문제가 발생했습니다.'} />
      ) : null}

      {/* 목표 대비 진행도 바 (선택) */}
      {data?.target && data.value !== undefined ? (
        <div className="mt-4 bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full transition-all duration-700 ease-out ${data.value >= data.target ? 'bg-[#3CB371]' : 'bg-blue-500'}`}
            style={{ width: `${Math.min(100, (data.value / data.target) * 100)}%` }}
          />
        </div>
      ) : null}

      {/* CTA 버튼 (성공 시에만 표시) */}
      {!error && !loading && data?.value !== undefined && (
        <button 
          className="mt-4 px-4 py-2 bg-[#004D66] hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3CB371]"
          aria-label="자세한 정보 보기"
        >
          상세정보 보기 →
        </button>
      )}
    </div>
  );
};

// 메인 컴포넌트
const TrustWidget: React.FC<TrustWidgetProps> = ({ 
  initialData, 
  autoRefreshInterval,
  onError, 
  loadingMessage = "데이터를 불러오는 중입니다...", 
  enabled = true 
}) => {
  const [metricData, setMetricData] = useState<Partial<TrustMetricData>>(initialData || {});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로딩 시뮬레이션 함수 (실제 API 호출용)
  const fetchMetricData = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      // 실제 구현 시: await api.getTrustMetric()
      // 여기서는 지연을 위한 setTimeout 사용
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // 성공 시 데이터 업데이트 (예시 데이터)
      const newData = {
        title: '안전마진 확보율',
        value: Math.floor(Math.random() * 20 + 75), // 75~95% 랜덤
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as const,
      };

      setMetricData(newData);
    } catch (err) {
      console.error('[TrustWidget] 데이터 로딩 에러:', err);
      
      // 에러 핸들러 호출 또는 기본 메시지 표시
      if (onError && err instanceof Error) {
        onError(err);
        setError(`데이터에 문제가 발생했습니다: ${err.message}`);
      } else {
        setError('데이터 연결 중 오류가 발생했습니다.');
      }

      // 에러 상태에서도 5 초 후 재시도
      setTimeout(() => fetchMetricData(), 5000);
    } finally {
      setLoading(false);
    }
  }, [enabled, onError]);

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    if (initialData?.value !== undefined) {
      setMetricData(initialData);
      setLoading(false);
    } else {
      fetchMetricData();
    }

    // 자동 새로고침 설정
    const intervalId = setInterval(fetchMetricData, autoRefreshInterval || 30000);
    
    return () => clearInterval(intervalId);
  }, [initialData, autoRefreshInterval, fetchMetricData]);

  // 에러 상태 처리 (기본 에러 표시)
  if (error && !loading && !metricData.value !== undefined) {
    return <DefaultError message={error} />;
  }

  // 로딩 또는 성공/실패 상태 렌더링
  return enabled ? (
    <div className="p-6 bg-white border-l-4 border-[#004D66] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* 헤더: 타이틀 및 상태 표시 */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-[#004D66] flex items-center gap-2">
          <CheckCircle2 className={`w-5 h-5 ${loading ? 'animate-spin' : 'text-green-500'}`} />
          {metricData.title || '신뢰도 지표'}
        </h3>
        
        {/* 상태 아이콘 */}
        <div className="flex gap-2">
          {loading && (
            <Loader2 className="w-4 h-4 text-[#FF8C00] animate-spin" aria-label="로딩 중..." />
          )}
          {metricData.trend === 'up' && (
            <CheckCircle2 className="w-5 h-5 text-green-500" title="향상됨" />
          )}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      {loading ? (
        <LoadingSkeleton message={loadingMessage} />
      ) : metricData.value !== undefined ? (
        // 성공: 데이터 표시 및 CTA 포함
        <ResultState data={metricData} isLoading={false} isError={!!error} />
      ) : error ? (
        // 에러: 에러 메세지 표시
        <DefaultError message={`데이터 로딩에 실패했습니다. ${error}`} type="error" />
      ) : null}

      {/* 추가 정보 섹션 (선택) */}
      {!loading && !error && metricData.value !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-1">최신 업데이트:</p>
          <p className="text-xs text-gray-400">{new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  ) : null;
};

export default TrustWidget;

// 컴포넌트 내장 스타일 (Tailwind CSS를 사용하므로 별도의 CSS 파일 불필요)
// 애니메이션 및 전환 효과는 Lucide 아이콘 및 기본 CSS 클래스 활용]]>