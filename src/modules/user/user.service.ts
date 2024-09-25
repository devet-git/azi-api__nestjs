import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async addUser(user: CreateUserDto): Promise<void> {
    const createdUser = new this.userModel(user);
    createdUser.save();
  }

  async updateUserById(id: string, user: UpdateUserDto): Promise<void> {
    this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }
  async deleteUserById(id: string): Promise<void> {
    this.userModel.findByIdAndDelete(id).exec();
  }
}
