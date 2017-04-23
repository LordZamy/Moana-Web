import React, { Component } from 'react'

import './style.css'

class Marker extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let child = null
    if (this.props.children) {
        child = React.cloneElement(this.props.children, {$hover : this.props.$hover})
    }

    return (
      <div>
        {child}
        <div className="Marker-pin"></div>
      </div>
    )
  }
}

export default Marker
