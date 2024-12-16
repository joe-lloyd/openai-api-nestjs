import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ChatEntity } from './chat/entities/chat.entity';
import { MessageEntity } from './chat/entities/message.entity';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenaiModule,
    AuthModule,
    ChatModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'data/db.sqlite',
        entities: [ChatEntity, MessageEntity, User],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
      }),
    }),
  ],
})
export class AppModule {}
