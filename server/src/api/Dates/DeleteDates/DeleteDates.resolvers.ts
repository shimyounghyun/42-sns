import { DeleteDatesMutationArgs, DeleteDatesResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Dates from "../../../entities/Dates";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    DeleteDates: privateResolver(
      async (
        _,
        args: DeleteDatesMutationArgs,
        { req }
      ): Promise<DeleteDatesResponse> => {
        const user: User = req.user;
        try {
          const dates = await Dates.findOne({ id: args.datesId });
          if (dates) {
            if (dates.userId === user.id) {
              await dates.remove();
              return {
                result: true,
                error: null,
              };
            } else {
              return {
                result: false,
                error: "Not Authorided",
              };
            }
          } else {
            return {
              result: false,
              error: "Dates Not Found",
            };
          }
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
