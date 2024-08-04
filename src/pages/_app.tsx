import { AppProps } from 'next/app';
import ErrorBoundary from '../components/errorBoundary/index';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import '../styles/style.css';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
