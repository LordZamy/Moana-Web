import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

import './style.css'

class LoginForm extends Component {
  render() {
    return (
        <form className="form" method="post">
          <TextField className="input" hintText="Username" />
          <TextField className="input" hintText="Password" type="password" />
          <RaisedButton className="button">Login</RaisedButton>
          <Link className="link" to="/register">Don't have an account? Click here to register.</Link>
        </form>
    )
  }
}

export default LoginForm
