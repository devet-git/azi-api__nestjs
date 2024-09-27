import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User, UserDocument } from '../user/user.schema';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ProjectDto } from './dto/project.dto';
import { UserDto } from '../user/dto/user.dto';

@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async createProject(@Request() req: any, @Body() data: CreateProjectDto): Promise<ProjectDto> {
    const user: UserDocument = req.user;
    return this.projectService.createProjectByUser(user.id, data);
  }
}
