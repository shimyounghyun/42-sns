import { GetMyProfileResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
        return {
          result: true,
          error: null,
          user,
        };
      }
    ),
  },
};

export default resolvers;
