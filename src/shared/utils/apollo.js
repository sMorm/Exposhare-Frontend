// Setup Apollo Client
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { gqlEndpoint as uri } from '../constants/global' 

export const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
})