import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Text, Flex, ButtonProps } from '@chakra-ui/react';

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  numSurroundingPages?: number;
  currentPage: number;
  activeStyles?: ButtonProps;
  normalStyles?: ButtonProps;
  onChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { itemsPerPage, totalItems, currentPage, numSurroundingPages, activeStyles, normalStyles, onChange } = props;

  const numPages = Math.ceil(totalItems / itemsPerPage);
  let start = Math.max(currentPage - numSurroundingPages!, 1);
  let end = Math.min(currentPage + numSurroundingPages!, numPages);

  if (currentPage - start < numSurroundingPages!) {
    end += numSurroundingPages! - (currentPage - start);
  } else if (end - currentPage < numSurroundingPages!) {
    start -= numSurroundingPages! - (end - currentPage);
  }

  start = Math.max(start, 1);
  end = Math.min(end, numPages);

  const pages = Array.from(Array(numPages).keys()).slice(start - 1, end);

  const handleChange = (page: number) => {
    onChange && onChange(page);
  };

  return (
    <Flex alignItems="center">
      <Button {...normalStyles} mr={3} isDisabled={currentPage === 1} onClick={() => handleChange(currentPage - 1)}>
        <ChevronLeftIcon boxSize={5} />
      </Button>

      {start > 1 && (
        <>
          <Button {...normalStyles} mr={3} onClick={() => handleChange(1)}>
            1
          </Button>
          <Text fontSize="2xl" mr={3}>
            ...
          </Text>
        </>
      )}

      {pages.map((x) => (
        <Button {...(x + 1 === currentPage ? activeStyles : normalStyles)} key={x} mr={3} onClick={() => handleChange(x + 1)}>
          {x + 1}
        </Button>
      ))}

      {end < numPages && (
        <>
          <Text fontSize="2xl" mr={3}>
            ...
          </Text>
          <Button {...normalStyles} mr={3} onClick={() => handleChange(numPages)}>
            {numPages}
          </Button>
        </>
      )}

      <Button {...normalStyles} isDisabled={currentPage === numPages} onClick={() => handleChange(currentPage + 1)}>
        <ChevronRightIcon boxSize={5} />
      </Button>
    </Flex>
  );
};

Pagination.defaultProps = {
  numSurroundingPages: 2,
  activeStyles: { bgColor: 'brand.500', color: 'white' }
};
