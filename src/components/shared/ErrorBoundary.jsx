import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Fintrixity Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          backgroundColor: 'rgba(239, 68, 68, 0.05)', 
          borderRadius: '16px', 
          border: '1px dashed var(--expense)',
          textAlign: 'center',
          margin: '20px'
        }}>
          <AlertCircle size={40} color="var(--expense)" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Something went wrong</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            We encountered a data rendering error in this component.
          </p>
          <button 
            className="btn-primary" 
            onClick={() => window.location.reload()}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
          >
            <RefreshCcw size={16} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
