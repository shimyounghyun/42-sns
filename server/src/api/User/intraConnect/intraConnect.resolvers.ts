import {
  IntraConnectMutationArgs,
  IntraConnectResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    IntraConnect: async (
      _,
      args: IntraConnectMutationArgs
    ): Promise<IntraConnectResponse> => {
      const { intraId } = args;

      // intraId로 가입내역 조회
      try {
        const existingUser = await User.findOne({ intraId });

        if (existingUser) {
          // 가입한경우 로그인 처리
          return { result: true, error: null, token: "Log In" };
        }
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }

      // intraId 가입 내역이 없는경우 회원가입 진행
      try {
        await User.create(args).save();

        return { result: true, error: null, token: "Sign In" };
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }
    },
  },
};

export default resolvers;
