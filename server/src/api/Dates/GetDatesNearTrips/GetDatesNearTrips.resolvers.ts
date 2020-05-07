import {
  GetDatesNearTripsQueryArgs,
  GetDatesNearTripsResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { Between, getRepository } from "typeorm";
import Dates from "../../../entities/Dates";
import Trip from "../../../entities/Trip";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetDatesNearTrips: privateResolver(
      async (
        _,
        args: GetDatesNearTripsQueryArgs,
        { req }
      ): Promise<GetDatesNearTripsResponse> => {
        const user: User = req.user;

        try {
          const dates = await Dates.findOne({ id: args.dateId });
          if (dates) {
            if (dates.userId === user.id) {
              const { startAt, endAt } = dates;
              try {
                const trips: Trip[] = await getRepository(Trip).find(
                  {
                    relations: ["host"],
                    where: {
                      startAt: Between(startAt, endAt),
                      endAt: Between(startAt, endAt),
                    },
                  }
                  /*
                  {
                  startAt: Between(startAt, endAt),
                  endAt: Between(startAt, endAt),
                  }
                  */
                );
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
              error: "Dates not found",
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
