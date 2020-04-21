import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Segment basic inverted>
      <Header as='h4' inverted>
        Currency Kronverter
      </Header>
    </Segment>
  )
}
export default NavBar
