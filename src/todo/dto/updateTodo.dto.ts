import { IsBoolean, IsDate, IsString } from 'class-validator';

export default class UpdateTodoDto {
    @IsString()
    title?: string;

    @IsBoolean()
    completed?: boolean;

    @IsString()
    description?: string;

    @IsString()
    uuid?: string;
    
    @IsString()
    @IsDate()
    createdAt?: Date | string;
}