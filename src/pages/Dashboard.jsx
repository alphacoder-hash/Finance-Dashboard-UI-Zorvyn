import React from 'react';
import { useAppContext } from '../context/AppContext';
import PageHeader from '../components/ui/PageHeader';
import OverviewCards from '../components/dashboard/OverviewCards';
import CashFlowChart from '../components/dashboard/CashFlowChart';
import RecentActivities from '../components/dashboard/RecentActivities';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import WalletCard from '../components/dashboard/WalletCard';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import classes from '../components/dashboard/Dashboard.module.css';

import Skeleton from '../components/ui/Skeleton';

const Dashboard = () => {
  const { state, dispatch } = useAppContext();

  if (state.isLoading) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Overview" subtitle="Syncing with your financial accounts..." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
          <Skeleton height="160px" borderRadius="var(--radius-xl)" />
          <Skeleton height="160px" borderRadius="var(--radius-xl)" />
          <Skeleton height="160px" borderRadius="var(--radius-xl)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '24px' }}>
          <Skeleton height="400px" borderRadius="var(--radius-xl)" />
          <Skeleton height="400px" borderRadius="var(--radius-xl)" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Overview" 
        subtitle="Here is the summary of overall data"
        rightContent={
          <>
            <button 
              style={{ padding: '8px 16px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '13px', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'ADD_TOAST', payload: { message: 'Date range changed (Mock)', type: 'success' } })}
            >This Month ⌄</button>
            <button 
              style={{ padding: '8px 16px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '13px', cursor: 'pointer' }}
              onClick={() => {
                if (window.confirm('Are you sure you want to reset demo data?')) {
                  dispatch({ type: 'RESET_DATA' });
                }
              }}
            >⟳ Reset Data</button>
          </>
        }
      />

      <OverviewCards />
      
      <div className={classes.middleGrid}>
        <WalletCard />
        <CashFlowChart />
      </div>

      {/* Spending Breakdown Donut - categorical visualization */}
      <div className={classes.bottomGrid}>
        <SpendingBreakdown />

        <div className={`${classes.chartCard} animate-fade-in delay-500`} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={classes.chartTitle} style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Recent Activities</h3>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
