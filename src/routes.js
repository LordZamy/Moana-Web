import React from 'react'
import { Router, Route } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/login" component={LoginForm} />
  </Router>
)

export default Routes
