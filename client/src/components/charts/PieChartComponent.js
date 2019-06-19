//PieChartComponent.js
import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class PieChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Pie />
      </div>
    );
  }
}
