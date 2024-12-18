import { UserService } from '../../modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectMember, ProjectMemberDocument } from './project-member.schema';
import { Model } from 'mongoose';
import { AddMemberToProjectDto } from './dto/add-member.dto';
import { plainToInstance } from 'class-transformer';
import { ProjectMemberDto } from './dto/project-member.dto';
import { PermissionService } from '../permission/permission.service';
import { UserDto } from '../user/dto/user.dto';
import { UpdateMemberPermissionDto } from './dto/update-member-permission.dto';
import { User, UserDocument } from '../user/user.schema';
import { ProjectDto } from '../project/dto/project.dto';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectModel(ProjectMember.name) private projectMemberModel: Model<ProjectMemberDocument>,
    private readonly permissionService: PermissionService,
    private readonly UserService: UserService,
  ) {}

  async getAllMemberInProject(projectId: string) {
    const records = await this.projectMemberModel.find({ projectId }).populate('permissionIds').populate('userId').exec();
    return records
      .map((re) => {
        let dto = plainToInstance(ProjectMemberDto, re.toObject());
        dto.user = plainToInstance(UserDto, dto.user);
        return dto;
      })
      .filter((re) => re.user !== null);
  }

  async addMemberToProject(projectId: String, data: AddMemberToProjectDto) {
    const viewerPermissionId = await this.permissionService.getViewerId();
    if (data.permissionIds.length === 0) {
      data.permissionIds.push(viewerPermissionId);
    }
    const newMember = new this.projectMemberModel({ ...data, projectId });
    const saved = await newMember.save();

    return plainToInstance(ProjectMemberDto, saved.toObject());
  }

  async removeMemberFromProject(projectId: string, memberId: string) {
    const deleted = await this.projectMemberModel.findOneAndDelete({ projectId, userId: memberId }).exec();

    return plainToInstance(ProjectMemberDto, deleted.toObject());
  }

  async updateMemberPermission(projectId: string, memberId: string, data: UpdateMemberPermissionDto) {
    const updated = await this.projectMemberModel
      .findOneAndUpdate({ projectId, userId: memberId }, { permissionIds: data.permissionIds }, { new: true })
      .exec();

    return plainToInstance(ProjectMemberDto, updated.toObject());
  }

  async setUserAsProjectAdmin(userId: string, projectId: string) {
    const projectAdminPermissionId = await this.permissionService.getProjectAdminId();
    const projectAdmin = new this.projectMemberModel({
      userId,
      projectId,
      permissionIds: [projectAdminPermissionId],
    });

    projectAdmin.save();
  }

  async getNoneProjectMembers(projectId: string) {
    const projectMember = await this.projectMemberModel.find({ projectId }).exec();
    const memberIds: string[] = projectMember.map((mem) => mem.userId);

    return await this.UserService.findUsersNotInArray(memberIds);
  }

  async getProjectIdsUserJoined(userId: string) {
    const res = await this.projectMemberModel.find({ userId }).exec();
    return res.map((r) => r.projectId);
  }
}
