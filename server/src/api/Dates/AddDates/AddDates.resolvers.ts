import { AddDatesMutationArgs, AddDatesResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Dates from "../../../entities/Dates";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    AddDates: privateResolver(
      async (
        _,
        args: AddDatesMutationArgs,
        { req }
      ): Promise<AddDatesResponse> => {
        const user: User = req.user;
        const { startAt, endAt } = args;

        if (endAt >= startAt) {
          try {
            await Dates.create({ ...args, user }).save();
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
        } else {
          return {
            result: false,
            error: "Start day is prior than end day",
          };
        }
      }
    ),
  },
};

export default resolvers;
