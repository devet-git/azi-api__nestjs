import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../guard/jwt.guard';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

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
  async createCard(@CurrentUser() user: CurrentUserDto, @Body() data: CreateCardDto) {
    return this.cardService.createCardByListId(user, data);
  }
  @Put(':id')
  async updateCard(@Param('id') id: string, @Body() data: UpdateCardDto) {
    return this.cardService.updateCardById(id, data);
  }

  @ApiOperation({ summary: 'Move the card to the new list' })
  @Put(':id/lists/:listId')
  async moveToList(@Param('id') id: string, @Param('listId') listId: string) {
    return this.cardService.moveCardFromList(id, listId);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cardService.DeleteCardById(id);
  }
}
