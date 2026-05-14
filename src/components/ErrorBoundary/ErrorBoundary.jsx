import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary container section" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <span style={{ fontSize: '4rem' }}>⚠️</span>
          <h2 style={{ marginTop: '20px' }}>Something went wrong.</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '20px 0' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre style={{ textAlign: 'left', background: 'rgba(255,0,0,0.1)', padding: '20px', marginTop: '40px', borderRadius: '8px', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
