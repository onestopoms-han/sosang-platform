<![CDATA[/**
 * Trust Widget의 상태 및 이벤트 정의 (Designer 명세 v2.0 기반)
 */

// 컴포넌트가 노출할 Props 타입
export interface TrustWidgetProps {
  /** 신뢰 점수 또는 지표 값 */
  score: number;
  
  /** 상태 분류: 'success' | 'warning' | 'error' | 'loading' */
  status: WidgetStatus;
  
  /** 상태별 메시지 (Designer UI Kit 텍스트 매핑) */
  message?: string;

  /** 데이터 로딩 중 표시할 스피너 상태 */
  isLoading: boolean;
  
  /** 클릭 시 호출될 이벤트 핸들러 */
  onDetailClick?: () => void;
}

// 상태 열거형 (Designer 색상 코드 연동용)
export type WidgetStatus = 
  | 'success'    // 🟢 안정됨 (Green #2E7D32)
  | 'warning'   // 🟡 주의 필요 (Orange #EF6C00)
  | 'error'     // 🔴 서비스 중단 (Red #C62828)
  | 'loading';  // ⚪ 로딩 중 (Gray #757575);

// 상태별 시각적 정보 (Designer Kit 연동용)
export const STATUS_META: Record<WidgetStatus, { color: string; icon: string }> = {
  success: { color: '#2E7D32', icon: '✅' },
  warning: { color: '#EF6C00', icon: '⚠️' },
  error:   { color: '#C62828', icon: '🛑' },
  loading: { color: '#757575', icon: '⏳' }
};
]]>