import { Box, Heading, Flex, Button, IconButton, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logOut } from '../../store/actions/auth-actions';
import { FaCartArrowDown } from 'react-icons/fa';

const NavBar: React.FC = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut(true));
  };

  return (
    <Flex as="nav" wrap="wrap" padding="1rem" paddingX="2rem" bg="brand.500" color="white" {...props}>
      <Flex align="center" justify="space-between" width="100%">
        <Flex alignItems="center">
          <Heading as={Link} to="/" size="lg" mr={35}>
            Micro Shop
          </Heading>

          {isAuthenticated && (
            <Button as={Link} to="/sell-product" color="brand.500">
              Sell a Product
            </Button>
          )}
        </Flex>

        {!isAuthenticated ? (
          <Box>
            <Button as={Link} to="log-in" bg="transparent" mr={5}>
              Log In
            </Button>

            <Button as={Link} to="/create-account" variant="outline">
              Create account
            </Button>
          </Box>
        ) : (
          <>
            <Box>
              <IconButton bgColor="transparent" aria-label="Cart" mr={3} icon={<Icon boxSize={7} as={FaCartArrowDown} />} />

              <Button bg="transparent" onClick={handleLogOut}>
                Log Out
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
