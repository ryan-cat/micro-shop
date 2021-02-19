import { Box } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCart } from '../../store/actions/cart-actions';
import { CartItemList } from '../../types/cart-types';
import NavBar from './NavBar';
import Routes from './Routes';

const Layout: React.FC = () => {
  const [_, getCart] = useAxios<CartItemList>(
    {
      url: '/cart'
    },
    {
      manual: true
    }
  );

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    const result = await getCart();
    dispatch(setCart(result.data.items));
  };

  return (
    <>
      <NavBar />
      <Box paddingY="1rem" paddingX="2rem" paddingBottom={50}>
        <Routes />
      </Box>
    </>
  );
};

export default Layout;
