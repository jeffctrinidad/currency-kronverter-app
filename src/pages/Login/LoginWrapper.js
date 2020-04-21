import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import Login from './Login'
import initApolloClient from '../../apollo'

const LoginWrapper = ({ history }) => {
  return (
    <ApolloProvider client={initApolloClient(true)}>
      <Login history={history} />
    </ApolloProvider>
  )
}

export default LoginWrapper
