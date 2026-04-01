import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/currencyUtils';
import classes from './Dashboard.module.css';
import { useFilteredData } from '../../hooks/useFilteredData';

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className={classes.glassOverlay} style={{ padding: '12px', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Balance History</p>
        <div className={classes.tooltipRow} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {formatCurrency(payload[0].value, currency)}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 600 }}>+2.4%</span>
        </div>
      </div>
    );
  }
  return null;
};

const CashFlowChart = () => {
  const { state } = useAppContext();
  const { currency } = state;
  const [activeRange, setActiveRange] = React.useState('Month');
  const filteredTransactions = useFilteredData() || [];

  const data = React.useMemo(() => {
    // Filter by range logic (simulated for demo)
    const txLimit = activeRange === 'Week' ? 7 : 30;
    
    // Group transactions by date
    const grouped = (filteredTransactions || []).slice(0, txLimit).reduce((acc, tx) => {
      const date = tx?.date || 'unknown';
      const type = tx?.type || 'expense';
      const amount = Number(tx?.amount || 0);

      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      acc[date][type] += amount;
      return acc;
    }, {});
    
    // Transform to chart format
    const transformed = Object.values(grouped).map(item => ({
      name: item.date,
      value: (item.income - item.expense) + 45000 // Base balance
    }));

    return transformed.length > 0 ? transformed : [{ name: 'N/A', value: 45000 }];
  }, [filteredTransactions, activeRange]);

  const currentGrowth = activeRange === 'Week' ? '₹2,400' : '₹12,850';

  return (
    <div className={`${classes.chartCard} ${classes.trendChartGlass} animate-fade-in delay-400`}>
      <div className={classes.trendHeader}>
        <div>
          <h3 className={classes.sectionTitle}>Balance Trend</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <h2 className={classes.sectionAmount} style={{ margin: 0 }}>{formatCurrency(data[data.length-1]?.value || 0, currency)}</h2>
            <div className={classes.growthBadge}>
              <TrendingUp size={12} />
              <span>{currentGrowth}</span>
            </div>
          </div>
        </div>
        <div className={classes.toggleGroup} style={{ background: 'var(--bg-surface-light)', padding: '4px', borderRadius: '12px' }}>
          <button 
            className={`${classes.toggleBtn} ${activeRange === 'Week' ? classes.toggleActive : ''}`}
            onClick={() => setActiveRange('Week')}
          >
            Week
          </button>
          <button 
            className={`${classes.toggleBtn} ${activeRange === 'Month' ? classes.toggleActive : ''}`}
            onClick={() => setActiveRange('Month')}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className={classes.chartWrapper} style={{ marginLeft: '-15px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5A1F" stopOpacity={0.4}/>
                  <stop offset="50%" stopColor="#FF5A1F" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF5A1F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} dy={10} hide={activeRange === 'Month'} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    cursor={{ stroke: 'rgba(255, 90, 31, 0.4)', strokeWidth: 2 }}
                    content={<CustomTooltip currency={currency} />}
                    wrapperStyle={{ outline: 'none' }}
                  />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#FF5A1F" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                className={classes.chartGlow}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;