import React from 'react';

const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #F1EDE6 25%, #E8E2D9 50%, #F1EDE6 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s infinite',
  borderRadius: '6px',
};

const SkeletonBlock: React.FC<{ width?: string; height: string; style?: React.CSSProperties }> = ({
  width = '100%',
  height,
  style,
}) => (
  <div style={{ width, height, ...shimmerStyle, ...style }} />
);

const SkeletonRow: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: '1px solid #EDE8E0',
      gap: '16px',
      animation: 'fadeIn 0.3s ease both',
    }}
  >
    {/* 왼쪽: 가게명 + 배지 */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '0 0 200px' }}>
      <SkeletonBlock height="18px" width="140px" />
      <SkeletonBlock height="22px" width="110px" style={{ borderRadius: '9999px' }} />
    </div>

    {/* 가운데: 지표 */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, alignItems: 'flex-end', marginRight: '24px' }}>
      <SkeletonBlock height="16px" width="160px" />
      <SkeletonBlock height="13px" width="110px" />
    </div>

    {/* 오른쪽: 게이지 원 */}
    <SkeletonBlock
      width="52px"
      height="52px"
      style={{ borderRadius: '50%', flexShrink: 0 }}
    />
  </div>
);

interface SkeletonLoaderProps {
  rows?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ rows = 5 }) => (
  <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);

export default SkeletonLoader;
