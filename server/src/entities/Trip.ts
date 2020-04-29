import { tripStatus } from "src/types/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
  })
  status: tripStatus;

  @ManyToOne((type) => User, (user) => user.tripAsHost)
  host: User;

  @ManyToOne((type) => User, (user) => user.tripAsGuest)
  guest: User;

  @ManyToMany((type) => Date, (date) => date.trips)
  dates: Date[];

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
