import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getAllRoles() {
    return this.roleModel.find().exec();
  }

  async createRole(data: CreateRoleDto) {
    const newRole = new this.roleModel(data);
    return newRole.save();
  }

  async getUserRoleId() {
    const role = await this.roleModel.findOne({ name: 'user' }).exec();

    return role.id;
  }

  async getAdminRoleId() {
    const role = await this.roleModel.findOne({ name: 'admin' }).exec();

    return role.get('id');
  }
}
