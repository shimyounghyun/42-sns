import { SignInIntraQueryArgs, SignInIntraResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    SignInIntra: async (
      _,
      args: SignInIntraQueryArgs
    ): Promise<SignInIntraResponse> => {
      try {
        // intraId이용하여 회원가입 여부 확인
        const existingUser = await User.findOne(args);

        if (existingUser) {
          return { result: true, error: null, token: "Log In" };
        } else {
          return { result: false, error: null, token: null };
        }
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }
    },
  },
};

export default resolvers;
