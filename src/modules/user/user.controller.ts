import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Post()
  createUser(@Body() user: CreateUserDto): void {
    this.userService.addUser(user);
  }
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() user: UpdateUserDto): void {
    this.userService.updateUserById(id, user);
  }
  @Delete(':id')
  deleteUserById(@Param('id') id: string): void {
    this.userService.deleteUserById(id);
  }
}
