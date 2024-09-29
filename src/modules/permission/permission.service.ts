import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './permission.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) {}

  async create(data: CreatePermissionDto) {
    try {
      const newPermission = new this.permissionModel(data);
      const saved = await newPermission.save();
      return saved;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findById(id: string): Promise<Permission> {
    return this.permissionModel.findById(id).exec();
  }

  async delete(id: string): Promise<Permission> {
    return this.permissionModel.findByIdAndDelete(id).exec();
  }

  async getProjectAdminId(): Promise<string> {
    const permission = await this.permissionModel.findOne({ name: 'project_admin' });
    return permission.id;
  }
  async getViewerId(): Promise<string> {
    const permission = await this.permissionModel.findOne({ name: 'viewer' });
    return permission.id;
  }

  async getPermissionIdByName(name: string) {
    const permission = await this.permissionModel.findOne({ name });
    return permission.id;
  }
}
