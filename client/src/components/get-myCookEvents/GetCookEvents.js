import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import GetCookEventsItem from "./GetCookEventsItem";
import { getMyCookEvents } from "../../actions/cookEventActions";

class GetCookEvents extends Component {
  componentDidMount() {
    this.props.getMyCookEvents();
    console.log("cookEvents: ", this.props.cookEvents);
  }

  render() {
    const { cookEvents, loading } = this.props.cookEvents;
    let cookEventItems;

    if (cookEvents === null || loading) {
      cookEventItems = <Spinner />;
    } else {
      if (cookEvents.length > 0) {
        cookEventItems = cookEvents.map(cookEvent => (
          <GetCookEventsItem key={cookEvent._id} cookEvent={cookEvent} />
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
              <h1 className="lead text-center">Here are your cook events</h1>
            </div>
            {cookEventItems}
          </div>
        </div>
      </div>
    );
  }
}

GetCookEvents.propTypes = {
  getMyCookEvents: PropTypes.func.isRequired,
  cookEvents: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvents: state.cookEvents
});

export default connect(
  mapStateToProps,
  { getMyCookEvents }
)(GetCookEvents);
