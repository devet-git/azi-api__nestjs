import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ProjectMemberService } from 'src/modules/project-member/project-member.service';

@Injectable()
export class NotificationService {
  constructor(private projectMemberService: ProjectMemberService) {}

  async addUserToProjectRoom(client: Socket) {
    const userId = client['user'].id;
    const projectIds = await this.projectMemberService.getProjectIdsUserJoined(userId);

    client.join(projectIds);

    return projectIds;
  }
}
