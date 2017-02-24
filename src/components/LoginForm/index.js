import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css'

class LoginForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="heading-container">
          <h1 className="heading">Moana</h1>
          <h2 className="heading subheading">The Water Crowdsourcing App.</h2>
        </div>
        <form className="form" method="post">
          <TextField hintText="Username" className="input" />
          <TextField hintText="Password" className="input" />
          <RaisedButton className="button">Login</RaisedButton>
        </form>
      </div>
    )
  }
}

export default LoginForm
