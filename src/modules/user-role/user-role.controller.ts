import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';

@ApiTags('User role')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('user-roles')
export class UserRoleController {}
