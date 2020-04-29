import { EditDatesMutationArgs, EditDatesResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Dates from "../../../entities/Dates";
import User from "../../../entities/User";
import checkDates from "../../../utils/checkDates";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditDatesMutationArgs,
        { req }
      ): Promise<EditDatesResponse> => {
        const user: User = req.user;
        try {
          const dates = await Dates.findOne({ id: args.id });
          if (dates) {
            if (dates.userId === user.id) {
              if (
                checkDates(args.startAt, args.endAt, dates.startAt, dates.endAt)
              ) {
                const notNull = cleanNullArgs(args);
                await Dates.update({ id: args.id }, { ...notNull });
                return {
                  result: true,
                  error: null,
                };
              } else {
                return {
                  result: false,
                  error: "check startAt and endAt",
                };
              }
            } else {
              return {
                result: false,
                error: "Not Authorized",
              };
            }
          } else {
            return {
              result: false,
              error: "Dates not found",
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
