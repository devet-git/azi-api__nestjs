import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ required: true, ref: 'List' })
  listId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  position: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  dueDate: Date;

  @Prop()
  assignedUserIds: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
