export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  trip: Trip\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddDates(startAt: String!, endAt: String!): AddDatesResponse\n  DeleteDates(datesId: Int!): DeleteDatesResponse\n  EditDates(id: Int!, startAt: String, endAt: String): EditDatesResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse\n  EditPlace(id: Int!, name: String, isFav: Boolean): EditPlaceResponse!\n  IntraConnect(email: String!, userName: String!, firstName: String!, lastName: String!, profilePhoto: String!, intraId: String!): IntraConnectResponse\n  SignUpIntra(email: String!, userName: String!, firstName: String!, lastName: String!, profilePhoto: String!, intraId: String!, password: String!): SignUpIntraResponse\n  UpdateMyProfile(bio: String, profilePhoto: String): UpdateMyProfileResponse\n  UpdatePassword(previousPassword: String!, presentPassword: String!): UpdatePasswordResponse\n}\n\ntype DeleteDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EditDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype GetDatesNearTripsResponse {\n  result: Boolean!\n  error: String\n  trips: [Trip]\n}\n\ntype Query {\n  GetDatesNearTrips(dateId: Int!): GetDatesNearTripsResponse!\n  GetMyDates: GetMyDatesResponse\n  GetNearbyDates(dateId: Int!): GetNearbyDatesResponse!\n  GetMyPlaces: GetMyPlacesResponse!\n  GetNearbyPlaces(placeId: Int!): GetNearbyPlacesResponse!\n  GetPlaceNearTrips(placeId: Int!): GetPlaceNearTripsResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse\n  GetMyProfile: GetMyProfileResponse\n  SignInIntra(intraId: String!): SignInIntraResponse\n}\n\ntype GetMyDatesResponse {\n  result: Boolean!\n  error: String\n  dates: [Dates]\n}\n\ntype GetNearbyDatesResponse {\n  result: Boolean!\n  error: String\n  dates: [Dates]\n}\n\ntype Dates {\n  id: Int!\n  startAt: String!\n  endAt: String!\n  trips: [Trip]\n  user: User!\n  userId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  result: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype GetNearbyPlacesResponse {\n  result: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype GetPlaceNearTripsResponse {\n  result: Boolean!\n  error: String\n  trips: [Trip]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  trips: [Trip]\n  user: User!\n  userId: Int!\n  isFav: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddTripResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Trip {\n  id: Int!\n  status: String!\n  host: User!\n  guest: User\n  date: Dates\n  chat: Chat\n  place: Place\n  placeLat: String\n  placeLng: String\n  createdAt: String!\n  updatedAt: String\n}\n\ntype EmailSignInResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  result: Boolean!\n  error: String\n  user: User\n}\n\ntype IntraConnectResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  userName: String!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  profilePhoto: String!\n  bio: String\n  password: String!\n  places: [Place]\n  dates: [Dates]\n  chats: [Chat]\n  messages: [Message]\n  tripAsHost: [Trip]\n  tripAsGuest: [Trip]\n  intraId: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInIntraResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype SignUpIntraResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype UpdateMyProfileResponse {\n  result: Boolean!\n  error: String\n}\n\ntype UpdatePasswordResponse {\n  result: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetDatesNearTrips: GetDatesNearTripsResponse;
  GetMyDates: GetMyDatesResponse | null;
  GetNearbyDates: GetNearbyDatesResponse;
  GetMyPlaces: GetMyPlacesResponse;
  GetNearbyPlaces: GetNearbyPlacesResponse;
  GetPlaceNearTrips: GetPlaceNearTripsResponse;
  EmailSignIn: EmailSignInResponse | null;
  GetMyProfile: GetMyProfileResponse | null;
  SignInIntra: SignInIntraResponse | null;
}

export interface GetDatesNearTripsQueryArgs {
  dateId: number;
}

export interface GetNearbyDatesQueryArgs {
  dateId: number;
}

export interface GetNearbyPlacesQueryArgs {
  placeId: number;
}

export interface GetPlaceNearTripsQueryArgs {
  placeId: number;
}

export interface EmailSignInQueryArgs {
  email: string;
  password: string;
}

export interface SignInIntraQueryArgs {
  intraId: string;
}

export interface GetDatesNearTripsResponse {
  result: boolean;
  error: string | null;
  trips: Array<Trip> | null;
}

export interface Trip {
  id: number;
  status: string;
  host: User;
  guest: User | null;
  date: Dates | null;
  chat: Chat | null;
  place: Place | null;
  placeLat: string | null;
  placeLng: string | null;
  createdAt: string;
  updatedAt: string | null;
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
  dates: Array<Dates> | null;
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
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Dates {
  id: number;
  startAt: string;
  endAt: string;
  trips: Array<Trip> | null;
  user: User;
  userId: number;
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

export interface GetMyDatesResponse {
  result: boolean;
  error: string | null;
  dates: Array<Dates> | null;
}

export interface GetNearbyDatesResponse {
  result: boolean;
  error: string | null;
  dates: Array<Dates> | null;
}

export interface GetMyPlacesResponse {
  result: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetNearbyPlacesResponse {
  result: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetPlaceNearTripsResponse {
  result: boolean;
  error: string | null;
  trips: Array<Trip> | null;
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

export interface SignInIntraResponse {
  result: boolean;
  error: string | null;
  token: string | null;
}

export interface Mutation {
  AddDates: AddDatesResponse | null;
  DeleteDates: DeleteDatesResponse | null;
  EditDates: EditDatesResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse | null;
  EditPlace: EditPlaceResponse;
  IntraConnect: IntraConnectResponse | null;
  SignUpIntra: SignUpIntraResponse | null;
  UpdateMyProfile: UpdateMyProfileResponse | null;
  UpdatePassword: UpdatePasswordResponse | null;
}

export interface AddDatesMutationArgs {
  startAt: string;
  endAt: string;
}

export interface DeleteDatesMutationArgs {
  datesId: number;
}

export interface EditDatesMutationArgs {
  id: number;
  startAt: string | null;
  endAt: string | null;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  id: number;
  name: string | null;
  isFav: boolean | null;
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

export interface AddDatesResponse {
  result: boolean;
  error: string | null;
}

export interface DeleteDatesResponse {
  result: boolean;
  error: string | null;
}

export interface EditDatesResponse {
  result: boolean;
  error: string | null;
}

export interface AddPlaceResponse {
  result: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
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
