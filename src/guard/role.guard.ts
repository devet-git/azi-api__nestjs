import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CurrentUserDto } from 'src/modules/auth/dto/current-user.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser: CurrentUserDto = request.user;
    const allowRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), //Method level
      context.getClass(), // Class level
    ]) || ['user']; //User can access by default;

    if (!currentUser) return false;
    if (!allowRoles.includes(currentUser.role)) return false;

    return true;
  }
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
