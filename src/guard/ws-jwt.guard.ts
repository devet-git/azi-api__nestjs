import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToWs();
    const client: Socket = ctx.getClient();
    const token = client.handshake.headers['authorization']?.split(' ')[1];

    if (!token) {
      client.emit('message', { text: 'Unauthorized access' });
      client.disconnect();
      return false;
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const decodedToken = this.jwtService.verify(token, { secret });
      client['user'] = decodedToken;

      return true;
    } catch (error) {
      client.emit('message', { text: 'Unauthorized access' });
      client.disconnect();

      return false;
    }
  }
}
