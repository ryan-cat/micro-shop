import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, NumberInput, NumberInputField, Textarea } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useApiErrorHandler from '../hooks/useApiErrorHandler';
import { Product } from '../types/product-types';
import { Alert } from '../ui';
import { handleTextChange } from '../utils/form-utilts';

const SellProduct: React.FC = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '' });

  const [{ loading }, sellProduct] = useAxios<Product, any>(
    {
      method: 'POST',
      url: '/products'
    },
    { manual: true }
  );
  const { setError, message, clearMessage, validationErrors } = useApiErrorHandler();
  const history = useHistory();

  const formatPrice = (value: string) => {
    return value ? `$${value}` : '';
  };

  const handleSell = async () => {
    try {
      await sellProduct({
        data: {
          ...form,
          price: parseFloat(form.price.replace('$', '')) || undefined
        }
      });

      history.push('/');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container centerContent>
      <Heading>Sell a Product</Heading>

      {message && <Alert message={message} mt="25px" onClose={clearMessage} />}

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('name')}>
        <FormLabel>Product Name</FormLabel>
        <Input name="name" autoFocus value={form.name} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('name')}</FormErrorMessage>
      </FormControl>

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('description')}>
        <FormLabel>Product Description</FormLabel>
        <Textarea name="description" resize="none" rows={5} value={form.description} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('description')}</FormErrorMessage>
      </FormControl>

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('price')}>
        <FormLabel>Price</FormLabel>
        <NumberInput name="price" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: formatPrice(e) }))}>
          <NumberInputField />
        </NumberInput>
        <FormErrorMessage>{validationErrors.getValidationError('price')}</FormErrorMessage>
      </FormControl>

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('imageUrl')}>
        <FormLabel>Image Url</FormLabel>
        <Input name="imageUrl" value={form.imageUrl} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('imageUrl')}</FormErrorMessage>
      </FormControl>

      <Button mt="25px" colorScheme="brand" isLoading={loading} onClick={handleSell}>
        Sell
      </Button>
    </Container>
  );
};

export default SellProduct;
