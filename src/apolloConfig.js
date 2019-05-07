import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link'
import { ApolloClient } from 'apollo-boost';

const link = new HttpLink({
  uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
  credentials: 'omit'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  //Error handling
  link: ApolloLink.from([onError(({graphQLErrors, networkError})=>{
    //Query & mutation errors
    if(graphQLErrors){
      graphQLErrors.map(({message, locations, path})=>{
        console.error(
          `(GQL Error): message:${message}, location:${locations}, path: ${path} `
          )
      })}
      //Network errors
    if(networkError)console.error(`(Network Error): ${networkError}`)
  }),
  link
]),
cache
});

export default client;