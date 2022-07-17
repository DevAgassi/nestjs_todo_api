import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../system/role.enum';
import { Match } from 'src/decorators/match.decorator.validate';
import { UniqueEmail } from '../decorators/unique.email.decorator.validate';

export class CreateUserDto {
  @IsEmail()
  @UniqueEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  @Match('password')
  passwordConfirm: string;

  @IsEnum(Role)
  @ApiProperty({
    description: `A list of user's roles`,
    example: ['USER'],
    enum: Role,
    default: [],
    isArray: true,
  })
  roles: Role;

  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  isEnabled?: boolean;
}
