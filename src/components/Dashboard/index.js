import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import './style.css'

class Dashboard extends Component {
  handleLeftIconClick = (e) => {
    e.preventDefault()
    this.props.toggleDrawer()
  }

  render() {
    let forceNavDown = {'top': '64px'}

    return (
      <div>
        <AppBar title="Moana"
          iconElementRight={<FlatButton label="Logout" />}
          onLeftIconButtonTouchTap={this.handleLeftIconClick}
        />
        <Drawer open={this.props.drawerOpen} containerStyle={forceNavDown}>
          <MenuItem>Add Report</MenuItem>
          <MenuItem>View Reports</MenuItem>
          <MenuItem>Edit Profile</MenuItem>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.dashboard.drawerOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'})
  }
}

Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default Dashboard
