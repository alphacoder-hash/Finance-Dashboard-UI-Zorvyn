import React, { useState, useEffect } from 'react';
import classes from './Layout.module.css';
import { Sun, Moon, Lock, User, Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';
import { ACTIONS } from '../../context/ActionTypes';

const Header = () => {
  const { state, dispatch } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const searchRef = React.useRef(null);
  
  useKeyboardShortcuts({
    onSearch: () => searchRef.current?.focus(),
    onNewTransaction: () => dispatch({ type: ACTIONS.ADD_TOAST, payload: { message: 'Shortcuts active: Try Ctrl+K for search!', type: 'info' } })
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    dispatch({ type: ACTIONS.SET_THEME, payload: state.theme === 'dark' ? 'light' : 'dark' });
  };

  const toggleSidebar = () => {
    dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
  };

  return (
    <header className={`${classes.header} ${scrolled ? classes.headerScrolled : ''}`}>
      <button className={classes.menuBtn} onClick={toggleSidebar}>
        <Menu size={20} />
      </button>
      <div className={classes.searchBar}>
        <input 
          ref={searchRef}
          type="text" 
          placeholder="Search..." 
          value={state.filters.search}
          onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { search: e.target.value } })}
        />
      </div>
      
      <div className={classes.userActions}>
        <button 
          className={classes.avatar} 
          onClick={toggleTheme} 
          style={{ 
            cursor: 'pointer', 
            background: 'var(--bg-surface-light)', 
            border: '1px solid var(--border)',
            width: '44px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          title={`Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {state.theme === 'dark' ? <Sun size={18} color="#FFBA08" /> : <Moon size={18} color="#3B82F6" />}
        </button>

        {state.role === 'viewer' && (
          <div className={classes.viewOnlyBadge}>
            <Lock size={12} />
            View Only
          </div>
        )}

        <div className={classes.roleSwitcher}>
          <select 
            value={state.currency} 
            onChange={(e) => dispatch({ type: 'SET_CURRENCY', payload: e.target.value })}
            className={classes.roleSelect}
            style={{ width: '80px' }}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
        </div>

        <div className={classes.roleToggle}>
          <button 
            className={`${classes.toggleOption} ${state.role === 'viewer' ? classes.toggleActive : ''}`}
            onClick={() => {
              dispatch({ type: 'SET_ROLE', payload: 'viewer' });
              dispatch({ type: 'ADD_TOAST', payload: { message: 'Viewer Mode Active: Read-Only', type: 'info' } });
            }}
          >
            Viewer
          </button>
          <button 
            className={`${classes.toggleOption} ${state.role === 'admin' ? classes.toggleActive : ''}`}
            onClick={() => {
              dispatch({ type: 'SET_ROLE', payload: 'admin' });
              dispatch({ type: 'ADD_TOAST', payload: { message: 'Admin Access Enabled! 🔓', type: 'success' } });
            }}
          >
            Admin
          </button>
        </div>
        <div 
          className={classes.avatar} 
          style={{ cursor: 'pointer' }}
          onClick={() => dispatch({ type: 'ADD_TOAST', payload: { message: 'Profile settings opened', type: 'success' } })}
        >
          <User size={18} color="#FF5A1F" />
        </div>
        <button 
          className={classes.shareBtn}
          onClick={() => dispatch({ type: 'ADD_TOAST', payload: { message: 'Invite link copied to clipboard!', type: 'success' } })}
        >
          Share
        </button>
      </div>
    </header>
  );
};

export default Header;
