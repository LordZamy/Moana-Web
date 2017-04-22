import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import GoogleMapReact from 'google-map-react'
import Marker from '../Marker'

import './style.css'

class Map extends Component {
  // defaults to GT campus
  static defaultProps = {
    center: {lat: 33.7756178, lng: -84.3984737},
    zoom: 15
  }

  render() {
    const availReportList = Object.entries(this.props.reports.availability)
    const availMarkerList = availReportList.map((report) =>
      <Marker lat={report[1].lat} lng={report[1].lng}></Marker>
    )

    return (
      <div className="Map-container">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
            {availMarkerList}
        </GoogleMapReact>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.reports
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

Map = connect(mapStateToProps, mapDispatchToProps)(Map)

export default Map
