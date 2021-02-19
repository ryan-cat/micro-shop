import { Box, Container, Divider, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Cart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return <div>Nothing in your cart.</div>;
  }

  return (
    <Container>
      {items.map((x, index) => (
        <Box key={x.id}>
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

          {index !== items.length - 1 && <Divider my={10} />}
        </Box>
      ))}
    </Container>
  );
};

export default Cart;
