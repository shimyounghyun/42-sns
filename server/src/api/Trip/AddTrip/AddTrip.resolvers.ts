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
        const { title, caption, file, placeId, datesId } = args;
        try {
          const place = await Place.findOne({ id: placeId });
          const dates = await Dates.findOne({ id: datesId });
          const notNull = cleanNullArgs({
            title,
            caption,
            file,
            startAt: dates?.startAt,
            endAt: dates?.endAt,
            lat: place?.lat,
            lng: place?.lng,
          });
          await Trip.create({
            ...notNull,
            host: user,
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
      }
    ),
  },
};

export default resolvers;
