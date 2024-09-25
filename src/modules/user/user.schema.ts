import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop()
  location: string;

  @Prop()
  avatar_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
