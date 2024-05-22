import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role.enum';
import { ROLES_KEY } from 'src/libs/common/decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean  {
  

    const role= this.reflector.getAllAndOverride<Role>(ROLES_KEY,[
      context.getHandler(),
      context.getClass(),
    ]) //role es lo qu esta recibiendo como parámetro en la guarda


    

    if(!role){
      return true;
    }
    
   const {user} =context.switchToHttp().getRequest()
 

   if(user.role === Role.ADMIN){
    return true;
   } //permite que los administradores puedan entrar a la ruta


    return role ===user.role;
  }
} 