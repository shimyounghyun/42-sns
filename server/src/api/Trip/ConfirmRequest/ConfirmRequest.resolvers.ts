import {
  ConfirmRequestMutationArgs,
  ConfirmRequestResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    ConfirmRequest: privateResolver(
      async (
        _,
        args: ConfirmRequestMutationArgs,
        { req, pubSub }
      ): Promise<ConfirmRequestResponse> => {
        const user: User = req.user;
        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip && trip.status === "REQUESTING") {
            if (trip.hostId === user.id) {
              if (args.confirmResult) {
                await Trip.update({ id: args.tripId }, { status: "ACCEPTED" });
              } else {
                await Trip.update({ id: args.tripId }, { status: "WATING" });
              }
              const updatedTrip = await Trip.findOne({ id: args.tripId });
              pubSub.publish("tripUpdate", {
                TripsSubscription: updatedTrip,
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
