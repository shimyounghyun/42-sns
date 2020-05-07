import { GetMyTripsAsGuestResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyTripsAsGuest: privateResolver(
      async (_, __, { req }): Promise<GetMyTripsAsGuestResponse> => {
        try {
          const user = await User.findOne(
            {
              id: req.user.id,
            },
            { relations: ["tripAsGuest"] }
          );
          if (user) {
            return {
              result: true,
              error: null,
              trips: user.tripAsGuest,
            };
          } else {
            return {
              result: false,
              error: "User not found",
              trips: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            trips: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
