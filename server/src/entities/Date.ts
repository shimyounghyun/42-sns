import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Trip from "./Trip";

@Entity()
class Date extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  time: string;

  @ManyToMany((type) => Trip, (trip) => trip.dates)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Date;
