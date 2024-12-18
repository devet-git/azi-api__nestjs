import { Exclude, Expose } from 'class-transformer';
import { Permission } from '../../../modules/permission/permission.schema';
import { UserDto } from '../../../modules/user/dto/user.dto';

export class ProjectMemberDto {
  @Exclude()
  projectId: string;

  @Exclude()
  _id: string;

  @Expose({ name: 'userId' })
  user: UserDto;

  @Expose({ name: 'permissionIds' })
  permissions: Permission[];
}
