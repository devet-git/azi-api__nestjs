import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../guard/jwt.guard';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }
  @Post()
  async addRole(@Body() data: CreateRoleDto) {
    return this.roleService.createRole(data);
  }
}
