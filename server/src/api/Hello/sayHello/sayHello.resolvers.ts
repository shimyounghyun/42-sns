import { SayHelloQueryArgs, sayHelloResponse } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (__, args: SayHelloQueryArgs): sayHelloResponse => {
      return {
        error: false,
        text: `love you ${args.name}`,
      };
    },
  },
};

export default resolvers;
