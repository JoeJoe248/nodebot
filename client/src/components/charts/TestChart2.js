import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; //connect redux to component
import { Bar, Line, Pie } from "react-chartjs-2";
//import { Link } from "react-router-dom";
import { getMyCookLog } from "../../actions/cookLogActions";
import { getCurrentProfile } from "../../actions/profileActions";
//import { Line } from "react-chartjs-2";

class TestChart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      cookLog: {},
      profile: {},
      cookLogData: [],
      tempValues: [],
      dateValues: [],
      tempObj: {},
      deviceId: "",
      Data: {}
    };
  }

  renderCookLog(cookLogData) {
    if (cookLogData.cookLog === null) {
      console.log("cookLogData is null");
    } else {
      let tempValues = [];
      let dateValues = [];
      let tempValuesFake = [
        5,
        10,
        5,
        20,
        8,
        15,
        5,
        10,
        5,
        20,
        8,
        15,
        5,
        10,
        5,
        20,
        8,
        15
      ];
      for (var i = 0; i <= cookLogData.cookLog.length - 1; i++) {
        let tempObj = {};
        let tempObjTemp = "";
        let tempObjDate = "";
        tempObj = cookLogData.cookLog[i];
        tempObjTemp = tempObj.temperatureFahrenheit;
        tempObjDate = tempObj.cookDate;
        //console.log("tempObjTemp: ", tempObjTemp);
        tempValues.push(tempObjTemp);
        dateValues.push(tempObjDate);
      }
      //console.log("tempValues: ", tempValues);

      const data = {
        /*labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],*/
        labels: dateValues,
        datasets: [
          {
            label: "Cook Log Temperatures in Fahrenheit",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            //data: [65, 59, 80, 81, 56, 55, 40],
            data: tempValues
          }
        ]
      };

      return (
        <tr>
          <td>
            <Line data={data} />
          </td>
        </tr>
      );
    }
  }

  /*onGetChartClick(e) {
    this.props.getMyCookLog();
  }*/

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getMyCookLog();
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile ? nextProps.profile : {};
    this.setState({
      profile: profile
    });

    console.log("the profile from comp will receive props: ", profile);

    const cookLog = nextProps.cookLog ? nextProps.cookLog : {};
    console.log("the cookLog from comp will receive props: ", cookLog);
    this.setState({
      cookLog: cookLog
    });

    //test for errors property
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      //we are pushing errors to component state so we don't have to change how errors work in the HTML form below
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Line Chart from ChartJS 2</th>
          </tr>
        </thead>
        <tbody>{this.renderCookLog(this.props.cookLog)}</tbody>
      </table>
    );
  }
}

TestChart2.propTypes = {
  getMyCookLog: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  cookLog: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookLog: state.cookLog,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getMyCookLog }
)(TestChart2);
