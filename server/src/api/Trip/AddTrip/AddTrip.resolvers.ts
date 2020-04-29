import { AddTripMutationArgs, AddTripResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Dates from "../../../entities/Dates";
import Place from "../../../entities/Place";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    AddTrip: privateResolver(
      async (
        _,
        args: AddTripMutationArgs,
        { req }
      ): Promise<AddTripResponse> => {
        const user: User = req.user;
        const { placeId, dateId, title, caption, file } = args;

        try {
          const date = await Dates.findOne({ id: dateId });
          const place = await Place.findOne({ id: placeId });
          if (date && place) {
            if (date.userId === user.id && place.userId === user.id) {
              try {
                const notNull = cleanNullArgs({ caption, file, title });
                await Trip.create({
                  ...notNull,
                  host: user,
                  date,
                  place,
                }).save();
                return {
                  result: true,
                  error: null,
                };
              } catch (error) {
                return {
                  result: false,
                  error: error.message,
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
              error: "Dates and/or Place not found",
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
