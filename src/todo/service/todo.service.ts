import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Todo, User } from '@prisma/client';
import TodoNotFoundException from '../exceptions/todoNotFound.exception';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import TodoUpdateValidationException from '../exceptions/todoUpdateValidation.exception';
import CreateTodoDto from '../dto/createTodo.dto';
@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async getTodo(id: number): Promise<Todo | null> {
    try {
      return await this.prisma.todo.findUniqueOrThrow({ where: { id: Number(id) }});
    } catch (e) {
      throw new TodoNotFoundException(id);
    }
  }

  /*getUsersTodos(userId: number, params?: todoPaginateParams | undefined): Promise<Todo[]> {
    const {where, ...other} = params;
    return this.todos({
        ...other,
        where: {
            userId
        }
    })
}*/

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
    return await this.prisma.todo.create({ data });
  }

  async updateTodo(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    try {
      return await this.prisma.todo.update({
        where: { id: +id },
        data,
      });
    } catch (e) {
      if(e instanceof PrismaClientValidationError) {
        throw new TodoUpdateValidationException(e);
      } else {
        throw new TodoNotFoundException(id);
      }
    }
  }

  async deleteTodo(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id: +id },
    });
  }
}
