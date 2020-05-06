import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    GuestSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("guestSubscription");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            GuestSubscription: { guestId },
          } = payload;
          if (guestId === user.id) return true;
          return false;
        }
      ),
    },
  },
};

export default resolvers;
