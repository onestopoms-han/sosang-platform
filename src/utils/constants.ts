// 리스크 등급 및 색상 매핑 (Designer 명세서 기준)
export const RiskGradeColorMap = {
  A: '#2ECC71', // Green
  B: '#F1C40F', // Yellow/Orange
  C: '#E74C3C', // Red
};

// Pain Level 상태별 라벨 및 아이콘 (Designer 명세서 기준)
export const PainLevelLabels = {
  low: '고요 / 불안',
  medium: '불안 / 고민',
  high: '분노 / 절실',
};

// API 응답을 파싱할 때 필요한 기본 스키마 정의
export interface DiagnosisResult {
  riskGrade?: string; // A, B, C
  painLevel?: number; // 0-100 또는 상태 문자열
}