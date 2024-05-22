import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterAuthDto extends LoginAuthDto {
    @ApiProperty()
    @Transform(({value})=> value.trim())
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsOptional()
    role:string

   
}
