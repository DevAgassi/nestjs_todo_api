import { APP_FILTER } from '@nestjs/core';
import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [TodoModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
  ],
  exports: [PrismaService],
})
export class AppModule {}
