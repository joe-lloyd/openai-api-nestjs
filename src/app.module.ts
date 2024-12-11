import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ChatEntity } from './chat/entities/chat.entity';
import { MessageEntity } from './chat/entities/message.entity';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenaiModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ChatEntity, MessageEntity, User],
      synchronize: true, // @TODO: Disable for production
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
