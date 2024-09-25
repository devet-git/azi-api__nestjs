import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  role: string;

  @Prop()
  avatar_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
