import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    TripsSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("tripUpdate");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            TripsSubscription: { guestId, hostId },
          } = payload;
          if (guestId === user.id || hostId === user.id) return true;
          return false;
        }
      ),
    },
  },
};

export default resolvers;
