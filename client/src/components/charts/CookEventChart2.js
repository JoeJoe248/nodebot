import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; //connect redux to component
import { Bar, Line, Pie } from "react-chartjs-2";
import Spinner from "../common/Spinner";
//import { Link } from "react-router-dom";
import { getMyCookLog } from "../../actions/cookEventCookLogActions";
import { getCurrentProfile } from "../../actions/profileActions";
//import { Line } from "react-chartjs-2";

class CookEventChart extends Component {
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
      user: "",
      analogReading: "",
      temperatureCelcius: "",
      temperatureFahrenheit: "",
      deviceId: "",
      cookEventId: "",
      cookDate: "",
      Data: {}
    };
    this.onGetChartClick = this.onGetChartClick.bind(this);
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

  onGetChartClick(e, cookEventData) {
    console.log("inside onGetChartClick");
    //e.preventDefault;
    /*const recipeData = {
      recipeName: this.state.recipeName,
      directions1: this.state.directions1,
      directions2: this.state.directions2,
      recipeURL: this.state.recipeURL,
      suggestedTemp: this.state.suggestedTemp,
      suggestedTime: this.state.suggestedTime,
      suggestedWood: this.state.suggestedWood
    };*/

    //this.props.createRecipe(recipeData, this.props.history); //this.props.histor requires withRouter

    this.props.getMyCookLog(cookEventData.cookEventId);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    //this.props.getMyCookLog();
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile ? nextProps.profile : {};
    this.setState({
      profile: profile
    });

    /*const cookEvent = nextProps.cookEvent ? nextProps.cookEvent : {};
    this.setState({
      cookEvent: cookEvent
    });*/

    //console.log("the profile from comp will receive props: ", profile);

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
    const { profile } = this.props.profile;
    const { cookEvent, loading } = this.props;

    let chartContent;

    if (loading) {
      chartContent = <Spinner />;
    } else {
      chartContent = (
        <div>
          <div style={{ marginBottom: "60px" }} />
          <button
            onClick={this.onGetChartClick(this.state.cookEvent)}
            className="btn btn-danger"
          >
            Get Chart
          </button>
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Chart</h1>
              {chartContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CookEventChart.propTypes = {
  cookEvent: PropTypes.object.isRequired,
  cookLog: PropTypes.object.isRequired,
  getMyCookLog: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvent: state.cookEvents.cookEvent,
  cookLog: state.cookLog,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getMyCookLog }
)(CookEventChart);
