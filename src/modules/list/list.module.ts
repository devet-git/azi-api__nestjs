import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './list.schema';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
