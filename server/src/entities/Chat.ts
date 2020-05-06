import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column({ nullable: true })
  guestProfilePhoto: string;

  @Column({ nullable: true })
  guestUserName: string;

  @ManyToOne((type) => User, (user) => user.chatsAsHost)
  host: User;

  @Column({ nullable: true })
  hostId: number;

  @Column({ nullable: true })
  hostProfilePhoto: string;

  @Column({ nullable: true })
  hostUserName: string;

  @ManyToOne((type) => Trip, (trip) => trip.chats)
  trip: Trip;

  @Column({ nullable: true })
  tripId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
