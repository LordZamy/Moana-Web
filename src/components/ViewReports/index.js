import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { List } from 'material-ui/List'
import ReportListItem from '../ReportListItem'

import './style.css'

class ViewReports extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    type: 'Availability'
  }

  generateReportList = (reports, type) => {
      let reportEntries = Object.entries(reports)
      return reportEntries.map((report) =>
        <ReportListItem report={report[1]} key={report[0]} type={type}></ReportListItem>
      )
  }


  render() {
    let reports = null
    switch (this.props.params.type) {
      case 'Availability':
        reports = this.generateReportList(this.props.reports.availability, 'Availability')
        break
      case 'Purity':
        reports = this.generateReportList(this.props.reports.purity, 'Purity')
        break
      case 'All':
        const availReports = this.generateReportList(this.props.reports.availability, 'Availability')
        const purityReports = this.generateReportList(this.props.reports.purity, 'Purity')
        reports = availReports.concat(purityReports)
        break
      default:
        reports = null
    }

    return (
      <div className="ViewReports-container">
        <h1 className="Dashboard-heading">View Reports</h1>
        <List className="ViewReports-list">
          {reports}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.reports,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

ViewReports = connect(mapStateToProps, mapDispatchToProps)(ViewReports)

export default ViewReports
