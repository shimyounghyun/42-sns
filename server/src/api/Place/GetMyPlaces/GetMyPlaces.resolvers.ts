import { GetMyPlacesResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["places"] }
          );
          if (user) {
            return {
              result: true,
              places: user.places,
              error: null,
            };
          } else {
            return {
              result: false,
              error: "User not found",
              places: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            places: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
