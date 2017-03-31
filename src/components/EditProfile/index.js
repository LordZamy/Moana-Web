import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AlertBox from '../AlertBox'

import './style.css'

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 1}
  }

  handleSubmit = (e) => {
  }

  handleChange = (e, index, value) => this.setState({value})

  render() {
    return (
      <form className="EditProfile-form" method="post">
        <h1 className="EditProfile-heading">Edit Profile</h1>
        <TextField className="input" name="name" hintText="Name" type="text" />
        <TextField className="input" name="email" hintText="Email" type="email" />
        <SelectField floatingLabelText="Account Type" value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="User" />
          <MenuItem value={2} primaryText="Worker" />
          <MenuItem value={3} primaryText="Admin" />
          <MenuItem value={4} primaryText="Manager" />
        </SelectField>
        <RaisedButton className="button" type="submit">Submit</RaisedButton>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

EditProfile = connect(mapStateToProps, mapDispatchToProps)(EditProfile)

export default EditProfile
