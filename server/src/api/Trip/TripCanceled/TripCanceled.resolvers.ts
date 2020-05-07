import {
  TripCanceledMutationArgs,
  TripCanceledResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    TripCanceled: privateResolver(
      async (
        _,
        args: TripCanceledMutationArgs,
        { req, pubSub }
      ): Promise<TripCanceledResponse> => {
        const user: User = req.user;
        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (
            trip &&
            trip.status !== "CANCELED" &&
            trip.status !== "FINISHED"
          ) {
            if (trip.hostId === user.id) {
              await Trip.update({ id: args.tripId }, { status: "CANCELED" });
              const updatedTrip = await Trip.findOne({ id: args.tripId });
              pubSub.publish("guestSubscription", {
                GuestSubscription: updatedTrip,
              });
              return {
                result: true,
                error: null,
              };
            } else {
              return {
                result: false,
                error: "Not authoirzed",
              };
            }
          } else {
            return {
              result: false,
              error: "Trip not found",
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
