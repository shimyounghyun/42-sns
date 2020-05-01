import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

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

  @ManyToOne((type) => User, (user) => user.places)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: "boolean", default: false })
  isFav: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Place;
