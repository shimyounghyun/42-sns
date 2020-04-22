import { tripStatus } from "src/types/types";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ type: "date" })
  startDay: string;

  @Column({ type: "date" })
  endDay: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Trip;
