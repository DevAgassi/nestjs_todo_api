import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UniqueConstraint } from './decorators/unique.email.decorator.validate';

@Module({
  controllers: [UserController],
  providers: [UserService, UniqueConstraint],
  exports: [UserService],
})
export class UserModule {}
