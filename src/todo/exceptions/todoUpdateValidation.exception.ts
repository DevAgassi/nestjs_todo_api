import { NotFoundException } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime';

class TodoUpdateValidationException extends NotFoundException {
  constructor(e: PrismaClientValidationError) {
    super({ message:`Missing field or incorrect field type provided`, error: 'TodoUpdateValidationException', statusCode: 422});
  }
}

export default TodoUpdateValidationException;