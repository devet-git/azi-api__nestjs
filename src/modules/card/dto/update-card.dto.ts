import { ApiProperty } from '@nestjs/swagger';
import { CardBaseDto } from './card-base.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCardDto extends CardBaseDto {}
