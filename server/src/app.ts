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
				// console.log(req.connection)
				// console.log(req.request)

				// context undefined 에러 발생 방지
				// context에 디폴트 값으로 null을 부여
				// connection에는 디폴트 값으로 비어있는 값 부여
				const { connection: { context = null } = {} } = req
				return {
					req: req.request,
					context
				}
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
    // this.app.express.get('/auth', async (req, res) => {
    //   //const code = req.query.code || null;
    //   //console.log("코드값?",code);
    //   const code = 'd9dd5ba18a539733f2ee70eaf1633aa37f08efa7f08b16b323308e7914141015';

    //   // if (code){
    //     const grant_type = 'authorization_code';
    //     const client_id = '5502eb0a16b9d4e2c52efa25d4a97437462c649ea3e3f5e0ad8ef5e0c24a700e';
    //     const client_secret = '02673be641d22404932124304f110cb6f2d6179df3c9dfda18962876318d317a';
    //     const redirect_uri = 'http://127.0.0.1:4000/auth';
    //     const access_token = await axios.post(
    //       'https://api.intra.42.fr/oauth/token',
    //       {
    //         grant_type,
    //         client_id,
    //         client_secret,
    //         redirect_uri,
    //         code
    //       }
    //     )
    //     .then(r =>r.data.access_token)
    //     .catch(e =>{console.log(e); return null;});

    //     if (access_token){
    //       const info = await axios.get(
    //         'https://api.intra.42.fr/v2/me',
    //         {
    //           headers: {
    //             Authorization : `Bearer ${access_token}`
    //           }
    //         }
    //       )
    //       .then(r => r.data)
    //       .catch(e =>{console.log(e); return null;});

    //       console.log(info);
    //     }
    //   // }else {

    //   // }
    //     return ;
    // });
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
