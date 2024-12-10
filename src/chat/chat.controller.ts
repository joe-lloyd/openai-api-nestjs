import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApprovedGuard } from '../auth/approved/approved.guard';
import { AddMessageDto } from './dto/add-message.dto';

@ApiBearerAuth()
@ApiTags('Chat')
@Controller('chat')
@UseGuards(AuthGuard('jwt'), ApprovedGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('new')
  async createChat(@Request() req) {
    const userId = req.user.userId;
    return this.chatService.createChat(userId);
  }

  @Post(':chatId/message')
  @ApiBody({ type: AddMessageDto })
  async addMessage(
    @Param('chatId') chatId: string,
    @Body() addMessageDto: AddMessageDto,
  ) {
    const { content } = addMessageDto;

    // Save user message, generate AI response, and save it
    return this.chatService.addMessageAndGenerateResponse(chatId, content);
  }

  @Get(':chatId/messages')
  async getMessages(@Param('chatId') chatId: string) {
    return this.chatService.getChatMessages(chatId);
  }
}
