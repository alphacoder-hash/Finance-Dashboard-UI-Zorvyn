import React from 'react';
import styles from './Skeleton.module.css';

/**
 * @component Skeleton
 * @description A high-performance shimmering placeholder component to mimic UI layout 
 * during data hydration or loading states.
 */
const Skeleton = ({ width, height, borderRadius, className = '' }) => {
  return (
    <div 
      className={`${styles.skeleton} ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '20px',
        borderRadius: borderRadius || 'var(--radius-sm)'
      }}
    />
  );
};

export default Skeleton;
