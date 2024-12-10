import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatEntity } from '../../chat/entities/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isApproved: boolean;

  @OneToMany(() => ChatEntity, (chat) => chat.user)
  chats: ChatEntity[];
}
