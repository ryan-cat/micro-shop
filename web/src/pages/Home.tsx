import { Box, Text, SimpleGrid, Image, Center, Button } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { Product, ProductList } from '../types/product-types';
import Page from '../components/other/Page';
import { Pagination } from '../ui/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import { CartItem } from '../types/cart-types';

const defaultPerPage = 20;

interface HomeQueryParams {
  page?: string;
  per_page?: string;
}

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const query = queryString.parse(location.search) as HomeQueryParams;

  const page = (query.page && parseInt(query.page)) || 1;
  const per_page = (query.per_page && parseInt(query.per_page)) || defaultPerPage;

  const [{ data, loading }] = useAxios<ProductList>({
    url: '/products',
    params: {
      page,
      per_page
    }
  });

  const [_, addToCart] = useAxios<CartItem>(
    {
      url: '/cart',
      method: 'POST'
    },
    { manual: true }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  const changePage = (page: number) => {
    history.push({ pathname: '/', search: queryString.stringify({ page, per_page }) });
  };

  const handleAddToCart = (product: Product) => {
    try {
      addToCart({ data: { productId: product.id } });
    } catch (err) {}
  };

  return (
    <Page loading={loading} noData={!data?.count} noDataText="No products to show.">
      <Box width="85%" mx="auto">
        <SimpleGrid columns={4} spacing={10}>
          {data?.items.map((x) => (
            <Box alignItems="center" key={x.id}>
              <Center>
                <Image fit="contain" src={x.imageUrl} />
              </Center>

              <Text fontSize="3xl" color="blue.400" mt={5}>
                {x.name}
              </Text>
              <Text fontStyle="italic">Sold by {x.seller.name}</Text>

              <Text fontSize="2xl" mt={2}>
                ${x.price}
              </Text>
              <Text noOfLines={2} mt={2}>
                {x.description}
              </Text>

              <Center mt={5}>
                <Button bgColor="gray.300" onClick={() => handleAddToCart(x)}>
                  Add to Cart
                </Button>
              </Center>
            </Box>
          ))}
        </SimpleGrid>

        <Center mt={10}>
          <Pagination currentPage={page} itemsPerPage={per_page} totalItems={data?.count || 0} onChange={changePage} />
        </Center>
      </Box>
    </Page>
  );
};

export default Home;
