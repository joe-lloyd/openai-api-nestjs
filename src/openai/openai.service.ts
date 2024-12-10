import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateCompletion(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  ): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages,
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      throw new Error('Failed to fetch data from OpenAI');
    }
  }
}
