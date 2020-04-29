import {
  UpdatePasswordMutationArgs,
  UpdatePasswordResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    UpdatePassword: privateResolver(
      async (
        _,
        args: UpdatePasswordMutationArgs,
        { req }
      ): Promise<UpdatePasswordResponse> => {
        const user: User = req.user;
        const { previousPassword, presentPassword } = args;

        if (presentPassword === previousPassword) {
          return {
            result: false,
            error: "presentPassword and previousPassword is same",
          };
        }

        try {
          // 기존의 비밀번호가 맞는지 확인
          const passwordResult = await user.comparePassword(previousPassword);

          if (passwordResult) {
            // 비밀번호가 맞는경우
            user.password = presentPassword;
            user.save();
            return {
              result: true,
              error: null,
            };
          } else {
            // 비밀번호가 틀린경우
            return {
              result: false,
              error: "password not match",
            };
          }
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
