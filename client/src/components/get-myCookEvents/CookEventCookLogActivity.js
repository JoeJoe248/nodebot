import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Switch from "react-switch";
import {
  updateCookEventMeatProbeActive,
  updateCookEventMeatProbeNotActive
} from "../../actions/cookEventActions";
//import { addCookEventCookLogProbeStart } from "../../actions/cookEventCookLogActions";
//import { Link } from "react-router-dom";
//import CreateCookEvent from "../create-cookEvent/CreateCookEvent";
//import isEmpty from "../../validation/is-empty";

class CookEventCookLogActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      analogReading: "",
      temperatureCelcius: "",
      temperatureFahrenheit: "",
      deviceId: "",
      cookDate: "",

      recipeId: "",
      recipeName: "",
      deviceBoards: [],
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      minutesPerPound: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: "",
      cookNotes: "",
      purchasePlace: "",
      purchasePrice: "",
      //meatProbeInd: true,
      checked: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log("inside componentWillReceiveProps");
    const cookLog = nextProps.cookLog ? nextProps.cookLog : {};
    this.setState({
      cookLog: cookLog
    });

    const cookEvent = nextProps.cookEvent ? nextProps.cookEvent : {};
    this.setState({
      cookEvent: cookEvent
    });

    if (cookEvent.meatProbeInd === true) {
      this.state.checked = true;
    }
    console.log("cookEvent from props: " + cookEvent);

    //test for errors property
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      //we are pushing errors to component state so we don't have to change how errors work in the HTML form below
    }
  }

  handleChange(checked) {
    this.setState({ checked });
    if (checked) {
      //this.state.activeInd = true;
      this.props.updateCookEventMeatProbeActive(this.state.cookEvent);
    } else {
      //this.state.activeInd = false;
      this.props.updateCookEventMeatProbeNotActive(this.state.cookEvent);
    }
  }

  render() {
    const { cookEvent, cookLog } = this.props;

    return (
      <div>
        <div className="example">
          <label htmlFor="normal-switch">
            <span />{" "}
            <Switch
              onChange={this.handleChange}
              checked={this.state.checked}
              className="react-switch"
              id="normal-switch"
            />
          </label>
          <p>
            The meat probe is <span>{this.state.checked ? "on" : "off"}</span>.
          </p>
        </div>
      </div>
    );
  }
}

CookEventCookLogActivity.propTypes = {
  cookEvent: PropTypes.object.isRequired,
  cookLog: PropTypes.object.isRequired,
  updateCookEventMeatProbeActive: PropTypes.func.isRequired,
  updateCookEventMeatProbeNotActive: PropTypes.func.isRequired
  //addCookEventCookLogProbeStart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cookEvent: state.cookEvents.cookEvent,
  cookLog: state.cookLog,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateCookEventMeatProbeActive, updateCookEventMeatProbeNotActive }
)(CookEventCookLogActivity);
