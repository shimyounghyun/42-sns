export const typeDefs = ["type User {\n  id: Int!\n  email: String!\n  userName: String!\n  profilePhoto: String!\n  bio: String\n  password: String!\n  createAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  user: User\n}\n"];
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
  createAt: string;
  updatedAt: string | null;
}
