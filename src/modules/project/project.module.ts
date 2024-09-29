import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from '../list/list.module';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { ProjectMemberModule } from '../project-member/project-member.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]), ListModule, ProjectMemberModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [],
})
export class ProjectModule {}
