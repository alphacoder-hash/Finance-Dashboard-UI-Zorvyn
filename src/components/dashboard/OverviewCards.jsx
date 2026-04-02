import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { Wallet, PiggyBank, Briefcase, ChevronRight, TrendingUp } from 'lucide-react';
import classes from './Dashboard.module.css';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/currencyUtils';
import { useFilteredData } from '../../hooks/useFilteredData';
import Card from '../ui/Card';

const OverviewCards = () => {
  const { state } = useAppContext();
  const { currency } = state;
  const filteredTransactions = useFilteredData() || [];

  const totalIncome = filteredTransactions
    .filter(tx => tx?.type === 'income')
    .reduce((acc, curr) => acc + Number(curr?.amount || 0), 0);
    
  const totalExpenses = filteredTransactions
    .filter(tx => tx?.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr?.amount || 0), 0);

  const totalBalance = totalIncome - totalExpenses + 125000; // Mock base balance

  const balanceAnim = useCountUp(totalBalance);
  const incomeAnim = useCountUp(totalIncome);
  const expenseAnim = useCountUp(totalExpenses);

  return (
    <div className={classes.overviewGrid}>
      <Card variant="primary" className={`${classes.premiumCard} animate-fade-in`} noPadding>
        <div className={classes.glassOverlay}>
          <div className={classes.cardHeader}>
            <div className={classes.cardIconPrimary} style={{ background: 'rgba(255,255,255,0.2)', border: 'none' }}>
              <Wallet size={20} color="white" />
            </div>
            <div className={classes.growthBadge} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>
              <TrendingUp size={12} />
              <span>+4.2%</span>
            </div>
          </div>
          
          <div className={classes.cardBody} style={{ padding: '0', zIndex: 2 }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Total Balance</p>
            <h2 className={classes.heroAmount} style={{ color: 'white' }}>
              {formatCurrency(balanceAnim, currency)}
            </h2>
          </div>

          <div style={{ position: 'absolute', bottom: '60px', left: 0, width: '100%', height: '40px', opacity: 0.4 }}>
            <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
              <path 
                d="M0,35 Q20,38 40,30 T80,20 T120,25 T160,10 T200,15" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                className="animate-draw"
              />
            </svg>
          </div>
          
          <div className={classes.cardFooterPrimary} style={{ border: 'none', padding: 0 }}>
            <span>Account Details</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </Card>

      <Card className="animate-fade-in delay-100">
        <div className={classes.cardHeader}>
          <div className={classes.cardIcon}>
            <PiggyBank size={20} color="var(--text-primary)" />
          </div>
          <span>...</span>
        </div>
        <div className={classes.cardBody}>
          <p className={classes.cardTitle}>Income</p>
          <p className={classes.cardSubtitle}>Total Money In</p>
          <div className={classes.amountRow}>
            <h2 className={classes.amount} style={{ color: 'var(--success)' }}>{formatCurrency(incomeAnim, currency)}</h2>
            <span className={classes.badgeSecondary}>All Time</span>
          </div>
        </div>
        <div className={classes.cardFooter}>
          <span>View summary</span>
          <ChevronRight size={16} />
        </div>
      </Card>

      <Card className="animate-fade-in delay-200">
        <div className={classes.cardHeader}>
          <div className={classes.cardIcon}>
            <Briefcase size={20} color="var(--text-primary)" />
          </div>
          <span>...</span>
        </div>
        <div className={classes.cardBody}>
          <p className={classes.cardTitle}>Expenses</p>
          <p className={classes.cardSubtitle}>Total Money Out</p>
          <div className={classes.amountRow}>
            <h2 className={classes.amount} style={{ color: 'var(--expense)' }}>{formatCurrency(expenseAnim, currency)}</h2>
            <span className={classes.badgeSecondary}>All Time</span>
          </div>
        </div>
        <div className={classes.cardFooter}>
          <span>Analyze performance</span>
          <ChevronRight size={16} />
        </div>
      </Card>
    </div>
  );
};

export default OverviewCards;