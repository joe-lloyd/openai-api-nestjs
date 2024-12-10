import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from './entities/message.entity';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, MessageEntity]),
    OpenaiModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
