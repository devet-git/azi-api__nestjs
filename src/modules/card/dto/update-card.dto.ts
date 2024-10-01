import { ApiProperty } from '@nestjs/swagger';
import { CardBaseDto } from './card-base.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto extends CardBaseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  assignee: string;
}
