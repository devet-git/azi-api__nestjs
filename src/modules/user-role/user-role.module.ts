import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRole, UserRoleSchema } from './user-role.schema';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserRole.name, schema: UserRoleSchema }]), RoleModule],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
