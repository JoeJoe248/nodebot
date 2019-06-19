import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; //connect redux to component
import { Sparklines, SparklinesLine, SparklinesBars } from "react-sparklines";
//import { Link } from "react-router-dom";
import { getMyCookLog } from "../../actions/cookLogActions";
import { getCurrentProfile } from "../../actions/profileActions";
//import { Line } from "react-chartjs-2";

class LineChartDynamicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookLog: {},
      profile: {},
      cookLogData: [],
      tempValues: [],
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
        tempObj = cookLogData.cookLog[i];
        tempObjTemp = tempObj.temperatureFahrenheit;
        //console.log("tempObjTemp: ", tempObjTemp);
        tempValues.push(tempObjTemp);
      }
      //console.log("tempValues: ", tempValues);

      return (
        <tr>
          <td>
            <Sparklines height={120} width={180} data={tempValues}>
              <SparklinesBars
                style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }}
              />
              <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
            </Sparklines>
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
            <th>Line Chart Dynamic</th>
          </tr>
        </thead>
        <tbody>{this.renderCookLog(this.props.cookLog)}</tbody>
      </table>
    );
  }
}

LineChartDynamicComponent.propTypes = {
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
)(LineChartDynamicComponent);
