import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { internalServerError, ValidationErrors } from '../utils/error-utils';

interface UseApiErrorHandlerOutput {
  error: AxiosError | null;
  code: number | null;
  name: string;
  message: string;
  data: any;
  validationErrors: ValidationErrors;
  setError: (err: AxiosError) => void;
  clearMessage: () => void;
}

const useApiErrorHandler = (err: AxiosError | null = null): UseApiErrorHandlerOutput => {
  const [error, setErr] = useState(err);
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(new ValidationErrors());

  useEffect(() => {
    parseError();
  }, [error]);

  const parseError = () => {
    const name = error?.response?.data.name || '';
    const code = error?.response?.status || null;
    let data = error?.response?.data.data || {};
    let validationErrors = new ValidationErrors(error?.response?.data.data.errors || []);

    let message = error?.response?.data.message || '';
    if (error && Object.keys(data).length !== 0) {
      message = '';
    } else if (error && !message) {
      message = internalServerError;
    }

    setCode(code);
    setName(name);
    setMessage(message);
    setData(data);
    setValidationErrors(validationErrors);
  };

  const clearMessage = () => {
    setMessage('');
  };

  const setError = (err: AxiosError) => {
    setErr(err);
  };

  return {
    error,
    code,
    name,
    message,
    data,
    validationErrors,
    clearMessage,
    setError
  };
};

export default useApiErrorHandler;
