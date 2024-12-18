import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../guard/jwt.guard';

@ApiTags('User role')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('user-roles')
export class UserRoleController {}
