import { NotFoundException } from '@nestjs/common';

class TodoNotFoundException extends NotFoundException {
  constructor(todoId: number) {
    super(`Todo with id ${todoId} not found`);
  }
}

export default TodoNotFoundException;