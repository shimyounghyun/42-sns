import { AddUserMutationArgs, addUserResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    addUser: async (_, args: AddUserMutationArgs): Promise<addUserResponse> => {
      try {
        const user = await User.create({ ...args }).save();
        return {
          result: true,
          error: null,
          token: createJWT(user.id),
        };
      } catch (error) {
        return {
          result: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
