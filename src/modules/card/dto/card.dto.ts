import { CardBaseDto } from './card-base.dto';

export class CardDto extends CardBaseDto {
  createdAt: Date;
  updatedAt: Date;
}
