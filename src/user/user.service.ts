import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import userNotFoundException from './exceptions/userNotFound.exception';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { name, email, password } = data;
    return await this.prisma.user.create({ data: { name, email, password } });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findById(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw new userNotFoundException(id);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { email } });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
