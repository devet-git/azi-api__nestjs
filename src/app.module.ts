import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
import { ListModule } from './modules/list/list.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProjectMemberModule } from './modules/project-member/project-member.module';
import { ProjectModule } from './modules/project/project.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    ListModule,
    CardModule,
    RoleModule,
    UserRoleModule,
    PermissionModule,
    ProjectMemberModule,
  ],
  providers: [
    // Order of guards is very important
    // They will be applied to all routes(controllers) in your application.
    // { provide: APP_GUARD, useClass: JwtGuard },
    // { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
