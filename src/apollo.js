import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const initApolloClient = (isLogin) => {
  const httpLink = createHttpLink({
    uri: isLogin
      ? process.env.REACT_APP_CURRENCY_KRONVERTER_LOGIN_API
      : process.env.REACT_APP_CURRENCY_KRONVERTER_API,
  })
  const authLink = setContext(async (_, { headers }) => {
    const accessToken = localStorage.getItem('accessToken')
    return {
      headers: {
        ...headers,
        ...(!isLogin && {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        }),
      },
    }
  })
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
  })
  return client
}

export default initApolloClient
