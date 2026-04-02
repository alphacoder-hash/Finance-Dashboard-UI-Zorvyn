import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Target, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import classes from './Insights.module.css';

import PageHeader from '../components/ui/PageHeader';
import { useAppContext } from '../context/AppContext';
import { MOCK_MONTHLY_STATS, HAND_PICKED_INSIGHTS, TOP_CATEGORIES } from '../data/mockInsights';
import InsightCard from '../components/analytics/InsightCard';
import MetricCardSmall from '../components/analytics/MetricCardSmall';
import { useFilteredData } from '../hooks/useFilteredData';
import { CURRENCIES, formatCurrency } from '../utils/currencyUtils';
import Skeleton from '../components/ui/Skeleton';
import ErrorBoundary from '../components/shared/ErrorBoundary';

const InsightsContent = () => {
  const { state } = useAppContext();
  const { currency } = state;
  const filteredTransactions = useFilteredData();
  const currencySymbol = CURRENCIES[currency]?.symbol || '₹';

  // Dynamic metrics derived from transaction state
  const metrics = useMemo(() => {
    const txs = filteredTransactions.length > 0 ? filteredTransactions : (state.transactions || []);
    
    if (!txs || txs.length === 0) {
      return { topCategory: 'Dining', incomeGrowth: '+12.5', savingsRate: 42 };
    }
    
    const categoryTotals = {};
    txs.filter(tx => tx?.type === 'expense').forEach(tx => {
      const cat = tx?.category || 'uncategorized';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(tx?.amount || 0);
    });
    
    let topCategory = 'Dining';
    let maxSpent = 0;
    Object.entries(categoryTotals).forEach(([cat, amount]) => {
      if (amount > maxSpent) {
        maxSpent = amount;
        topCategory = cat;
      }
    });

    return {
      topCategory: topCategory.charAt(0).toUpperCase() + topCategory.slice(1),
      incomeGrowth: '+12.5',
      savingsRate: 42
    };
  }, [state.transactions, filteredTransactions]);

  const [gaugeValue, setGaugeValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setGaugeValue(metrics.savingsRate), 300);
    return () => clearTimeout(timer);
  }, [metrics.savingsRate]);

  if (state.isLoading) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Financial Insights" subtitle="Analyzing your spending patterns..." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
          <Skeleton height="100px" borderRadius="var(--radius-lg)" />
          <Skeleton height="100px" borderRadius="var(--radius-lg)" />
          <Skeleton height="100px" borderRadius="var(--radius-lg)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <Skeleton height="350px" borderRadius="var(--radius-xl)" />
          <Skeleton height="350px" borderRadius="var(--radius-xl)" />
        </div>
      </div>
    );
  }
  
  const spendingData = TOP_CATEGORIES;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Financial Insights" subtitle="AI-driven observations powered by your spending patterns" />

      <div className={classes.metricsGrid}>
        <MetricCardSmall label="Highest Spending Category" value={metrics.topCategory} icon={AlertCircle} iconBg="var(--expense-bg)" iconColor="var(--expense)" delayClass="animate-fade-in delay-200" />
        <MetricCardSmall label="Monthly Income Trend" value={`${metrics.incomeGrowth}% This Quarter`} icon={TrendingUp} iconBg="var(--success-bg)" iconColor="var(--success)" delayClass="animate-fade-in delay-300" />
        <MetricCardSmall label="Target Savings Rate" value={`${metrics.savingsRate}% of Income`} icon={Target} iconBg="var(--accent-glow)" iconColor="var(--accent-primary)" delayClass="animate-fade-in delay-400" />
      </div>

      <div className={classes.chartsGrid}>
        <div className={`${classes.chartCard} animate-fade-in delay-500`}>
          <h3 className={classes.chartTitle}>Month-over-Month Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_MONTHLY_STATS} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dx={-10} tickFormatter={(val) => `${currencySymbol}${val/1000}k`} />
              <Tooltip cursor={{ fill: 'var(--bg-surface-light)' }} contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }} formatter={(val) => [formatCurrency(val, currency), '']} />
              <Bar dataKey="income" fill="var(--success)" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="var(--expense)" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${classes.chartCard} animate-fade-in delay-600`} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={classes.chartTitle}>Category Mix</h3>
          
          <div className={classes.donutWrapper}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie 
                  data={spendingData} 
                  innerRadius={70} 
                  outerRadius={95} 
                  paddingAngle={8} 
                  dataKey="value"
                  stroke="none"
                  animationBegin={200}
                  animationDuration={1500}
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color}40)` }} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className={classes.donutLabel}>
              <span className={classes.donutLabelValue}>{spendingData[0]?.value}%</span>
              <span className={classes.donutLabelName}>{spendingData[0]?.name}</span>
            </div>
          </div>

          <div className={classes.categoryGrid}>
            {spendingData.map((item) => (
              <div key={item.name} className={classes.categoryChip}>
                <div className={classes.categoryDot} style={{ backgroundColor: item.color, color: item.color }}></div>
                <span className={classes.categoryName}>{item.name}</span>
                <span className={classes.categoryPercent}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.observationsSection}>
        <div className={classes.sectionHeading}>
          <Sparkles size={20} color="var(--accent-primary)" />
          <span>Smart AI Observations</span>
        </div>
        <div className={classes.observationsGrid}>
          {HAND_PICKED_INSIGHTS.map((obs) => (
            <InsightCard key={obs.id} {...obs} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Insights = () => (
  <ErrorBoundary>
    <InsightsContent />
  </ErrorBoundary>
);

export default Insights;
