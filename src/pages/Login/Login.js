import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Modal, Grid, Form } from 'semantic-ui-react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  query login($email: String, $password: String) {
    authenticateUser(userInput: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`

const Login = ({ history }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [submitCredentials, { data }] = useLazyQuery(LOGIN)
  useEffect(() => {
    if (data?.authenticateUser) {
      localStorage.setItem('accessToken', data.authenticateUser.accessToken)
      history.push('/home')
    }
  }, [data, history])
  const handleEmailChange = (event, data) => {
    setEmail(data.value)
  }

  const handlePasswordChange = (event, data) => {
    setPassword(data.value)
  }

  const submit = (event) => {
    event.preventDefault()
    submitCredentials({ variables: { email, password } })
  }

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Modal size='tiny' open>
          <Modal.Header>Login</Modal.Header>
          <Modal.Content>
            <Form onSubmit={submit}>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                type='text'
                onChange={handleEmailChange}
                placeholder='email'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                type='password'
                onChange={handlePasswordChange}
                placeholder='password'
              />
              <Container textAlign='right'>
                <Form.Button primary>Submit</Form.Button>
              </Container>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default Login
