import {
  DeleteTripMutationArgs,
  DeleteTripResponse,
  User,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    DeleteTrip: privateResolver(
      async (
        _,
        args: DeleteTripMutationArgs,
        { req }
      ): Promise<DeleteTripResponse> => {
        const user: User = req.user;
        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip) {
            if (trip.hostId === user.id) {
              await trip.remove();
              return {
                result: true,
                error: null,
              };
            } else {
              return {
                result: false,
                error: "Not Authorized",
              };
            }
          } else {
            return {
              result: false,
              error: "Trip Not Found",
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
