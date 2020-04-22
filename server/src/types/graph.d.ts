export const typeDefs = ["type Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Trip {\n  id: Int!\n  status: String!\n  destinationAddress: String!\n  destinationLat: Float!\n  destinationLng: Float!\n  startDay: String!\n  endDay: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  userName: String!\n  profilePhoto: String!\n  bio: String\n  password: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  user: User\n}\n"];
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
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Trip {
  id: number;
  status: string;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  startDay: string;
  endDay: string;
  createdAt: string;
  updatedAt: string | null;
}
