import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import firebase from 'firebase'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import AlertBox from '../AlertBox'

import { login } from '../../actions'
import './style.css'

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    let data = new FormData(e.target)
    this.props.login(data.get('email'), data.get('password'))
  }

  render() {
    let error = null;
    if (this.props.errorMessage)
      error = <AlertBox> {this.props.errorMessage} </AlertBox>

    return (
        <form className="form" method="post" onSubmit={this.handleSubmit}>
          {error}
          <TextField className="input" name="email" hintText="Email" type="email" />
          <TextField className="input" name="password" hintText="Password" type="password" />
          <RaisedButton className="button" type="submit">Login</RaisedButton>
          <Link className="link" to="/register">Don't have an account? Click here to register.</Link>
        </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.login.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginForm
