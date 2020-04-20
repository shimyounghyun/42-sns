import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';

// dotenv : github에 올릴수 없는 정보를 암호화 함
// ex) api key, port번호 등
dotenv.config();

const PORT = process.env.PORT || 4000;

const typeDefs = `
	type Query{
		hello: String!
	}
`;
const resolvers = {
  Query: {
    hello: () => 'hi',
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () => console.log(`Server running on port ${PORT}`));
