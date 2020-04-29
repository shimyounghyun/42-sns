import {
  GetNearbyTripsQueryArgs,
  GetNearbyTripsResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { Between, getRepository } from "typeorm";
import Place from "../../../entities/Place";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetNearbyTrips: privateResolver(
      async (
        _,
        args: GetNearbyTripsQueryArgs,
        { req }
      ): Promise<GetNearbyTripsResponse> => {
        const user: User = req.user;

        try {
          const place = await Place.findOne({ id: args.placeId });

          if (place) {
            if (place.userId === user.id) {
              const { lat, lng } = place;
              try {
                const trips: Trip[] = await getRepository(Trip).find({
                  placeLat: Between(lat - 0.05, lat + 0.05),
                  placeLng: Between(lng - 0.05, lng + 0.05),
                });
                return {
                  result: true,
                  error: null,
                  trips,
                };
              } catch (error) {
                return {
                  result: false,
                  error: error.message,
                  trips: null,
                };
              }
            } else {
              return {
                result: false,
                error: "Not Authorized",
                trips: null,
              };
            }
          } else {
            return {
              result: false,
              error: "Place not found",
              trips: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            trips: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
