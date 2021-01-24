import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react';
import axios from 'axios';
import { Provider as HttpProvider } from 'use-http';
import Layout from './components/core/Layout';
import { configure } from 'axios-hooks';
import { Provider } from 'react-redux';
import store from './store';

const customTheme = extendTheme({
  colors: {
    brand: theme.colors.green
  }
});

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

configure({ axios: axiosInstance });

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
