import {
  EditPlaceDatesMutationArgs,
  EditPlaceDatesResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import checkDates from "../../../utils/checkDates";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    EditPlaceDates: privateResolver(
      async (
        _,
        args: EditPlaceDatesMutationArgs,
        { req, pubSub }
      ): Promise<EditPlaceDatesResponse> => {
        const user: User = req.user;
        try {
          const trip = await Trip.findOne({ id: args.id });
          if (trip) {
            if (trip.hostId === user.id) {
              if (
                checkDates(
                  args.startAt,
                  args.endAt,
                  trip.startAt,
                  trip.endAt
                ) ||
                (!args.startAt && !args.endAt)
              ) {
                const notNull = cleanNullArgs(args);
                await Trip.update({ id: args.id }, { ...notNull });
                const updatedTrip = await Trip.findOne({ id: args.id });
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
                  error: "startAt and/or endAt Wrong",
                };
              }
            } else {
              return {
                result: false,
                error: "Not Authorized",
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
