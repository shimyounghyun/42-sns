import { GetChatQueryArgs, GetChatResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;

        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (chat.hostId === user.id || chat.guestId === user.id) {
              return {
                result: true,
                error: null,
                chat,
              };
            } else {
              return {
                result: false,
                error: "Not authorized",
                chat: null,
              };
            }
          } else {
            return {
              result: false,
              error: "Chat not found",
              chat: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            chat: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
