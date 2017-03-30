import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRedirect to="/login" />
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
    </Route>
    <Route path="/dashboard" component={Dashboard}>

    </Route>
  </Router>
)

export default Routes
