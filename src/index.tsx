import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
