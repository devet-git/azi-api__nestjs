import { Exclude, Expose } from 'class-transformer';
import { Permission } from 'src/modules/permission/permission.schema';
import { UserDto } from 'src/modules/user/dto/user.dto';

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
