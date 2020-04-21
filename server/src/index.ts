import dotenv from "dotenv";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";

dotenv.config();

const appOptions: Options = {
  port: process.env.PORT,
  playground: process.env.PLAYGROUND_ENDPOINT,
  endpoint: process.env.GRAPHQL_ENDPOINT,
};

const handleAppStart = () =>
  console.log(`server is listening on ${process.env.PORT}`);

createConnection(connectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
