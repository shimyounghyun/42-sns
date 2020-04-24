import { GetMyProfileResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: (_, __, { req }): GetMyProfileResponse => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user,
      };
    },
  },
};

export default resolvers;
