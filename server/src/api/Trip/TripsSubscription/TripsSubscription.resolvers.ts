const resolvers = {
  Subscription: {
    TripsSubscription: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator("tripUpdate");
      },
    },
  },
};

export default resolvers;
