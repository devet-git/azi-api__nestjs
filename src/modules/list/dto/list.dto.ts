import { Expose } from 'class-transformer';
import { CardDto } from '../../../modules/card/dto/card.dto';

export class ListDto {
  @Expose()
  projectId: string;

  @Expose()
  name: string;

  @Expose()
  position: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose({ name: 'cardIds' })
  cards: CardDto[];
}
