import {
  GetNearbyPlacesQueryArgs,
  GetNearbyPlacesResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { Between, getRepository } from "typeorm";
import Place from "../../../entities/Place";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetNearbyPlaces: privateResolver(
      async (
        _,
        args: GetNearbyPlacesQueryArgs,
        { req }
      ): Promise<GetNearbyPlacesResponse> => {
        const user: User = req.user;

        try {
          const place = await Place.findOne({ id: args.placeId });

          if (place) {
            if (place.userId === user.id) {
              const { lat, lng } = place;
              try {
                const places: Place[] = await getRepository(Place).find({
                  lat: Between(lat - 0.05, lat + 0.05),
                  lng: Between(lng - 0.05, lng + 0.05),
                });
                return {
                  result: true,
                  error: null,
                  places,
                };
              } catch (error) {
                return {
                  result: false,
                  error: error.message,
                  places: null,
                };
              }
            } else {
              return {
                result: false,
                error: "Not Authorized",
                places: null,
              };
            }
          } else {
            return {
              result: false,
              error: "Place not found",
              places: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            places: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
