import { Expose } from 'class-transformer';
import { Role } from '../../../modules/role/role.schema';

export class UserRoleDto {
  userId: string;

  @Expose({ name: 'roleId' })
  role: Role;
}
