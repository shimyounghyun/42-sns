import { tripStatus } from "src/types/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Date from "./Date";
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

  @Column({ type: "text" })
  destinationAddress: string;

  @Column({ type: "double precision", default: 0 })
  destinationLat: number;

  @Column({ type: "double precision", default: 0 })
  destinationLng: number;

  @ManyToOne((type) => User, (user) => user.tripAsHost)
  host: User;

  @ManyToOne((type) => User, (user) => user.tripAsGuest)
  guest: User;

  @ManyToMany((type) => Date, (date) => date.trips)
  dates: Date[];

  @ManyToOne((type) => Place, (place) => place.trips)
  place: Place;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Trip;
