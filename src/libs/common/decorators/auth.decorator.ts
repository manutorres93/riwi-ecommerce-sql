import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { Role } from "../enums/role.enum";
import { JwtAuthGuard, RolesGuard } from "src/libs/auth/guard";




export function Auth(role: Role) {
  return applyDecorators(
    Roles(role), 
    UseGuards(JwtAuthGuard, RolesGuard)
);
}