import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.server.use((client: Socket, next) => {
      const token = client.handshake.headers['authorization']?.split(' ')[1];

      if (!token) {
        client.emit('message', { text: 'Unauthorized access' });
        client.disconnect();
        next(new UnauthorizedException('Invalid token'));
      }
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        const decodedToken = this.jwtService.verify(token, { secret });
        client['user'] = decodedToken;

        next();
      } catch (error) {
        client.emit('message', { text: 'Unauthorized access' });
        client.disconnect();

        next(new UnauthorizedException('Invalid token'));
      }
    });
  }

  handleConnection(client: any, ...args: any[]) {}

  handleDisconnect(client: any) {}
}
