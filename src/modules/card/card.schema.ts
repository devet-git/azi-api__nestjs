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

  @Prop()
  image_urls: string[];

  @Prop({ default: 'low', enum: ['low', 'medium', 'high'] })
  priority: 'low' | 'medium' | 'hight';

  @Prop({ required: true, enum: ['task', 'bug', 'story'] })
  issueType: 'task' | 'bug' | 'story';

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  dueDate: Date;

  @Prop({ ref: 'User' })
  assignee: string;

  @Prop({ ref: 'User' })
  reporter: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
