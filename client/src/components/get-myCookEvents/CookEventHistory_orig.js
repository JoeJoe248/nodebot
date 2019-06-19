import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
//import CookEventHistoryItem from "../get-myCookEvents/CookEventHistoryItem";
import { getMyCookEventHistory } from "../../actions/cookEventActions";

class CookEventHistory extends Component {
  componentDidMount() {
    this.props.getMyCookEventHistory();
    console.log("cookEvents: ", this.props.cookEvents);
  }
  renderTableHeader() {
    let header = Object.keys(this.props.cookEvents.cookEvents[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  renderTableData() {
    return this.props.cookEvents.cookEvents.map(cookEvent => {
      const { _id, recipeName, cookState } = cookEvent; //destructuring
      return (
        <tr key={_id}>
          <td>{_id}</td>
          <td>{recipeName}</td>
          <td>{cookState}</td>
          <button>Do Something</button>
          <hr />
        </tr>
      );
    });
  }
  render() {
    const { cookEvents, loading } = this.props.cookEvents;

    let cookEventItems;
    if (cookEvents === null || loading) {
      cookEventItems = <Spinner />;
    } else {
      if (cookEvents.length > 0) {
        cookEventItems = (
          <div>
            <table id="cookEvents">
              <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
              </tbody>
            </table>
          </div>
        );
      } else {
        cookEventItems = (
          <div>
            <h4>No cook events found...</h4>

            <h4>
              <Link to="/create-recipe">Add a recipe</Link>, then create a cook
              event from your list to get started!
            </h4>
          </div>
        );
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="btn-btn-light">
              Go Back
            </Link>
            <div className="col-md-12">
              <h1 className="lead text-center">
                Here are your cook events history items
              </h1>
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
