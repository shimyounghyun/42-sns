import { GetMyDatesResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyDates: privateResolver(
      async (_, __, { req }): Promise<GetMyDatesResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["dates"] }
          );
          if (user) {
            return {
              result: true,
              dates: user.dates,
              error: null,
            };
          } else {
            return {
              result: false,
              error: "User not found",
              dates: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            dates: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
