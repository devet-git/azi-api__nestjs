import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowRoles } from 'src/decorator/allow-roles.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Role, RoleGuard } from 'src/guard/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AllowRoles(Role.Admin, Role.User)
  @Get()
  getAllUser(): Promise<UserDto[]> {
    return this.userService.getAllUser();
  }

  @AllowRoles(Role.Admin)
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.addUser(user);
  }

  // @AllowRoles(Role.Admin)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<UserDto> {
    return this.userService.updateUserById(id, user);
  }

  @AllowRoles(Role.Admin)
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUserById(id);
  }
}
