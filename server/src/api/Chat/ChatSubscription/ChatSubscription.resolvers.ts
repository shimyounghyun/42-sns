import { withFilter } from "graphql-yoga";
import User from "src/entities/User";

const resolvers = {
  Subscription: {
    ChatSubscripion: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("chatSubscription");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            ChatSubscripion: { guestId, hostId },
          } = payload;
          if (guestId === user.id || hostId === user.id) return true;
          return false;
        }
      ),
    },
  },
};

export default resolvers;
