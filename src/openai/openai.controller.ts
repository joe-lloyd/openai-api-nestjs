import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OpenaiService } from './openai.service';
import { ChatPromptDto } from './dto/chat-prompt/chat-prompt';
import { AuthGuard } from '@nestjs/passport';
import { ApprovedGuard } from '../auth/approved/approved.guard';

@ApiTags('openai')
@Controller('openai')
@UseGuards(AuthGuard('jwt'), ApprovedGuard)
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chat')
  @ApiBody({ type: ChatPromptDto })
  async chat(@Body() chatPromptDto: ChatPromptDto): Promise<string> {
    return this.openaiService.generateCompletion(chatPromptDto.prompt);
  }
}
