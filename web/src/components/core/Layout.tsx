import { Box } from '@chakra-ui/react';
import NavBar from './NavBar';
import Routes from './Routes';

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Box paddingY="1rem" paddingX="2rem">
        <Routes />
      </Box>
    </>
  );
};

export default Layout;
