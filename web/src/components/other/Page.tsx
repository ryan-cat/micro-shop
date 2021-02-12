import { Container, CircularProgress, Text } from '@chakra-ui/react';

export interface PageProps {
  loading?: boolean;
  noData?: boolean;
  noDataText?: string;
}

const Page: React.FC<PageProps> = (props) => {
  const { loading, noData, noDataText, children } = props;

  if (loading || noData) {
    return (
      <Container centerContent mt={20}>
        {loading && noData && <CircularProgress isIndeterminate color="brand.500" />}
        {!loading && noData && <Text fontSize="3xl">{noDataText}</Text>}
      </Container>
    );
  }

  return <>{children}</>;
};

Page.defaultProps = {
  noDataText: 'Nothing to show.'
};

export default Page;
