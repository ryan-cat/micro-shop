import { Product } from '../../types/product-types';
import { Box, Text, Image, Center, Button, useToast } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import { CartItem } from '../../types/cart-types';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/actions/cart-actions';
import { parseErrorMessage } from '../../utils/error-utils';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;

  const dispatch = useDispatch();
  const toast = useToast();

  const [{ loading }, addToCart] = useAxios<CartItem>(
    {
      url: '/cart',
      method: 'POST'
    },
    { manual: true }
  );

  const handleAddToCart = async (product: Product) => {
    try {
      const result = await addToCart({ data: { productId: product.id } });
      dispatch(addItemToCart(result.data));

      toast({
        title: 'Added Item to Cart!',
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

  return (
    <Box alignItems="center" key={product.id}>
      <Center>
        <Image boxSize="200px" fit="contain" src={product.imageUrl} />
      </Center>

      <Text fontSize="3xl" color="blue.400" mt={5}>
        {product.name}
      </Text>
      <Text fontStyle="italic">Sold by {product.seller.name}</Text>

      <Text fontSize="2xl" mt={2}>
        ${product.price}
      </Text>
      <Text noOfLines={2} mt={2}>
        {product.description}
      </Text>

      <Center mt={5}>
        <Button bgColor="gray.300" disabled={loading} onClick={() => handleAddToCart(product)}>
          Add to Cart
        </Button>
      </Center>
    </Box>
  );
};

export default ProductCard;
