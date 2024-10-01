import { ApiProperty } from '@nestjs/swagger';
import { CardBaseDto } from './card-base.dto';
import { IsOptional, IsString } from 'class-validator';

export class CreateCardDto extends CardBaseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  assignee: string;
}
