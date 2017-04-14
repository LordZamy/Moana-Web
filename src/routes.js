import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import EditProfile from './components/EditProfile'
import Map from './components/Map'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/">
      <Route component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Route>
      <Route path="/dashboard" component={Dashboard}>
        <Route path="/dashboard/editprofile" component={EditProfile} />
        <Route path="/dashboard/map" component={Map} />
      </Route>
    </Route>
  </Router>
)

export default Routes
