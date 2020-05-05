import { RequestTripMutationArgs, RequestTripResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    RequestTrip: privateResolver(
      async (
        _,
        args: RequestTripMutationArgs,
        { req, pubSub }
      ): Promise<RequestTripResponse> => {
        const user: User = req.user;

        try {
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip) {
            if (trip.hostId === user.id) {
              if (trip.status === "WATING") {
                await Trip.update(
                  { id: args.tripId },
                  { status: "REQUESTING", guest: user }
                );
                // connst updatedTrip = awati Trip.update()
                // 이경우 null이 들어옴
                // 그래서 Trip.findOne();으로 다시 찾아서 리턴함
                const updatedTrip = await Trip.findOne({ id: args.tripId });
                pubSub.publish("hostSubscription", {
                  HostSubscription: updatedTrip,
                });
                return {
                  result: true,
                  error: null,
                };
              } else {
                return {
                  result: false,
                  error: "Closed trip",
                };
              }
            } else {
              return {
                result: false,
                error: "Host can not be a guest",
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
