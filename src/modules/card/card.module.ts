import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card.schema';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { ListModule } from '../list/list.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]), ListModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
