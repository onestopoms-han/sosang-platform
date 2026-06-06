<![CDATA[/**
 * Trust Widget 컴포넌트 - 초기 스켈레톤 (TypeScript Strict Mode)
 * Designer 명세: 신뢰 점수, 상태 메시지, 로딩 상태 시각화
 */

import React from 'react';
import { TrustWidgetProps } from '../types/widget';
import { STATUS_META } from '../types/widget'; // 타입 참조를 위해 직접 import

// TODO: 실제 컴포넌트 구현 전 타입 정의 및 유틸리티 준비
export const TrustWidgetSkeleton: React.FC<TrustWidgetProps> = ({ 
  score, 
  status, 
  message, 
  isLoading,
  onDetailClick 
}) => {
  // 로딩 중일 경우 기본 구조 렌더링 (실제 구현은 훅 사용)
  if (isLoading) {
    return <div className="trust-widget-loading">Trust Widget Loading...</div>;
  }

  const meta = STATUS_META[status] || STATUS_META.loading;

  // TODO: 실제 UI 컴포넌트 (Card, Badge, Icon 등) 로 교체
  return (
    <div 
      style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}
      onClick={onDetailClick}
    >
      <h3>Trust Widget</h3>
      <p>Status: {status}</p>
      <p>Score: {score}</p>
      <p>{meta.icon} {message || 'Message Not Provided'}</p>
      
      {/* 실제 UI 컴포넌트 (예시) */}
      {/* 
        - @/components/ui/Card.tsx 사용
        - @/components/ui/Badge.tsx 사용
      */}
    </div>
  );
};

export default TrustWidgetSkeleton;
]]>