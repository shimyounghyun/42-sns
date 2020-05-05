import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Message from "./Message";
import Trip from "./Trip";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne((type) => User, (user) => user.chatsAsGuest)
  guest: User;

  @Column({ nullable: true })
  guestId: number;

  @ManyToOne((type) => User, (user) => user.chatsAsHost)
  host: User;

  @Column({ nullable: true })
  hostId: number;

  @OneToOne((type) => Trip, (trip) => trip.chat)
  trip: Trip;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
