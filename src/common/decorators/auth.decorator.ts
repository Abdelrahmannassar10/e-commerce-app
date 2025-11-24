import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./roles.decorator";
import { AuthGuard } from "@common/guards";
import { RolesGuard } from "@common/guards/roles.guard";

export const Auth = (role:string[])=>{
 return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard,RolesGuard)
 );
}