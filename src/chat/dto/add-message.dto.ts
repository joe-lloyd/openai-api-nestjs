import { ApiProperty } from '@nestjs/swagger';

export class AddMessageDto {
  @ApiProperty({
    description: 'Content of the message',
    example: 'Hello, how are you?',
  })
  content: string;
}
