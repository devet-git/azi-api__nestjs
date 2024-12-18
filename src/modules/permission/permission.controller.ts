import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../guard/jwt.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';

@ApiTags('Project Permission')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  // @Post()
  // async create(@Body() data: CreatePermissionDto): Promise<Permission> {
  //   return this.permissionService.create(data);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<Permission> {
  //   return this.permissionService.delete(id);
  // }
}
