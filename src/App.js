import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './routes'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
