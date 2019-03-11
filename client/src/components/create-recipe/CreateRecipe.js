import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createRecipe } from "../../actions/recipeActions";

class CreateRecipe extends Component {
  //we have form fields, so we want constructor with state

  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      directions1: "",
      directions2: "",
      recipeURL: "",
      suggestedTemp: "",
      suggestedTime: "",
      suggestedWood: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const recipeData = {
      recipeName: this.state.recipeName,
      directions1: this.state.directions1,
      directions2: this.state.directions2,
      recipeURL: this.state.recipeURL,
      suggestedTemp: this.state.suggestedTemp,
      suggestedTime: this.state.suggestedTime,
      suggestedWood: this.state.suggestedWood
    };

    this.props.createRecipe(recipeData, this.props.history); //this.props.histor requires withRouter

    this.setState({
      recipeName: "",
      directions1: "",
      directions2: "",
      recipeURL: "",
      suggestedTemp: "",
      suggestedTime: "",
      suggestedWood: ""
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-recipe">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn-btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Recipe</h1>
              <p className="lead text-center">Some subtext</p>
              <small className="d-blok pb-3">* = required fields</small>
              <form novalidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Recipe Name"
                  name="recipeName"
                  value={this.state.recipeName}
                  onChange={this.onChange}
                  error={errors.recipeName}
                />
                <TextAreaFieldGroup
                  placeholder="Ingredients"
                  name="directions1"
                  value={this.state.directions1}
                  onChange={this.onChange}
                  error={errors.directions1}
                />
                <TextAreaFieldGroup
                  placeholder="Cooking/Mixing Instructions"
                  name="directions2"
                  value={this.state.directions2}
                  onChange={this.onChange}
                  error={errors.directions2}
                />
                <TextFieldGroup
                  placeholder="Recipe URL"
                  name="recipeURL"
                  type="URL"
                  value={this.state.recipeURL}
                  onChange={this.onChange}
                  error={errors.recipeURL}
                />
                <TextFieldGroup
                  placeholder="Suggested Temperature"
                  name="suggestedTemperature"
                  value={this.state.suggestedTemperature}
                  onChange={this.onChange}
                  error={errors.suggestedTemperature}
                />
                <TextFieldGroup
                  placeholder="Suggested Time"
                  name="suggestedTime"
                  value={this.state.suggestedTime}
                  onChange={this.onChange}
                  error={errors.suggestedTime}
                />
                <TextFieldGroup
                  placeholder="Suggested Wood"
                  name="suggestedWood"
                  value={this.state.suggestedWood}
                  onChange={this.onChange}
                  error={errors.suggestedWood}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createRecipe }
)(withRouter(CreateRecipe));
