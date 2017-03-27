import React, { Component } from 'react'

import './style.css'

class AlertBox extends Component {
  render() {
    return (
      <div className='AlertBox-container'>
        {this.props.children}
      </div>
    )
  }
}

export default AlertBox
