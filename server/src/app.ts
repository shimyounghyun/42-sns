import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

class App {
  public app: GraphQLServer;

  // schema : 모든 graphql 파일과 그에 해당하는 resolver 파일이 들어있음
  // context : express의 req값이 들어있음 (ex: 로그인한 유저 정보 등)
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        return {
          req: req.request,
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
