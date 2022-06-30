import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Prisma, Todo } from '@prisma/client';
import UpdateTodoDto from 'src/todo/dto/updateTodo.dto';
import CreateTodoDto from '../dto/createTodo.dto';
import { UserByIdPipe } from 'src/user/pipe/user-by-id.pipe';

@Controller({ path: 'todo' })
export class TodoController {
  userService: any;
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodo(): Promise<Todo[]> {
    return this.todoService.getAllTodo();
  }

  @Post()
  async createTodo(@Body(UserByIdPipe) postData: CreateTodoDto): Promise<Todo> {
    const {user, userId, ...other} = postData;
    
    return this.todoService.createTodo({
      ...other
     /* user: {
          connect: {
              id: userId,
          }
      }*/
    },  user);
  }

  @Get(':id')
  async getTodo(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.getTodo(+id);
  }

  @Put(':id')
  async Update(@Param('id') id: string, @Body() body: UpdateTodoDto): Promise<Todo> {
    return this.todoService.updateTodo(+id, body);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Todo> {
    return this.todoService.deleteTodo(+id);
  }
}
