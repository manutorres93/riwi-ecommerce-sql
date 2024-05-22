import { Controller,  Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
   
   } 


  @Post('login')
  async loginUser(@Body() loginAuthDto: LoginAuthDto){
    return this.authService.login(loginAuthDto)

  }


 
}