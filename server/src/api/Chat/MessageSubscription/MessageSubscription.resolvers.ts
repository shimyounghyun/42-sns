import { withFilter } from "graphql-yoga";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscription: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            MessageSubscription: { chatId },
          } = payload;
          try {
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.guestId === user.id || chat.hostId === user.id;
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      ),
    },
  },
};

export default resolvers;
