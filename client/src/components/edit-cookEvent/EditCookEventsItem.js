import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect, withRouter } from "react-redux"; //connect redux to component
//import { Link } from "react-router-dom";
import createCookEvent from "../../actions/cookEventActions";

class EditCookEventsItem extends Component {
  onSubmit(e) {
    e.preventDefault();
    console.log("submit create cook event");

    const cookEventData = {
      recipeId: this.props.match.params.recipeId,
      recipeName: this.props.recipe.recipeName,
      meatType: this.state.meatType,
      meatWeight: this.state.meatWeight,
      totalCookTime: this.state.totalCookTime,
      cookRating: this.state.cookRating,
      ovenTemp: this.state.ovenTemp,
      cookState: this.state.cookState,
      activeInd: this.state.activeInd
    };

    //console.log("recipeName: ", this.state.recipeName);

    this.props.createCookEvent(cookEventData, this.props.history); //this.props.history requires withRouter

    /*this.setState({
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true
    });*/
  }

  render() {
    const { cookEvent } = this.props;

    return (
      <div className="edit-cook-event">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">
                Edit The Cook Event You Just Selected
              </p>
              <small className="d-blok pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Recipe Name"
                  name="recipeName"
                  value={recipeName}
                  error={errors.recipeName}
                />
                <TextFieldGroup
                  placeholder="Type of Meat"
                  name="meatType"
                  value={meatType}
                  onChange={this.onChange}
                  error={errors.meatType}
                />
                <TextFieldGroup
                  placeholder="Weight of Meat"
                  name="meatWeight"
                  value={meatWeight}
                  onChange={this.onChange}
                  error={errors.meatWeight}
                />
                <TextFieldGroup
                  placeholder="Total Cook Time"
                  name="totalCookTime"
                  value={totalCookTime}
                  onChange={this.onChange}
                  error={errors.totalCookTime}
                />
                <TextFieldGroup
                  placeholder="Cook Rating"
                  name="cookRating"
                  value={cookRating}
                  onChange={this.onChange}
                  error={errors.cookRating}
                />
                <TextFieldGroup
                  placeholder="Oven Temperaturer"
                  name="ovenTemp"
                  value={ovenTemp}
                  onChange={this.onChange}
                  error={errors.ovenTemp}
                />
                <TextFieldGroup
                  placeholder="Cook State"
                  name="cookState"
                  value={cookState}
                  onChange={this.onChange}
                  error={errors.cookState}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="activeInd"
                    value={activeInd}
                    checked={this.state.activeInd}
                    onChange={this.onChange}
                    id="activeInd"
                  />
                  <label htmlFor="activeInd" className="form-check-label">
                    Active Cook
                  </label>
                </div>
                <input
                  type="submit"
                  onSubmit={this.onSubmit}
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditCookEventsItem.propTypes = {
  createCookEvent: PropTypes.func.isRequired,
  cookEvents: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvents: state.cookEvents,
  cookEvent: state.cookEvents.cookEvent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  createCookEvent
)(withRouter(EditCookEventsItem));
