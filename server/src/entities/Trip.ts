import { tripStatus } from "src/types/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Chat from "./Chat";
import Date from "./Dates";
import Place from "./Place";
import User from "./User";

@Entity()
class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  caption: string;

  @Column({ type: "text", nullable: true })
  files: string[];

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

  @ManyToOne((type) => User, (user) => user.tripAsGuest)
  guest: User;

  @ManyToOne((type) => Date, (date) => date.trips)
  date: Date;

  @Column({ nullable: true })
  dateStartAt: string;

  @Column({ nullable: true })
  dateEndAt: string;

  @OneToOne((type) => Chat, (chat) => chat.trip)
  chat: Chat;

  @ManyToOne((type) => Place, (place) => place.trips)
  place: Place;

  @Column({ nullable: true })
  placeLat: string;

  @Column({ nullable: true })
  placeLng: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Trip;
