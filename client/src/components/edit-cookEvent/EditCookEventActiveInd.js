import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
//import CreateCookEvent from "../create-cookEvent/CreateCookEvent";
//import isEmpty from "../../validation/is-empty";

class EditCookEventActiveInd extends Component {
  constructor(props) {
    super(props);

    this.setState({
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true,
      checked: false,
      errors: {}
    });

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { cookEvent } = this.props;

    return (
      <div>
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{cookEvent.activeInd}</h3>
            </div>
          </div>
        </div>
        <label htmlFor="normal-switch">
          <span>Switch with default style</span>
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            id="normal-switch"
          />
        </label>
      </div>
    );
  }
}

EditCookEventActiveInd.propTypes = {
  cookEvent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvent: state.cookEvents.cookEvent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(EditCookEventActiveInd);
