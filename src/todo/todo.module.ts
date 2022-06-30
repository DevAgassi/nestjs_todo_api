import { Module } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [TodoService, UserService],
  controllers: [TodoController],
})
export class TodoModule {}
