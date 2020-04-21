import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import Home from './Home'
import initApolloClient from '../../apollo'

const HomeWrapper = ({ history }) => {
  return (
    <ApolloProvider client={initApolloClient(false)}>
      <Home />
    </ApolloProvider>
  )
}

export default HomeWrapper
