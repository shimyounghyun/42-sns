import { AddDateMutationArgs, AddDateResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Date from "../../../entities/Date";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    AddDate: privateResolver(
      async (
        _,
        args: AddDateMutationArgs,
        { req }
      ): Promise<AddDateResponse> => {
        const user: User = req.user;

        try {
          await Date.create({ ...args, user }).save();
          return {
            result: true,
            error: null,
          };
        } catch (error) {
          return {
            result: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
