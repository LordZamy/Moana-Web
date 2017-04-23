import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import GoogleMapReact from 'google-map-react'
import Marker from '../Marker'
import MarkerPopover from '../MarkerPopover'

import './style.css'

class Map extends Component {
  // defaults to GT campus
  static defaultProps = {
    center: {lat: 33.7756178, lng: -84.3984737},
    zoom: 15
  }

  render() {
    let availReportList = null, availMarkerList = null
    availReportList = Object.entries(this.props.reports.availability)
    availMarkerList = availReportList.map((report) =>
      <Marker lat={report[1].lat} lng={report[1].lng} key={report[0]}>
        <MarkerPopover report={report[1]} type="Availability"></MarkerPopover>
      </Marker>
    )

    let purityReportList = null, purityMarkerList = null;
    if (this.props.accountType !== "User") {
      purityReportList = Object.entries(this.props.reports.purity)
      purityMarkerList = purityReportList.map((report) =>
        <Marker lat={report[1].lat} lng={report[1].lng} key={report[0]}>
          <MarkerPopover report={report[1]} type="Purity"></MarkerPopover>
        </Marker>
      )
    }

    return (
      <div className="Map-container">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          {availMarkerList.concat(purityMarkerList)}
        </GoogleMapReact>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.reports,
    accountType: state.userData.firebaseUser.photoURL
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

Map = connect(mapStateToProps, mapDispatchToProps)(Map)

export default Map
