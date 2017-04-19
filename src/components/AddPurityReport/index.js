import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AlertBox from '../AlertBox'
import Marker from '../Marker'

import { addAvailReport } from '../../actions'
// import './style.css'

import GoogleMapReact from 'google-map-react'

class AddPurityReport extends Component {
  constructor(props) {
    super(props)
    this.state = {status: 0, lat: null, lng: null, isPosting: false}
  }

  handleChange = (e, index, value) => {
      this.setState({status: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let data = new FormData(e.target)
    this.setState({isPosting: true})
    if(this.state.lat !== null || this.state.lng !== null){
        this.props.addAvailReport(data.get('name'), this.state.status, this.state.lat, this.state.lng)
        console.log("Report Added");
    }
  }

  _onClick = ({x, y, lat, lng, event}) => {
      this.setState({lat: lat, lng: lng})
      console.log(lat + "  " + lng)
  }

  static defaultProps = {
    center: {lat: 33.7756178, lng: -84.3984737},
    zoom: 15
  }

  render() {
      let success = null
      if (this.props.success) {
          success = <AlertBox success={true}>Report added successfully!</AlertBox>
      } else if(this.state.isPosting) {
          success = <AlertBox success={false}>Posting</AlertBox>
      }

    return (
        <form className="Dashboard-form" method="post" onSubmit={this.handleSubmit}>
          <h1 className="Dashboard-heading">Add Purity Report</h1>
          {success}
          <TextField className="Dashboard-input" name="name" hintText="Name" floatingLabelText="Name" type="text" />
          <TextField className="Dashboard-input" name="virus" hintText="Virus PPM" floatingLabelText="Virus PPM" type="text" />
          <TextField className="Dashboard-input" name="contamination" hintText="Contamination PPM" floatingLabelText="Contamination PPM" type="text" />
          <div className="AddAvailReport-map">
            <GoogleMapReact
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onClick={this._onClick}>
                  <Marker
                    lat={this.state.lat}
                    lng={this.state.lng}
                  />
            </GoogleMapReact>
          </div>
          <RaisedButton className="button" type="submit">Submit</RaisedButton>
        </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      success: state.reportAdded.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //addAvailReport: (name, value, lat, lng) => dispatch(addAvailReport(name, value, lat, lng))
  }
}

AddPurityReport = connect(mapStateToProps, mapDispatchToProps)(AddPurityReport)

export default AddPurityReport
