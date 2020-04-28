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
import Trip from "./Trip";
import User from "./User";

@Entity()
class Dates extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: true })
  startAt: string;

  @Column({ type: "date", nullable: true })
  endAt: string;

  @ManyToOne((type) => User, (user) => user.dates)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToMany((type) => Trip, (trip) => trip.dates)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Dates;
