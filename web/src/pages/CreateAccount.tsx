import { Container, FormControl, FormLabel, Heading, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import { handleTextChange } from '../utils/form-utilts';
import useAxios from 'axios-hooks';
import useApiErrorHandler from '../hooks/useApiErrorHandler';
import { AuthenticationResult } from '../types/auth-types';
import { logIn } from '../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { Alert } from '../ui';

const CreateAccount: React.FC = () => {
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [{ loading }, createAccount] = useAxios<AuthenticationResult, any>(
    {
      method: 'POST',
      url: '/accounts'
    },
    { manual: true }
  );

  const { setError, message, clearMessage, validationErrors } = useApiErrorHandler();

  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      const response = await createAccount({
        data: form
      });

      dispatch(logIn(response.data));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container centerContent mt="30px" p="25px" border="1px" borderRadius={5} borderColor="gray.300">
      <Heading>Create an Account</Heading>

      {message && <Alert message={message} mt="10px" onClose={clearMessage} />}

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('email')}>
        <FormLabel>Email Address</FormLabel>
        <Input name="email" type="email" autoFocus value={form.email} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('email')}</FormErrorMessage>
      </FormControl>

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('name')}>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={form.name} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('name')}</FormErrorMessage>
      </FormControl>

      <FormControl mt="25px" isInvalid={validationErrors.hasValidationError('password')}>
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" value={form.password} onChange={(e) => handleTextChange(e, setForm)} />
        <FormErrorMessage>{validationErrors.getValidationError('password')}</FormErrorMessage>
      </FormControl>

      <Button mt="25px" colorScheme="brand" isLoading={loading} onClick={handleCreate}>
        Create
      </Button>
    </Container>
  );
};

export default CreateAccount;
