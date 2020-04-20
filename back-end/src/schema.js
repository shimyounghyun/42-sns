import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

// api디렉토리에있는 모든 graphql파일(typeDef)을 alltypes에 적재
const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'));

// api디렉토리에있는 모든 js(resolver)파일을 allresolvers에 적재
const allReslovers = fileLoader(path.join(__dirname, '/api/**/*.js'));

// resolver와 typeDefs를 합쳐서 스키마를 만들어 냄
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allReslovers),
});

export default schema;
