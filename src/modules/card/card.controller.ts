import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiBearerAuth()
@ApiTags('Card')
@UseGuards(JwtGuard)
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // @Get('lists/:listId')
  // async getCardsByListId(@Param('listId') listId: string) {
  //   return this.cardService.getCardsByListId(listId);
  // }
  @Post()
  async createCard(@Body() data: CreateCardDto) {
    return this.cardService.createCardByListId(data);
  }
  @Put(':id')
  async updateCard(@Param('id') id: string, @Body() data: UpdateCardDto) {
    return this.cardService.updateCardById(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cardService.DeleteCardById(id);
  }
}
