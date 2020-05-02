import { SignUpIntraMutationArgs, SignUpIntraResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import {} from "jsonwebtoken";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    SignUpIntra: async (
      _,
      args: SignUpIntraMutationArgs
    ): Promise<SignUpIntraResponse> => {
      try {
        const {token} = args;
        // json web token을 해독함
        const decode: any = jwt.verify(token, process.env.JWT_TOKEN || "");

        // 해독한 정보에서 id를 가져옴
        const { id } = decode;

        //회원가입 하려는 id와, 인트라 인증 id가 일치하는지 확인
        if (id != args.id){
          return { result: false, error: "회원 정보와 intra인증 정보가 일치하지 않습니다.", token: null };
        }

        // 회원가입 진행
        const user = await User.create(args).save();
        await User.create(args).save();
        return { result: true, error: null, token: createJWT(user.id) };
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }
    },
  },
};

export default resolvers;
