import { EditTripMutationArgs, EditTripResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    EditTrip: privateResolver(
      async (
        _,
        args: EditTripMutationArgs,
        { req }
      ): Promise<EditTripResponse> => {
        const user: User = req.user;

        try {
          const trip = await Trip.findOne({ id: args.id });

          if (trip) {
            if (trip.hostId === user.id) {
              const notNull = cleanNullArgs(args);
              await Trip.update({ id: args.id }, { ...notNull });
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
