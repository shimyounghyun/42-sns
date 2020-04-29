import {
  GetNearbyDatesQueryArgs,
  GetNearbyDatesResponse,
  User,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { Between, getRepository } from "typeorm";
import Dates from "../../../entities/Dates";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDates: privateResolver(
      async (
        _,
        args: GetNearbyDatesQueryArgs,
        { req }
      ): Promise<GetNearbyDatesResponse> => {
        const user: User = req.user;

        try {
          const date = await Dates.findOne({ id: args.dateId });

          if (date) {
            if (date.userId === user.id) {
              const { startAt, endAt } = date;
              try {
                const dates: Dates[] = await getRepository(Dates).find({
                  startAt: Between(startAt, endAt),
                  endAt: Between(startAt, endAt),
                });
                return {
                  result: true,
                  error: null,
                  dates,
                };
              } catch (error) {
                return {
                  result: false,
                  error: error.message,
                  dates: null,
                };
              }
            } else {
              return {
                result: false,
                error: "Not Authorized",
                dates: null,
              };
            }
          } else {
            return {
              result: false,
              error: "Dates not found",
              dates: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            dates: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
