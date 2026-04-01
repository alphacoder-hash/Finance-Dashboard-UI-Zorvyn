import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Shield, Eye, Lock, ArrowRight } from 'lucide-react';
import classes from './RoleGuard.module.css';

const RoleGuard = ({ children }) => {
  const { state, dispatch } = useAppContext();

  // If no role is selected (initial state), show the selection splash
  if (!state.role) {
    return (
      <div className={classes.overlay}>
        <div className={classes.glassContainer}>
          <div className={classes.logoSection}>
            <div className={classes.logoIcon}></div>
            <h1>Fintrixity</h1>
            <p>Institutional Finance Dashboard</p>
          </div>

          <div className={classes.content}>
            <h2>Select Access Level</h2>
            <p>Configure your session permissions to begin</p>

            <div className={classes.optionsGrid}>
              <button 
                className={`${classes.optionCard} ${classes.adminCard}`}
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
              >
                <div className={classes.iconWrapper}>
                  <Shield size={32} />
                </div>
                <div className={classes.textWrapper}>
                  <h3>Administrative Access</h3>
                  <p>Full control over accounts, transactions, and budgets.</p>
                </div>
                <ArrowRight size={20} className={classes.arrow} />
              </button>

              <button 
                className={`${classes.optionCard} ${classes.viewerCard}`}
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
              >
                <div className={classes.iconWrapper}>
                  <Eye size={32} />
                </div>
                <div className={classes.textWrapper}>
                  <h3>Guest Viewer</h3>
                  <p>Read-only access to analytics and historical data.</p>
                </div>
                <ArrowRight size={20} className={classes.arrow} />
              </button>
            </div>
          </div>

          <div className={classes.footer}>
            <Lock size={12} />
            <span>Secure End-to-End Encrypted Session</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
