import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import GoogleMapReact from 'google-map-react'

class Map extends Component {
  // defaults to GT campus
  static defaultProps = {
    center: {lat: 33.7756178, lng: -84.3984737},
    zoom: 15
  }

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
      </GoogleMapReact>
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

Map = connect(mapStateToProps, mapDispatchToProps)(Map)

export default Map
