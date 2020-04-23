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
        // 회원가입 진행
        const user = await User.create(args).save();

        return { result: true, error: null, token: createJWT(user.id) };
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }
    },
  },
};

export default resolvers;
