import React from 'react';
import { getCategoryConfig } from '../../data/categories';
import { Edit2, Trash2, Search } from 'lucide-react';
import classes from '../../pages/Transactions.module.css';
import { formatCurrency } from '../../utils/currencyUtils';
import { useAppContext } from '../../context/AppContext';
import { ACTIONS } from '../../context/ActionTypes';

// Transaction ledger with sortable columns and click-to-copy haptics.
const TransactionTable = ({ data, userRole, onEdit, onDelete, sortField, sortOrder, onSort }) => {
  const { state, dispatch } = useAppContext();
  const { currency } = state;

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    dispatch({ 
      type: ACTIONS.ADD_TOAST, 
      payload: { id: Date.now(), message: 'ID Copied to Clipboard!', type: 'success' } 
    });
  };
  
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return <span style={{ marginLeft: '4px', fontSize: '10px' }}>{sortOrder === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className={classes.tableCard}>
      <div className={classes.tableHeader}>
        <div style={{ flex: 1.5, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => onSort('date')}>
          Order ID & Date {renderSortIcon('date')}
        </div>
        <div style={{ flex: 2 }}>Description</div>
        <div style={{ flex: 1.5 }}>Category</div>
        <div style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => onSort('amount')}>
          Amount {renderSortIcon('amount')}
        </div>
        <div style={{ flex: 1 }}>Type / Status</div>
        {userRole === 'admin' && <div style={{ width: 80, textAlign: 'center' }}>Actions</div>}
      </div>

      <div>
        {data.length === 0 ? (
          <div style={{ 
            padding: '100px 20px', 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: 'var(--bg-surface-light)',
            margin: '20px',
            borderRadius: '16px',
            border: '1px dashed var(--border)'
          }}>
            <Search size={48} strokeWidth={1} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>No transactions match your filters</h4>
            <p style={{ margin: 0, fontSize: '13px', maxWidth: '300px', opacity: 0.7 }}>Try adjusting your search terms or filters to find what you're looking for.</p>
          </div>
        ) : (
          data.map((tx, idx) => {
            const config = getCategoryConfig(tx.category);
            const Icon = config.icon;
            return (
              <div key={tx.id} className={classes.tableRow} style={{ animationDelay: `${idx * 50}ms` }}>
                <div style={{ flex: 1.5 }}>
                  <div className={classes.copyable} style={{ fontWeight: 500, cursor: 'pointer' }} onClick={() => handleCopy(tx.orderId)}>{tx.orderId}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{tx.date}</div>
                </div>
                
                <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={classes.iconBox} style={{ backgroundColor: `${config.color}20`, color: config.color }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontWeight: 500 }}>{tx.description}</span>
                </div>

                <div style={{ flex: 1.5, color: 'var(--text-secondary)' }}>
                  {config.name}
                </div>

                <div style={{ flex: 1 }}>
                  <span className={tx.type === 'income' ? classes.amountIncome : classes.amountExpense}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, currency)}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <span className={`${classes.statusPill} ${tx.type === 'income' ? classes.pillIncome : classes.pillExpense}`}>
                    {tx.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </div>

                {userRole === 'admin' && (
                  <div style={{ width: 80, display: 'flex', justifyContent: 'center' }} className={classes.actionGroup}>
                    <button className={classes.iconBtn} onClick={() => onEdit(tx)}><Edit2 size={16} /></button>
                    <button className={`${classes.iconBtn} ${classes.deleteBtn}`} onClick={() => onDelete(tx.id)}><Trash2 size={16} /></button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TransactionTable;