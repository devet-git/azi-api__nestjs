import { UpdateMemberPermissionDto } from './dto/update-member-permission.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ProjectMemberService } from './project-member.service';
import { AddMemberToProjectDto } from './dto/add-member.dto';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('projects/:projectId/members')
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  @Get()
  async getMembersByProjectId(@Param('projectId') projectId: string) {
    return this.projectMemberService.getAllMemberInProject(projectId);
  }

  @Post()
  async addMemberToProject(@Param('projectId') projectId: string, @Body() data: AddMemberToProjectDto) {
    return this.projectMemberService.addMemberToProject(projectId, data);
  }

  @Put(':memberId/permissions')
  async updateMemberPermissions(@Param('projectId') projectId: string, @Param('memberId') memberId: string, @Body() data: UpdateMemberPermissionDto) {
    return this.projectMemberService.updateMemberPermission(projectId, memberId, data);
  }

  @Delete(':memberId')
  async removeMemberFromProject(@Param('projectId') projectId: string, @Param('memberId') memberId: string) {
    return this.projectMemberService.removeMemberFromProject(projectId, memberId);
  }
}
