import { Alert as ChakraAlert, AlertDescription, AlertIcon, AlertProps, CloseButton } from '@chakra-ui/react';
import React from 'react';

export interface ErrorProps extends AlertProps {
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<ErrorProps> = ({ message, onClose, ...rest }) => {
  return (
    <ChakraAlert status="error" borderRadius="5px" {...rest}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
    </ChakraAlert>
  );
};
