import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CardBaseDto {
  @ApiProperty()
  @IsString()
  listId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsOptional()
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  assignedUserIds: string[] | [];
}
