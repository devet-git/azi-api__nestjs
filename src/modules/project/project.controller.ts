import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User, UserDocument } from '../user/user.schema';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ProjectDto } from './dto/project.dto';
import { UserDto } from '../user/dto/user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllByCurrentUser(@Request() req: any) {
    const user: UserDocument = req.user;

    return this.projectService.getProjectByCurrentUser(user);
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Post()
  async createProject(@Request() req: any, @Body() data: CreateProjectDto): Promise<ProjectDto> {
    const user: UserDocument = req.user;
    return this.projectService.createProjectByCurrentUser(user, data);
  }

  @Put(':id')
  async updateProject(@Request() req: any, @Param('id') id: string, @Body() data: UpdateProjectDto): Promise<ProjectDto> {
    const user: UserDocument = req.user;
    return this.projectService.updateProjectByCurrentUser(user, id, data);
  }

  @Delete(':id')
  async deleteProject(@Request() req: any, @Param('id') id: string): Promise<ProjectDto> {
    const user: UserDocument = req.user;
    return this.projectService.deleteProjectByCurrentUser(user, id);
  }
}
