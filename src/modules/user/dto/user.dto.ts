import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @Expose()
  avatar_url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;
}
