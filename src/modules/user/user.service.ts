import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserRoleService } from '../user-role/user-role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userRoleService: UserRoleService,
  ) {}

  async getAllUser(): Promise<UserDto[]> {
    const users = await this.userModel.find({ $or: [{ deleted: false }, { deleted: { $exists: false } }] }).exec();
    return users.map((user) => plainToInstance(UserDto, user.toObject()));
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();
    return plainToInstance(UserDto, user.toObject());
  }

  async getUserDtoByUsername(username: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ username: username }).exec();
    return plainToInstance(UserDto, user.toObject());
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async addUser(user: CreateUserDto): Promise<UserDto> {
    const createdUser = new this.userModel(user);
    const saved = await createdUser.save();

    this.userRoleService.addtoUserRole(saved.id);

    return plainToInstance(UserDto, saved.toObject());
  }

  async updateUserById(id: string, user: UpdateUserDto): Promise<UserDto> {
    const updated = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    return plainToInstance(UserDto, updated.toObject());
  }

  async deleteUserById(id: string): Promise<UserDto> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    return plainToInstance(UserDto, deleted.toObject());
  }

  async markUserAsDeleted(id: string): Promise<UserDto> {
    const deleted = await this.userModel.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
    return plainToInstance(UserDto, deleted.toObject());
  }

  async findUsersNotInArray(userIds: string[]) {
    const users = await this.userModel.find({ _id: { $nin: userIds } }).exec();
    return users.map((u) => plainToInstance(UserDto, u.toObject()));
  }
}
