import { HttpException, HttpStatus } from '@nestjs/common';

interface Error {
  message: string;
  error: string;
  createdAt?: never;
  [k: string]: string;
}

export class Exception extends HttpException {
  constructor(error: Error = null, message: string = null) {
    super(
      {
        message: message ?? error.message,
        name: error.name,
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
