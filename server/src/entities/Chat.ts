import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import Message from "./Message";
import User from "./User";
import Trip from "./Trip";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany((type) => User, (user) => user.chats)
  participants: User[];

  @OneToOne((type) => Trip, (trip) => trip.chat)
  trip: Trip;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
