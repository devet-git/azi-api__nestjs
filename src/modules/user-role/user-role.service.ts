import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole, UserRoleDocument } from './user-role.schema';
import { Model } from 'mongoose';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole.name) private userRoleModel: Model<UserRoleDocument>,
    private readonly roleService: RoleService,
  ) {}

  async addtoUserRole(userId: string) {
    const roleId = await this.roleService.getUserRoleId();
    const newUserRole = new this.userRoleModel({ userId, roleId });
    return newUserRole.save();
  }
  async addtoAdminRole(userId: string) {
    const roleId = await this.roleService.getAdminRoleId();
    const newUserRole = new this.userRoleModel({ userId, roleId });
    return newUserRole.save();
  }
}
