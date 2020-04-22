import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Trip from "./Trip";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "double precision", default: 0 })
  lat: number;

  @Column({ type: "double precision", default: 0 })
  lng: number;

  @Column({ type: "text" })
  address: string;

  @OneToMany((type) => Trip, (trip) => trip.place)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Place;
