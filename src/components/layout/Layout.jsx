import React from 'react';
import classes from './Layout.module.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Confetti from '../shared/Confetti';
import { useAppContext } from '../../context/AppContext';

const Layout = ({ children }) => {
  const { state } = useAppContext();

  return (
    <div className={classes.layout} data-theme={state.theme}>
      <Confetti active={state.isCelebrating} />
      <Sidebar />
      <div className={classes.mainContent}>
        <Header />
        <main className={classes.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
