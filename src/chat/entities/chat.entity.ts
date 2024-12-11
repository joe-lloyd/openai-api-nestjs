import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Column,
} from 'typeorm';

import { MessageEntity } from './message.entity';
import { User } from '../../auth/entities/user.entity';

export enum ChatModel {
  O1Preview = 'o1-preview',
  O1Preview20240912 = 'o1-preview-2024-09-12',
  O1Mini = 'o1-mini',
  O1Mini20240912 = 'o1-mini-2024-09-12',
  Gpt4o = 'gpt-4o',
  Gpt4o20241120 = 'gpt-4o-2024-11-20',
  Gpt4o20240806 = 'gpt-4o-2024-08-06',
  Gpt4o20240513 = 'gpt-4o-2024-05-13',
  Gpt4oRealtimePreview = 'gpt-4o-realtime-preview',
  Gpt4oRealtimePreview20241001 = 'gpt-4o-realtime-preview-2024-10-01',
  Gpt4oAudioPreview = 'gpt-4o-audio-preview',
  Gpt4oAudioPreview20241001 = 'gpt-4o-audio-preview-2024-10-01',
  ChatGpt4oLatest = 'chatgpt-4o-latest',
  Gpt4oMini = 'gpt-4o-mini',
  Gpt4oMini20240718 = 'gpt-4o-mini-2024-07-18',
  Gpt4Turbo = 'gpt-4-turbo',
  Gpt4Turbo20240409 = 'gpt-4-turbo-2024-04-09',
  Gpt40125Preview = 'gpt-4-0125-preview',
  Gpt4TurboPreview = 'gpt-4-turbo-preview',
  Gpt41106Preview = 'gpt-4-1106-preview',
  Gpt4VisionPreview = 'gpt-4-vision-preview',
  Gpt4 = 'gpt-4',
  Gpt40314 = 'gpt-4-0314',
  Gpt40613 = 'gpt-4-0613',
  Gpt432k = 'gpt-4-32k',
  Gpt432k0314 = 'gpt-4-32k-0314',
  Gpt432k0613 = 'gpt-4-32k-0613',
  Gpt35Turbo = 'gpt-3.5-turbo',
  Gpt35Turbo16k = 'gpt-3.5-turbo-16k',
  Gpt35Turbo0301 = 'gpt-3.5-turbo-0301',
  Gpt35Turbo0613 = 'gpt-3.5-turbo-0613',
  Gpt35Turbo1106 = 'gpt-3.5-turbo-1106',
  Gpt35Turbo0125 = 'gpt-3.5-turbo-0125',
  Gpt35Turbo16k0613 = 'gpt-3.5-turbo-16k-0613',
}

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', default: ChatModel.Gpt4oMini })
  model: ChatModel;

  @ManyToOne(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => MessageEntity, (message) => message.chat, { cascade: true })
  messages: MessageEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
