import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import styles from './Toast.module.css';
import { ACTIONS } from '../../context/ActionTypes';

const ToastItem = ({ toast }) => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: ACTIONS.REMOVE_TOAST, payload: toast.id });
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  const isSuccess = toast.type === 'success';

  return (
    <div className={`${styles.toast} ${isSuccess ? styles.success : styles.error}`}>
      <div className={styles.icon}>
        {isSuccess ? <CheckCircle size={18} /> : <XCircle size={18} />}
      </div>
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.closeBtn}
        onClick={() => dispatch({ type: ACTIONS.REMOVE_TOAST, payload: toast.id })}
      >
        <X size={14} />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { state } = useAppContext();

  // Defensive check to handle initial state or hydration gaps
  if (!state?.toasts || state.toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {state.toasts.map(toast => (
        <ToastItem key={toast?.id || Math.random()} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
