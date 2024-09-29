import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateMemberPermissionDto {
  @ApiProperty()
  @IsArray()
  permissionIds: string[];
}
