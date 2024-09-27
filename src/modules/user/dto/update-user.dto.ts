import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsUrl, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;
}
