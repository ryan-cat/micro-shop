import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logOut } from '../../store/actions/auth-actions';

const NavBar: React.FC = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut(true));
  };

  return (
    <Flex as="nav" wrap="wrap" padding="1rem" paddingX="2rem" bg="brand.500" color="white" {...props}>
      <Flex align="center" justify="space-between" width="100%">
        <Heading as={Link} to="/" size="lg">
          Micro Shop
        </Heading>

        {!isAuthenticated ? (
          <Box>
            <Button as={Link} to="log-in" bg="transparent" marginRight="5px">
              Log In
            </Button>

            <Button as={Link} to="/create-account" variant="outline">
              Create account
            </Button>
          </Box>
        ) : (
          <Button bg="transparent" onClick={handleLogOut}>
            Log Out
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
