import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * @hook useFilteredData
 * @description Centrally managed reactive hook that provides filtered, searched, and sorted 
 * transaction data to all Dashboard and Analytical components.
 * @performance Utilizes useMemo to ensure that intensive filtering and sorting operations 
 * only occur when the transaction list or filter parameters actually change.
 * @returns {Array<Object>} The memoized array of filtered and sorted transaction objects.
 */
export const useFilteredData = () => {
  const { state } = useAppContext();
  const { transactions, filters } = state;

  return useMemo(() => {
    let filtered = transactions.filter(tx => {
      // 1. Search (Description or ID)
      const searchTerm = (filters.search || '').toLowerCase();
      const description = (tx.description || '').toLowerCase();
      const orderId = (tx.orderId || '').toLowerCase();
      
      const matchSearch = description.includes(searchTerm) || 
                          orderId.includes(searchTerm);
      
      // 2. Type Filter (Income/Expense/All)
      const matchType = filters.type === 'all' ? true : tx.type === filters.type;
      
      // 3. Category Filter
      const matchCategory = filters.category === 'all' ? true : tx.category === filters.category;
      
      // 4. Date Range Filter
      let matchDate = true;
      if (filters.dateRange !== 'all') {
        const txDate = new Date(tx.date);
        const now = new Date();
        const diffDays = Math.ceil(Math.abs(now - txDate) / (1000 * 60 * 60 * 24));
        if (filters.dateRange === '7days') matchDate = diffDays <= 7;
        if (filters.dateRange === 'month') matchDate = diffDays <= 30;
      }
      
      return matchSearch && matchType && matchCategory && matchDate;
    });

    // 5. Sorting
    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (filters.sortField === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (filters.sortField === 'amount') {
        comparison = a.amount - b.amount;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [transactions, filters]) || [];
};
