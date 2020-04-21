import { IsEmail } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "boolean", default: false })
  verifiedAuth: boolean;

  @Column({ type: "text" })
  userName: string;

  @Column({ type: "text" })
  profilePhtot: string;

  @Column({ type: "text" })
  password: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default User;
