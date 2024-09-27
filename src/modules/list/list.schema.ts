import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { lstat } from 'fs';
import { HydratedDocument } from 'mongoose';

export type ListDocument = HydratedDocument<List>;
@Schema()
export class List {
  @Prop({ required: true })
  projectId: string;

  @Prop()
  name: string;

  @Prop()
  position: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
