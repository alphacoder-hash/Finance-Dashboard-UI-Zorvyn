import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { getCategoryConfig } from '../../data/categories';
import { Search, MoreHorizontal } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyUtils';
import classes from './Dashboard.module.css';
import { ACTIONS } from '../../context/ActionTypes';

import { useFilteredData } from '../../hooks/useFilteredData';

const RecentActivities = () => {
  const { state, dispatch } = useAppContext();
  const filteredData = useFilteredData() || [];
  const { currency } = state;

  const recent = (filteredData || []).slice(0, 5);

  if (recent.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '60px 20px',
        color: 'var(--text-secondary)',
        background: 'var(--bg-surface-light)',
        borderRadius: '16px',
        border: '1px dashed var(--border)',
        marginTop: '20px'
      }}>
        <Search size={40} strokeWidth={1.5} style={{ opacity: 0.5, marginBottom: '16px' }} />
        <p style={{ fontSize: '15px', fontWeight: 500 }}>No transactions found</p>
        <p style={{ fontSize: '13px', opacity: 0.7 }}>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <div className={classes.tableHeader}>
        <div style={{ flex: 2 }}>Activity</div>
        <div style={{ flex: 1.5 }} className={classes.hideMobile}>Order ID</div>
        <div style={{ flex: 1.5 }}>Date</div>
        <div style={{ flex: 1 }} className={classes.hideMobile}>Time</div>
        <div style={{ flex: 1 }}>Price</div>
        <div style={{ flex: 1 }}>Status</div>
        <div style={{ width: 40 }}></div>
      </div>

      <div className={classes.tableBody}>
        {recent.map((tx, idx) => {
          const config = getCategoryConfig(tx.category);
          const Icon = config.icon;
          
          return (
             <div key={tx.id} className={classes.tableRow} style={{ animationDelay: `${500 + (idx * 100)}ms` }}>
                  <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className={classes.activityIcon} style={{ color: config.color, backgroundColor: `${config.color}20` }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontWeight: 500 }}>{tx.description}</span>
                  </div>
                  
                  <div style={{ flex: 1.5, color: 'var(--text-secondary)' }} className={classes.hideMobile}>{tx.orderId}</div>
                  <div style={{ flex: 1.5, color: 'var(--text-secondary)' }}>{tx.date}</div>
                  <div style={{ flex: 1, color: 'var(--text-secondary)' }} className={classes.hideMobile}>{tx.time}</div>
                  
                  <div style={{ flex: 1, fontWeight: 600 }}>{formatCurrency(tx.amount, currency)}</div>
                  
                  <div style={{ flex: 1 }}>
                    <div className={classes.statusBadge}>
                      <span className={classes.statusDot}></span>
                      {tx.status}
                    </div>
                  </div>
                  
                  <div style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
                    <button 
                      style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
                      onClick={() => dispatch({ type: ACTIONS.ADD_TOAST, payload: { message: `Viewing details for ${tx.orderId}`, type: 'success' } })}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
             </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;