import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { CreateListDto } from '../list/dto/create-list.dto';
import { ListService } from '../list/list.service';
import { ProjectMemberService } from '../project-member/project-member.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailDto } from './dto/project-detail.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private readonly listService: ListService,
    private readonly projectMemberService: ProjectMemberService,
  ) {}

  async createProjectByCurrentUser(user: CurrentUserDto, data: CreateProjectDto): Promise<ProjectDto> {
    const newProject = new this.projectModel(data);
    newProject.created_by = user.userId;
    const savedProject = await newProject.save();
    const listsData: CreateListDto[] = [
      { name: 'TO DO', projectId: savedProject.id, position: 1 },
      { name: 'IN PROGRESS', projectId: savedProject.id, position: 2 },
      { name: 'DONE', projectId: savedProject.id, position: 3 },
    ];

    await this.listService.createManyByProjectId(listsData);
    await this.projectMemberService.setUserAsProjectAdmin(user.userId, savedProject.id);

    return plainToInstance(ProjectDto, savedProject.toObject());
  }

  async getProjectByCurrentUser(user: CurrentUserDto) {
    const projectIdsJoined = await this.projectMemberService.getProjectIdsUserJoined(user.userId);
    const existedProject = await this.projectModel.find({ _id: { $in: projectIdsJoined } }).exec();

    return existedProject.map((prj) => plainToInstance(ProjectDto, prj.toObject()));
  }

  async getProjectById(id: string) {
    const existedProject = await this.projectModel.findById(id).exec();
    const lists = await this.listService.getByProjectId(id);

    let result = plainToInstance(ProjectDetailDto, existedProject.toObject());
    result.lists = lists;

    return result;
  }

  async updateProjectByCurrentUser(user: CurrentUserDto, id: string, data: UpdateProjectDto) {
    const updated = await this.projectModel.findOneAndUpdate({ created_by: user.userId, _id: id }, data, { new: true }).exec();

    if (!updated) throw new BadRequestException('Project does not exist');

    return plainToInstance(ProjectDto, updated.toObject());
  }

  async deleteProjectByCurrentUser(user: CurrentUserDto, id: string) {
    const deleted = await this.projectModel.findOneAndDelete({ created_by: user.userId, _id: id }).exec();
    if (!deleted) throw new ForbiddenException('Access denied');
    return plainToInstance(ProjectDto, deleted.toObject());
  }
}
