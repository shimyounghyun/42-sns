import { tripStatus } from "src/types/types";
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
import Chat from "./Chat";
import User from "./User";

@Entity()
class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    enum: [
      "WATING",
      "ACCEPTED",
      "FINISHED",
      "CANCELED",
      "REQUESTING",
      "ONROUTE",
    ],
    default: "WATING",
  })
  status: tripStatus;

  @ManyToOne((type) => User, (user) => user.tripAsHost)
  host: User;

  @Column({ nullable: true })
  hostId: number;

  @ManyToOne((type) => User, (user) => user.tripAsGuest)
  guest: User;

  @Column({ nullable: true })
  guestId: number;

  @Column({ type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  caption: string;

  @Column({ type: "text", array: true })
  public readonly file: string[] = [];

  @Column({ type: "double precision", default: 0 })
  lat: number;

  @Column({ type: "double precision", default: 0 })
  lng: number;

  @Column({ type: "text" })
  startAt: string;

  @Column({ type: "text" })
  endAt: string;

  @OneToMany((type) => Chat, (chat) => chat.trip)
  chats: Chat[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Trip;
