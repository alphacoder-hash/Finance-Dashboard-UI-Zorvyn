import React from 'react';
import classes from '../../pages/Insights.module.css';

const MetricCardSmall = ({ label, value, icon: Icon, iconBg, iconColor, delayClass }) => {
  return (
    <div className={`${classes.metricCard} ${delayClass}`}>
      <div className={classes.metricIcon} style={{ backgroundColor: iconBg, color: iconColor }}>
        <Icon size={24} />
      </div>
      <div>
        <p className={classes.metricLabel}>{label}</p>
        <p className={classes.metricValue}>{value}</p>
      </div>
    </div>
  );
};

export default MetricCardSmall;
