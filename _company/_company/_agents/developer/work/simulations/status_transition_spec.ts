<file>
/**
 * BDS 플랫폼 상태 전이 로직 스펙 (Trust ↔ Warning ↔ Critical)
 * Version: 3.0 (Designer Handoff Spec)
 */

// --- 1. Enum Definitions ---
export enum TrustLevel {
  TRUST = 'trust',      // 정상/신뢰able 상태
  WARNING = 'warning',  // 주의 필요/손실 위험 초입
  CRITICAL = 'critical' // 위기/즉시 조치 필요
}

// --- 2. API Response Schema (백엔드 → 프론트엔드) ---
/**
 * 백엔드가 반환하는 상태 데이터 구조 (JS/TS Interace)
 */
export interface StatusResponse {
  id: string;           // 리스크 이벤트 ID
  timestamp: number;    // ISO 8601 시간
  status: TrustLevel;   // 현재 신뢰도 상태
  riskScore: number;    // 0~100 점수 (낮을수록 위기)
  transitionHistory: Array<{
    fromStatus: TrustLevel,
    toStatus: TrustLevel,
    triggerEvent: string, // 예: "api_timeout", "market_downturn"
    timestamp: number
  }>;
  metadata: {
    region: string;      // e.g., "seoul_main_market"
    dataSource: string[] // e.g., ["news_feed", "transaction_log"]
  };
}

// --- 3. 상태 전이 로직 (State Transition Logic) ---
/**
 * 상태 전이를 제어하는 핵심 로직 정의
 */
export const StateTransitionRules = {
  /**
   * 현재 상태를 Trust 에서 Warning 으로 변경하는 조건
   * - 신뢰도 점수가 70 이하로 떨어지거나, API 응답 지연 시간이 5 초 초과
   */
  TRUST_TO_WARNING: (currentStatus: TrustLevel, riskScore: number, latencyMs: number) => {
    if (currentStatus !== TrustLevel.TRUST) return false;
    // 신뢰도 점수가 임계값을 넘거나(70), 네트워크 지연이 심한 경우
    return riskScore <= 70 || latencyMs > 5000;
  },

  /**
   * 현재 상태를 Warning 에서 Critical 으로 변경하는 조건
   * - 신뢰도 점수가 40 이하로 떨어지거나, 연속 실패 횟수 3 회 초과
   */
  WARNING_TO_CRITICAL: (currentStatus: TrustLevel, riskScore: number, failureCount: number) => {
    if (currentStatus !== TrustLevel.WARNING) return false;
    // 더 낮은 신뢰도 점수(40 이하) 또는 반복된 실패가 발생
    return riskScore <= 40 || failureCount >= 3;
  },

  /**
   * 상태 전이 히스토리 기록 함수 (백엔드 로직 참조용)
   */
  recordTransition: (fromStatus: TrustLevel, toStatus: TrustLevel, triggerEvent: string): void => {
    const historyEntry = { fromStatus, toStatus, triggerEvent };
    // DB 에 transition_history 테이블에 insert 로직
    console.log(`[StateTransition] ${fromStatus} -> ${toStatus} triggered by '${triggerEvent}'`);
  }
};

// --- 4. 유효성 검증 (Validation) ---
/**
 * 백엔드 API 응답 데이터가 스펙을 준수하는지 확인하는 유틸리티 함수들
 */
export function validateStatusResponse(data: unknown): data is StatusResponse {
  if (!data || typeof data !== 'object') return false;

  const response = data as Partial<StatusResponse>;
  
  // 필수 필드 존재 여부 확인 (타입 체크)
  const requiredFields = ['id', 'timestamp', 'status', 'riskScore', 'transitionHistory'];
  return requiredFields.every(field => field in response);
}

export function isStatusCritical(status: string): boolean {
  return status === TrustLevel.CRITICAL;
}