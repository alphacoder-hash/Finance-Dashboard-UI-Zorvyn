import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MOCK_TRANSACTIONS } from '../data/mockTransactions';
import { ACTIONS } from './ActionTypes';

// Central state machine for Fintrixity. 
// Uses Context API + useReducer for predictable state transitions and persistence.
const AppContext = createContext();

const initialState = {
  role: 'admin',
  transactions: MOCK_TRANSACTIONS,
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    dateRange: 'all',
    sortField: 'date',
    sortOrder: 'desc'
  },
  currency: 'INR',
  toasts: [],
  theme: 'dark',
  isLoading: true,
  isCelebrating: false,
  budgets: [
    { category: 'food', limit: 12000 },
    { category: 'shopping', limit: 30000 },
    { category: 'transport', limit: 5000 },
    { category: 'entertainment', limit: 4000 }
  ],
  isSidebarOpen: false
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.TRIGGER_CELEBRATION:
      return { ...state, isCelebrating: action.payload };
    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case ACTIONS.CLOSE_SIDEBAR:
      return { ...state, isSidebarOpen: false };
    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload };
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    case ACTIONS.SET_CURRENCY:
      return { ...state, currency: action.payload };
    case ACTIONS.DATA_LOADED:
      return { ...state, isLoading: false };
    case ACTIONS.ADD_TRANSACTION:
      if (state.role === 'viewer') return { ...state, toasts: [...state.toasts, { id: Date.now(), message: 'Access Denied: Viewer role remains view-only.', type: 'error' }] };
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        toasts: [...state.toasts, { id: Date.now(), message: 'Transaction Added!', type: 'success' }]
      };
    case ACTIONS.DELETE_TRANSACTION:
      if (state.role === 'viewer') return { ...state, toasts: [...state.toasts, { id: Date.now(), message: 'Access Denied: Cannot delete in viewer mode.', type: 'error' }] };
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
        toasts: [...state.toasts, { id: Date.now(), message: 'Transaction deleted.', type: 'error' }]
      };
    case ACTIONS.EDIT_TRANSACTION:
      if (state.role === 'viewer') return { ...state, toasts: [...state.toasts, { id: Date.now(), message: 'Access Denied: Cannot edit in viewer mode.', type: 'error' }] };
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
        toasts: [...state.toasts, { id: Date.now(), message: 'Transaction updated!', type: 'success' }]
      };
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ACTIONS.RESET_DATA:
      return { ...state, transactions: MOCK_TRANSACTIONS, toasts: [...state.toasts, { id: Date.now(), message: 'Data Reset to Defaults', type: 'success' }] };
    case ACTIONS.ADD_TOAST:
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };
    case ACTIONS.REMOVE_TOAST:
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  // Try to load from local storage
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem('fintrixity_state');
      if (saved) {
        const parsed = JSON.parse(saved);

        // Safety: Ensure filters structure is correct and category is string 'all'
        if (parsed.filters && Array.isArray(parsed.filters.category)) {
          parsed.filters.category = 'all';
        }

        // Ensure all required filter keys exist
        parsed.filters = { ...initial.filters, ...(parsed.filters || {}) };

        // Force reset if localStorage has an empty transactions array
        if (!parsed.transactions || parsed.transactions.length === 0) {
          return { ...parsed, toasts: [], transactions: initial.transactions };
        }
        // Ensure toasts array is empty on refresh
        return { ...parsed, toasts: [], isLoading: true };
      }
    } catch (e) {
      console.error('Failed to parse local storage', e);
    }
    return initial;
  });

  // Backend load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: ACTIONS.DATA_LOADED });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update light/dark mode css property natively
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Save to locale storage on change
  useEffect(() => {
    const stateToSave = { ...state, toasts: [] }; // don't save ephemeral toasts
    localStorage.setItem('fintrixity_state', JSON.stringify(stateToSave));
  }, [state]);

  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
