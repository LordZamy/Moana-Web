import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import { logout } from '../../actions'

import './style.css'

class Dashboard extends Component {
  handleLeftIconClick = (e) => {
    e.preventDefault()
    this.props.toggleDrawer()
  }

  handleRightIconClick = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  componentDidMount() {
    // send user to login screen if unauthenticated
    if (!this.props.user)
      browserHistory.push('/')
  }

  render() {
    let forceNavDown = {'top': '64px'}

    return (
      <div>
        <AppBar title="Moana"
          iconElementRight={<FlatButton label="Logout" />}
          onLeftIconButtonTouchTap={this.handleLeftIconClick}
          onRightIconButtonTouchTap={this.handleRightIconClick}
        />
        <Drawer open={this.props.drawerOpen} containerStyle={forceNavDown}>
          <MenuItem>Add Report</MenuItem>
          <MenuItem>View Reports</MenuItem>
          <Link className="Dashboard-link" to="/dashboard/editprofile"><MenuItem>Edit Profile</MenuItem></Link>
        </Drawer>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.dashboard.drawerOpen,
    user: state.userData.firebaseUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: () => dispatch({type: 'TOGGLE_DRAWER'}),
    logout: () => dispatch(logout())
  }
}

Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default Dashboard
