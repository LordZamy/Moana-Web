import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

import '../LoginForm/style.css'

class App extends Component {
  render() {
    const { className, ...props } = this.props
    return (
      <div className="container">
        <div className="heading-container">
          <h1 className="heading">Moana</h1>
          <h2 className="heading subheading">The Water Crowdsourcing App.</h2>
        </div>

        {this.props.children}
      </div>
    )
  }
}

export default App
