import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { plainToInstance } from 'class-transformer';
import { CardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ListService } from '../list/list.service';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private readonly listService: ListService,
  ) {}

  async getCardsByListId(listId: string) {
    const cards = await this.cardModel.find({ listId }).populate('assignee').populate('reporter').exec();

    return cards.map((c) => plainToInstance(CardDto, c.toObject()));
  }
  async createCardByListId(currentUser: CurrentUserDto, data: CreateCardDto) {
    const newCard = new this.cardModel(data);
    newCard.reporter = currentUser.userId;
    const created = await newCard.save();
    await this.listService.addCardId(data.listId, created.id);
    return plainToInstance(CardDto, created.toObject());
  }
  async updateCardById(id: string, data: UpdateCardDto) {
    const updated = await this.cardModel.findByIdAndUpdate(id, { ...data, updatedAt: Date.now() }, { new: true }).exec();

    return plainToInstance(CardDto, updated.toObject());
  }
  async DeleteCardById(id: string) {
    const deleted = await this.cardModel.findByIdAndDelete(id).exec();
    await this.listService.removeCardId(deleted.listId, id);

    return plainToInstance(CardDto, deleted.toObject());
  }
  async moveCardFromList(id: string, newListId: string) {
    const card = await this.cardModel.findById(id).exec();

    await this.listService.removeCardId(card.listId, id);
    const updated = await this.cardModel.findByIdAndUpdate(id, { listId: newListId }, { new: true }).exec();
    await this.listService.addCardId(newListId, id);

    return plainToInstance(CardDto, updated.toObject());
  }
}
