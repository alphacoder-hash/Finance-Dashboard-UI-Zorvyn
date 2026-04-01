import React from 'react';
import { Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyUtils';
import { useAppContext } from '../../context/AppContext';
import classes from './Dashboard.module.css';

const WalletCard = () => {
  const { state } = useAppContext();
  const { role, currency } = state;

  return (
    <div className={`${classes.walletCard} animate-fade-in delay-300`}>
      <div className={classes.walletHeader}>
        <div>
          <h3 className={classes.sectionTitle}>My Wallets</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Manage your accounts</p>
        </div>
        {role === 'admin' && (
          <button className={classes.walletAddBtn}>
            <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Add Card
          </button>
        )}
      </div>

      <div className={classes.currencyGrid}>
        <div className={classes.currencyItem}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>USD</span>
            <span className={classes.statusActive}>Active</span>
          </div>
          <h4>{formatCurrency(24678, currency)}</h4>
          <p>Limit is {formatCurrency(10000, currency)} a month</p>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px' }}>
            <div style={{ width: '45%', height: '100%', backgroundColor: 'var(--accent-primary)', borderRadius: '2px' }}></div>
          </div>
        </div>

        <div className={classes.currencyItem} style={{ opacity: 0.6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>EUR</span>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Inactive</span>
          </div>
          <h4>{formatCurrency(20517.52, currency)}</h4>
          <p>Limit is {formatCurrency(10000, currency)} a month</p>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px' }}>
            <div style={{ width: '25%', height: '100%', backgroundColor: 'var(--text-muted)', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;