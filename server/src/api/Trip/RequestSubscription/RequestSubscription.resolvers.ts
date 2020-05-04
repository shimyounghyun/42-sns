import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RequestSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("tripRequest");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RequestSubscription: { hostId },
          } = payload;

          if (hostId === user.id) return true;
          return false;
        }
      ),
    },
  },
};

export default resolvers;