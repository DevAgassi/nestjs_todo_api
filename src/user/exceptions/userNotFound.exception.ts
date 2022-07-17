import { NotFoundException } from '@nestjs/common';

class userNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
  }
}

export default userNotFoundException;
