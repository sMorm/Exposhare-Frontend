// Setup Apollo Client
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws' // requires subscriptions-transport-ws
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
const baseEndpoint = '35.173.202.28'

const wsEndpoint = `ws://${baseEndpoint}:4001/subscriptions`
const gqlEndpoint = `http://${baseEndpoint}:4001/graphql`

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

const wsLink = new WebSocketLink({
  uri: wsEndpoint,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(createUploadLink({ uri: gqlEndpoint })),
)

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})