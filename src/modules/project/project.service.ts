import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { plainToInstance } from 'class-transformer';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async createProjectByUser(userId: string, data: CreateProjectDto): Promise<ProjectDto> {
    const newProject = new this.projectModel(data);
    newProject.created_by = userId;

    const saved = await newProject.save();

    return plainToInstance(ProjectDto, saved.toObject());
  }

  async getProjectByCurrentUser() {}
  async updateProjectByCurrentUser() {}
  async deleteProjectByCurrentUser() {}
}
