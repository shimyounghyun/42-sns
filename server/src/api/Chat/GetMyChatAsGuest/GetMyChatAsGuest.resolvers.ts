import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import { GetMyChatAsGeustResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetMyChatAsGuest: privateResolver(
      async (_, __, { req }): Promise<GetMyChatAsGeustResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["chatsAsGuest"] }
          );
          if (user) {
            return {
              result: true,
              error: null,
              chats: user.chatsAsGuest,
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
