import {
  GetNearbyTripsQueryArgs,
  GetNearbyTripsResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { Between, getRepository } from "typeorm";
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
          const trip = await Trip.findOne({ id: args.tripId });
          if (trip) {
            if (trip.hostId === user.id) {
              try {
                const trips: Trip[] = await getRepository(Trip).find({
                  lat: Between(trip.lat - 0.05, trip.lat + 0.05),
                  lng: Between(trip.lng - 0.05, trip.lng + 0.05),
                  startAt: Between(trip.startAt, trip.endAt),
                  endAt: Between(trip.startAt, trip.endAt),
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
              error: "Trip not found",
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
