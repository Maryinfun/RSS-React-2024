import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
