import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { plainToInstance } from 'class-transformer';
import { CardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ListService } from '../list/list.service';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private readonly listService: ListService,
  ) {}

  async getCardsByListId(listId: string) {
    const cards = await this.cardModel.find({ listId }).exec();

    return cards.map((c) => plainToInstance(CardDto, c.toObject()));
  }
  async createCardByListId(data: CreateCardDto) {
    const newCard = new this.cardModel(data);
    const created = await newCard.save();
    await this.listService.addCardId(data.listId, created.id);
    return plainToInstance(CardDto, created.toObject());
  }
  async updateCardById(id: string, data: UpdateCardDto) {
    const updated = await this.cardModel.findByIdAndUpdate(id, data, { new: true }).exec();

    return plainToInstance(CardDto, updated.toObject());
  }
  async DeleteCardById(id: string) {
    const deleted = await this.cardModel.findByIdAndDelete(id).exec();

    return plainToInstance(CardDto, deleted.toObject());
  }
}
