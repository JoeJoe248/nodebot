import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import CreateCookEvent from "../create-cookEvent/CreateCookEvent";
//import isEmpty from "../../validation/is-empty";

class GetCookEventsItem extends Component {
  render() {
    const { cookEvent } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{cookEvent._id}</h3>
            <h3>{cookEvent.recipeName}</h3>
            <h5>Meat Type: {cookEvent.meatType}</h5>
            <h5>Recipe ID: {cookEvent.recipeId}</h5>
            <h5>Recipe Name: {cookEvent.recipeName}</h5>
            <p>Cook State: {cookEvent.cookState}</p>
            <p>Active Indicator: {JSON.stringify(cookEvent.activeInd)}</p>
            <Link to="/dashboard" className="btn btn-info">
              Go To Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

GetCookEventsItem.propTypes = {
  cookEvent: PropTypes.object.isRequired
};

export default GetCookEventsItem;
