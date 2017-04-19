import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AlertBox from '../AlertBox'

import { updateProfile } from '../../actions'
import './style.css'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    let accountTypeCodes = {'User': 0, 'Worker': 1, 'Admin': 2, 'Manager': 3}
    let accountTypeId = accountTypeCodes[this.props.user.photoURL] || 0;
    this.state = {value: accountTypeId}
  }

  handleChange = (e, index, value) => this.setState({value})

  handleSubmit = (e) => {
    e.preventDefault()

    let data = new FormData(e.target)
    this.props.updateProfile(data.get('name'), data.get('email'), this.state.value)
  }

  render() {
    let success = null
    if (this.props.success)
      success = <AlertBox success={true}>Profile updated successfully!</AlertBox>

    return (
      <form className="Dashboard-form" method="post" onSubmit={this.handleSubmit}>
        <h1 className="Dashboard-heading">Edit Profile</h1>
        {success}
        <TextField className="input" name="name" defaultValue={this.props.user.displayName} hintText="Name" floatingLabelText="Name" type="text" />
        <TextField className="input" name="email" defaultValue={this.props.user.email} hintText="Email" floatingLabelText="Email" type="email" />
        <SelectField name="type" floatingLabelText="Account Type" value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="User" />
          <MenuItem value={1} primaryText="Worker" />
          <MenuItem value={2} primaryText="Admin" />
          <MenuItem value={3} primaryText="Manager" />
        </SelectField>
        <RaisedButton className="button" type="submit">Submit</RaisedButton>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userData.firebaseUser,
    success: state.editProfile.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (name, email, accountTypeId) => dispatch(updateProfile(name, email, accountTypeId))
  }
}

EditProfile = connect(mapStateToProps, mapDispatchToProps)(EditProfile)

export default EditProfile
