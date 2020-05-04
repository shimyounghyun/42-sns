import axios from "axios";
import {
  IntraConnectMutationArgs,
  IntraConnectResponse,
  UserBasicInfo,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
const resolvers: Resolvers = {
  Mutation: {
    IntraConnect: async (
      _,
      args: IntraConnectMutationArgs
    ): Promise<IntraConnectResponse> => {
      const { code } = args;
      const grantType = "authorization_code";
      const clientId =
        "5502eb0a16b9d4e2c52efa25d4a97437462c649ea3e3f5e0ad8ef5e0c24a700e";
      const clientSecret =
        "02673be641d22404932124304f110cb6f2d6179df3c9dfda18962876318d317a";
      const redirectUri = "http://127.0.0.1:3000/auth";
      const accessToken = await axios
        .post("https://api.intra.42.fr/oauth/token", {
          grant_type: grantType,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        })
        .then((r) => r.data.access_token)
        .catch((e) => {
          console.log(e);
          return null;
        });
      if (!accessToken)
        // access_token 가져오는데 실패
        return {
          result: false,
          error: "failed to get access_token",
          token: null,
          type: "ERROR",
          data: null,
        };
      // 유저 정보 가져오기
      const info = await axios
        .get("https://api.intra.42.fr/v2/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((r) => r.data)
        .catch((e) => {
          console.log(e);
          return null;
        });
      if (!info)
        // 유저 정보를 가져오는데 실패
        return {
          result: false,
          error: "failed to get user info",
          token: null,
          type: "ERROR",
          data: null,
        };

      const {
        id,
        email,
        login,
        first_name,
        last_name,
        image_url,
        displayname,
      } = info;

      const data: UserBasicInfo = {
        id,
        email,
        userName: displayname,
        firstName: first_name,
        lastName: last_name,
        profilePhoto: image_url,
        intraId: login,
      };
      // intraId로 가입내역 조회
      try {
        const existingUser = await User.findOne(data.id);

        if (existingUser) {
          // 가입한경우 로그인 처리
          return {
            result: true,
            error: null,
            token: createJWT(existingUser.id),
            type: "LOGIN",
            data: null,
          };
        }
      } catch (error) {
        return {
          result: false,
          error: error.message,
          token: null,
          type: "ERROR",
          data: null,
        };
      }
      // intraId 가입 내역이 없는경우 회원가입 진행
      return {
        result: true,
        error: null,
        token: createJWT(data.id),
        type: "REGIST",
        data,
      };
    },
  },
};

export default resolvers;
