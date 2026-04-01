import React from 'react';

const Skeleton = ({ width = '100%', height = '100px', borderRadius = '12px', marginBottom = '0' }) => {
  return (
    <div 
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        marginBottom,
        background: 'var(--bg-surface-light)',
        animation: 'pulse 1.5s infinite ease-in-out'
      }}
    />
  );
};

export default Skeleton;
