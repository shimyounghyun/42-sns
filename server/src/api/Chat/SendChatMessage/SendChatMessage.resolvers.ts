import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse,
} from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateMiddleware";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;

        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (chat.hostId === user.id || chat.guestId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user,
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message,
              });
              return {
                result: true,
                error: null,
                message,
              };
            } else {
              return {
                result: false,
                error: "Not authorized",
                message: null,
              };
            }
          } else {
            return {
              result: false,
              error: "Chat not found",
              message: null,
            };
          }
        } catch (error) {
          return {
            result: false,
            error: error.message,
            message: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
