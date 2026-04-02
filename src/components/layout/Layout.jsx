import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import classes from './Layout.module.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Confetti from '../shared/Confetti';
import { useAppContext } from '../../context/AppContext';
import TransactionModal from '../shared/TransactionModal';

const Layout = ({ children }) => {
  const { state } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* Floating Action Button for Quick Add */}
      <button 
        className={classes.fab} 
        onClick={() => setIsModalOpen(true)}
        aria-label="Add Transaction"
      >
        <Plus size={32} strokeWidth={2.5} className={classes.fabIcon} />
      </button>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
