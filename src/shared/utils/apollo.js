// Setup Apollo Client
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const gqlEndpoint = 'http://localhost:4001/graphql'

const httpLink = createHttpLink({
  uri: gqlEndpoint
})

/**
 * Applies token to header. This gets called every 
 * time the client makes a request to the server
 */

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})