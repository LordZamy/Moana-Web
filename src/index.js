import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './routes'

import './index.css'

// bind material UI to app
const MaterialUIRoutes = () => (
  <MuiThemeProvider>
    <Routes history={browserHistory } />
  </MuiThemeProvider>
)

ReactDOM.render(
  <MaterialUIRoutes />,
  document.getElementById('root')
);
