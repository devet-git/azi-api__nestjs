import { UserDto } from '../../../modules/user/dto/user.dto';
import { CardBaseDto } from './card-base.dto';
import { Expose, Type } from 'class-transformer';

export class CardDto extends CardBaseDto {
  createdAt: Date;
  updatedAt: Date;

  @Type(() => UserDto)
  @Expose({ name: 'assignee' })
  assignee: UserDto;
}
