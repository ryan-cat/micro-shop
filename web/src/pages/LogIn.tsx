import { Container, FormControl, FormLabel, Heading, Input, Button, Alert, AlertIcon, AlertDescription, CloseButton, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import { handleTextChange } from '../utils/form-utilts';
import useAxios from 'axios-hooks';
import useApiErrorHandler from '../hooks/useApiErrorHandler';
import { AuthenticationResult } from '../types/auth-types';
import { logIn } from '../store/actions/auth-actions';
import { useDispatch } from 'react-redux';

const LogIn: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [{ loading }, callLogIn] = useAxios<AuthenticationResult, any>(
    {
      method: 'POST',
      url: '/accounts/authenticate'
    },
    { manual: true }
  );

  const { setError, message, clearMessage, validationErrors } = useApiErrorHandler();

  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      const response = await callLogIn({
        data: form
      });

      dispatch(logIn(response.data));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container centerContent mt="30px" p="25px" border="1px" borderRadius={5} borderColor="gray.300">
      <Heading>Log In</Heading>

      {message && (
        <Alert status="error" borderRadius="5px" mt="10px">
          <AlertIcon />
          <AlertDescription>{message}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={clearMessage} />
        </Alert>
      )}

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('email')}>
        <FormLabel>Email Address</FormLabel>
        <Input name="email" type="email" autoFocus value={form.email} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('email')}</FormErrorMessage>
      </FormControl>

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('password')}>
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" value={form.password} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('password')}</FormErrorMessage>
      </FormControl>

      <Button mt="25px" colorScheme="brand" isLoading={loading} onClick={handleCreate}>
        Log In
      </Button>
    </Container>
  );
};

export default LogIn;
