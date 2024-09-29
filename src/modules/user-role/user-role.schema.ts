import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRoleDocument = HydratedDocument<UserRole>;
@Schema({ collection: 'user_roles' })
export class UserRole {
  @Prop({ required: true, ref: 'User' })
  userId: string;
  @Prop({ required: true, ref: 'Role' })
  roleId: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
