import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyRecipe } from "../../actions/recipeActions";
import { createCookEvent } from "../../actions/cookEventActions";

class CreateCookEvent extends Component {
  constructor(props) {
    //console.log("props: ", props);
    super(props);
    this.state = {
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true,
      recipes: {},
      recipe: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMyRecipe(this.props.match.params.recipeId);
    //this.setState({ recipeName: recipe.recipeName });
    //console.log("recipe: ", recipe);
  }

  componentWillReceiveProps(nextProps) {
    const recipes = nextProps.recipes ? nextProps.recipes : {};
    this.setState({
      recipes: recipes
    });

    console.log("recipe(s): ", recipes);
    //const recipeName = this.state.recipes.recipe.recipeName;
    //console.log("recipeName: ", recipeName);

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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

    console.log("cookEventData: ", cookEventData);

    this.props.createCookEvent(cookEventData, this.props.history); //this.props.history requires withRouter

    this.setState({
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true,
      archiveInd: true
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    //const { auth } = this.state;
    //const { recipe, loading } = this.props.recipes;
    //const { recipe, loading } = this.state;

    return (
      <div className="create-cook-event">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn-btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Cook Event</h1>
              <p className="lead text-center">Some subtext</p>
              <small className="d-blok pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Recipe Name"
                  name="recipeName"
                  value={this.props.recipe ? this.props.recipe.recipeName : ""}
                  onChange={this.onChange}
                  error={errors.recipeName}
                />
                <TextFieldGroup
                  placeholder="Type of Meat"
                  name="meatType"
                  value={this.state.meatType}
                  onChange={this.onChange}
                  error={errors.meatType}
                />
                <TextFieldGroup
                  placeholder="Weight of Meat"
                  name="meatWeight"
                  value={this.state.meatWeight}
                  onChange={this.onChange}
                  error={errors.meatWeight}
                />
                <TextFieldGroup
                  placeholder="Total Cook Time"
                  name="totalCookTime"
                  value={this.state.totalCookTime}
                  onChange={this.onChange}
                  error={errors.totalCookTime}
                />
                <TextFieldGroup
                  placeholder="Cook Rating"
                  name="cookRating"
                  value={this.state.cookRating}
                  onChange={this.onChange}
                  error={errors.cookRating}
                />
                <TextFieldGroup
                  placeholder="Oven Temperature"
                  name="ovenTemp"
                  value={this.state.ovenTemp}
                  onChange={this.onChange}
                  error={errors.ovenTemp}
                />
                <TextFieldGroup
                  placeholder="Cook State"
                  name="cookState"
                  value={this.state.cookState}
                  onChange={this.onChange}
                  error={errors.cookState}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="activeInd"
                    value={this.state.activeInd}
                    checked={this.state.activeInd}
                    onChange={this.onChange}
                    id="activeInd"
                  />
                  <label htmlFor="activeInd" className="form-check-label">
                    Active Cook
                  </label>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateCookEvent.propTypes = {
  createCookEvent: PropTypes.func.isRequired,
  getMyRecipe: PropTypes.func.isRequired,
  //profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  //auth: PropTypes.object.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    //profile: state.profile,
    //auth: state.auth,
    recipe: state.recipes.recipe,
    recipes: state.recipes,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { createCookEvent, getMyRecipe }
)(withRouter(CreateCookEvent));
