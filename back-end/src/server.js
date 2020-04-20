import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';

// dotenv : github에 올릴수 없는 정보를 암호화 함
// ex) api key, port번호 등
dotenv.config();

// .env파일에 있는 port번호를 받아옴
const PORT = process.env.PORT || 4000;

// graphql서버의 경우
// 1. 데이터 요청(Query) 혹은 데이터 변경(Mutation)의 방식에 대한 정의
// 2. 데이터 요청 혹은 데이터 변경이 들어왔을 때 실제 서버의 작동에 대한 정의
// 가 필요함

// typeDefs = 1번을 의미함
// hello라는 데이터 요청(Query)가 들어왔을 경우 서버는 String형태의 데이터를 제공해야함
const typeDefs = `
	type Query{
		hello: String!
	}
`;

// resolvers = 2번을 의미함
// hello라는 데이터 요청(Query)가 들어온 경우 서버는 hi를 리턴함
const resolvers = {
  Query: {
    hello: () => 'hi',
  },
};

// graphql서버 정의
const server = new GraphQLServer({ typeDefs, resolvers });

// 서버 시작
server.start({ port: PORT }, () => console.log(`Server running on port ${PORT}`));
