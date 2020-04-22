export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Date {\n  id: Int!\n  time: String!\n  trips: [Trip]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  trips: [Trip]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Trip {\n  id: Int!\n  status: String!\n  destinationAddress: String!\n  destinationLat: Float!\n  destinationLng: Float!\n  host: User!\n  guest: User\n  dates: [Date]\n  place: Place\n  createdAt: String!\n  updatedAt: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  userName: String!\n  profilePhoto: String!\n  bio: String\n  password: String!\n  chats: [Chat]\n  messages: [Message]\n  tripAsHost: [Trip]\n  tripAsGuest: [Trip]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  user: User\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  profilePhoto: string;
  bio: string | null;
  password: string;
  chats: Array<Chat> | null;
  messages: Array<Message> | null;
  tripAsHost: Array<Trip> | null;
  tripAsGuest: Array<Trip> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Trip {
  id: number;
  status: string;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  host: User;
  guest: User | null;
  dates: Array<Date> | null;
  place: Place | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Date {
  id: number;
  time: string;
  trips: Array<Trip> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  trips: Array<Trip> | null;
  createdAt: string;
  updatedAt: string | null;
}
