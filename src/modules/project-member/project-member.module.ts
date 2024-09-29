import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectMember, ProjectMemberSchema } from './project-member.schema';
import { ProjectMemberController } from './project-member.controller';
import { ProjectMemberService } from './project-member.service';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectMember.name, schema: ProjectMemberSchema }]), PermissionModule],
  controllers: [ProjectMemberController],
  providers: [ProjectMemberService],
  exports: [ProjectMemberService],
})
export class ProjectMemberModule {}
