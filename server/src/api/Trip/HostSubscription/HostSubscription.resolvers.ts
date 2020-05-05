import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    HostSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("hostSubscription");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            HostSubscription: { hostId },
          } = payload;

          if (hostId === user.id) return true;
          return false;
        }
      ),
    },
  },
};

export default resolvers;
