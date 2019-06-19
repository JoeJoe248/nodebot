import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyCookLog } from "../../actions/cookLogActions";
import { getCurrentProfile } from "../../actions/profileActions";
import LineChartDynamicComponent from "../charts/LineChartDynamicComponent";
import BarChartComponent from "../charts/BarChartComponent";
import LineChartReferenceLineComponent from "../charts/LineChartReferenceLineComponent";
import LineChartNormalBandComponent from "../charts/LineChartNormalBandComponent";
import LineChartComponent2 from "../charts/LineChartComponent2";
import TestChart2 from "../charts/TestChart2";

class CookEventAnalytics extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/dashboard" className="btn-btn-light">
            Go Back
          </Link>
          <h1>Sparklines Examples</h1>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <LineChartDynamicComponent />
              </div>
              <div className="col-sm">
                <BarChartComponent />
              </div>
              <div className="col-sm">
                <LineChartReferenceLineComponent />
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <LineChartNormalBandComponent />
              </div>
              <div className="col-sm">
                <LineChartComponent2 />
              </div>
              <div className="col-sm">
                <LineChartReferenceLineComponent />
              </div>
            </div>
            <div className="container">
              <h1>Chart JS 2 Examples</h1>
              <div className="row">
                <div className="col-sm">
                  <TestChart2 />
                </div>
                <div className="col-sm">placeholder 2 of 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CookEventAnalytics.propTypes = {
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
)(CookEventAnalytics);
