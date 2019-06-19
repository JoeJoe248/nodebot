import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Boston",
          "Worchester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        dataSets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,236,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(153,102,255,0.6)",
              "rgba(255,159,64,0.6)"
            ]
          }
        ]
      }
    };
  }
  render() {
    return (
      <div className="chart">
        <Bar data={this.state.chartData} options={{}} />
      </div>
    );
  }
}

export default Chart;
