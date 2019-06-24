import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyCookEventItemHistory } from "../../actions/cookEventActions";
import CookEventHistoryChart from "../charts/CookEventHistoryChart";

class CookEventHistoryDetail extends Component {
  constructor(props) {
    console.log("props: ", props);
    super(props);
    this.state = {
      cookEventId: "",
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      cookLog: [],
      activeInd: true,
      recipes: {},
      recipe: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submit cook event history detail");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getMyCookEventItemHistory(this.props.match.params.cookEventId);
    //this.setState({ recipeName: recipe.recipeName });
    //console.log("recipe: ", recipe);
  }

  componentWillReceiveProps(nextProps) {
    const cookEvents = nextProps.cookEvents ? nextProps.cookEvents : {};
    this.setState({
      cookEvents: cookEvents
    });

    this.setState({
      recipeName: cookEvents.recipeName,
      cookNotes: cookEvents.cookNotes
    });

    console.log("cookEvent from props on cookEventHistoryDetail: ", cookEvents);
    console.log("recipe name: ", cookEvents.recipeName);

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { cookEvents } = this.props.cookEvents;

    let cookEventHistoryContent;

    cookEventHistoryContent = (
      <div>
        <p className="lead text-muted">
          {"Cook Date: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.dateAdded
            : ""}
        </p>
        <p className="lead text-muted">
          {"Rating: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.cookRating
            : ""}
        </p>
        <p className="lead text-muted">
          {"Notes: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.cookNotes
            : ""}
        </p>
        <p className="lead text-muted">
          {"Meat Type: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.meatType
            : ""}
        </p>
        <p className="lead text-muted">
          {"Meat Weight: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.meatWeight
            : ""}
        </p>
        <p className="lead text-muted">
          {"Total Cook Time: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.totalCookTime
            : ""}
        </p>
        <p className="lead text-muted">
          {"Minutes Per Pound: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.minutesPerPound
            : ""}
        </p>

        <p className="lead text-muted">
          {"Oven Temp: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.ovenTemp
            : ""}
        </p>
        <p className="lead text-muted">
          {"Purchase Place: "}
          {this.props.cookEvents.cookEvent
            ? this.props.cookEvents.cookEvent.purchasePlace
            : ""}
        </p>
      </div>
    );

    //console.log("cookLog array: ", this.props.cookEvents.cookEvent.cookLog[0]);

    let chartContent;

    if (2 * 2 === 5) {
      console.log("inside of cookEvent edit content");
      chartContent = (
        <div>
          <p className="tead text-muted">No Chart To Display</p>
        </div>
      );
    } else if (
      this.props.cookEvents.cookEvent &&
      this.props.cookEvents.cookEvent.cookLog
    ) {
      console.log("cookLog array: ", this.props.cookEvents.cookEvent.cookLog);
      const cookLogArray = this.props.cookEvents.cookEvent.cookLog;
      chartContent = (
        <div>
          <CookEventHistoryChart cookLog={cookLogArray} />
        </div>
      );
    } else {
    }

    return (
      <div className="cookEventHistoryDetail">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/cookHistory" className="btn-btn-light">
                Go Back
              </Link>
              <h4 className="display-4 text-center">
                {this.props.cookEvents.cookEvent
                  ? this.props.cookEvents.cookEvent.recipeName
                  : ""}
              </h4>
              <div className="row">
                <div className="col">
                  <h4 className="display-6 text-center">Cook Event Details</h4>
                  {cookEventHistoryContent}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4 className="display-6 text-center">Cook Event Graph</h4>
                  {chartContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CookEventHistoryDetail.propTypes = {
  getMyCookEventItemHistory: PropTypes.func.isRequired,
  cookEvents: PropTypes.object.isRequired,
  //cookEvent: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvents: state.cookEvents,
  //cookEvent: state.cookEvents.cookEvent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getMyCookEventItemHistory }
)(withRouter(CookEventHistoryDetail));
