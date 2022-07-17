import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import CreateTodoDto from 'src/todo/dto/createTodo.dto';
import userNotFoundException from '../exceptions/userNotFound.exception';
import { UserService } from '../user.service';

@Injectable()
export class UserByIdPipe implements PipeTransform<any> {
  constructor(private readonly usersService: UserService) {}

  async transform(value: CreateTodoDto) {
    const user = await this.usersService.findById(value.userId);
    if (!user) {
      throw new userNotFoundException(value.userId);
    }

    return { ...value, user };
  }
}
