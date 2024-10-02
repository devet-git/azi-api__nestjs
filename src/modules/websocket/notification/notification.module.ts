import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { WsJwtGuard } from 'src/guard/ws-jwt.guard';

@Module({
  imports: [],
  providers: [NotificationGateway, NotificationService, WsJwtGuard, JwtService],
  exports: [NotificationGateway],
})
export class NotificationModule {}
