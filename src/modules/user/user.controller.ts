import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(@Request() req: any): Promise<UserDto[]> {
    return this.userService.getAllUser();
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.addUser(user);
  }

  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.updateUserById(id, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
