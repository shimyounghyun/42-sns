import dotenv from "dotenv";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";

dotenv.config();

const appOptions: Options = {
  port: process.env.PORT,
  playground: process.env.PLAYGROUND_ENDPOINT,
  endpoint: process.env.GRAPHQL_ENDPOINT,
  subscriptions: {
    path: process.env.SUBSCRIPTION_ENDPOINT,
    // 아래의 함수는 app에 정의되어있는
    // jwt(http상에서 토큰을 확인하는 함수)처럼 webSocket상에서
    // 토큰을 확인함
    onConnect: async (connectionParmas) => {
      const token = connectionParmas.JWT;
      console.log(token);
      if (token) {
        const user = await decodeJWT(token);
        if (user) {
          return {
            currentUser: user,
          };
        }
      }

      // 토큰이 없는경우 에러 발생
      throw new Error("No JWT. Can't subscribe");
    },
  },
};

const handleAppStart = () =>
  console.log(`server is listening on ${process.env.PORT}`);

createConnection(connectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
