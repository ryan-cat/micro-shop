import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react';
import { Provider } from 'use-http';
import Layout from './components/core/Layout';

const customTheme = extendTheme({
  colors: {
    brand: theme.colors.green
  }
});

const App: React.FC = () => {
  return (
    <Provider url={process.env.REACT_APP_API_URL}>
      <ChakraProvider theme={customTheme}>
        <Layout />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
