import React from 'react';
import classes from '../../pages/Insights.module.css';
import { Lightbulb, Zap, CheckCircle, Target } from 'lucide-react';

const iconMap = {
  Lightbulb,
  Zap,
  CheckCircle,
  Target
};

const InsightCard = ({ title, description, type, icon, color }) => {
  const Icon = iconMap[icon] || Lightbulb;
  
  return (
    <div className={`${classes.observationCard} ${classes[type]}`}>
      <div className={classes.insightIcon}>
        <Icon size={20} color={color} />
      </div>
      <div className={classes.insightContent}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InsightCard;
