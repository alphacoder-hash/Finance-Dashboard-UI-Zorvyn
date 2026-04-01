import React from 'react';
import { PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/currencyUtils';
import { useAppContext } from '../../context/AppContext';
import classes from './Dashboard.module.css';
import { useFilteredData } from '../../hooks/useFilteredData';

const COLORS = ['#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#EF4444'];

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className={classes.tooltip}>
        <p style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '4px' }}>{item.name}</p>
        <p style={{ color: item.payload.color }}>{formatCurrency(item.value, currency)}</p>
      </div>
    );
  }
  return null;
};

const SpendingBreakdown = () => {
  const { state } = useAppContext();
  const { currency } = state;
  const filteredTransactions = useFilteredData() || [];

  const data = React.useMemo(() => {
    const totalsMap = {};
    filteredTransactions.filter(tx => tx?.type === 'expense').forEach(tx => {
      const catName = tx?.category || 'Uncategorized';
      totalsMap[catName] = (totalsMap[catName] || 0) + Number(tx?.amount || 0);
    });
    
    return Object.entries(totalsMap).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }));
  }, [filteredTransactions]);

  const totalAmount = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={`${classes.chartCard} animate-fade-in delay-400`}>
      <div className={classes.chartHeader}>
        <h3 className={classes.sectionTitle}>Spending Breakdown</h3>
      </div>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        {totalAmount === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
            <PieIcon size={48} strokeWidth={1} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ fontSize: '14px', fontWeight: 500 }}>No expenses recorded</p>
            <p style={{ fontSize: '12px', opacity: 0.6 }}>Try changing your filters or date range</p>
          </div>
        ) : (
          <>
            <div style={{ width: '50%', height: '200px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip currency={currency} />} />
                </PieChart>
              </ResponsiveContainer>
              
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800 }}>{formatCurrency(totalAmount, currency)}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Total</div>
              </div>
            </div>

            <div style={{ width: '50%', paddingLeft: '24px' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.map(item => (
                  <li key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{formatCurrency(item.value, currency)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpendingBreakdown;