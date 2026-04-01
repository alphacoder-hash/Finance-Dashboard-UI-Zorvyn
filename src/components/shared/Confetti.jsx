import React, { useEffect, useState } from 'react';
import styles from './Confetti.module.css';

/**
 * @component Confetti
 * @description A lightweight, performance-optimized particle burst component.
 */
const Confetti = ({ active, duration = 3000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!show) return null;

  return (
    <div className={styles.confettiContainer}>
      {[...Array(50)].map((_, i) => (
        <div 
          key={i} 
          className={styles.particle} 
          style={{ 
            '--x': `${Math.random() * 100}vw`,
            '--delay': `${Math.random() * 2}s`,
            '--color': `hsl(${Math.random() * 360}, 70%, 50%)`,
            '--size': `${Math.random() * 10 + 5}px`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
