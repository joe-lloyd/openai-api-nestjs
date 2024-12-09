import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatPromptDto {
  @ApiProperty({ description: 'The prompt for OpenAI to process' })
  @IsString()
  prompt: string;
}
