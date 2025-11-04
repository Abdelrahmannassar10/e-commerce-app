import { PUBLIC, Roles } from '@common/decorators';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler() ,context.getClass()]);
    const request = context.switchToHttp().getRequest();
    const publicVal = this.reflector.get(PUBLIC,context.getHandler);
    if(publicVal) return true;
    const user = request.user;
    if (!roles.includes(user.role))
      throw new UnauthorizedException('you are Unauthorized');
    return true;
  }
}
