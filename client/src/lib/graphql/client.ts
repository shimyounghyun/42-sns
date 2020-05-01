import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {withClientState} from 'apollo-link-state';
import {ApolloLink, Observable} from 'apollo-link';

// apollo-boost -> 최신
// 관련 자료 :  https://www.apollographql.com/docs/react/migrating/boost-migration/

//  header에 JWT : token을 넣어서 보내기 위한 함수
const request = async (operation:any) => {
    const token = localStorage.getItem("jwt");
    operation.setContext({
      headers: {
        "JWT": token
      }
    });
  };

// 아폴로 클라이언트 생성 및 link, resolver 정의
const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new ApolloLink((operation, forward) =>
        new Observable(observer => {
            let handle:any;
            Promise.resolve(operation)
            .then(oper => request(oper))
            .then(() => {
                handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
                });
            })
            .catch(observer.error.bind(observer));
            return () => {
            if (handle) handle.unsubscribe();
            };
        })
    ),
      withClientState({
        defaults: {
          auth: {
            __typename: "Auth",
            isLoggedIn : Boolean(localStorage.getItem("jwt"))
          }
        },
        resolvers:{
            Mutation: {
                logUserIn: (_:any, {token}:any, {cache}:any) => {
                    localStorage.setItem("jwt", token);
                    cache.writeData({
                        data:{
                            auth: {
                                __typename : "Auth",
                                isLoggedIn: true
                            }
                        }
                    })
                    return null;
                },
                logUserOut: (_:any, __:any, {cache}:any) => {
                    localStorage.removeItem("jwt");
                    cache.writeData({
                        data: {
                            auth: {
                                __typename: "Auth",
                                isLoggedIn: false
                            }
                        }
                    });
                    return null;
                }
            }
        }
      }),
      new HttpLink({
        uri: 'http://localhost:4000/graphql'
      })
    ]),
    cache: new InMemoryCache()
  });

export default client