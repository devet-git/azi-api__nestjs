import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { plainToInstance } from 'class-transformer';
import { ProjectDto } from './dto/project.dto';
import { UserDocument } from '../user/user.schema';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async createProjectByCurrentUser(user: UserDocument, data: CreateProjectDto): Promise<ProjectDto> {
    const newProject = new this.projectModel(data);
    newProject.created_by = user.id;
    const saved = await newProject.save();

    return plainToInstance(ProjectDto, saved.toObject());
  }

  async getProjectByCurrentUser(user: UserDocument) {
    const existedProject = await this.projectModel.find({ created_by: user.id }).exec();

    return existedProject.map((prj) => plainToInstance(ProjectDto, prj.toObject()));
  }

  async updateProjectByCurrentUser(user: UserDocument, data: UpdateProjectDto) {
    const updated = await this.projectModel.findOneAndUpdate({ created_by: user.id, _id: data.id }, data, { new: true }).exec();

    if (!updated) throw new BadRequestException('Project does not exist');

    return plainToInstance(ProjectDto, updated.toObject());
  }

  async deleteProjectByCurrentUser(user: UserDocument, id: string) {
    const deleted = await this.projectModel.findOneAndDelete({ created_by: user.id, _id: id }).exec();

    return plainToInstance(ProjectDto, deleted.toObject());
  }
}
