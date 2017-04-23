import React, { Component } from 'react'
import classNames from 'classnames'

import './style.css'

class MarkerPopover extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let popoverClass = classNames({
      "MarkerPopover-container": true,
      "MarkerPopover-hidden": !this.props.$hover
    })

    let reportSpecifics = null;
    switch (this.props.type) {
      case 'Availability':
        reportSpecifics = <div>Status: {this.props.report.status}</div>
        break
      case 'Purity':
        reportSpecifics = (
          <div>
            <div>Condition: {this.props.report.condition}</div>
            <div>Contamination PPM: {this.props.report.contaminationPPM}</div>
            <div>Virus PPM: {this.props.report.virusPPM}</div>
          </div>
        )
        break
      default:
        reportSpecifics = null
    }

    return (
      <div className={popoverClass}>
        <div>{this.props.type} Report: {this.props.report.name}</div>
        <div>Created by: {this.props.report.creator.account.name}</div>
        <div>Created on: {(new Date(this.props.report.date.time)).toLocaleString()}</div>
        {reportSpecifics}
      </div>
    )
  }
}

export default MarkerPopover
