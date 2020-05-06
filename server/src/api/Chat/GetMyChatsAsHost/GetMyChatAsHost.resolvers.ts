import { GetMyChatAsHostResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyChatAsHost: privateResolver(
      async (_, __, { req }): Promise<GetMyChatAsHostResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["chatsAsHost"] }
          );
          if (user) {
            return {
              result: true,
              error: null,
              chats: user.chatsAsHost,
            };
          } else {
            return {
              result: false,
              error: "Chats not found",
              chats: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            chats: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
