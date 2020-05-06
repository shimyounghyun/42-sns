import { TripEndMutationArgs, TripEndResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    TripEnd: privateResolver(
      async (
        _,
        args: TripEndMutationArgs,
        { req, pubSub }
      ): Promise<TripEndResponse> => {
        const user: User = req.user;

        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip && trip.status === "ONROUTE") {
            if (trip.hostId === user.id) {
              await Trip.update({ id: trip.id }, { status: "FINISHED" });
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
