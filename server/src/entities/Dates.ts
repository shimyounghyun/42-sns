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
import Trip from "./Trip";
import User from "./User";

@Entity()
class Dates extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  startAt: string;

  @Column({ type: "date" })
  endAt: string;

  @ManyToOne((type) => User, (user) => user.dates)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @OneToMany((type) => Trip, (trip) => trip.date)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Dates;
