import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  location: string;

  @Prop()
  avatar_url: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
