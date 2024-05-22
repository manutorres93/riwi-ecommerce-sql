import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    
    @ApiProperty()
    @Transform(({value})=> value.trim())
    @MinLength(6)
    @MaxLength(12)
    password:string
}
