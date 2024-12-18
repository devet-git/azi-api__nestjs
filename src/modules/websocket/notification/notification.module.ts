import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { WsJwtGuard } from '../../../guard/ws-jwt.guard';
import { ProjectMemberModule } from '../../../modules/project-member/project-member.module';

@Module({
  imports: [ProjectMemberModule],
  providers: [NotificationGateway, NotificationService, WsJwtGuard, JwtService],
  exports: [NotificationGateway],
})
export class NotificationModule {}
