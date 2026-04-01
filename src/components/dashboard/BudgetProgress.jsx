import React from 'react';
import { formatCurrency } from '../../utils/currencyUtils';
import { useAppContext } from '../../context/AppContext';
import { getCategoryConfig } from '../../data/categories';
import classes from './Dashboard.module.css';

const BudgetProgress = () => {
  const { state } = useAppContext();
  const { budgets, transactions, currency } = state;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const budgetData = budgets.map(budget => {
    const config = getCategoryConfig(budget.category);
    
    // Calculate total spent in this category for the current month
    const spent = transactions
      .filter(tx => {
        const txDate = new Date(tx.date);
        return tx.category === budget.category && 
               tx.type === 'expense' &&
               txDate.getMonth() === currentMonth &&
               txDate.getFullYear() === currentYear;
      })
      .reduce((acc, curr) => acc + curr.amount, 0);

    const percent = Math.min((spent / budget.limit) * 100, 100);
    const isOver = spent > budget.limit * 0.9;

    return {
      ...budget,
      config,
      spent,
      percent,
      isOver
    };
  });

  return (
    <div className={`${classes.card} animate-fade-in delay-500`}>
      <div className={classes.chartHeader}>
        <h3 className={classes.sectionTitle}>Monthly Budgets</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
        {budgetData.map(item => (
          <div key={item.category}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px', 
                  backgroundColor: `${item.config.color}15`, 
                  color: item.config.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <item.config.icon size={16} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.config.name}</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>
                {formatCurrency(item.spent, currency)} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {formatCurrency(item.limit, currency)}</span>
              </span>
            </div>
            
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: 'var(--bg-surface-light)', 
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid var(--border)'
            }}>
              <div style={{ 
                width: `${item.percent}%`, 
                height: '100%', 
                backgroundColor: item.isOver ? 'var(--expense)' : item.config.color,
                borderRadius: '4px',
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetProgress;
