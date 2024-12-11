import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity, ChatModel } from './entities/chat.entity';
import { MessageEntity, MessageRole } from './entities/message.entity';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly openaiService: OpenaiService,
  ) {}

  async createChat(userId: string, model: ChatModel): Promise<ChatEntity> {
    const chat = this.chatRepository.create({
      model,
      user: { id: userId },
    });
    return this.chatRepository.save(chat);
  }

  async addMessageAndGenerateResponse(
    chatId: string,
    content: string,
  ): Promise<{ userMessage: MessageEntity; aiMessage: MessageEntity }> {
    const userMessage = this.messageRepository.create({
      chat: { id: chatId },
      content,
      role: MessageRole.USER,
    });
    await this.messageRepository.save(userMessage);

    // Get all messages for context
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['messages'],
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    // Call OpenAI API to generate the AI's response
    const aiResponseContent = await this.openaiService.generateCompletion(
      chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    );

    // Save the AI's response
    const aiMessage = this.messageRepository.create({
      chat: { id: chatId },
      content: aiResponseContent,
      role: MessageRole.ASSISTANT,
    });
    await this.messageRepository.save(aiMessage);

    return { userMessage, aiMessage };
  }

  async getChatMessages(chatId: string): Promise<ChatEntity> {
    return this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['messages'],
    });
  }
}
