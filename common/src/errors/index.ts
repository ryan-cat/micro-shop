import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Schema } from 'joi';

class BaseError extends Error {
  statusCode: number;
  name: string;
  data: any = {};
}

export interface ValidationErrorData {
  path: (string | number)[];
  message: string;
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Failed to authenticate the provided account.') {
    super();

    this.message = message;
    this.statusCode = 401;
    this.name = 'UNAUTHORIZED_ERROR';
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'The desired resource could not be found.') {
    super();

    this.message = message;
    this.statusCode = 404;
    this.name = 'NOT_FOUND_ERROR';
  }
}

export class BadRequestError extends BaseError {
  constructor(message = 'The provided input is invalid for this request.') {
    super();

    this.message = message;
    this.statusCode = 400;
    this.name = 'BAD_REQUEST';
  }
}

export class ValidationError extends BaseError {
  constructor(data: ValidationErrorData[], message = 'The operation could not be performed due to issues with the provided input.') {
    super();
    this.message = message;
    this.data = {
      errors: data
    };
    this.statusCode = 400;
    this.name = 'VALIDATION_ERROR';
  }
}

export class InternalServerError extends BaseError {
  constructor(message = 'Something went wrong.') {
    super();
    this.message = message;
    this.statusCode = 500;
    this.name = 'INTERNAL_SERVER_ERROR';
  }
}

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseError) {
      const error = exception as BaseError;

      response.status(error.statusCode).json({
        message: error.message,
        timestamp: new Date().toISOString(),
        name: error.name,
        data: error.data ?? {}
      });
    } else {
      response.status(500).json({
        message: process.env.NODE_ENV !== 'DEVELOPMENT' ? 'Internal Server Error' : exception.message,
        timestamp: new Date().toISOString(),
        name: 'INTERNAL_SERVER_ERROR',
        data: {},
        stackTrace: process.env.NODE_ENV !== 'DEVELOPMENT' ? undefined : exception.stack
      });
    }
  }
}

export const validate = <E>(item: E, validator: Schema, message = null, throwError = true): ValidationError => {
  if (validator == null) {
    throw new Error('Provided validator is null.');
  }

  const result = validator.validate(item, {
    errors: {
      wrap: {
        label: ''
      },
      label: 'key'
    },
    convert: false,
    abortEarly: false,
    allowUnknown: true
  });

  if (result && result.error) {
    const data = result.error.details.map((detail) => {
      const message = detail.message.charAt(0).toUpperCase() + detail.message.slice(1) + '.';
      return { path: detail.path, message };
    });

    if (throwError) {
      throw new ValidationError(data, message);
    } else {
      return new ValidationError(data, message);
    }
  }
};

enum MongoErrorCode {
  Unique = 11000
}

export const isMongoUniqueError = (err: any, key: string): boolean => {
  return err.name === 'MongoError' && err.code === MongoErrorCode.Unique && !!err.keyPattern[key];
};
