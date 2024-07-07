import { ReactNode, ErrorInfo, Component } from 'react';
interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
class ErrorBoundary extends Component<Props, State> {
  public state: Readonly<State> = {
    error: null,
    errorInfo: null,
  };
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Handle error:', error, errorInfo)
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="error-block">
          {this.state.error.toString()}
          <br />
          <br />
          <br />
          <p className='error-message'>
          {this.state.errorInfo?.componentStack}

          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
