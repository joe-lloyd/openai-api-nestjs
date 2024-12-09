import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OpenaiService } from './openai.service';
import { ChatPromptDto } from './dto/chat-prompt/chat-prompt';

@ApiTags('openai')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chat')
  @ApiBody({ type: ChatPromptDto })
  async chat(@Body() chatPromptDto: ChatPromptDto): Promise<string> {
    return this.openaiService.generateCompletion(chatPromptDto.prompt);
  }
}
