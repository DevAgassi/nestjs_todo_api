import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Prisma, Todo, User } from '@prisma/client';
import TodoNotFoundException from './exceptions/todoNotFound.exception';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import TodoUpdateValidationException from './exceptions/todoUpdateValidation.exception';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      take: 50,
    });
  }

  async getTodo(id: number): Promise<Todo | null> {
    try {
      return await this.prisma.todo.findUniqueOrThrow({
        where: { id: Number(id) },
      });
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

  async createTodo(
    data: Prisma.TodoCreateWithoutUserInput,
    user: User,
  ): Promise<Todo> {
    const todo = { ...data, userId: user.id };
    return await this.prisma.todo.create({ data: todo });
  }

  async updateTodo(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    try {
      return await this.prisma.todo.update({
        where: { id: +id },
        data,
      });
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        throw new TodoUpdateValidationException(e);
      } else {
        throw new TodoNotFoundException(id);
      }
    }
  }

  async deleteTodo(id: number): Promise<Todo> {
    const todo = await this.getTodo(id);
    return this.prisma.todo.delete({
      where: { id: todo.id },
    });
  }
}
