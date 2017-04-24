import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Menu from 'material-ui/Menu'
import Popover from 'material-ui/Popover'

import { logout } from '../../actions'

import './style.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addReport: {
        open: false,
        anchorEl: null
      },
      viewReports: {
        open: false,
        anchorEl: null
      }
    }
  }

  handleLeftIconClick = (e) => {
    e.preventDefault()
    this.props.toggleDrawer()
  }

  handleRightIconClick = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  handleMenuTouchTap = (e, item) => {
    e.preventDefault()
    this.setState({
      [item]: {
        open: true,
        anchorEl: e.currentTarget
      }
    })
  }

  handleMenuRequestClose = (item) => {
    this.setState({
      [item]: {
        open:false
      }
    })
    this.props.toggleDrawer()
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
          <Link className="Dashboard-link" to="/dashboard/map"><MenuItem onTouchTap={(e) => this.props.toggleDrawer()}>View Map</MenuItem></Link>
          <MenuItem onTouchTap={(e) => this.handleMenuTouchTap(e, 'addReport')}>Add Report</MenuItem>
          <MenuItem onTouchTap={(e) => this.handleMenuTouchTap(e, 'viewReports')}>View Reports</MenuItem>
          <Link className="Dashboard-link" to="/dashboard/historical"><MenuItem onTouchTap={(e) => this.props.toggleDrawer()}>Historical Report</MenuItem></Link>
          <Link className="Dashboard-link" to="/dashboard/editprofile"><MenuItem onTouchTap={(e) => this.props.toggleDrawer()}>Edit Profile</MenuItem></Link>
        </Drawer>

        <Popover open={this.state.addReport.open} anchorEl={this.state.addReport.anchorEl}
          onRequestClose={() => this.handleMenuRequestClose('addReport')}>
          <Menu>
            <Link className="Dashboard-link" to="/dashboard/addAvailReport"><MenuItem onTouchTap={(e) => this.handleMenuRequestClose('addReport')}>Availability</MenuItem></Link>
            <Link className="Dashboard-link" to="/dashboard/addPurityReport"><MenuItem onTouchTap={(e) => this.handleMenuRequestClose('addReport')}>Purity</MenuItem></Link>
            <MenuItem>History</MenuItem>
            <MenuItem>Source</MenuItem>
          </Menu>
        </Popover>

        <Popover open={this.state.viewReports.open} anchorEl={this.state.viewReports.anchorEl}
          onRequestClose={() => this.handleMenuRequestClose('viewReports')}>
          <Menu>
            <Link className="Dashboard-link" to="/dashboard/viewreports/Availability"><MenuItem onTouchTap={(e) => this.handleMenuRequestClose('viewReports')}>Availability</MenuItem></Link>
            <Link className="Dashboard-link" to="/dashboard/viewreports/Purity"><MenuItem onTouchTap={(e) => this.handleMenuRequestClose('viewReports')}>Purity</MenuItem></Link>
            <MenuItem>History</MenuItem>
            <MenuItem>Source</MenuItem>
            <Link className="Dashboard-link" to="/dashboard/viewreports/All"><MenuItem onTouchTap={(e) => this.handleMenuRequestClose('viewReports')}>All</MenuItem></Link>
          </Menu>
        </Popover>

        <div className="Dashboard-container">
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
