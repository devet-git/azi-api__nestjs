import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devet279:gXDTZoFwbWMsoMPH@azi.rciao.mongodb.net/azi-db?retryWrites=true&w=majority&appName=azi',
    ),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
