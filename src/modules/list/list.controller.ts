import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../guard/jwt.guard';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@ApiTags('List')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':projectId')
  async getListByProjectId(@Param('projectId') projectId: string) {
    return this.listService.getByProjectId(projectId);
  }

  @Post()
  async createListByProjectId(@Body() data: CreateListDto) {
    return this.listService.createByProjectId(data);
  }

  @Put()
  async updateListByProjectId(@Body() data: UpdateListDto) {
    return this.listService.createByProjectId(data);
  }

  @Delete(':id')
  async deleteListByProjectId(id: string) {
    return this.listService.deleteByProjectId(id);
  }
}
