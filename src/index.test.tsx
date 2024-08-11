import { test } from 'vitest';
import { setupStore } from './store/store';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './main/index';

test('rendering basic elements', async () => {
  const store = setupStore();

  ReactDOM.createRoot(document.createElement('div')).render(
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );

  return true;
});
