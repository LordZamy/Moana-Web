import React, { Component } from 'react'

import { ListItem } from 'material-ui/List'

import './style.css'

class ReportListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let reportSpecifics = '';
    switch (this.props.type) {
      case 'Availability':
        reportSpecifics = ` | Status: ${this.props.report.status}`
        break
      case 'Purity':
        reportSpecifics = ` |
            Condition: ${this.props.report.condition} |
            Contamination PPM: ${this.props.report.contaminationPPM} |
            Virus PPM: ${this.props.report.virusPPM}`
        break
      default:
        reportSpecifics = ``
    }

    const primaryText = `${this.props.type} Report: ${this.props.report.name}`
    const secondaryText = (
      <p className="ReportListItem-secondary">
        Created by: {this.props.report.creator.account.name} |
        Created on: {(new Date(this.props.report.date.time)).toLocaleString()}
        {reportSpecifics}
      </p>
    )

    return (
      <ListItem primaryText={primaryText} secondaryText={secondaryText} />
    )
  }
}

export default ReportListItem
