import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const NavBar: React.FC = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Flex as="nav" wrap="wrap" padding="1rem" paddingX="2rem" bg="brand.500" color="white" {...props}>
      <Flex align="center" justify="space-between" width="100%">
        <Heading as={Link} to="/" size="lg">
          Micro Shop
        </Heading>

        {!isAuthenticated && (
          <Box>
            <Button bg="transparent" marginRight="5px">
              Log In
            </Button>

            <Button as={Link} to="/create-account" variant="outline">
              Create account
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
