import { TripStartMutationArgs, TripStartResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    TripStart: privateResolver(
      async (
        _,
        args: TripStartMutationArgs,
        { req, pubSub }
      ): Promise<TripStartResponse> => {
        const user: User = req.user;

        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip && trip.status === "ACCEPTED") {
            if (trip.hostId === user.id) {
              await Trip.update({ id: args.tripId }, { status: "ONROUTE" });
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
                error: "Not authorized",
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
