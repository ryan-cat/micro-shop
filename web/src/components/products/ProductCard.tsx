import { Product } from '../../types/product-types';
import { Box, Text, Image, Center, Button } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import { CartItem } from '../../types/cart-types';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/actions/cart-actions';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;

  const dispatch = useDispatch();

  const [_, addToCart] = useAxios<CartItem>(
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
    } catch (err) {}
  };

  return (
    <Box alignItems="center" key={product.id}>
      <Center>
        <Image fit="contain" src={product.imageUrl} />
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
        <Button bgColor="gray.300" onClick={() => handleAddToCart(product)}>
          Add to Cart
        </Button>
      </Center>
    </Box>
  );
};

export default ProductCard;
