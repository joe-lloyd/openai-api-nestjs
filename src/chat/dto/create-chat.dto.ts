import { ApiProperty } from '@nestjs/swagger';
import { ChatModel } from '../entities/chat.entity';

export class CreateChatDto {
  @ApiProperty({
    description: 'pick a model',
    example: 'gpt-4o-mini',
  })
  model: ChatModel;
}
