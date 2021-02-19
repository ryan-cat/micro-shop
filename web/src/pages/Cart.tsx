import { Box, Container, Divider, Flex, Text } from '@chakra-ui/layout';
import { Icon, IconButton, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks';
import { CartItem } from '../types/cart-types';
import { removeItemFromCart } from '../store/actions/cart-actions';

const Cart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const [_, removeFromCart] = useAxios(
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
    await removeFromCart({
      url: `/cart/${item.id}`
    });
    dispatch(removeItemFromCart(item));
  };

  return (
    <Container>
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
                Added On: {new Date(x.createdAt).toDateString()}
              </Text>
            </Box>

            <IconButton aria-label="Remove Cart Item" icon={<Icon as={FaTrash} />} onClick={() => handleRemoveFromCart(x)} />
          </Flex>

          {index !== items.length - 1 && <Divider my={10} />}
        </Box>
      ))}
    </Container>
  );
};

export default Cart;
