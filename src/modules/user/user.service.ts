import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    return plainToClass(UserDto, users, { excludeExtraneousValues: true });
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async addUser(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async updateUserById(id: string, user: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async deleteUserById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
