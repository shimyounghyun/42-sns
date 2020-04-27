import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;

        // 입력하지 않아 null값 들어가있는 경우 처리
        const notNull = cleanNullArgs(args);

        // 데이터 업로드 함
        try {
          await User.update({ id: user.id }, { ...notNull });
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
