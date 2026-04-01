import React from 'react';
import classes from './Card.module.css';

const Card = ({ children, className = '', variant = 'default', noPadding = false, ...props }) => {
  const cardClasses = [
    classes.card,
    variant === 'primary' ? classes.primary : '',
    noPadding ? classes.noPadding : '',
    className
  ].join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
