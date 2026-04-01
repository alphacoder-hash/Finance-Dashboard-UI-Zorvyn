import { useEffect } from 'react';

/**
 * @hook useKeyboardShortcuts
 * @description Provides a global listener for power-user shortcuts.
 * @shortcuts
 * - Meta/Ctrl + K: Focus Search
 * - Alt/Option + N: New Transaction
 * - Esc: Close Modals
 */
const useKeyboardShortcuts = ({ onSearch, onNewTransaction, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Focus Search (Cmd + K or Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearch?.();
      }

      // 2. Add New Transaction (Alt + N or Option + N)
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        onNewTransaction?.();
      }

      // 3. Global Close (Esc)
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onNewTransaction, onClose]);
};

export default useKeyboardShortcuts;
