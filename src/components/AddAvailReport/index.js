import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AlertBox from '../AlertBox'


import { addAvailReport } from '../../actions'
import './style.css'


class AddAvailReport extends Component {

    constructor(props) {
      super(props)
      this.state = {value: 0}
    }
  handleChange = (e, index, value) => this.setState({value})

  handleSubmit = (e) => {
    e.preventDefault()

    let data = new FormData(e.target)
    this.props.addAvailReport(data.get('name'), this.state.value, data.get('location'))
  }

  render() {
      let success = null
      if (this.props.success)
        success = <AlertBox success={true}>Report added successfully</AlertBox>

    return (
        <form className="AddAvailReport-form" method="post" onSubmit={this.handleSubmit}>
          <h1 className="AddAvailReport-heading">Add an Availability Report</h1>
          {success}
          <TextField className="input" name="name" defaultValue="Name" hintText="Name" floatingLabelText="Name" type="text" />
          <TextField className="input" name="location" defaultValue="up your butt" hintText="Location" floatingLabelText="Location" type="text" />
          <SelectField name="type" floatingLabelText="Is it availible?" value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={0} primaryText="Availible" />
            <MenuItem value={1} primaryText="Unavailible" />
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

AddAvailReport = connect(mapStateToProps, mapDispatchToProps)(AddAvailReport)

export default AddAvailReport
