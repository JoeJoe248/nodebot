import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Switch from "react-switch";
import {
  archiveMyCookEventCookLog,
  unarchiveMyCookEventCookLog
} from "../../actions/cookEventCookLogActions";
//import { Link } from "react-router-dom";
//import CreateCookEvent from "../create-cookEvent/CreateCookEvent";
//import isEmpty from "../../validation/is-empty";

class CookEventArchive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      analogReading: "",
      temperatureCelcius: "",
      temperatureFahrenheit: "",
      deviceId: "",
      cookDate: "",
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

    console.log("the cookLog from props: ", cookLog);

    const cookEvent = nextProps.cookEvent ? nextProps.cookEvent : {};
    this.setState({
      cookEvent: cookEvent
    });
    console.log(
      "the cookEvent from next props in cookeventcookarchive: ",
      cookEvent
    );
    /*if (cookEvent.meatProbeInd === true) {
      this.state.checked = true;
    }*/
    console.log("recipeName: " + cookEvent.recipeName);

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
      //console.log("cookEventId to archive: ", this.state.cookEvent._id);
      this.props.archiveMyCookEventCookLog(this.state.cookEvent._id);
    } else {
      this.props.unarchiveMyCookEventCookLog(this.state.cookEvent._id);
    }
  }

  render() {
    const { cookEvent } = this.props;

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
            The Cook Event Archive Indicator is:{" "}
            <span>{this.state.checked ? "on" : "off"}</span>.
          </p>
        </div>
      </div>
    );
  }
}

CookEventArchive.propTypes = {
  cookEvent: PropTypes.object.isRequired,
  archiveMyCookEventCookLog: PropTypes.func.isRequired,
  unarchiveMyCookEventCookLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cookEvent: state.cookEvents.cookEvent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { archiveMyCookEventCookLog, unarchiveMyCookEventCookLog }
)(CookEventArchive);
