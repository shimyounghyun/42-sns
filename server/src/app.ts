import cors from "cors";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

dotenv.config();

class App {
  public app: GraphQLServer;

  // subscription을 위해 사용함
  public pubSub: any;

  // schema : 모든 graphql 파일과 그에 해당하는 resolver 파일이 들어있음
  // context : express의 req값이 들어있음 (ex: 로그인한 유저 정보 등)
  constructor() {
    // pubsub의 경우 데모에만 사용할 것
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);

    // context에 필요한 데이터를 넣음
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context,
        };
      },
    });
    this.middleWares();
  }

  // 미들웨어 설정
  private middleWares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  // 헤더에 있는 json web token을 해독해 유저정보를 얻어옴
  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // 헤더에있는 토큰을 받아옴
    const token = req.get("JWT");

    // 토큰이 있는경우
    if (token) {
      // 토큰을 해석해 유저 정보를 받아옴
      const user = await decodeJWT(token);

      if (user) {
        // 유저 정보를 받아온 경우
        // req에다가 유저정보를 넣음
        req.user = user;
      } else {
        // 유저 정보를 받아오지 못한경우
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
