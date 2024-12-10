import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { MessageEntity } from './message.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => MessageEntity, (message) => message.chat, { cascade: true })
  messages: MessageEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
