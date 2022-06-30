import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../system/role.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  email;

  @IsString()
  @ApiProperty()
  password;

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
  isEnabled?;
}
