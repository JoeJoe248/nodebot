import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getMyCookEventHistory } from "../../actions/cookEventActions";
import CookEventHistoryItem from "./CookEventHistoryItem";

class CookEventHistory extends Component {
  componentDidMount() {
    this.props.getMyCookEventHistory();
  }

  render() {
    const { cookEvents, loading } = this.props.cookEvents;
    let cookEventItems;

    if (cookEvents === null || loading) {
      cookEventItems = <Spinner />;
    } else {
      if (cookEvents.length > 0) {
        cookEventItems = cookEvents.map(cookEvent => (
          <CookEventHistoryItem key={cookEvent._id} cookEvent={cookEvent} />
        ));
      } else {
        cookEventItems = <h4>No cook events found...</h4>;
      }
    }

    return (
      <div className="cookEvents">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="btn-btn-light">
              Go Back
            </Link>
            <div className="col-md-12">
              <h1 className="display-4 text-center">Cook Events History</h1>
              <p className="lead text-center">
                Review the notes and charts for the recipes you cooked in the
                past
              </p>
            </div>
            {cookEventItems}
          </div>
        </div>
      </div>
    );
  }
}

CookEventHistory.propTypes = {
  getMyCookEventHistory: PropTypes.func.isRequired,
  cookEvents: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvents: state.cookEvents
});

export default connect(
  mapStateToProps,
  { getMyCookEventHistory }
)(CookEventHistory);
