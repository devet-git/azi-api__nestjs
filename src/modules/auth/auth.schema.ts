import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;
@Schema()
export class Auth {
  @Prop()
  id: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
