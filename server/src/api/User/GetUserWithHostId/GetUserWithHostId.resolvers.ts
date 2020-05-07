/* �����ǵ� ȭ�鿡�� ����Ʈ�� DB�� �ִ� ��� trip���� �����ַ��� �ߴµ� ������ �ִ� API������
  trip������ ������ ���� ������ �� trip�� ���輺�� �ִ� user�� �������� ������ ���� ������.
  ������ trip�� hostId�� User�� ���� �ִ� id���� �ֱ� ������ �� hostId�� ���ؼ� �ش� trip��
  User ������ �����ϱ� ���ؼ� �� resolver�� �������. 
  �̷��� �ؾ� ����ȭ�鿡�� trip ����Ʈ�� �ø� user�� username, user ���� ���� ������ �� �ֱ� �����̴�.
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
