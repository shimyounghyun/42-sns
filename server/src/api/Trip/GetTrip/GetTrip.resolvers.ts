import { GetTripQueryArgs, GetTripResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetTrip: privateResolver(
      async (_, args: GetTripQueryArgs, { req }): Promise<GetTripResponse> => {
        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip) {
            return {
              result: true,
              error: null,
              trip,
            };
          } else {
            return {
              result: false,
              error: "Trip not found",
              trip: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            trip: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
