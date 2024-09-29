import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateListDto } from '../list/dto/create-list.dto';
import { ListService } from '../list/list.service';
import { UserDocument } from '../user/user.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailDto } from './dto/project-detail.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './project.schema';
import { ProjectMemberService } from '../project-member/project-member.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private readonly listService: ListService,
    private readonly projectMemberService: ProjectMemberService,
  ) {}

  async createProjectByCurrentUser(user: UserDocument, data: CreateProjectDto): Promise<ProjectDto> {
    const newProject = new this.projectModel(data);
    newProject.created_by = user.id;
    const savedProject = await newProject.save();
    const listsData: CreateListDto[] = [
      { name: 'TO DO', projectId: savedProject.id, position: 1 },
      { name: 'IN PROGRESS', projectId: savedProject.id, position: 2 },
      { name: 'DONE', projectId: savedProject.id, position: 3 },
    ];

    await this.listService.createManyByProjectId(listsData);
    await this.projectMemberService.setUserAsProjectAdmin(user.id, savedProject.id);

    return plainToInstance(ProjectDto, savedProject.toObject());
  }

  async getProjectByCurrentUser(user: UserDocument) {
    const existedProject = await this.projectModel.find({ created_by: user.id }).exec();

    return existedProject.map((prj) => plainToInstance(ProjectDto, prj.toObject()));
  }

  async getProjectById(id: string) {
    const existedProject = await this.projectModel.findById(id).exec();
    const lists = await this.listService.getByProjectId(id);

    let result = plainToInstance(ProjectDetailDto, existedProject.toObject());
    result.lists = lists;

    return result;
  }

  async updateProjectByCurrentUser(user: UserDocument, id: string, data: UpdateProjectDto) {
    const updated = await this.projectModel.findOneAndUpdate({ created_by: user.id, _id: id }, data, { new: true }).exec();

    if (!updated) throw new BadRequestException('Project does not exist');

    return plainToInstance(ProjectDto, updated.toObject());
  }

  async deleteProjectByCurrentUser(user: UserDocument, id: string) {
    const deleted = await this.projectModel.findOneAndDelete({ created_by: user.id, _id: id }).exec();

    return plainToInstance(ProjectDto, deleted.toObject());
  }
}
