import React, { Component } from 'react'
import classNames from 'classnames'

import './style.css'

class AlertBox extends Component {
  render() {
    let alertClass = classNames({
      'AlertBox-container': true,
      'AlertBox-success': this.props.success
    })

    return (
      <div className={alertClass}>
        {this.props.children}
      </div>
    )
  }
}

export default AlertBox
