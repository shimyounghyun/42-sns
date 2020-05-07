/* 메인피드 화면에서 디폴트로 DB에 있는 모든 trip들을 보여주려고 했는데 기존에 있던 API에서는
  trip정보를 가져올 수는 있지만 그 trip과 관계성이 있는 user의 정보까지 접근할 수는 없었다.
  하지만 trip에 hostId로 User가 갖고 있는 id값이 있기 때문에 그 hostId를 통해서 해당 trip의
  User 정보에 접근하기 위해서 이 resolver를 만들었다. 
  이렇게 해야 메인화면에서 trip 포스트를 올린 user의 username, user 사진 등을 보여줄 수 있기 때문이다.
*/

import {
  GetUserWithHostIdResponse,
  GetUserWithHostIdQueryArgs,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetUserWithHostId: privateResolver(
      async (
        _,
        args: GetUserWithHostIdQueryArgs,
      ): Promise<GetUserWithHostIdResponse> => {
        try {
          const foundUser = await User.findOne({ id: args.hostId });
          if (foundUser) {
            return {
              result: true,
              error: null,
              user: foundUser,
            };
          } else {
            return {
              result: false,
              error: "Could not find the User",
              user: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            user: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
