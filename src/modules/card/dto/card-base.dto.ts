import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high', // Sửa lỗi chính tả từ 'hight' thành 'high'
}

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

  @ApiProperty({ enum: Priority })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty()
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  image_urls: string[];

  @ApiProperty()
  @IsOptional()
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  assignedUserIds: string[] | [];
}
