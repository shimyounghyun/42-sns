import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  userName: string;

  @Column({ type: "text" })
  profilePhtot: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  bio: string;

  @ManyToOne((type) => Chat, (chat) => chat.participants)
  chat: Chat;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashPassword = await this.hashPassword(this.password);
      this.password = hashPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
