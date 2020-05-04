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
            TripsSubscription: { guestId },
          } = payload;
          if (guestId === user.id) return true;
          return false;
        }
      ),
    },
  },
};

export default resolvers;
