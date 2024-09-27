import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;
@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  label: string;
  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
