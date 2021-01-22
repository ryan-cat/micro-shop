import { Box, Heading, Flex, Button } from '@chakra-ui/react';

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const NavBar: React.FC = (props) => {
  return (
    <Flex as="nav" wrap="wrap" padding="1rem" paddingX="2rem" bg="brand.500" color="white" {...props}>
      <Flex align="center" justify="space-between" width="100%">
        <Heading as="h1" size="lg">
          Micro Shop
        </Heading>

        <Box>
          <Button bg="transparent" marginRight="5px">
            Log In
          </Button>

          <Button bg="transparent" border="1px">
            Create account
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
