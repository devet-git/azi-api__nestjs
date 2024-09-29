import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectMemberDocument = HydratedDocument<ProjectMember>;
@Schema({ collection: 'project_members' })
export class ProjectMember {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true, ref: 'Project' })
  projectId: string;

  @Prop({ ref: 'Permission', type: [String], default: [] })
  permissionIds: string[];
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
