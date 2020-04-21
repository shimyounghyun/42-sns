export const typeDefs = ["type sayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  sayHello(name: String!): sayHelloResponse!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: sayHelloResponse;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface sayHelloResponse {
  text: string;
  error: boolean;
}
