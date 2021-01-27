import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react';
import { Provider as HttpProvider } from 'use-http';
import Layout from './components/core/Layout';
import { Provider } from 'react-redux';
import store from './store';
import './configs/api-config';

const customTheme = extendTheme({
  colors: {
    brand: theme.colors.green
  }
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HttpProvider url={process.env.REACT_APP_API_URL}>
        <ChakraProvider theme={customTheme}>
          <Layout />
        </ChakraProvider>
      </HttpProvider>
    </Provider>
  );
};

export default App;
