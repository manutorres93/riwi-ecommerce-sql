import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { compare} from 'bcrypt';
import { UserWithToken } from './types/user-token.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}
     async register(userRegister:RegisterAuthDto){
        const {password, email}=userRegister
    
        const userExist= await this.usersService.findOneByEmailToRegister(email)
          
        if(userExist){
            throw new BadRequestException(`User with email ${email} already exists`);
        } 
    
        const userCreated = await this.usersService.create(userRegister)
    
        return this.getToken(userCreated)

       
       
    
      }
    
      async login(userLogin:LoginAuthDto){
        const {email, password}=userLogin
    
        const findUser = await this.usersService.findOneByEmail(email)
    
        if (!findUser) throw new HttpException('User not found', 404)

        const isPasswordValid = await compare(password, findUser.password) //me retorna un true o un false
   
        
        if (!isPasswordValid) throw new HttpException('Incorrect password', 403)
        
    
        return this.getToken(findUser) 
 
        
    
      }
    
      async getToken(user): Promise<UserWithToken>{
        const secretKey = process.env.JWT_SECRET;
    
        const accessTokenOptions = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
          };
    
        const payload = { id: user.id, email: user.email, role: user.role };
        
        const accessToken = await this.jwtService.signAsync(payload,{
          secret: secretKey,
          expiresIn: accessTokenOptions.expiresIn,
        });
    
        const data= {
          email:user.email,
          role: user.role,
          token: accessToken,
        };
    
    
    
        return data;
    
      }
}
