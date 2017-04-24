import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import EditProfile from './components/EditProfile'
import Map from './components/Map'
import AddAvailReport from './components/AddAvailReport'
import AddPurityReport from './components/AddPurityReport'
import ViewReports from './components/ViewReports'
import HistoricalReport from './components/HistoricalReport'

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
        <Route path="/dashboard/addavailreport" component={AddAvailReport} />
        <Route path="/dashboard/addpurityreport" component={AddPurityReport} />
        <Route path="/dashboard/viewreports/:type" component={ViewReports} />
        <Route path="/dashboard/historical" component={HistoricalReport} />
      </Route>
    </Route>
  </Router>
)

export default Routes
