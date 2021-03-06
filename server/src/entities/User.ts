import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import Chat from "./Chat";
import Date from "./Dates";
import Message from "./Message";
import Place from "./Place";
import Trip from "./Trip";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  userName: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @OneToMany((type) => Place, (place) => place.user)
  places: Place[] | any;

  @OneToMany((type) => Date, (date) => date.user)
  dates: Date[] | any;

  @OneToMany((type) => Chat, (chat) => chat.host)
  chatsAsHost: Chat[];

  @OneToMany((type) => Chat, (chat) => chat.guest)
  chatsAsGuest: Chat[];

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @OneToMany((type) => Trip, (trip) => trip.host)
  tripAsHost: Trip[];

  @OneToMany((type) => Trip, (trip) => trip.guest)
  tripAsGuest: Trip[];

  @Column({ type: "text" })
  intraId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

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
