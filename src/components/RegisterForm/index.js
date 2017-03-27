import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import AlertBox from '../AlertBox'

import { register } from '../../actions'
import '../LoginForm/style.css'

class RegisterForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    let data = new FormData(e.target)
    this.props.register(data.get('email'), data.get('password'))
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
          <TextField className="input" name="name" hintText="Name" />
          <RaisedButton className="button" type="submit">Register</RaisedButton>
          <Link className="link" to="/login">Already have an account? Click here to login.</Link>
        </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.register.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password) => dispatch(register(email, password))
  }
}

RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm)

export default RegisterForm
