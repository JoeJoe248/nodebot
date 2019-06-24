import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import CookEventHistoryDetail from "../get-myCookEvents/CookEventHistoryDetail";
//import isEmpty from "../../validation/is-empty";

class CookEventHistoryItem extends Component {
  render() {
    const { cookEvent } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{cookEvent._id}</h3>
            <h3>{cookEvent.recipeName}</h3>
            <h3>{cookEvent.cookRating}</h3>
            <h5>{cookEvent.cookNotes}</h5>
            <Link
              to={"/cookEventHistory/" + cookEvent._id}
              className="btn btn-info"
            >
              Review Notes and Charts
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

CookEventHistoryItem.propTypes = {
  cookEvent: PropTypes.object.isRequired
};

export default CookEventHistoryItem;
