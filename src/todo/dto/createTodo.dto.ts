import { User } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsOptional, IsInt } from 'class-validator';

export default class CreateTodoDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    uuid?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @Transform(({ value }) => String(value), { toClassOnly: true })
    @Type(() => Date)
    @IsDate()
    createdAt?: Date;

    @IsInt()
    @Type(() => Number)
    userId: number;

    @IsOptional()
    @IsNotEmpty()
    user?: User;
}