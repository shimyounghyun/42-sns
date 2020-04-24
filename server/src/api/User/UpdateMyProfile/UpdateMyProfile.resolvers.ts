import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
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

        // 비밀번호만 바꾸고 싶은경우
        // 다른 값들은 null이기 때문에
        // 그대로 데이터를 업로드하면 문제가 생길 수 있음
        // 따라서 null인 값들을 없애주는 작업이 필요함
        const notNull = {};
        Object.keys(args).forEach((key) => {
          // Object.key() = 객체의 키를 리턴함
          if (args[key] !== null) {
            // args의 각각의 키를 통해 값을 확인함
            // 값이 null인경우를 제외하고 notNull에 값을 넣어줌
            notNull[key] = args[key];
          }
        });

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
