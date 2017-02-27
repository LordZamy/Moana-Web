import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

// import '../LoginForm/style.css'

class RegisterForm extends Component {
  render() {
    return (
        <form className="form" method="post">
          <TextField className="input" hintText="Username" />
          <TextField className="input" hintText="Password" type="password" />
          <TextField className="input" hintText="Name" />
          <RaisedButton className="button">Register</RaisedButton>
          <Link className="link" to="/login">Already have an account? Click here to login.</Link>
        </form>
    )
  }
}

export default RegisterForm
