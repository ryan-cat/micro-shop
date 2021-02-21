import { Box, Container, Divider, Flex, Text } from '@chakra-ui/layout';
import { Icon, IconButton, Image, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks';
import { CartItem } from '../types/cart-types';
import { removeItemFromCart } from '../store/actions/cart-actions';
import { parseErrorMessage } from '../utils/error-utils';
import moment from 'moment';

const Cart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const toast = useToast();

  const [{ loading }, removeFromCart] = useAxios(
    {
      method: 'DELETE'
    },
    {
      manual: true
    }
  );

  if (items.length === 0) {
    return (
      <Text align="center" fontSize="3xl">
        Nothing in your cart.
      </Text>
    );
  }

  const handleRemoveFromCart = async (item: CartItem) => {
    try {
      await removeFromCart({
        url: `/cart/${item.id}`
      });
      dispatch(removeItemFromCart(item));

      toast({
        title: 'Removed Item to Cart!',
        status: 'success',
        isClosable: true
      });
    } catch (err) {
      toast({
        title: parseErrorMessage(err),
        status: 'error',
        isClosable: true
      });
    }
  };

  const totalPrice = () => {
    return (
      <Text fontSize="2xl" textAlign="right">
        Total: ${items.reduce((a, item) => a + item.product.price, 0)}
      </Text>
    );
  };

  return (
    <Container>
      {totalPrice()}

      <Box my={5}>
        {items.map((x, index) => (
          <Box key={x.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Box>
                <Flex>
                  <Image boxSize="100px" fit="contain" src={x.product.imageUrl} />

                  <Box ml={10}>
                    <Text fontSize="4xl">{x.product.name}</Text>
                    <Text fontSize="2xl">${x.product.price}</Text>
                  </Box>
                </Flex>

                <Text mt={5} fontStyle="italic" color="gray.500">
                  Added on {moment(x.createdAt).format('LL')}
                </Text>
              </Box>

              <IconButton aria-label="Remove Cart Item" icon={<Icon as={FaTrash} />} disabled={loading} onClick={() => handleRemoveFromCart(x)} />
            </Flex>

            {index !== items.length - 1 && <Divider my={10} />}
          </Box>
        ))}
      </Box>

      {totalPrice()}
    </Container>
  );
};

export default Cart;
