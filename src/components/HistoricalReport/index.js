import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import DatePicker from 'material-ui/DatePicker';

import './style.css'

class HistoricalReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date()
    }
  }

  generateChartData = (reports) => {
    let data = [
      {name: 'Jan', ppm: 0},
      {name: 'Feb', ppm: 0},
      {name: 'Mar', ppm: 0},
      {name: 'Apr', ppm: 0},
      {name: 'May', ppm: 0},
      {name: 'Jun', ppm: 0},
      {name: 'Jul', ppm: 0},
      {name: 'Aug', ppm: 0},
      {name: 'Sep', ppm: 0},
      {name: 'Oct', ppm: 0},
      {name: 'Nov', ppm: 0},
      {name: 'Dec', ppm: 0}
    ]

    console.log(data)

    let sums = new Array(12).fill(0)
    let counts = new Array(12).fill(0)

    const reportValues = Object.values(reports)
    reportValues.forEach((report) => {
      let reportDate = new Date(report.date.time)
      if (this.state.date.getFullYear() !== reportDate.getFullYear()) {
        return
      }

      let month = reportDate.getMonth()
      sums[month] += report.virusPPM
      counts[month]++
    })

    sums.forEach((sum, index) => {
      if (counts[index] === 0) {
        data[index].ppm = 0
      } else {
        data[index].ppm = sum / counts[index]
      }
    })

    return data
  }

  formatDate = (date) => date.getFullYear()

  handleChange = (e, date) => {
    this.setState({
      date
    })
  }

  render() {
    const data = this.generateChartData(this.props.reports.purity)

    return (
      <div className="HistoricalReport-container">
        <h1 className="Dashboard-heading">Historical Report</h1>
        <div className="HistoricalReport-datepicker">
          <DatePicker hintText="Year"
            floatingLabelText="Year"
            formatDate={this.formatDate}
            value={this.state.date}
            onChange={this.handleChange} />
        </div>
        <div className="HistoricalReport-chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="ppm" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
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

HistoricalReport = connect(mapStateToProps, mapDispatchToProps)(HistoricalReport)

export default HistoricalReport
