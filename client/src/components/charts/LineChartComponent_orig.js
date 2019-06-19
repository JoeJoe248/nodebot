import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; //connect redux to component
//import { SparkLines, SparkLinesline } from "react-sparklines";
//import { Link } from "react-router-dom";
import { getMyCookLog } from "../../actions/cookLogActions";
import { getCurrentProfile } from "../../actions/profileActions";
//import { Line } from "react-chartjs-2";

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookLog: {},
      profile: {},
      cookLogData: [],
      deviceId: "",
      Data: {}
    };
  }

  renderCookLog(cookLogData) {
    const deviceId = cookLogData.deviceId;
    const tempsFahrenheit = cookLogData.map(
      cookLogTempItem => cookLogTempItem.temperatureFahrenheit
    );
    console.log("tempItem: ", tempsFahrenheit);
    return (
      <tr key={deviceId}>
        <td>{deviceId}</td>
      </tr>
    );
  }

  onGetChartClick(e) {
    this.props.getMyCookLog();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getMyCookLog();
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile ? nextProps.profile : {};
    this.setState({
      profile: profile
    });

    console.log("the profile: ", profile);

    const cookLog = nextProps.cookLog ? nextProps.cookLog : {};
    console.log("the cookLog: ", cookLog);
    this.setState({
      cookLog: cookLog
    });
    //const cookLogData = this.props.cookLog;
    //console.log("cookLogData: " + cookLogData);
    /*let cookDate = []; //x axis
    let temperatureFahrenheit = []; //y axis
    cookLogData.forEach(element => {
      cookDate.push(element.cookDate);
      temperatureFahrenheit.push(element.temperatureFahrenheit);
    });
    this.setState({
      Data: {
        labels: cookDate,
        datasets: [
          {
            label: "Your Current Cook Event Data",
            data: temperatureFahrenheit,
            backgroundColor: ["rgba(255,105,145,0.6)"]
          }
        ]
      }
    });
    */

    /*if (nextProps.profile) {
      console.log(
        "profile deviceId: ",
        this.props.profile ? this.props.profile : ""
      );
      this.setState({
        //cookLogs: this.props.getMyCookLog(this.props.profile.deviceId)
      });
    }*/

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
        <thtread>
          <tr>
            <th>Temperature</th>
          </tr>
        </thtread>
        <tbody>{this.renderCookLog(this.props.cookLog)}</tbody>
      </table>
    );
  }
}

LineChartComponent.propTypes = {
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
)(LineChartComponent);
