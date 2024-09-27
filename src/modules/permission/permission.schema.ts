import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  label: string;

  @Prop()
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
