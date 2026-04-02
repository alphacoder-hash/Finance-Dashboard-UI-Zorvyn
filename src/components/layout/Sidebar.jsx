import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Layout.module.css';
import { LayoutDashboard, PieChart, Receipt, Shield, Eye, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { ACTIONS } from '../../context/ActionTypes';

const Sidebar = () => {
  const { state, dispatch } = useAppContext();
  const { isSidebarOpen } = state;
  const location = useLocation();

  const toggleSidebar = () => {
    dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
  };

  return (
    <>
      <div
        className={`${classes.sidebarBackdrop} ${isSidebarOpen ? classes.backdropVisible : ''}`}
        onClick={() => dispatch({ type: ACTIONS.CLOSE_SIDEBAR })}
      ></div>
      <aside className={`${classes.sidebar} ${isSidebarOpen ? classes.sidebarOpen : ''}`}>
        <div className={classes.logo}>
          <div className={classes.logoIcon}></div>
          <span>Fintrixity</span>
        </div>

        <div className={classes.navSection}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${classes.navItem} ${classes.active}` : classes.navItem}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => isActive ? `${classes.navItem} ${classes.active}` : classes.navItem}>
            <PieChart size={20} />
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => isActive ? `${classes.navItem} ${classes.active}` : classes.navItem}>
            <Receipt size={20} />
            <span>Transactions</span>
          </NavLink>
        </div>

        <div className={classes.sidebarFooter}>
          <div className={classes.upgradeCard}>
            <h4>Upgrade Pro! 👑</h4>
            <p>Higher productivity with better organization</p>
            <button
              className={classes.upgradeBtn}
              onClick={() => alert("Upgrade modal coming soon!")}
            >
              Upgrade
            </button>
          </div>

          <div className={classes.userProfileCard}>
            <div className={classes.userAvatar}>
              {state.role === 'admin' ? <Shield size={16} /> : <Eye size={16} />}
            </div>
            <div className={classes.userInfo}>
              <p className={classes.userName}>Aryan R.</p>
              <p className={classes.userRoleText}>{state.role === 'admin' ? 'System Administrator' : 'Guest Viewer'}</p>
            </div>
            <button
              className={classes.logoutBtn}
              onClick={() => {
                if (window.confirm('Reset session and change role?')) {
                  dispatch({ type: ACTIONS.SET_ROLE, payload: '' });
                  window.location.reload();
                }
              }}
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
