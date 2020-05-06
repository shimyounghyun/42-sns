export const typeDefs = ["type GetMyChatAsHostResponse {\n  result: Boolean!\n  error: String\n  chats: [Chat]\n}\n\ntype Query {\n  GetMyChatAsHost: GetMyChatAsHostResponse!\n  GetDatesNearTrips(dateId: Int!): GetDatesNearTripsResponse!\n  GetMyDates: GetMyDatesResponse\n  GetNearbyDates(dateId: Int!): GetNearbyDatesResponse!\n  GetMyPlaces: GetMyPlacesResponse!\n  GetNearbyPlaces(placeId: Int!): GetNearbyPlacesResponse!\n  GetPlaceNearTrips(placeId: Int!): GetPlaceNearTripsResponse!\n  GetMyTripsAsHost: GetMyTripsAsHostResponse!\n  GetNearbyTrips(tripId: Int!): GetNearbyTripsResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse\n  GetMyProfile: GetMyProfileResponse\n  SignInIntra(intraId: String!): SignInIntraResponse\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  guest: User!\n  guestId: Int!\n  host: User!\n  hostId: Int!\n  trip: Trip\n  tripId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddDates(name: String!, startAt: String!, endAt: String!, isFav: Boolean!): AddDatesResponse\n  DeleteDates(datesId: Int!): DeleteDatesResponse\n  EditDates(id: Int!, name: String, isFav: Boolean): EditDatesResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse\n  EditPlace(id: Int!, name: String, isFav: Boolean): EditPlaceResponse!\n  AddTrip(title: String, caption: String, file: [String], placeId: Int!, datesId: Int!): AddTripResponse!\n  ConfirmRequest(tripId: Int!, confirmResult: Boolean!): ConfirmRequestResponse!\n  DeleteTrip(tripId: Int!): DeleteTripResponse\n  EditPlaceDates(id: Int!, lat: Float, lng: Float, startAt: String, endAt: String): EditPlaceDatesResponse!\n  EditTripInfo(id: Int!, title: String, caption: String, file: [String]): EditTripInfoResponse!\n  RequestTrip(tripId: Int!): RequestTripResponse!\n  TripCanceled(tripId: Int!): TripCanceledResponse!\n  TripEnd(tripId: Int!): TripEndResponse!\n  TripStart(tripId: Int!): TripStartResponse!\n  IntraConnect(code: String): IntraConnectResponse\n  SignUpIntra(email: String!, userName: String!, firstName: String!, lastName: String!, profilePhoto: String!, intraId: String!, password: String!, token: String!): SignUpIntraResponse\n  UpdateMyProfile(bio: String, profilePhoto: String): UpdateMyProfileResponse\n  UpdatePassword(previousPassword: String!, presentPassword: String!): UpdatePasswordResponse\n}\n\ntype DeleteDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EditDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype GetDatesNearTripsResponse {\n  result: Boolean!\n  error: String\n  trips: [Trip]\n}\n\ntype GetMyDatesResponse {\n  result: Boolean!\n  error: String\n  dates: [Dates]\n}\n\ntype GetNearbyDatesResponse {\n  result: Boolean!\n  error: String\n  dates: [Dates]\n}\n\ntype Dates {\n  id: Int!\n  name: String!\n  startAt: String!\n  endAt: String!\n  user: User!\n  userId: Int!\n  isFav: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  result: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  result: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype GetNearbyPlacesResponse {\n  result: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype GetPlaceNearTripsResponse {\n  result: Boolean!\n  error: String\n  trips: [Trip]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  user: User!\n  userId: Int!\n  isFav: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddTripResponse {\n  result: Boolean!\n  error: String\n}\n\ntype ConfirmRequestResponse {\n  result: Boolean!\n  error: String\n}\n\ntype DeleteTripResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EditPlaceDatesResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EditTripInfoResponse {\n  result: Boolean!\n  error: String\n}\n\ntype GetMyTripsAsHostResponse {\n  result: Boolean!\n  error: String\n  trips: [Trip]\n}\n\ntype GetNearbyTripsResponse {\n  result: Boolean!\n  error: String\n  trips: [Trip]\n}\n\ntype Subscription {\n  GuestSubscription: Trip\n  HostSubscription: Trip\n}\n\ntype RequestTripResponse {\n  result: Boolean!\n  error: String\n}\n\ntype Trip {\n  id: Int!\n  status: String!\n  host: User!\n  hostId: Int!\n  guest: User\n  guestId: Int\n  title: String\n  caption: String\n  file: [String]\n  lat: Float!\n  lng: Float!\n  startAt: String!\n  endAt: String!\n  chats: [Chat]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype TripCanceledResponse {\n  result: Boolean!\n  error: String\n}\n\ntype TripEndResponse {\n  result: Boolean!\n  error: String\n}\n\ntype TripStartResponse {\n  result: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  result: Boolean!\n  error: String\n  user: User\n}\n\nenum ConnectType {\n  LOGIN\n  REGIST\n  ERROR\n}\n\ntype UserBasicInfo {\n  id: Int!\n  email: String!\n  userName: String!\n  firstName: String!\n  lastName: String!\n  profilePhoto: String!\n  intraId: String!\n}\n\ntype IntraConnectResponse {\n  result: Boolean!\n  error: String\n  token: String\n  type: ConnectType\n  data: UserBasicInfo\n}\n\ntype User {\n  id: Int!\n  email: String!\n  userName: String!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  profilePhoto: String!\n  bio: String\n  password: String!\n  places: [Place]\n  dates: [Dates]\n  chatsAsHost: [Chat]\n  chatsAsGuest: [Chat]\n  messages: [Message]\n  tripAsHost: [Trip]\n  tripAsGuest: [Trip]\n  intraId: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignInIntraResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype SignUpIntraResponse {\n  result: Boolean!\n  error: String\n  token: String\n}\n\ntype UpdateMyProfileResponse {\n  result: Boolean!\n  error: String\n}\n\ntype UpdatePasswordResponse {\n  result: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMyChatAsHost: GetMyChatAsHostResponse;
  GetDatesNearTrips: GetDatesNearTripsResponse;
  GetMyDates: GetMyDatesResponse | null;
  GetNearbyDates: GetNearbyDatesResponse;
  GetMyPlaces: GetMyPlacesResponse;
  GetNearbyPlaces: GetNearbyPlacesResponse;
  GetPlaceNearTrips: GetPlaceNearTripsResponse;
  GetMyTripsAsHost: GetMyTripsAsHostResponse;
  GetNearbyTrips: GetNearbyTripsResponse;
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

export interface GetNearbyTripsQueryArgs {
  tripId: number;
}

export interface EmailSignInQueryArgs {
  email: string;
  password: string;
}

export interface SignInIntraQueryArgs {
  intraId: string;
}

export interface GetMyChatAsHostResponse {
  result: boolean;
  error: string | null;
  chats: Array<Chat> | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  guest: User;
  guestId: number;
  host: User;
  hostId: number;
  trip: Trip | null;
  tripId: number | null;
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
  chatsAsHost: Array<Chat> | null;
  chatsAsGuest: Array<Chat> | null;
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
  user: User;
  userId: number;
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Dates {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
  user: User;
  userId: number;
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Trip {
  id: number;
  status: string;
  host: User;
  hostId: number;
  guest: User | null;
  guestId: number | null;
  title: string | null;
  caption: string | null;
  file: Array<string> | null;
  lat: number;
  lng: number;
  startAt: string;
  endAt: string;
  chats: Array<Chat> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetDatesNearTripsResponse {
  result: boolean;
  error: string | null;
  trips: Array<Trip> | null;
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

export interface GetMyTripsAsHostResponse {
  result: boolean;
  error: string | null;
  trips: Array<Trip> | null;
}

export interface GetNearbyTripsResponse {
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
  AddTrip: AddTripResponse;
  ConfirmRequest: ConfirmRequestResponse;
  DeleteTrip: DeleteTripResponse | null;
  EditPlaceDates: EditPlaceDatesResponse;
  EditTripInfo: EditTripInfoResponse;
  RequestTrip: RequestTripResponse;
  TripCanceled: TripCanceledResponse;
  TripEnd: TripEndResponse;
  TripStart: TripStartResponse;
  IntraConnect: IntraConnectResponse | null;
  SignUpIntra: SignUpIntraResponse | null;
  UpdateMyProfile: UpdateMyProfileResponse | null;
  UpdatePassword: UpdatePasswordResponse | null;
}

export interface AddDatesMutationArgs {
  name: string;
  startAt: string;
  endAt: string;
  isFav: boolean;
}

export interface DeleteDatesMutationArgs {
  datesId: number;
}

export interface EditDatesMutationArgs {
  id: number;
  name: string | null;
  isFav: boolean | null;
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

export interface AddTripMutationArgs {
  title: string | null;
  caption: string | null;
  file: Array<string> | null;
  placeId: number;
  datesId: number;
}

export interface ConfirmRequestMutationArgs {
  tripId: number;
  confirmResult: boolean;
}

export interface DeleteTripMutationArgs {
  tripId: number;
}

export interface EditPlaceDatesMutationArgs {
  id: number;
  lat: number | null;
  lng: number | null;
  startAt: string | null;
  endAt: string | null;
}

export interface EditTripInfoMutationArgs {
  id: number;
  title: string | null;
  caption: string | null;
  file: Array<string> | null;
}

export interface RequestTripMutationArgs {
  tripId: number;
}

export interface TripCanceledMutationArgs {
  tripId: number;
}

export interface TripEndMutationArgs {
  tripId: number;
}

export interface TripStartMutationArgs {
  tripId: number;
}

export interface IntraConnectMutationArgs {
  code: string | null;
}

export interface SignUpIntraMutationArgs {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  intraId: string;
  password: string;
  token: string;
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

export interface AddTripResponse {
  result: boolean;
  error: string | null;
}

export interface ConfirmRequestResponse {
  result: boolean;
  error: string | null;
}

export interface DeleteTripResponse {
  result: boolean;
  error: string | null;
}

export interface EditPlaceDatesResponse {
  result: boolean;
  error: string | null;
}

export interface EditTripInfoResponse {
  result: boolean;
  error: string | null;
}

export interface RequestTripResponse {
  result: boolean;
  error: string | null;
}

export interface TripCanceledResponse {
  result: boolean;
  error: string | null;
}

export interface TripEndResponse {
  result: boolean;
  error: string | null;
}

export interface TripStartResponse {
  result: boolean;
  error: string | null;
}

export interface IntraConnectResponse {
  result: boolean;
  error: string | null;
  token: string | null;
  type: ConnectType | null;
  data: UserBasicInfo | null;
}

export type ConnectType = "LOGIN" | "REGIST" | "ERROR";

export interface UserBasicInfo {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  intraId: string;
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

export interface Subscription {
  GuestSubscription: Trip | null;
  HostSubscription: Trip | null;
}
