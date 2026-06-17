/**
 * Trust Widget Mock API (Designer 의 명세 및 백엔드 연동을 위한 유틸리티)
 * 실제 서비스에서는 Backend 에서 제공하는 인터페이스를 대신합니다.
 */

// --- 타입 정의 ---
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TrustWidgetMetrics {
  trustScore: number;
  satisfactionRate: number;
  engagementLevel: 'Low' | 'Medium' | 'High';
}

// --- Mock Implementation (백엔드 로직 시뮬레이션) ---
export const mockTrustApi = async (): Promise<ApiResponse<TrustWidgetMetrics>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 백엔드가 정상 작동하는 경우의 응답 구조
      resolve({
        success: true,
        data: {
          trustScore: Math.floor(Math.random() * 100),
          satisfactionRate: Math.floor(Math.random() * 20) + 60,
          engagementLevel: 'Medium',
        },
      });
    }, 500); // 지연 시간 (네트워크 지연 시뮬레이션)
  });
};

// --- Error Handling Utility ---
export const handleApiError = (error: unknown): ApiResponse<null> => {
  console.error('Trust Widget API 호출 실패:', error);
  return {
    success: false,
    error: '서버 연결 오류 또는 일시적 장애',
  };
};

/**
 * 실제 서비스에서 백엔드와 연동될 때 사용하는 Promise Wrapper 예시
 * (백엔드가 준비되면 이 함수를 대체)
 */
export const fetchTrustWidgetData = async (): Promise<TrustWidgetMetrics | null> => {
  try {
    // 실제로는: const res = await mockTrustApi(); return res.data;
    
    // 현재는 Mock 을 반환합니다. (백엔드 연동 전까지)
    const data = await mockTrustApi();
    if (!data.success || !data.data) {
      handleApiError(new Error(data.error || 'Unknown error'));
      return null;
    }
    return data.data;
  } catch (err) {
    console.error('API Fetch Error:', err);
    return null;
  }
};

export default mockTrustApi;