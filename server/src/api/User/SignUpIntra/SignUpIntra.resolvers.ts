import { SignUpIntraMutationArgs, SignUpIntraResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    SignUpIntra: async (
      _,
      args: SignUpIntraMutationArgs
    ): Promise<SignUpIntraResponse> => {
      try {
        const newUser = await User.create(args).save();

        if (newUser) {
          return { result: true, error: null, token: "Sign In" };
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
