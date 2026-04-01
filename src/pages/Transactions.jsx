import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getCategoryConfig, CATEGORIES } from '../data/categories';
import { Download, Plus } from 'lucide-react';
import TransactionModal from '../components/shared/TransactionModal';
import TransactionTable from '../components/transactions/TransactionTable';
import PageHeader from '../components/ui/PageHeader';
import classes from './Transactions.module.css';
import { useFilteredData } from '../hooks/useFilteredData';
import { ACTIONS } from '../context/ActionTypes';

import Skeleton from '../components/ui/Skeleton';

const Transactions = () => {
  const { state, dispatch } = useAppContext();
  const filteredData = useFilteredData();
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const openAdd = () => { setEditTarget(null); setShowModal(true); };
  const openEdit = (tx) => { setEditTarget(tx); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditTarget(null); };

   const handleFilterChange = (updates) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: updates });
  };

  if (state.isLoading) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Transactions" subtitle="Fetching transaction history..." />
        <Skeleton height="80px" marginBottom="24px" />
        <Skeleton height="400px" />
      </div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
    }
  };

  const exportData = (format) => {
    if (format === 'csv') {
      const headers = ['ID', 'Date', 'Description', 'Amount', 'Category', 'Type', 'Status'];
      const rows = filteredData.map(tx => [tx.orderId, tx.date, tx.description, tx.amount, tx.category, tx.type, tx.status]);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredData, null, 2));
      const link = document.createElement('a');
      link.setAttribute("href", dataStr);
      link.setAttribute("download", "transactions.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Transactions" 
        subtitle="View and manage your financial records."
        action={
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={() => exportData('csv')}>CSV</button>
            <button className="btn-secondary" onClick={() => exportData('json')}>JSON</button>
            <button 
              className="btn-primary" 
              onClick={() => {
                if (state.role === 'viewer') {
                  dispatch({ type: ACTIONS.ADD_TOAST, payload: { message: 'Access Denied: Admin role required to add transactions.', type: 'error' }});
                } else {
                  setShowModal(true);
                }
              }}
            >
              <Plus size={18} style={{ marginRight: '8px' }} />
              Add New
            </button>
          </div>
        }
      />

      <div className={classes.filtersCard}>
        <input
          type="text"
          placeholder="Search descriptions or ID..."
          className={classes.searchInput}
          value={state.filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />
        <select
          className={classes.selectInput}
          value={state.filters.type}
          onChange={(e) => handleFilterChange({ type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className={classes.selectInput}
          value={state.filters.category}
          onChange={(e) => handleFilterChange({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          className={classes.selectInput}
          value={state.filters.dateRange}
          onChange={(e) => handleFilterChange({ dateRange: e.target.value })}
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <TransactionTable
        data={filteredData}
        userRole={state.role}
        onEdit={openEdit}
        onDelete={handleDelete}
        sortField={state.filters.sortField}
        sortOrder={state.filters.sortOrder}
        onSort={(field) => {
          if (state.filters.sortField === field) {
            handleFilterChange({ sortOrder: state.filters.sortOrder === 'asc' ? 'desc' : 'asc' });
          } else {
            handleFilterChange({ sortField: field, sortOrder: 'desc' });
          }
        }}
      />
    </div>
  );
};

export default Transactions;
