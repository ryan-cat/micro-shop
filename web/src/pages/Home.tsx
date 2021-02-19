import { Box, SimpleGrid, Center } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { ProductList } from '../types/product-types';
import Page from '../components/other/Page';
import { Pagination } from '../ui';
import { useHistory, useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import ProductCard from '../components/products/ProductCard';

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  const changePage = (page: number) => {
    history.push({ pathname: '/', search: queryString.stringify({ page, per_page }) });
  };

  return (
    <Page loading={loading} noData={!data?.count} noDataText="No products to show.">
      <Box width="85%" mx="auto">
        <SimpleGrid columns={4} spacing={10}>
          {data?.items.map((x) => (
            <ProductCard product={x} />
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
