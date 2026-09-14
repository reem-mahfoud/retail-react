import { Component } from 'react';
import ErrorFallbackPage from 'pages/error/ErrorFallbackPage';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  handleRetry() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackPage onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
