import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { X } from 'lucide-react';
import classes from './TransactionModal.module.css';
import { CURRENCIES } from '../../utils/currencyUtils';
import { ACTIONS } from '../../context/ActionTypes';

const TransactionModal = ({ onClose, editTarget }) => {
  const { state, dispatch } = useAppContext();
  const { currency } = state;
  const currencySymbol = CURRENCIES[currency]?.symbol || '₹';

  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: CATEGORIES[0].id,
    type: 'expense'
  });
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (editTarget) {
      setForm({
        ...editTarget,
        amount: editTarget.amount.toString()
      });
    }
  }, [editTarget]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) newErrors.amount = 'Valid amount is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return;
    }

    const txData = {
      id: editTarget ? editTarget.id : Date.now().toString(),
      description: form.description,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: editTarget ? editTarget.date : new Date().toISOString().split('T')[0],
      time: editTarget ? editTarget.time : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Completed',
      orderId: editTarget ? editTarget.orderId : `INV_${Math.floor(Math.random() * 90000) + 10000}`
    };

    if (editTarget) {
      dispatch({ type: ACTIONS.EDIT_TRANSACTION, payload: txData });
    } else {
      if (txData.type === 'income') {
        dispatch({ type: ACTIONS.TRIGGER_CELEBRATION, payload: true });
        setTimeout(() => dispatch({ type: ACTIONS.TRIGGER_CELEBRATION, payload: false }), 3000);
      }
      dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: txData });
    }
    onClose();
  };

  return (
    <div className={classes.overlay}>
      <div className={`${classes.modal} ${isShaking ? classes.shake : ''} modal-enter`}>
        <div className={classes.modalHeader}>
          <h2 className={classes.modalTitle}>{editTarget ? 'Edit Transaction' : 'Add New Transaction'}</h2>
          <button className={classes.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <label className={classes.label}>Description</label>
            <input 
              type="text" 
              value={form.description}
              onChange={e => { setForm({...form, description: e.target.value}); setErrors({...errors, description: null}); }}
              placeholder="e.g. Apple Store, Uber"
              className={`${classes.input} ${errors.description ? classes.inputError : ''}`}
            />
            {errors.description && <span className={classes.errorText}>{errors.description}</span>}
          </div>

          <div className={classes.row}>
            <div className={classes.formGroup}>
              <label className={classes.label}>Amount ({currencySymbol})</label>
              <input 
                type="number" 
                value={form.amount}
                onChange={e => { setForm({...form, amount: e.target.value}); setErrors({...errors, amount: null}); }}
                placeholder="0.00"
                className={`${classes.input} ${errors.amount ? classes.inputError : ''}`}
                step="0.01"
              />
              {errors.amount && <span className={classes.errorText}>{errors.amount}</span>}
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>Category</label>
              <select 
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className={classes.select}
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={classes.formGroup}>
            <label className={classes.label}>Transaction Type</label>
            <div className={classes.typeToggle}>
              <button 
                type="button"
                className={`${classes.typeBtn} ${form.type === 'expense' ? classes.typeBtnExpense : ''}`}
                onClick={() => setForm({...form, type: 'expense'})}
              >Expense</button>
              <button 
                type="button"
                className={`${classes.typeBtn} ${form.type === 'income' ? classes.typeBtnIncome : ''}`}
                onClick={() => setForm({...form, type: 'income'})}
              >Income</button>
            </div>
          </div>

          <div className={classes.actions}>
            <button type="button" onClick={onClose} className={classes.cancelBtn}>Cancel</button>
            <button type="submit" className={classes.submitBtn}>{editTarget ? 'Save Changes' : 'Add Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;