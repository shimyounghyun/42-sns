import { EmailSignInQueryArgs, EmailSignInResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    EmailSignIn: async (
      _,
      args: EmailSignInQueryArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;

      try {
        // 회원가입 여부 확인
        const user = await User.findOne({ email });

        if (!user) {
          // 회원가입 되어있지 않은경우
          return { result: false, error: null, token: null };
        }

        // 비밀번호 비교
        const result = await user.comparePassword(password);

        if (result) {
          // 비밀번호가 맞는경우
          return { result: true, error: null, token: "Log In" };
        } else {
          // 비밀번호가 아닌경우
          return { result: false, error: "Wrong password", token: null };
        }
      } catch (error) {
        return { result: false, error: error.message, token: null };
      }
    },
  },
};

export default resolvers;
