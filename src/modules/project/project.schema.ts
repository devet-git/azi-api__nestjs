import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;
@Schema()
export class Project {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  created_by: string;

  @Prop({ default: Date.now })
  created_at: string;

  @Prop({ default: Date.now })
  updated_at: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
