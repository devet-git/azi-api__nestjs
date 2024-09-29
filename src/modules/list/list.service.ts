import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './list.schema';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { ListDto } from './dto/list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async getByProjectId(projectId: string) {
    const lists = await this.listModel.find({ projectId: projectId }).populate('cardIds').exec();

    return lists.map((l) => plainToInstance(ListDto, l.toObject()));
  }

  async createByProjectId(data: CreateListDto) {
    const newList = new this.listModel(data);
    const created = await newList.save();

    return plainToInstance(ListDto, created.toObject());
  }

  async createManyByProjectId(data: CreateListDto[]) {
    const newLists = await this.listModel.insertMany(data);

    return newLists.map((l) => plainToInstance(ListDto, l.toObject()));
  }

  async updateByProjectId(data: UpdateListDto) {
    const updated = await this.listModel.findOneAndUpdate({}, data, { new: true }).exec();

    return plainToInstance(ListDto, updated.toObject());
  }

  async deleteByProjectId(id: string) {
    const deleted = await this.listModel.findByIdAndDelete(id).exec();

    return plainToInstance(ListDto, deleted.toObject());
  }

  async addCardId(listId: string, cardId: string) {
    await this.listModel.findByIdAndUpdate(listId, { $push: { cardIds: cardId } }, { new: true });
  }
}
