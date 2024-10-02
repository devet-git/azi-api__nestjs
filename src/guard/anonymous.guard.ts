import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { CurrentUserDto } from 'src/modules/auth/dto/current-user.dto';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const token: string = request.headers.authorization?.split(' ')[1];
    console.log(request.headers);

    if (!token) return true;

    try {
      this.jwtService.verify(token);
      return false;
    } catch (error) {
      return true;
    }
  }
}
