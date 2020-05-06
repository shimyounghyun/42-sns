import jwt from "jsonwebtoken";
import { SignUpIntraMutationArgs, SignUpIntraResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    SignUpIntra: async (
      _,
      args: SignUpIntraMutationArgs
    ): Promise<SignUpIntraResponse> => {
      try {
        const {
          token,
          email,
          userName,
          firstName,
          lastName,
          profilePhoto,
          intraId,
          password,
        } = args;
        // json web token을 해독함
        const decode: any = jwt.verify(token, process.env.JWT_TOKEN || "");

        // 해독한 정보에서 id를 가져옴
        const { id } = decode;

        // 회원가입 진행
        const user = await User.create({
          id,
          email,
          userName,
          firstName,
          lastName,
          profilePhoto,
          intraId,
          password,
        }).save();
        return { result: true, error: null, token: createJWT(user.id) };
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }
    },
  },
};

export default resolvers;
