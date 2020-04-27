export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  trip: Trip\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Date {\n  id: Int!\n  time: String!\n  trips: [Trip]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!): AddPlaceResponse!\n  EditPlace(placeId: Int!, name: String): EditPlaceResponse!\n  IntraConnect(email: String!, userName: String!, firstName: String!, lastName: String!, profilePhoto: String!, intraId: String!): IntraConnectResponse\n  SignUpIntra(email: String!, userName: String!, firstName: String!, lastName: String!, profilePhoto: String!, intraId: String!, password: String!): SignUpIntraResponse\n  UpdateMyProfile(bio: String, profilePhoto: String): UpdateMyProfileResponse\n  UpdatePassword(previousPassword: String!, presentPassword: String!): UpdatePasswordResponse\n}\n\ntype EditPlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  trips: [Trip]\n  user: User!\n  userId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddTripResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Trip {\n  id: Int!\n  status: String!\n  host: User!\n  guest: User\n  dates: [Date]\n  chat: Chat\n  place: Place\n  createdAt: String!\n  updatedAt: String\n}\n\ntype EmailSignInResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype Query {\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse\n  GetMyProfile: GetMyProfileResponse\n  SignInIntra(intraId: String!): SignInIntraResponse\n}\n\ntype GetMyProfileResponse {\n  result: Boolean!\n  error: String\n  user: User\n}\n\ntype IntraConnectResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  userName: String!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  profilePhoto: String!\n  bio: String\n  password: String!\n  places: [Place]\n  chats: [Chat]\n  messages: [Message]\n  tripAsHost: [Trip]\n  tripAsGuest: [Trip]\n  intraId: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInIntraResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype SignUpIntraResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype UpdateMyProfileResponse {\n  result: Boolean!\n  error: String\n}\n\ntype UpdatePasswordResponse {\n  result: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  EmailSignIn: EmailSignInResponse | null;
  GetMyProfile: GetMyProfileResponse | null;
  SignInIntra: SignInIntraResponse | null;
}

export interface EmailSignInQueryArgs {
  email: string;
  password: string;
}

export interface SignInIntraQueryArgs {
  intraId: string;
}

export interface EmailSignInResponse {
  result: boolean;
  error: string | null;
  token: string | null;
}

export interface GetMyProfileResponse {
  result: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string | null;
  profilePhoto: string;
  bio: string | null;
  password: string;
  places: Array<Place> | null;
  chats: Array<Chat> | null;
  messages: Array<Message> | null;
  tripAsHost: Array<Trip> | null;
  tripAsGuest: Array<Trip> | null;
  intraId: string;
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
  user: User;
  userId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Trip {
  id: number;
  status: string;
  host: User;
  guest: User | null;
  dates: Array<Date> | null;
  chat: Chat | null;
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

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  trip: Trip | null;
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

export interface SignInIntraResponse {
  result: boolean;
  error: string | null;
  token: string | null;
}

export interface Mutation {
  AddPlace: AddPlaceResponse;
  EditPlace: EditPlaceResponse;
  IntraConnect: IntraConnectResponse | null;
  SignUpIntra: SignUpIntraResponse | null;
  UpdateMyProfile: UpdateMyProfileResponse | null;
  UpdatePassword: UpdatePasswordResponse | null;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface EditPlaceMutationArgs {
  placeId: number;
  name: string | null;
}

export interface IntraConnectMutationArgs {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  intraId: string;
}

export interface SignUpIntraMutationArgs {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  intraId: string;
  password: string;
}

export interface UpdateMyProfileMutationArgs {
  bio: string | null;
  profilePhoto: string | null;
}

export interface UpdatePasswordMutationArgs {
  previousPassword: string;
  presentPassword: string;
}

export interface AddPlaceResponse {
  result: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  result: boolean;
  error: string | null;
}

export interface IntraConnectResponse {
  result: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpIntraResponse {
  result: boolean;
  error: string | null;
  token: string | null;
}

export interface UpdateMyProfileResponse {
  result: boolean;
  error: string | null;
}

export interface UpdatePasswordResponse {
  result: boolean;
  error: string | null;
}

export interface AddTripResponse {
  result: boolean;
  error: string | null;
}
